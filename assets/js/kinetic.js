// import * as THREE from 'three'
// import fontFile from '@/assets/fonts/Orbitron-Black.fnt'
// global.THREE = THREE
import { TimelineLite, Expo } from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// const OrbitControls = require('three-orbit-controls')(THREE)
const loadFont = require('load-bmfont')
const createGeometry = require('three-bmfont-text')
const MSDFShader = require('three-bmfont-text/shaders/msdf')
const shaders = require("./shaders.js")
// Font assets

const fontFile = require('~/assets/fonts/Orbitron-Black.fnt')
const fontAtlas = require('~/assets/fonts/Orbitron-Black.png')
export default class Kinetic {
  constructor () {
    this.tl = new TimelineLite()
    this.renderer = new THREE.WebGLRenderer({
      alpha: true
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 0)
    document.querySelector('.canvas-webgl').appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )

    this.camera.position.z = 80

    this.scene = new THREE.Scene()

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.clock = new THREE.Clock()
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
  }
  init = () => {
    // Create geometry of packed glyphs
    // console.log(fontFile)
    /* eslint-disable-next-line */
    loadFont(fontFile, (err, font) => {
      // console.log('loade', font)
      this.fontGeometry = createGeometry({
        font,
        text: 'Gabriel Corbel'
      })
      // Load texture containing font glyphs
      this.loader = new THREE.TextureLoader()
      this.loader.load(fontAtlas, (texture) => {
        this.fontMaterial = new THREE.RawShaderMaterial(
          MSDFShader({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            negate: false,
            color: '#FFFFFF'
          })
        )
        this.createRenderTarget()
        this.createMesh()
        this.animate()
        this.addEvents()
        // Methods are called here
      })
    })
  }
  createRenderTarget = () => {
    // Texture dans laquelle on peut faire un rendu
    // Render Target setup
    this.rt = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    )

    this.rtCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    this.rtCamera.position.z = 2.5

    this.rtScene = new THREE.Scene()
    this.rtScene.background = new THREE.Color('#000000')

    // Create text with font geometry and material
    this.text = new THREE.Mesh(this.fontGeometry, this.fontMaterial)

    // Adjust text dimensions
    this.text.position.set(-0.965, -0.275, 0)
    this.text.rotation.set(Math.PI, 0, 0)
    this.text.scale.set(0.006, 0.02, 1)

    // Add text to RT scene
    this.rtScene.add(this.text)

    //this.scene.add(this.text) // Add to main scene
  }
  createMesh = () => {
    // le cube
    this.geometry = new THREE.TorusKnotGeometry(9, 3, 768, 3, 4, 3)
    this.material = new THREE.ShaderMaterial({
      vertexShader: shaders.vert,
      fragmentShader: shaders.frag,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: this.rt.texture }
      }
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.mesh);
  }
  animate = () => {
    requestAnimationFrame(this.animate.bind(this))

    this.render()
  }

  render = () => {
    this.controls.update()

    // Rotate mesh
    // this.mesh.rotation.x += 0.005

    // Update time
    this.material.uniforms.uTime.value = this.clock.getElapsedTime()
    
    // Draw Render Target
    this.renderer.setRenderTarget(this.rt)
    this.renderer.render(this.rtScene, this.rtCamera)
    this.renderer.setRenderTarget(null)

    this.renderer.render(this.scene, this.camera)
  }

  addEvents = () => {
    window.addEventListener('resize', this.resize.bind(this))
    window.addEventListener('mousedown', this.onMouseDown, false)
  }
  onMouseDown = (e) => {
    
 
    this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    this.mouse.y =  - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    this. raycaster.setFromCamera(this.mouse, this.camera)

    let meshObjects = [this.mesh] // three.js objects with click handlers we are interested in

    let intersects = this.raycaster.intersectObjects(meshObjects)

    if (intersects.length > 0) {
      event.preventDefault()
      window.$nuxt.context.store.commit('setLogoClick', !window.$nuxt.context.store.state.logoClick)
      const elem = document.querySelector('.canvas-webgl')
      if (!window.$nuxt.context.store.state.logoClick) {
        const elem = document.querySelector('.canvas-webgl')
        this.tl.reverse()
      } else {
        const elem = document.querySelector('.canvas-webgl')
        this.tl.to(elem, 1, {
          top: -75
        })
        this.tl.play()
      }
    }
  }

  resize = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }
}
