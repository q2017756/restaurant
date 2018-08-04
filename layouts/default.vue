<template>
  <div>
    <nuxt/>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.unified-bg {
  width: 100vw;
  min-width: 1000px;
  height: 100vh;
  background: url("/img/login-bg.jpg") no-repeat;
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
