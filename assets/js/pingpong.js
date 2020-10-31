import * as THREE from "three"
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// const OrbitControls = require('three-orbit-controls')(THREE)
export default class PingPong {
  constructor () {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.querySelector('.root').appendChild(this.renderer.domElement)
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      20
    )
    this.camera.position.set( - 1.8, 0.6, 2.7 )
    // this.camera.position.z = 80

    this.scene = new THREE.Scene()

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    // this.controls.addEventListener( 'change', render ) // use if there is no animation loop
    this.controls.minDistance = 2
    this.controls.maxDistance = 10
    this.controls.target.set( 0, 0, - 0.2 )
    
  }
  init = () => {
    // this.loader = new GLTFLoader()
    // this.loader.load('assets/3d/pingpong.glb', function (gltf) {
    //   console.log('LE G', gltf)
    //   gltf.scene.traverse( function (child) {
    //     if (child.isMesh) {

    //     }
    //   })
    //   this.scene.add(gltf.scene)
    // })
    this.animate()
    this.addEvents()
  }
  addEvents = () => {
    window.addEventListener('resize', this.resize.bind(this))
    // window.addEventListener('mousedown', this.onMouseDown, false)
  }
  resize = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  animate = () => {
    requestAnimationFrame(this.animate.bind(this))

    this.render()
  }

  render = () => {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }
}
