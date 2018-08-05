<template>
  <div class="header">
    <h1>予約システム</h1>
    <span class="right-btn" @click="doSth">
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
  components: {
      AppModal
  },
  computed: {

  },
  methods: {
    doSth() {
      console.log('管理')
    }
  }
}
</script>

<style scoped lang="scss">
  .header {
    position: relative;
    height: 90px;
    background: url("../assets/img/header-bg.png");
    text-align: center;
    line-height: 90px;
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
    line-height: 60px;
    font-size: 24px;
    img {
      margin-right: 10px;
    }
  }


</style>
