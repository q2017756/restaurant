<template>
  <div class="header">
    <h1>予約システム</h1>
    <span class="right-btn" v-show="btnShow" @click="doSth">
      <img class="" src="/img/administ.png" alt="">
      <span>システム管理</span>
    </span>
  </div>
</template>

<script>
import AppModal from "./AppModal.vue";
export default {
  data(){
    return {
      showModal: false,
      modalOptions: {
        show: true,
        title: ' ',
        showCancelButton: true,
        cancelButtonText: 'ok',
        showConfirmButton: true,
        confirmButtonText: ' '
      }
    };
  },
  props: {
      btnShow: {
          type: Boolean,
          default: true
      }
  },
  components: {
      AppModal
  },
  computed: {

  },
  methods: {
    doSth() {
      console.log('管理');
      this.$router.push('basicSet');
    }
  }
}
</script>

<style scoped lang="scss">
  .header {
    position: relative;
    height: 50px;
    padding-left: 60px;
    background: url("../assets/img/header-bg.png");
    text-align: left;
    line-height: 50px;
    color: #dbbe77;
  }
  .right-btn {
    position: absolute;
    right: 60px;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    line-height: 30px;
    font-size: 24px;
    cursor: pointer;
    img {
      margin-right: 10px;
    }
  }


</style>
