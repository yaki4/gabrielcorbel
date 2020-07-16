<template lang="pug">
  .app
    .app__wrapper(:class="$store.state.loading.isLoaded ? 'is-loaded' : 'is-loading'")
      .test(id='label0')
      nuxt
      .canvas-webgl(ref='canvasweb')
</template>
<script>
import { TimelineLite, Expo } from 'gsap'
import throttle from 'lodash.throttle'
import Emitter from '~/assets/js/utils/events'
export default {
  mounted () {
    this.bindAll()
    this.onResize()
    this.addListeners()
  },
  beforeDestroy () {
    this.removeListeners()
  },
  methods: {
    changePlace () {
      // ['onResize'].forEach(fn => (this[fn] = this[fn].bind(this)))
      const tl = new TimelineLite()
      tl.to(this.$refs.canvasweb, 1, {
        autoAlpha: 0,
        ease: Expo.easeOut
      })
    },
    bindAll () {
      ['onResize'].forEach(fn => (this[fn] = this[fn].bind(this)))
    },

    addListeners () {
      window.addEventListener('resize', throttle(() => {
        this.onResize()
      }, 100))
    },

    removeListeners () {
      window.removeEventListener('resize', throttle(() => {
        this.onResize()
      }, 100))
    },

    onResize () {
      Emitter.emit('GLOBAL:RESIZE')
      this.$store.dispatch('device/setVPSize')
      this.$store.dispatch('device/setMobile')
    }
  }
}
</script>
<style lang="stylus" scoped>
.app
  font-family objectsans-regular
  // overflow hidden

  &__wrapper
    transition opacity 1s ease-out

    &.is-loading
      opacity 0
      visibility hidden

    &.is-loaded
      opacity 1
      visibility visible

    .canvas-webgl
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      height var(--app-height)
      pointer-events none
      z-index 2
</style>
