<template lang="pug">
  .root
</template>

<script>
// import PingPong from '~/assets/js/pingpong'
export default {
  mounted () {
    // FAUT CHECKER SI CEST OK QUAND ON SE BALADE
    const PingPong = require('~/assets/js/pingpong').default
    this.ready = require('domready')
    this.ready(() => {
      // On va lancer la construction de la partie
      const pingpong = new PingPong()
      pingpong.init()
      // const kinetic = new Kinetic()
      // // console.log(kinetic)
      // kinetic.init()
    })
  }
}
</script>

<style lang="stylus">
.root
  width 100%
  height 100vh
  z-index 4
</style>