<template>
  <div class="modal-container" v-show="display">
    <div class="modal-overlay" @click.stop.prevent="hideOverlay" />
    <transition enter-active-class="zoomInLeft" leave-active-class="zoomOutRight">
      <div class="modal-content" :style="contentStyle">
        <slot></slot>
        <button @click="hideOverlay">关闭</button>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      contentStyle:{
        width:this.width+"px" || "400px",
        height:this.height+"px" || "300px"
        // top:
      }
    };
  },
  created() {

  },
  mounted(){

  },
  beforeUpdate(){
    console.log("mounted",this);
  },
  updated(){
    console.log("mounted",this);
  },
  destroyed(){
    console.log("destroyed",this);
  },
  computed: {

  },
  props: ["display","close","width","height"],
  methods:{

    hideOverlay(){
      this.close();
    }
  },
  watch:{

  }
};
</script>
<style lang="scss" scoped>
.modal-container{
  width:100%;
  height:100%;
  z-index:2003;

  .modal-overlay {
    position: fixed;
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 2003;
    opacity:0.75;
    background:#000000;
  }
  .modal-content{
    position: absolute;
    top:40%;
    left:40%;
    width: 500px;
    height: 300px;
    background:#ffffff;
    border-radius:4px;
    z-index:2004;
  }
}
</style>

