<template lang='pug'>
  div(id='loader')
    .screen(id='fold-effect')
      .wrapper-3d
        .fold.fold-top
          .fold-align
            .fold-content
              div(v-for='n in numberElem', :key='n')
                  span.type.type--1 &nbsp;Interactive&nbsp;
                  span.type.type--2 Developer / Developpeur &nbsp;
                  span.type.type--1 Interactif&nbsp;
        .fold.fold-center(id='center-fold', ref='title')
          .fold-align
            .fold-content(id='center-content')
              div(v-for='n in numberElem', :key='n')
                span.type.type--1 &nbsp;Interactive&nbsp;
                span.type.type--2 Developer / Developpeur &nbsp;
                span.type.type--1 Interactif&nbsp;
        .fold.fold-bottom
          .fold-align
            .fold-content
              div(v-for='n in numberElem', :key='n')
                span.type.type--1 &nbsp;Interactive&nbsp;
                span.type.type--2 Developer / Developpeur &nbsp;
                span.type.type--1 Interactif&nbsp;
</template>

<script>
import { TimelineLite, Expo } from 'gsap'
/* eslint-disable-next-line */
// import App from '~/assets/js/App'
import Kinetic from '~/assets/js/kinetic'
export default {
  components: {
  },
  computed: {
    numberElem () {
      if (this.$store.state.device.isMobile) {
        return 50
      } else {
        return 20
      }
    }
  },
  mounted () {
    this.setScroll()
    const tl = new TimelineLite({
      onComplete: () => {
        this.$store.dispatch('loading/setLoaded', true)
      }
    })
    this.ready = require('domready')
    this.ready(() => {
      const kinetic = new Kinetic()
      // console.log(kinetic)
      kinetic.init()
    })
    setTimeout(() => {
      tl.to(this.$refs.title, 1, {
        autoAlpha: 1,
        ease: Expo.easeOut
      })
    }, 1000)
  },
  methods: {
    setScroll () {
      const centerContent = document.getElementById('center-content')
      const centerFold = document.getElementById('center-fold')

      const overflowHeight = centerContent.clientHeight - centerFold.clientHeight

      window.document.getElementById('loader').style.height = overflowHeight + window.innerHeight + 'px'

      // on cree le scroll
      const foldsContent = Array.from(document.getElementsByClassName('fold-content'))
      const tick = () => {
        const scroll = -(
          document.documentElement.scrollTop || window.document.getElementById('__layout').scrollTop
        )
        foldsContent.forEach((content) => {
          content.style.transform = `translateY(${scroll}px)`
        })
        requestAnimationFrame(tick)
      }
      tick()
    }
  }
}
</script>

<style lang="stylus">
.loader
    font-family sans-serif
    width 100%
    height 100vh
    margin 0
    background #fafafa
    // font-family "Source Sans Pro", sans-serif

.screen
    position fixed
    top 0
    left 0
    display flex
    align-items center
    justify-content center
    width 100%
    height 100vh

.wrapper-3d
    position relative
    perspective 20vw
    transform-style preserve-3d

.fold
    overflow hidden
    width 100vw
    height 80vh

.fold-top
    position absolute
    transform-origin bottom center
    left 0
    right 0
    bottom 100%
    transform-origin bottom center
    transform rotateX(-120deg)
    .fold-align
        transform translateY(100%)

.fold-bottom
    position absolute
    transform-origin top center
    right 0
    left 0
    top 100%
    transform-origin top center
    transform rotateX(120deg)
    .fold-align
        transform translateY(-100%)

.fold-align
    width 100%
    height 100%

.type
    font-size 5.5vw
    line-height 0.9
    white-space nowrap
    text-transform uppercase

.type--1
    font-family ostrich-sans-black, sans-serif
    font-weight 700

.type--2
    font-family ostrich-sans-bold, sans-serif
    font-weight 700
</style>
