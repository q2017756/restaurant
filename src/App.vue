<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
}
html,body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.unified-bg {
  width: 100vw;
  min-width: 1000px;
  height: 100vh;
  background: url("./assets/img/login-bg.jpg") no-repeat;
  background-size: 100vw 100vh;
  overflow: hidden;
  font-family: 'SimSun';
}
.model-body-txt {
  color: #777;
  font-size: 24px;
  margin: 45px 0;
  text-align: center;
}
.btn-cancel, .btn-confirm {
  display: block;
  text-align: center;
  padding-top: 10px;
  width: 120px;
  height: 45px;
  color: #000;
  font-size: 24px;
  background-color: #fff;
  margin: 0 auto;
  cursor: pointer;
  box-shadow: 1px 3px 10px 2px #ddd;
}
.btn-confirm {
  background-color: #ded5a7;
  color: #fff;
  box-shadow: 0 0 0 #ddd;
}
</style>
