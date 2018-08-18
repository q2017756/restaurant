<template>
  <div class="unified-bg">
    <div class="container">
      <div class="form">
        <h1 class="title">レストラン予約</h1>
        <p class="sub-title">システム</p>
        <input class="username" type="text" v-model="username">
        <input class="pwd" type="password" v-model="password">
        <div class="login-btn" @click="login">登録</div>
      </div>
    </div>
    <app-modal :options="modalOptions" v-show="modalOptions.show">
      <div slot="body">
        <p class="model-body-txt">{{ modalMsg }}</p>
      </div>
    </app-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import AppModal from "../components/AppModal.vue"

  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: '',
        modalMsg: '',
        modalOptions: {
          show: false,
          title: ' ',
          showCancelButton: true,
          cancelButtonText: 'ok',
          showConfirmButton: false,
          confirmButtonText: ' '
        }
      }
    },
    components: {
      AppModal
    },
    computed: {},
    methods: {
      ...mapActions([
        'login'
      ]),
      login() {
        if (!this.username || !this.password) {
          this.modalOptions.show = true
          this.modalMsg = 'アカウントとパスワードは空けてはいけません'
        } else {
//          this.axios.post('user/userauth', {
//          this.axios.post('setting/updatedailymessage', {
//              DailyDate: '2018/08/17',
//              DailyMessage: 'test'
//          })
//              .then(res => {
//                console.log(res)
//              })
          if (this.username !== '1' || this.password !== '1') {
            this.modalOptions.show = true;
            this.modalMsg = 'ユーザー名又はパスワードが違いました。';
          } else {
            this.$store.dispatch('login',1);
            this.$router.push('calendar');
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/common.scss";

  .container {
    position: relative;
    width: 8rem;
    height: 50vh;
    max-width: 100vw;
    margin: 25vh auto;
    background: url("../assets/img/login-form-bg.jpg") no-repeat;
    background-size: 100% 100%;
  }

  .form {
    box-sizing: border-box;
    position: absolute;
    right: .5rem;
    top: .5rem;
    width: 324px;
    height: 360px;
    background: #fff;
    border-radius: 5px;
    text-align: center;
    padding: .4rem;
  }



  .title {
    letter-spacing: 3px;
    white-space: nowrap;
    font-size: 26px;
  }

  .sub-title {
    margin: 9px 0 15px;
    color: #777;
    font-size: 24px;
  }

  .username, .pwd {
    box-sizing: border-box;
    width: 90%;
    margin-bottom: 15px;
    padding: 10px 40px;
    background-repeat: no-repeat;
    background-size: 30px;
    border: none;
    border-bottom: 1px solid #dcdcdc;
    outline: none;
  }

  .username {
    background-image: url("../assets/img/login-user.png");
  }

  .pwd {
    background-image: url("../assets/img/login-password.png");
  }

  .login-btn {
    width: 222px;
    height: 45px;
    margin: 10px auto;
    background: #D0C487;
    text-align: center;
    line-height: 45px;
    color: #fff;
    font-size: 24px;
    letter-spacing: 5px;
    cursor: pointer;
    user-select: none;
  }
  @media screen and(max-width: 750px){
    .container {
      width: 100vw;
      height: 60vh;
    }
    .form {
      right: 10%;
      top: 10%;
      width: 8rem;
      width: 8rem;
      height: 50vh;
      max-width: 100vw;
      padding: .8rem .4rem;
    }
  }
</style>
