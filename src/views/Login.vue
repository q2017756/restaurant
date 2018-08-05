<template>
    <div class="unified-bg">
        <div class="container">
            <div class="form">
                <h1 class="title">酒店餐厅预订</h1>
                <p class="sub-title">管理平台</p>
                <input class="username" type="text" v-model="username">
                <input class="pwd" type="password" v-model="password">
                <div class="login-btn" @click="login">登录</div>
            </div>
        </div>
        <app-modal :options="modalOptions" v-show="modalOptions.show">
            <div slot="body">
                <p class="model-body-txt">用户名或密码错误111。</p>
            </div>
        </app-modal>
    </div>
</template>

<script>
    import AppModal from "../components/AppModal.vue";
    export default {
        name: "login",
        data(){
            return {
                username: '',
                password: '',
                showModal: false,
                modalOptions: {
                    show: true,
                    title: ' ',
                    showCancelButton: true,
                    cancelButtonText: 'ok',
                    showConfirmButton: false,
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
            login() {
                console.log('登录')
            }
        }
    }
</script>

<style scoped>
    .login {
        width: 100vw;
        height: 100vh;
        background: url("../assets/img/login-bg.jpg") no-repeat;
        background-size: 100vw 100vh;
        overflow: hidden;
        font-family: 'SimSun';
    }
    .container {
        position: relative;
        margin: 25vh auto;
        background: url("../assets/img/login-form-bg.jpg") no-repeat;
        width: 1000px;
        height: 460px;
    }
    .form {
        box-sizing: border-box;
        position: absolute;
        right: 50px;
        top: 50px;
        width: 324px;
        height: 360px;
        background: #fff;
        border-radius: 5px;
        text-align: center;
        padding: 45px;
    }
    .title {
        letter-spacing: 3px;
    }
    .sub-title {
        margin: 9px 0 15px;
        color: #777;
        font-size: 24px;
    }
    .username,.pwd {
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
        user-select:none;
    }

</style>
