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
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <div class="tab">
          <div class="tab-title">
            <span class="title-line"></span>
            <span class="title-txt">営業時間</span>
          </div>
          <div class="tab-inner">
            <div class="time-wrap">
              <div class="pull-left">
                <div class="inner-txt">ランチ</div>
                <el-form-item prop="lunchStart">
                  <el-time-select
                          v-model="ruleForm.lunchStart"
                          :picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '24:00'
                      }"
                          placeholder="OPEN">
                  </el-time-select>
                </el-form-item>
                -
                <el-form-item prop="lunchEnd">
                  <el-time-select
                          v-model="ruleForm.lunchEnd"
                          :picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '24:00'
                      }"
                          placeholder="L.O">
                  </el-time-select>
                </el-form-item>
              </div>
              <div class="time-line pull-left"></div>
              <div class="pull-left">
                <div class="inner-txt">ディナー</div>
                <el-form-item prop="dinnerStart">
                  <el-time-select
                          v-model="ruleForm.dinnerStart"
                          :picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '24:00'
                      }"
                          placeholder="OPEN">
                  </el-time-select>
                </el-form-item>
                -
                <el-form-item prop="dinnerEnd">
                  <el-time-select
                          v-model="ruleForm.dinnerEnd"
                          :picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '24:00'
                      }"
                          placeholder="L.O">
                  </el-time-select>
                </el-form-item>
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
                <el-form-item prop="group1">
                  <el-input v-model="ruleForm.group1" type="tel" placeholder="内容を入力してください"/>
                </el-form-item>
                <span class="ml12 mr24">組以上</span>
              </div>
              <div>
                <el-form-item prop="people1">
                  <el-input v-model="ruleForm.people1" type="tel" placeholder="内容を入力してください"/>
                </el-form-item>
                <span class="ml12">人以上</span>
              </div>
            </div>
            <div class="inner-txt">
              <img src="../assets/img/calendar-x.png" alt="">
            </div>
            <div class="group-input">
              <div>
                <el-form-item prop="group2">
                  <el-input v-model="ruleForm.group2" type="tel" placeholder="内容を入力してください"/>
                </el-form-item>
                <span class="ml12 mr24">組以上</span>
              </div>
              <div>
                <el-form-item prop="people2">
                  <el-input v-model="ruleForm.people2" type="tel" placeholder="内容を入力してください"/>
                </el-form-item>
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
            <el-input class="input-add" v-model="emailText" clearable></el-input>
            <img class="image-add" src="../assets/img/add2.png" @click="addEmail" alt="">
            <div>
              <div class="email-item" v-for="item,index in email">
                <span class="email-content">{{item}}</span>
                <img class="image-x" src="../assets/img/x.png" @click="delEmail(index)" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="opr-btns">
          <el-button class="remarks-btn" plain @click="toDetail">詳細設定</el-button>
          <el-button class="remarks-btn" type="primary" @click="setInfo">登録</el-button>
          <el-button class="remarks-btn" plain @click="toPre">戻る</el-button>
        </div>
      </el-form>
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
      const checkNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('選択してください'))
        } else if (Number(value)<0 || value.length > 4 ) {
          callback(new Error('半角数字4桁以内で入力してください'))
        } else if(!(/(^[1-9]\d*$)/.test(value))) {
          callback(new Error('半角数字4桁以内で入力してください'))
        } else {
          callback()
        }
      }
      return {
        loading: true,
        checkList: [],

        ruleForm: {
          lunchStart: '',
          lunchEnd: '',
          dinnerStart: '',
          dinnerEnd: '',
          group1: '',
          people1: '',
          group2: '',
          people2: '',
        },

        options: [],
        email: [],
        emailText: '',

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
        },

        rules: {
          group1: [
            {validator: checkNum, trigger: 'blur'}
          ],
          people1: [
            {validator: checkNum, trigger: 'blur'}
          ],
          group2: [
            {validator: checkNum, trigger: 'blur'}
          ],
          people2: [
            {validator: checkNum, trigger: 'blur'}
          ],
          lunchStart: [
            {required: true, message: '選択してください', trigger: 'change'}
          ],
          lunchEnd: [
            {required: true, message: '選択してください', trigger: 'change'}
          ],
          dinnerStart: [
            {required: true, message: '選択してください', trigger: 'change'}
          ],
          dinnerEnd: [
            {required: true, message: '選択してください', trigger: 'change'}
          ]
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
        this.axios.post('setting/getbasesetting').then(res => {

          if (res.data.Code === "SC-001") {
            if (res.data.Data[0]) {
              this.loading = false
              const info = res.data.Data[0]
              this.checkList = info.WeeklyWorkdayId.split(',')
              this.ruleForm = {
                lunchStart: info.LunchStartTime,
                lunchEnd: info.LunchEndTime,
                dinnerStart: info.DinnerStartTime,
                dinnerEnd: info.DinnerEndTime,
                group1: info.YoyakuAvalibleNum,
                people1: info.YoyakusyaAvalibleNum,
                group2: info.YoyakuUnavalibleNum,
                people2: info.YoyakusyaUnavalibleNum,
              }

              this.email = info.TantoMail.split(',')
            }
          } else {
            this.$message.error(res.data.Message)
          }
        })

        this.options = getTimeList()
      },
      toDetail() {
        this.$router.push('detailSet')
      },
      setInfo() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.modalOptions.show = true
            this.modalMsg = '登録します。よろしいですか？'
            this.modalStatus = 1
          } else {
            this.$message.error('選択してください')
            console.log('error submit!!')
            return false
          }
        })
      },
      toPre() {
        this.modalOptions.show = true
        this.modalMsg = '台帳に戻ってよろしいでしょうか？'
        this.modalStatus = 2
      },
      addEmail() {
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if (this.emailText && myreg.test(this.emailText)) {
          this.email.push(this.emailText)
        } else {
          this.$message.error('正しいメールを入力してください')
        }
      },
      delEmail(i) {
        console.log(i)
        this.email.splice(i, 1)
      },
      doConfirm() {
        if (this.modalStatus === 1) {
          this.loading = true
          this.axios.post('setting/updatebasesetting', {
            WeeklyWorkdayId: this.checkList.join(','),
            LunchStartTime: this.ruleForm.lunchStart,
            LunchEndTime: this.ruleForm.lunchEnd,
            DinnerStartTime: this.ruleForm.dinnerStart,
            DinnerEndTime: this.ruleForm.dinnerEnd,
            YoyakuAvalibleNum: this.ruleForm.group1,
            YoyakusyaAvalibleNum: this.ruleForm.people1,
            YoyakuUnavalibleNum: this.ruleForm.group2,
            YoyakusyaUnavalibleNum: this.ruleForm.people2,
            TantoMail: this.email.join(','),
            RegDate: localStorage.getItem('clickDate'),
            RegUserId: JSON.parse(localStorage.getItem('userInfo')).UserName,
          }).then(res => {

            if (res.data.Code === "SC-001") {
              this.loading = false
              this.modalOptions.show = false
              this.modalOptions2.show = true
              this.modalMsg2 = '登録は成功しました'
            } else {
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
      // this.loading = false
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .disn {
    display: none !important;
    opacity: 0;
  }

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

  .input-add {
    width: 300px;
    margin-right: 20px;
  }

  .image-add {
    width: 30px;
    vertical-align: middle;
  }

  .email-item {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    background: #eee;
    margin: 10px 10px 10px 0;
  }

  .email-content {
    color: #000;
    margin-right: 10px;
  }

  .image-x {
    vertical-align: middle;
  }

  @media screen and(max-width: 750px) {
    .container {
      transform: scale(1) !important;
      margin: 40px auto !important;
      padding: 15px !important;
    }
  }

</style>
