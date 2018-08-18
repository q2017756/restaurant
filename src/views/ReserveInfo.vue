<template>
  <div class="unified-bg">
    <app-header></app-header>
    <div class="contianer">
      <div class="inner-left">
        <div v-show="setInfoType === '1' ? false : true" class="tab sel-date">
          <div class="tab-title pull-left mr30">
            <span class="title-line"></span>
            <span class="title-txt">予約日</span>
          </div>
          <div class="pull-left">
            <el-input v-model="input" class="mr30"></el-input>
            <el-button class="remarks-btn" type="primary" @click="showCalendar">予約日変更</el-button>
          </div>
        </div>
        <div class="tab">
          <div class="tab-title">
            <span class="title-line"></span>
            <span class="title-txt">基本信息</span>
          </div>
          <div class="tab-inner">
            <div class="time-wrap">
              <div class="mb20">
                <div class="inner-txt">テーブル</div>
                <el-select v-model="value" placeholder="">
                  <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
                -
                <el-select v-model="value" placeholder="">
                  <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="inner-txt">時間</div>
              <el-select class="mb20" v-model="value" placeholder="">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
              <div class="inner-txt">TEL</div>
              <el-input class="mb20 tel-input" v-model="input"></el-input>
              <div class="info">
                <div class="pull-left">
                  <div class="inner-txt">法人・団体名</div>
                  <el-input v-model="input" class="mr30"></el-input>
                </div>
                <div class="pull-left name-wrap">
                  <div class="inner-txt">部署名</div>
                  <el-input v-model="input"></el-input>
                </div>
              </div>
              <div class="info">
                <div class="pull-left">
                  <div class="inner-txt">预约人名称</div>
                  <el-input v-model="input" class="mr30"></el-input>
                </div>
                <div class="pull-left">
                  <div class="inner-txt">ふりが</div>
                  <el-input v-model="input"></el-input>
                </div>
              </div>
              <div class="inner-txt">区分</div>
              <el-select class="mb20" v-model="value" placeholder="">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="info">
              <div class="pull-left">
                <div class="inner-txt">大人人数</div>
                <el-input v-model="input" class="mr30"></el-input>
              </div>
              <div class="pull-left">
                <div class="inner-txt">子供人数</div>
                <el-input v-model="input"></el-input>
              </div>
            </div>
            <div class="inner-txt">料理</div>
            <el-select class="mb20" v-model="value" placeholder="">
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
            <div class="inner-txt">受者</div>
            <el-select class="mb20" v-model="value" placeholder="">
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
            <div class="inner-txt">受日</div>
            <el-select class="mb20" v-model="value" placeholder="">
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
      <div class="inner-right">
        <div></div>
        <div class="tab">
          <div class="tab-title">
            <span class="title-line"></span>
            <span class="title-txt">履歴</span>
          </div>
          <div class="tab-inner">
            <div class="info">
              <div class="pull-left">
                <div class="inner-txt">宴会履歴</div>
                <el-input v-model="input" class="mr30"></el-input>
              </div>
              <div class="pull-left">
                <div class="inner-txt">法人レストラン履</div>
                <el-input v-model="input"></el-input>
              </div>
            </div>
            <div class="info">
              <div class="pull-left">
                <div class="inner-txt">結婚式</div>
                <el-input v-model="input" class="mr30"></el-input>
              </div>
              <div class="pull-left">
                <div class="inner-txt">个人レストラン履</div>
                <el-input v-model="input"></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="tab">
          <div class="tab-title">
            <span class="title-line"></span>
            <span class="title-txt">備考</span>
          </div>
          <div class="tab-inner remark">
            <div class="inner-txt mb20">料理詳細
              <el-checkbox class="pull-right" label="強調" name="type"></el-checkbox>
            </div>
            <el-input class="mb30" type="textarea" v-model="value"></el-input>
            <div class="inner-txt mb20">シチュエーション
              <el-checkbox class="pull-right" label="強調" name="type"></el-checkbox>
            </div>
            <el-input type="textarea" class="mb30" v-model="value"></el-input>
            <div class="inner-txt mb20">その他備考
              <el-checkbox class="pull-right" label="強調" name="type"></el-checkbox>
            </div>
            <el-input type="textarea" class="mb30" v-model="value"></el-input>
          </div>
        </div>
      </div>
      <div class="opr-btns">
        <el-button class="remarks-btn" type="primary" @click="login()">登録</el-button>
        <el-button class="remarks-btn" plain @click="sign()">戻る</el-button>
        <el-button class="remarks-btn" plain @click="cancel()">予約ＣＸＬ</el-button>
        <el-button class="remarks-btn" plain @click="delReserve()">データ削除</el-button>
      </div>
    </div>
    <div v-if="calendarShow" class="calendar-contianer">
      <a @click="closeCalendar" class="xd xd-close">close</a>
      <app-calendar :events="eventsData"
                    :dateItemRender="itemRender"
                    :startWeek="0"
                    @date-click="chooseDate"
                    @event-click="chooseDate2"
                    @event-dragend="changeDate"></app-calendar>
    </div>
    <app-modal :options="modalOptions" v-show="modalOptions.show">
      <div slot="body">
        <p class="model-body-txt">{{ modalMsg }}</p>
      </div>
    </app-modal>
  </div>
</template>

<script>
  import AppModal from "../components/AppModal.vue";
  import AppHeader from "../components/AppHeader.vue";
  import AppCalendar from '../components/AppCalendar';

  export default {
    data() {
      return {
        setInfoType: localStorage.setInfoType,
        checkList: [],
        value: '',
        options: [],
        value1: '',
        input: '',
        modalMsg: '111',
        modalOptions: {
          show: false,
          title: ' ',
          showCancelButton: true,
          cancelButtonText: '取消',
          showConfirmButton: true,
          confirmButtonText: '確認'
        },
        calendarShow: false,
        events: [
          {
            id: 1,
            date: '2018/08/02',
            DailyDate: "2017/12/31",
            TimeKbn: "1",
            YoyakuLevel: "2",
            DayoffKben: "0"
          },
          {
            id: 2,
            date: '2018/08/02',
            DailyDate: "2017/12/31",
            TimeKbn: "2",
            YoyakuLevel: "1",
            DayoffKben: "0"
          },
          {
            id: 3,
            date: '2018/08/03',
            DailyDate: "2017/12/31",
            TimeKbn: "1",
            YoyakuLevel: "0",
            DayoffKben: "0"
          },
          {
            id: 4,
            date: '2018/08/03',
            DailyDate: "2017/12/31",
            TimeKbn: "2",
            YoyakuLevel: "2",
            DayoffKben: "0"
          }
        ],
        itemRender(item) {
          const h = this.$createElement
          return h('div', {
              class: 'calendar-text-contianer'
            },
            [
              h('span', {
                  class: 'calendar-text'
                }, item.TimeKbn === "1" ? 'ランチ' : 'ディナー'
              ),
              h('span', {
                class: item.YoyakuLevel === '0' ? 'calendar-icon-circle' : (item.YoyakuLevel === '1' ? 'calendar-icon-triangle' : 'calendar-icon-x')
              })
            ]
          )
        },
      };
    },
    components: {
      AppModal,
      AppHeader,
      AppCalendar
    },
    computed: {
      eventsData() {
        let arr = this.events.filter(item => item.TimeKbn === localStorage.mealsType);
        return arr;
      }
    },
    methods: {
      login() {
        this.modalOptions.show = true
        this.modalMsg = '登録してよろしいでしょうか？'
      },
      sign() {
        this.modalOptions.show = true
        this.modalMsg = '台帳に戻ってよろしいでしょうか？'
      },
      cancel() {
        this.modalOptions.show = true
        this.modalMsg = '予約をキャンセルしてよろしいでしょうか？'
      },
      delReserve() {
        this.modalOptions.show = true
        this.modalMsg = '予約データを削除してよろしいでしょうか？'
      },
      showCalendar() {
        this.calendarShow = true
      },
      closeCalendar() {
        this.calendarShow = false
      },
      changeDate(e, item, date) {
        const updateIndex = this.events.findIndex(ele => ele.id === item.id)
        this.$set(this.events, updateIndex, {
          ...this.events[updateIndex],
          date
        });
      },
      chooseDate(e, date) {
        console.log(date)
      },
      chooseDate2(e, item) {
        console.log(item.date)
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

  .mr30 {
    margin-right: 30px;
  }

  .mb20 {
    margin-bottom: 20px;
  }

  .mb30 {
    margin-bottom: 30px;
  }

  .contianer {
    display: flex;
    flex-wrap: wrap;
    width: 90vw;
    max-width: 1200px;
    background: url('../assets/img/info-bg.png') no-repeat;
    margin: 60px auto;
    background-color: #fff;
    padding: 60px 30px 150px 30px;
    overflow: hidden;
    .inner-left {
      display: flex;
      flex-direction: column;
      width: 49%;
      border-right: 1px solid #ddd;
    }
    .inner-right {
      display: flex;
      flex-direction: column;
      width: 49%;
      margin-top: 391px;
      padding-left: 30px;
    }
    .sel-date {
      height: 42px;
      .el-input {
        width: 240px;
      }
    }
    .tab {
      margin-bottom: 30px;
      .group-input .el-input {
        width: 240px;
      }
      .tab-title {
        margin-bottom: 25px;
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
        }
      }
      .tab-inner {
        .sel-week .el-checkbox {
          border: 1px solid #ddd;
          box-shadow: 1px 1px 1px #ddd;
          padding: 15px 20px;
          span.el-checkbox__label {
            font-size: 24px;
          }
        }
        .time-line {
          width: 1px;
          height: 100%;
          background-color: #ddd;
          margin: 0 30px;
        }
        .time-wrap {
          height: auto;
        }
        .tel-input {
          width: 90%;
          max-width: 510px;
        }
        .group-input .el-input {
          width: 240px;
        }
        .inner-txt {
          font-size: 24px;
          margin-bottom: 10px;
          color: #142343;
        }
        .group1 {
          margin-bottom: 30px;
        }
      }
      .info {
        height: 110px;
        > div {
          margin-bottom: 20px;
        }
        .el-input {
          width: 240px;
        }
      }
      .name-wrap {
        margin-top: 4px;
      }
      .remark {
        .el-checkbox {
          .el-checkbox__label {
            font-size: 24px;
          }
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

  .calendar-contianer {
    position: absolute;
    top: 200px;
    left: 15vw;
    width: 70vw;
    min-width: 850px;
    height: 70vh;
    background: #fff;
    padding: 10px 100px 10px 10px;
    border-radius: 5px;
    box-shadow: 2px 3px 20px 1px #000;
    .xd-close {
      position: absolute;
      top: 10px;
      right: 10px;
      display: inline-block;
      padding: 10px;
      border: 1px solid #000;
      border-radius: 6px;
      color: #000;
      font-size: 18px;
      cursor: pointer;
    }
  }

  @media screen and(max-width: 750px) {
    .contianer {
      flex-direction: column;
      .inner-left, .inner-right {
        width: 100%;
        border-right: 1px solid transparent;
      }
      .inner-right {
        margin-top: 10px;
        padding-left: 0;
      }
    }
    .calendar-contianer {
      position: absolute;
      top: 200px;
      left: 0;
      width: 98vw;
      min-width: 98vw;
      overflow-x: scroll;
      .xd-close {
        z-index: 999;
      }
    }
    .contianer .sel-date {
      margin-bottom: 131px;
    }
    /*.contianer .tab {*/
      /*margin-bottom: 131px;*/
    /*}*/
    .contianer .tab .info {
      height: 215px;
    }
    .opr-btns {
      align-self: center;
      button {
        width: 100%;
      }
    }
  }
</style>
