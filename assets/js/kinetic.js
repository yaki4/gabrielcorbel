/* eslint-disable import/no-webpack-loader-syntax */
import * as THREE from 'three'
import fontFile from '@/assets/fonts/Orbitron-Black.fnt'
global.THREE = THREE
const OrbitControls = require('three-orbit-controls')(THREE)
const loadFont = require('load-bmfont')
const createGeometry = require('three-bmfont-text')
const MSDFShader = require('three-bmfont-text/shaders/msdf')
// Font assets

// const fontFile = require('~/assets/fonts/Orbitron-Black.fnt')
const fontAtlas = require('~/assets/fonts/Orbitron-Black.png')
export default class Kinetic {
  constructor () {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 1)
    document.body.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )

    this.camera.position.z = 5

    this.scene = new THREE.Scene()

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.clock = new THREE.Clock()
  }
  init = () => {
    // Create geometry of packed glyphs
    // console.log(fontFile)
    /* eslint-disable-next-line */
    loadFont(fontFile, (err, font) => {
      console.log('loade', font)
      this.fontGeometry = createGeometry({
        font,
        text: 'Gabriel'
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
            color: '0xffffff'
          })
        )
        this.createRenderTarget()
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
    this.text.scale.set(0.008, 0.02, 1)

    // Add text to RT scene
    this.rtScene.add(this.text)

    this.scene.add(this.text) // Add to main scene
  }

  animate = () => {
    requestAnimationFrame(this.animate.bind(this))

    this.render()
  }

  render = () => {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  addEvents = () => {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }
}
