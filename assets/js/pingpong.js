import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// const OrbitControls = require('three-orbit-controls')(THREE)
export default class PingPong {
  constructor () {
    this.renderer = new THREE.WebGLRenderer({antialias: true})
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.querySelector('.canvas-webgl').appendChild(this.renderer.domElement)
    this.camera = new THREE.PerspectiveCamera(30, 800 / 600, 1, 10000)
    this.camera.position.set(30, 10, 70) // settings in `sceneList` "Monster"
    this.camera.up.set(0, 1, 0)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    this.scene = new THREE.Scene()
    this.scene.add(new THREE.AmbientLight(0xccccccc))
    // this.renderer = new THREE.WebGLRenderer({
    //   antialias: true,
    //   alpha: true
    // })
    // this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    // this.renderer.setSize(window.innerWidth, window.innerHeight)
    // this.renderer.setClearColor(0x000000, 0)
    // document.querySelector('.canvas-webgl').appendChild(this.renderer.domElement)
    // this.camera = new THREE.PerspectiveCamera(
    //   45,
    //   window.innerWidth / window.innerHeight,
    //   1,
    //   1000
    // )
    // this.camera.position.z = 80
    // // this.camera.position.z = 80
    // // 0, 5, 12], fov: 50
    // this.scene = new THREE.Scene()

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    // // this.controls.addEventListener( 'change', render ) // use if there is no animation loop
    // // this.controls.minDistance = 2
    // // this.controls.maxDistance = 10
    this.controls.target.set( 0, 5, 0)
    this.controls.update()
    // this.clock = new THREE.Clock()
    // this.raycaster = new THREE.Raycaster()
    // this.mouse = new THREE.Vector2()
    
  }
  init = () => {
    this.loader = new GLTFLoader()
    const thus = this
    this.loader.load('../assets/3d/pingpong.glb', function (gltf) {
      console.log('LE G', gltf)
      thus.scene.add(gltf.scene)

      // set the camera to frame the box
      // thus.frameArea(boxSize * 0.5, boxSize, boxCenter, thus.camera);

      // update the Trackball controls to handle the new size
      // thus.controls.maxDistance = boxSize * 10;
      // thus.controls.target.copy(boxCenter);
      // gltf.scene.traverse( function (child) {
      //   if (child.isMesh) {
      //     console.log('ismesh')
      //   }
      // })
    })
    this.animate()
    this.addEvents()
  }

  frameArea = (sizeToFitOnScreen, boxSize, boxCenter, camera) => {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5
    const halfFovY = THREE.MathUtils.degToRad(this.camera.fov * .5)
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY)
    // compute a unit vector that points in the direction the camera is now
    // in the xz plane from the center of the box
    const direction = (new THREE.Vector3())
        .subVectors(this.camera.position, boxCenter)
        .multiply(new THREE.Vector3(1, 0, 1))
        .normalize();

    // move the camera to a position distance units way from the center
    // in whatever direction the camera was from the center already
    this.camera.position.copy(direction.multiplyScalar(distance).add(boxCenter))

    // pick some near and far values for the frustum that
    // will contain the box.
    this.camera.near = boxSize / 100
    this.camera.far = boxSize * 100

    this.camera.updateProjectionMatrix()

    // point the camera to look at the center of the box
    this.camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z)
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
    this.controls.update()
    this.render()
  }

  render = () => {
    // this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }
}
