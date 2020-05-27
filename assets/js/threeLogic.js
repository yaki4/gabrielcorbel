import WebGLFont from '@/components/WebGLFont/webGLFont'
import { shaders } from '@/components/WebGLFont/shader'

export default class ThreeLogic {
  constructor () {
    if (process.client) {
      this.init()
      // this.ready = require('domready')
      // this.ready(() => {
      //   this.init()
      // })
    }
  }
  init = () => {
    /* eslint-disable */
    const type = new WebGLFont({
      word: 'Gabriel Corbel',
      position: [-62.5, -10, 0],
      rotation: [Math.PI, 0, 0],
      zoom: 100,
      vertex: shaders[2].vertex,
      fragment: shaders[2].fragment
    })
  }
}
