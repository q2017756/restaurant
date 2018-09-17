<template>
  <div>
    <div class="header">
      <h1 class="name" @click="toCalendar">レストラン予約システム</h1>
      <img class="back" src="../assets/img/back-black.png" alt="" @click="goBack">
      <div class="right-btns" v-if='btnShow'>
        <p class="date" v-if="dateShow">{{date}} - {{type=== '1' ? 'ランチ' : 'ディナー'}}</p>
        <span class="btn"  v-if="auth !== '1'" @click="toBasic">システム管理</span>
        <span class="btn"  v-if="auth !== '1'" @click="toDetail">詳細設定</span>
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
        date: localStorage.getItem('clickDate'),
        type: localStorage.getItem('mealsType'),
        auth: JSON.parse(localStorage.getItem('userInfo')).GroupId,
        // auth: '2',
      };
    },
    props: {
      dateShow: {
        type: Boolean,
        default: true
      },
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
      toCalendar() {
        this.$router.push('calendar');
      },
      toBasic() {
        this.$router.push('basicSet');
      },
      toDetail() {
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
  .date {
    color: #000;
    padding: 10px 15px;
  }
  .name {
    cursor: pointer;
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
      font-size: 16px;
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
    .date, .btn {
      font-size: 12px !important;
    }
    .fill {
      display: block;
      width: 100vw;
      height: 30px;
    }
  }


</style>
