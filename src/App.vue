<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'app',
    mounted() {

    }
  }

  // // 设置html的font-size
  // document.addEventListener('DOMContentLoaded', function () {
  //   const ratio = 375 / 10
  //   const rem = window.innerWidth / ratio
  //   const dpr = window.devicePixelRatio
  //   const html = document.querySelector('html')
  //   html.classList.add(`env__dpr-${dpr}`)
  //   html.style.fontSize = window.innerWidth / 10 + 'px'
  // })

</script>

<style>
  /* 全局css */

</style>
<style lang="scss">

  @import './assets/css/global.scss';

</style>
