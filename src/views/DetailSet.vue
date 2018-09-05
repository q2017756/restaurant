<template>
  <div class="unified-bg">
    <app-header :btnShow="false"></app-header>
    <div class="container"  v-loading="loading">
      <div class="tab sel-date">
        <div class="tab-title pull-left mr30">
          <span class="title-line"></span>
          <span class="title-txt">予約日</span>
        </div>
        <div class="pull-left">
          <el-date-picker
                  v-model="dayValue"
                  type="date"
                  format="yyyy/MM/dd"
                  value-format="yyyy/MM/dd"
                  @change="getInfo"
                  placeholder="日付選択">
          </el-date-picker>
        </div>
      </div>
      <div class="tab">
        <div class="tab-title">
          <span class="title-line"></span>
          <span class="title-txt">営業</span>
        </div>
        <div class="tab-inner">
          <el-radio v-model="DayOffKbn" label="0">営業日</el-radio>
          <el-radio v-model="DayOffKbn" label="1">定休日</el-radio>
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
          <span class="title-txt">予约可否</span>
        </div>
        <div class="tab-inner small">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="0">
              <img class="middle-img" src="../assets/img/calendar-circle.png" alt="">
            </el-checkbox>
            <el-checkbox label="1">
              <img class="middle-img" src="../assets/img/calendar-triangle.png" alt="">
            </el-checkbox>
            <el-checkbox label="2">
              <img class="middle-img" src="../assets/img/calendar-x.png" alt="">
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="opr-btns">
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

  export default {
    data() {
      return {
        loading: localStorage.getItem('clickDate') ? true : false,
        dayValue: '',
        DayOffKbn: '',
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
        if(localStorage.getItem('clickDate')) {
          this.fillData(localStorage.getItem('clickDate'))
        }
      },
      getInfo(e) {
        this.fillData(e)
      },
      fillData(date) {
        this.loading = true
        this.axios.post('/setting/getdetailsetting',{
          DailyDate: date,
        }).then(res=>{
          if(res.data.Code === "SC-001") {
            this.loading = false
            const info = res.data.Data[0][0]
            console.log(info);
            this.dayValue = info.DailyDate
            this.DayOffKbn = info.DayoffKbn
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
            this.checkList = info.YoyakuLevel.split(',')
          }else if(res.data.Code === "EC-001") {
            this.loading = false
          } else{
            this.$message.error(res.data.Message)
          }

        })
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
          console.log('接口：保存')
          this.loading = true
          this.axios.post('setting/updatedetailsetting',{
            DaillyId: this.dayValue.replace(/\//g,''),
            DailyDate: this.dayValue,
            LunchStartTime: this.timeValue.lunchStart,
            LunchEndTime: this.timeValue.lunchEnd,
            DinnerStartTime: this.timeValue.dinnerStart,
            DinnerEndTime: this.timeValue.dinnerEnd,
            YoyakuAvalibleNum: this.inputValue.group1,
            YoyakusyaAvalibleNum: this.inputValue.people1,
            YoyakuUnavalibleNum: this.inputValue.group2,
            YoyakusyaUnavalibleNum: this.inputValue.people2,
            YoyakuLevel: this.checkList.join(','),
            DayOffKbn: this.DayOffKbn,
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

  .mr30 {
    margin-right: 30px;
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
    .sel-date {
      height: 42px;
    }
    .tab {
      margin-bottom: 34px;
      .group-input .el-input {
        width: 240px;
      }
      .tab-title {
        margin-bottom: 28px;
        font-size: 30px;
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
      .tab-inner {
        .sel-week {
          display: flex;
          flex-wrap: wrap;
        }
        .el-radio, .el-checkbox {
          border: 1px solid #ddd;
          box-shadow: 1px 1px 1px #ddd;
          padding: 15px 20px;
          span.el-radio__label {
            font-size: 20px;
          }
        }
        .el-radio, .el-checkbox {
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
          > div {
            margin-bottom: 20px;
          }
          .el-select {
            width: 240px;
          }
        }
        .group-input .el-input {
          width: 240px;
        }
        .inner-txt {
          font-size: 18px;
          margin-bottom: 10px;
          color: #142343;
        }
        .group1 {
          margin-bottom: 30px;
        }
      }
      .tab-inner.small {
        .el-radio, .el-checkbox {
          border: 1px solid #ddd;
          box-shadow: 1px 1px 1px #ddd;
          padding: 5px 10px;
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

    .middle-img {
      vertical-align: middle;
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
