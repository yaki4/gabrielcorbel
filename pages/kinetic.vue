<template lang="pug">
  .kinetic
</template>

<script>
/* eslint-disable-next-line */
import Kinetic from '~/assets/js/kinetic'
export default {
  name: 'Kinetic',
  mounted () {
    this.ready = require('domready')
    this.ready(() => {
      const kinetic = new Kinetic()
      console.log(kinetic)
      kinetic.init()
    })
  }
}
</script>

<style>
</style>
