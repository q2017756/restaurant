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
  // text-align: center;
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
  background-size: 100% 100%;
  overflow: scroll;
  font-family: 'SimSun';
}
.model-body-txt {
  color: #777;
  font-size: 24px;
  margin: 45px;
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
.calendar-text-contianer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0;
}
.calendar-text {
  display: inline-block;
  width: 72px;
  height: 24px;
  border-radius: 10px;
  text-align: center;
  line-height: 24px;
  color: #142343;
  border: 1px solid #142343;
  font-size: 16px;
}
.calendar-icon-triangle, .calendar-icon-x, .calendar-icon-circle {
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.calendar-icon-triangle {
  background: url("./assets/img/calendar-triangle.png");
}
.calendar-icon-x {
  background: url("./assets/img/calendar-x.png");
}
.calendar-icon-circle {
  background: url("./assets/img/calendar-circle.png");
}
</style>
