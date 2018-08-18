<template>
  <div class="unified-bg">
    <app-header :btnShow="false"></app-header>
    <div class="container">
      <div class="tab">
        <div class="tab-title">
          <span class="title-line"></span>
          <span class="title-txt">営業日</span>
        </div>
        <div class="tab-inner">
          <el-checkbox-group v-model="checkList" class="sel-week">
            <el-checkbox label="月"></el-checkbox>
            <el-checkbox label="火"></el-checkbox>
            <el-checkbox label="水"></el-checkbox>
            <el-checkbox label="木"></el-checkbox>
            <el-checkbox label="金"></el-checkbox>
            <el-checkbox label="土"></el-checkbox>
            <el-checkbox label="日"></el-checkbox>
            <el-checkbox label="祝日"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="tab">
        <div class="tab-title">
          <span class="title-line"></span>
          <span class="title-txt">営業時間</span>
        </div>
        <div class="tab-inner">
          <div class="time-wrap">
            <div class="pull-left">
              <div class="inner-txt">ランチ</div>
              <el-select v-model="value" placeholder="OPEN">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
              -
              <el-select v-model="value" placeholder="L.O">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="time-line pull-left"></div>
            <div class="pull-left">
              <div class="inner-txt">ディナー</div>
              <el-select v-model="value" placeholder="OPEN">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
              -
              <el-select v-model="value" placeholder="L.O">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="tab">
        <div class="tab-title">
          <span class="title-line"></span>
          <span class="title-txt">混雑基準</span>
        </div>
        <div class="tab-inner">
          <div class="inner-txt">
            <img src="../assets/img/calendar-triangle.png" alt="">
          </div>
          <div class="group-input group1">
            <div>
              <el-input v-model="input" placeholder="内容を入力してください"></el-input>
              <span class="ml12 mr24">組以上</span>
            </div>
            <div>
              <el-input v-model="input" placeholder="内容を入力してください"></el-input>
              <span class="ml12">人以上</span>
            </div>
          </div>
          <div class="inner-txt">
            <img src="../assets/img/calendar-x.png" alt="">
          </div>
          <div class="group-input">
            <div>
              <el-input v-model="input" placeholder="内容を入力してください"></el-input>
              <span class="ml12 mr24">組以上</span>
            </div>
            <div>
              <el-input v-model="input" placeholder="内容を入力してください"></el-input>
              <span class="ml12">人以上</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tab">
        <div class="tab-title">
          <span class="title-line"></span>
          <span class="title-txt">通知メール</span>
        </div>
        <div class="tab-inner">
          <div class="inner-txt">メールアドレス</div>
          <el-input class="email-input" v-model="input" placeholder="内容を入力してください"></el-input>
        </div>
      </div>
      <div class="opr-btns">
        <el-button class="remarks-btn" plain @click="toDetail">詳細設定</el-button>
        <el-button class="remarks-btn" type="primary" @click="setInfo">登録</el-button>
        <el-button class="remarks-btn" plain @click="toPre">戻る</el-button>
      </div>
    </div>
    <app-modal :options="modalOptions" v-show="modalOptions.show" @submit="doConfirm">
      <div slot="body">
        <p class="model-body-txt">{{ modalMsg }}</p>
      </div>
    </app-modal>
  </div>
</template>

<script>
  import AppModal from "../components/AppModal.vue";
  import AppHeader from "../components/AppHeader.vue";

  export default {
    data() {
      return {
        checkList: [],
        value: '',
        options: [],
        input: '',
        modalStatus: 1,
        modalMsg: '',
        modalOptions: {
          show: false,
          title: ' ',
          showCancelButton: true,
          cancelButtonText: 'キャンセル',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        }
      };
    },
    components: {
      AppModal,
      AppHeader
    },
    computed: {},
    methods: {
      toDetail() {
        this.$router.push('detailSet');
      },
      setInfo() {
        this.modalOptions.show = true;
        this.modalMsg = '登録します。よろしいですか？';
        this.modalStatus = 1;
      },
      toPre() {
        this.modalOptions.show = true;
        this.modalMsg = '台帳に戻ってよろしいでしょうか？';
        this.modalStatus = 2;
      },
      doConfirm() {
        if (this.modalStatus === 1) {
          console.log('接口：保存');
        } else if (this.modalStatus === 2) {
          this.$router.push('calendar');
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .pull-left {
    float: left;
  }

  .pull-right {
    float: right;
  }

  .ml12 {
    margin-left: 12px;
  }

  .mr24 {
    margin-right: 24px;
  }

  .container {
    display: flex;
    flex-direction: column;
    background: url('../assets/img/set-bg.png') no-repeat;
    width: 90vw;
    max-width: 1200px;
    margin: 60px auto;
    background-color: #fff;
    padding: 30px;
    .tab {
      margin-bottom: 1vh;
      .tab-title {
        margin-bottom: 1vh;
        font-size: 30px;
        color: #142343;
        .title-line {
          display: inline-block;
          width: 6px;
          height: 36px;
          margin-right: 24px;
          background-color: #ded5a7;
        }
        .title-txt {
          display: inline-block;
          vertical-align: top;
          font-size: 24px;
        }
      }
      .group-input .el-input {
        width: 240px;
      }
      .tab-inner {
        .sel-week {
          display: flex;
          flex-wrap: wrap;
        }
        .sel-week .el-checkbox {
          border: 1px solid #ddd;
          box-shadow: 1px 1px 1px #ddd;
          padding: 10px 20px;
          span.el-checkbox__label {
            font-size: 24px;
          }
        }
        .el-checkbox {
          margin: 0 20px 20px 0;
        }
        .time-line {
          width: 1px;
          height: 100%;
          background-color: #ddd;
          margin: 0 30px;
        }
        .time-wrap {
          display: flex;
          flex-wrap: wrap;
          >div {
            margin-bottom: 20px;
          }
          .el-select {
            width: 240px;
          }
        }
        .inner-txt {
          font-size: 24px;
          margin-bottom: 10px;
          color: #142343;
        }
        .group1 {
          margin-bottom: 30px;
        }
        .email-input {
          width: 80%;
          max-width: 500px;
        }
      }
    }
    .group-input {
      display: flex;
      flex-wrap: wrap;
      >div {
        margin: 0 30px 10px 0;
        display: flex;
        align-items: center;
        >span {
          flex: 0 0 20%;
        }
      }
    }
    .opr-btns {
      align-self: flex-end;
      display: flex;
      flex-wrap: wrap;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #eee;
      button {
        margin: 0 30px 10px 0;
        padding: 15px 5vw;
      }
    }
  }
  @media screen and(max-width: 750px){
    .container {
      padding: 15px;
    }
    .opr-btns {
      align-self: center;
      button {
        width: 100%;
      }
    }
  }

</style>
