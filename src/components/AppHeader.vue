<template>
  <div>
    <div class="header">
      <h1 class="name">レストラン予約システム</h1>
      <img class="back" src="../assets/img/back-black.png" alt="" @click="goBack">
      <div class="right-btns" v-show="btnShow">
        <span class="btn" @click="toBasic">システム管理</span>
        <span class="btn" @click="toDetail">詳細設定</span>
      </div>
    </div>
    <div class="fill"></div>
  </div>
</template>

<script>
  import AppModal from "./AppModal.vue";

  export default {
    data() {
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
    computed: {},
    methods: {
      toBasic() {
        console.log('管理');
        this.$router.push('basicSet');
      },
      toDetail() {
        console.log('管理');
        this.$router.push('detailSet');
      },
      goBack() {
        this.$router.go(-1)
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
    z-index: 999;
  }
  .back {
    display: none;
  }
  .right-btns {
    position: absolute;
    right: 60px;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    line-height: 30px;
    font-size: 24px;
    cursor: pointer;
    .btn {
      padding: 10px 15px;
    }
  }
  .fill {
    display: none;
  }

  @media screen and(max-width: 750px) {
    .header {
      position: fixed;
      width: 100vw;
      padding-left: 0;
    }
    .name {
      display: none;
    }
    .back {
      display: block;
      width: 15px;
      padding: 10px 20px;
    }
    .right-btns {
      right: 0;
    }
    .fill {
      display: block;
      width: 100vw;
      height: 30px;
    }
  }


</style>
