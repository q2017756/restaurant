<template>
  <div class="unified-bg">
    <div class="container">
      <div class="form" v-loading="loading">
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
  import {mapActions} from 'vuex'
  import AppModal from "../components/AppModal.vue"

  export default {
    name: "login",
    data() {
      return {
        loading: false,
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
          this.loading = true
          this.axios.post('user/userauth', {
            UserId: this.username,
            Password: this.password
          })
            .then(res => {
              this.loading = false
              if (res.data.Code === "EC-001") {
                this.modalOptions.show = true;
                this.modalMsg = 'ユーザー名又はパスワードが違いました。';
                return false
              }
              this.$store.dispatch('login', res.data.Data[0].Token)
              localStorage.setItem('userInfo',JSON.stringify(res.data.Data[0]))
              this.$router.push('calendar')
            })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/common.scss";

  .container {
    position: relative;
    width: 60vw;
    height: 50vh;
    max-width: 100vw;
    margin: 25vh auto;
    background: url("../assets/img/login-form-bg.jpg") no-repeat;
    background-size: 100% 100%;
    .form {
      position: absolute;
      right: 3vw;
      top: 5vh;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 330px;
      height: 40vh;
      background: #fff;
      border-radius: 5px;
      text-align: center;
      padding: 4vh 1vw;
      .title {
        letter-spacing: 3px;
        white-space: nowrap;
        font-size: 24px;
      }

      .sub-title {
        margin: .5vh 0 .8vh;
        color: #777;
        font-size: 20px;
      }

      .username, .pwd {
        box-sizing: border-box;
        width: 80%;
        margin-bottom: .5vh;
        padding: 1vh 15%;
        background-repeat: no-repeat;
        background-size: 30px;
        background-position: left;
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
        width: 80%;
        height: 45px;
        background: #D0C487;
        text-align: center;
        line-height: 45px;
        color: #fff;
        font-size: 22px;
        letter-spacing: 5px;
        cursor: pointer;
        user-select: none;
      }
    }
  }

  @media screen and(max-width: 750px) {
    .container {
      width: 100vw;
      height: 60vh;
      margin: 20vh auto;
    }
    .form {
      right: 10vw !important;
      top: 5vh !important;
      width: 80vw !important;
      height: 50vh !important;
      max-width: 100vw;
      padding: 4vh 4vw;
    }
  }

  @media screen and(max-height: 800px) and(min-width: 750px) {
    .container {
      .form {
        width: 40vh !important;
        .title {
          font-size: 20px;
        }

        .sub-title {
          margin: .5vh 0 .8vh;
          font-size: 16px;
        }
        .username, .pwd {
          background-size: 25px;
        }
        .login-btn {
          height: 40px;
          line-height: 40px;
          font-size: 18px;
        }
      }
    }

  }

  @media screen and(max-height: 600px) and(min-width: 750px) {
    .container {
      .form {
        width: 40vh !important;
        padding: 4vh 1vw !important;
        .title {
          font-size: 18px;
        }

        .sub-title {
          margin: .5vh 0 .8vh;
          font-size: 14px;
        }
        .username, .pwd {
          background-size: 20px;
        }
        .login-btn {
          height: 35px;
          line-height: 35px;
          font-size: 16px;
        }
      }
    }

  }
</style>
