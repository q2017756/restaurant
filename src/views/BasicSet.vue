<template>
  <div class="unified-bg">
    <app-header :btnShow="false"></app-header>
    <div class="container" v-loading="loading">
      <div class="tab">
        <div class="tab-title">
          <span class="title-line"></span>
          <span class="title-txt">営業日</span>
        </div>
        <div class="tab-inner">
          <el-checkbox-group v-model="checkList" class="sel-week">
            <el-checkbox label="01">月</el-checkbox>
            <el-checkbox label="02">火</el-checkbox>
            <el-checkbox label="03">水</el-checkbox>
            <el-checkbox label="04">木</el-checkbox>
            <el-checkbox label="05">金</el-checkbox>
            <el-checkbox label="06">土</el-checkbox>
            <el-checkbox label="07">日</el-checkbox>
            <el-checkbox label="08">祝日</el-checkbox>
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
              <el-time-select
                      v-model="timeValue.lunchStart"
                      :picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '24:00'
                      }"
                      placeholder="OPEN">
              </el-time-select>
              -
              <el-time-select
                      v-model="timeValue.lunchEnd"
                      :picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '24:00'
                      }"
                      placeholder="L.O">
              </el-time-select>
            </div>
            <div class="time-line pull-left"></div>
            <div class="pull-left">
              <div class="inner-txt">ディナー</div>
              <el-time-select
                      v-model="timeValue.dinnerStart"
                      :picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '24:00'
                      }"
                      placeholder="OPEN">
              </el-time-select>
              -
              <el-time-select
                      v-model="timeValue.dinnerEnd"
                      :picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '24:00'
                      }"
                      placeholder="L.O">
              </el-time-select>
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
              <el-input v-model="inputValue.group1" placeholder="内容を入力してください"/>
              <span class="ml12 mr24">組以上</span>
            </div>
            <div>
              <el-input v-model="inputValue.people1" placeholder="内容を入力してください"/>
              <span class="ml12">人以上</span>
            </div>
          </div>
          <div class="inner-txt">
            <img src="../assets/img/calendar-x.png" alt="">
          </div>
          <div class="group-input">
            <div>
              <el-input v-model="inputValue.group2" placeholder="内容を入力してください"/>
              <span class="ml12 mr24">組以上</span>
            </div>
            <div>
              <el-input v-model="inputValue.people2" placeholder="内容を入力してください"/>
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
          <el-select class="email-input"
                  v-model="email"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="内容を入力してください">
          </el-select>
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
    <app-modal :options="modalOptions2" v-show="modalOptions2.show" @submit="doConfirm2">
      <div slot="body">
        <p class="model-body-txt">{{ modalMsg2 }}</p>
      </div>
    </app-modal>
  </div>
</template>

<script>
  import AppModal from "../components/AppModal.vue"
  import AppHeader from "../components/AppHeader.vue"
  import {getTimeList} from '../utils/func'

  export default {
    data() {
      return {
        loading: true,
        checkList: [],
        timeValue: {
          lunchStart: '',
          lunchEnd: '',
          dinnerStart: '',
          dinnerEnd: '',
        },
        inputValue: {
          group1: '',
          people1: '',
          group2: '',
          people2: '',
        },
        options: [],
        email: '',


        modalStatus: 1,
        modalMsg: '',
        modalOptions: {
          show: false,
          title: ' ',
          showCancelButton: true,
          cancelButtonText: 'キャンセル',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        },
        modalMsg2: '',
        modalOptions2: {
          show: false,
          title: ' ',
          showCancelButton: false,
          cancelButtonText: 'キャンセル',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        }
      }
    },
    components: {
      AppModal,
      AppHeader
    },
    computed: {},
    methods: {
      getData() {
        this.axios.post('setting/getbasesetting').then(res=>{

          if(res.data.Code === "SC-001") {
            if(res.data.Data[0]) {
              this.loading = false
              const info = res.data.Data[0]
              this.checkList = info.WeeklyWorkdayId.split(',')
              this.timeValue = {
                lunchStart: info.LunchStartTime,
                lunchEnd: info.LunchEndTime,
                dinnerStart: info.DinnerStartTime,
                dinnerEnd: info.DinnerEndTime,
              }
              this.inputValue = {
                group1: info.YoyakuAvalibleNum,
                people1: info.YoyakusyaAvalibleNum,
                group2: info.YoyakuUnavalibleNum,
                people2: info.YoyakusyaUnavalibleNum,
              }
              this.email = info.TantoMail.split()
            }
          }else {
            this.$message.error(res.data.Message)
          }
        })
        
        this.options = getTimeList()
      },
      toDetail() {
        this.$router.push('detailSet')
      },
      setInfo() {
        this.modalOptions.show = true
        this.modalMsg = '登録します。よろしいですか？'
        this.modalStatus = 1
      },
      toPre() {
        this.modalOptions.show = true
        this.modalMsg = '台帳に戻ってよろしいでしょうか？'
        this.modalStatus = 2
      },
      doConfirm() {
        if (this.modalStatus === 1) {
          this.loading = true
          this.axios.post('setting/updatebasesetting',{
            WeeklyWorkdayId: this.checkList.join(','),
            LunchStartTime: this.timeValue.lunchStart,
            LunchEndTime: this.timeValue.lunchEnd,
            DinnerStartTime: this.timeValue.dinnerStart,
            DinnerEndTime: this.timeValue.dinnerEnd,
            YoyakuAvalibleNum: this.inputValue.group1,
            YoyakusyaAvalibleNum: this.inputValue.people1,
            YoyakuUnavalibleNum: this.inputValue.group2,
            YoyakusyaUnavalibleNum: this.inputValue.people2,
            TantoMail: this.email.join(','),
            RegDate: localStorage.getItem('clickDate'),
            RegUserId: JSON.parse(localStorage.getItem('userInfo')).UserName,
          }).then(res=>{

            if(res.data.Code === "SC-001") {
              this.loading = false
              this.modalOptions.show = false
              this.modalOptions2.show = true
              this.modalMsg2 = '登録は成功しました'
            }else {
              this.$message.error(res.data.Message)
            }
          })
        } else if (this.modalStatus === 2) {
          this.$router.push('calendar')
        }
      },
      doConfirm2() {
        this.$router.push('calendar')
      }
    },
    mounted() {
      this.getData()
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
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    background: url('../assets/img/set-bg.png') no-repeat;
    width: 90vw;
    max-width: 1200px;
    background-color: #fff;
    padding: 30px;
    .tab {
      margin-bottom: 1vh;
      .tab-title {
        margin-bottom: 1vh;
        color: #142343;
        .title-line {
          display: inline-block;
          width: 6px;
          height: 30px;
          margin-right: 24px;
          background-color: #ded5a7;
        }
        .title-txt {
          display: inline-block;
          vertical-align: top;
          font-size: 20px;
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
            font-size: 20px;
          }
        }
        .el-checkbox {
          margin: 0 20px 20px 0;
          font-size: 20px;
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
          > div {
            margin-bottom: 20px;
          }
          .el-select {
            width: 240px;
          }
        }
        .inner-txt {
          font-size: 18px;
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
      > div {
        margin: 0 30px 10px 0;
        display: flex;
        align-items: center;
        > span {
          flex: 0 0 20%;
        }
      }
    }
  }
  @media screen and(max-width: 750px) {
    .container {
      transform: scale(1) !important;
      margin: 40px auto !important;
      padding: 15px !important;
    }
  }

</style>
