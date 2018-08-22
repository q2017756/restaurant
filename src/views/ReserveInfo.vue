<template>
  <div class="unified-bg">
    <app-header></app-header>
    <div class="container">
      <div class="inner-left">
        <!--<input type="text" v-model="CustTel">-->
        <!--<div>{{filterOptionsTel}}</div>-->
        <div v-show="setInfoType === '1' ? false : true" class="tab sel-date">
          <div class="tab-title pull-left mr30">
            <span class="title-line"></span>
            <span class="title-txt">予約日</span>
          </div>
          <div class="pull-left">
            <el-input v-model="clickDate" class="mr30"></el-input>
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
                <el-select v-model="inputInfo.KaijoName" placeholder="">
                  <el-option
                          v-for="item in fieldOptions"
                          :key="item.KaijoId"
                          :label="item.KaijoName"
                          :value="item.KaijoId">
                  </el-option>
                </el-select>
                -
                <el-select v-model="inputInfo.TableNo" placeholder="">
                  <el-option
                          v-for="item in tableOptions"
                          :key="item.TableId"
                          :label="item.TableName"
                          :value="item.TableId">
                  </el-option>
                </el-select>
              </div>
              <div class="inner-txt">時間</div>
              <el-select class="mb20" v-model="inputInfo.StartTime" placeholder="">
                <el-option
                        v-for="item in timeOptions"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
              </el-select>
              <div class="inner-txt">TEL</div>
              <el-autocomplete
                      popper-class="my-autocomplete"
                      v-model="CustTel"
                      :fetch-suggestions="querySearchTel"
                      placeholder="请输入内容"
                      @select="handleSelect">
                <template slot-scope="{ item }">
                  <span v-if="item.CustTel">
                    <span class="font-bold">電話番号：</span>{{item.CustTel}}
                  </span>
                  <span v-if="item.CustName">
                    <span class="font-bold">予約者：</span>{{item.CustName}}
                  </span>
                  <span v-if="item.CustCompanyName">
                    <span class="font-bold">法人名（団体）：</span>{{item.CustCompanyName}}
                  </span>
                  <span v-if="item.ReservationDate">
                    <span class="font-bold">予定日：</span>{{item.ReservationDate}}
                  </span>
                  <span v-if="item.EnkaiDate || item.EnkaiName">
                    <span class="font-bold">宴会日·宴会名：</span>{{item.EnkaiDate}}·{{item.EnkaiName}}
                  </span>
                  <span v-if="item.JissiDate || item.Kankei">
                    <span class="font-bold">婚礼日·関係：</span>{{item.JissiDate}}·{{item.Kankei}}
                  </span>
                </template>
              </el-autocomplete>
              <div class="info" style="margin-top: 20px">
                <div class="">
                  <div class="inner-txt">法人・団体名</div>
                  <el-autocomplete
                          popper-class="my-autocomplete"
                          v-model="CustCompanyName"
                          :fetch-suggestions="querySearchCompany"
                          placeholder="请输入内容"
                          @select="handleSelect">
                    <template slot-scope="{ item }">
                      <span v-if="item.CustName">
                        <span class="font-bold">予約者：</span>{{item.CustName}}
                      </span>
                      <span v-if="item.CustCompanyName">
                        <span class="font-bold">法人名（団体）：</span>{{item.CustCompanyName}}
                      </span>
                      <span v-if="item.CustTel">
                        <span class="font-bold">電話番号：</span>{{item.CustTel}}
                      </span>
                      <span v-if="item.ReservationDate">
                        <span class="font-bold">予定日：</span>{{item.ReservationDate}}
                      </span>
                      <span v-if="item.EnkaiDate || item.EnkaiName">
                        <span class="font-bold">宴会日·宴会名：</span>{{item.EnkaiDate}}·{{item.EnkaiName}}
                      </span>
                      <span v-if="item.JissiDate || item.Kankei">
                        <span class="font-bold">婚礼日·関係：</span>{{item.JissiDate}}·{{item.Kankei}}
                      </span>
                    </template>
                  </el-autocomplete>
                </div>
                <div class="name-wrap">
                  <div class="inner-txt">部署名</div>
                  <el-input v-model="inputInfo.CustBusyoName"></el-input>
                </div>
              </div>
              <div class="info">
                <div class="">
                  <div class="inner-txt">予約者</div>
                  <!--<el-input v-model="inputInfo.CustName" class="mr30"></el-input>-->
                  <el-autocomplete
                          popper-class="my-autocomplete"
                          v-model="CustName"
                          :fetch-suggestions="querySearchName"
                          placeholder="请输入内容"
                          @select="handleSelect">
                    <template slot-scope="{ item }">
                      <span v-if="item.CustName">
                        <span class="font-bold">予約者：</span>{{item.CustName}}
                      </span>
                      <span v-if="item.CustCompanyName">
                        <span class="font-bold">法人名（団体）：</span>{{item.CustCompanyName}}
                      </span>
                      <span v-if="item.CustTel">
                        <span class="font-bold">電話番号：</span>{{item.CustTel}}
                      </span>
                      <span v-if="item.ReservationDate">
                        <span class="font-bold">予定日：</span>{{item.ReservationDate}}
                      </span>
                      <span v-if="item.EnkaiDate || item.EnkaiName">
                        <span class="font-bold">宴会日·宴会名：</span>{{item.EnkaiDate}}·{{item.EnkaiName}}
                      </span>
                      <span v-if="item.JissiDate || item.Kankei">
                        <span class="font-bold">婚礼日·関係：</span>{{item.JissiDate}}·{{item.Kankei}}
                      </span>
                    </template>
                  </el-autocomplete>
                </div>
                <div class="name-wrap">
                  <div class="inner-txt">ふりがな</div>
                  <el-input v-model="inputInfo.CustNameKana"></el-input>
                </div>
              </div>
              <div class="inner-txt">区分</div>
              <el-select class="mb20" v-model="inputInfo.KbnName" placeholder="">
                <el-option
                        v-for="item in typeOptions"
                        :key="item.KbnId"
                        :label="item.KbnName"
                        :value="item.KbnId">
                </el-option>
              </el-select>
            </div>
            <div class="info">
              <div class="">
                <div class="inner-txt">大人人数</div>
                <el-input v-model="inputInfo.AdultNum" class="mr30"></el-input>
              </div>
              <div class="name-wrap">
                <div class="inner-txt">子供人数</div>
                <el-input v-model="inputInfo.ChildNum"></el-input>
              </div>
            </div>
            <div class="inner-txt">料理</div>
            <el-select class="mb20" v-model="inputInfo.MenuName" placeholder="">
              <el-option
                      v-for="item in foodOptions"
                      :key="item.MenuId"
                      :label="item.MenuName"
                      :value="item.MenuId">
              </el-option>
            </el-select>
            <div class="inner-txt">受者</div>
            <el-select class="mb20" v-model="inputInfo.OwnerName" placeholder="">
              <el-option
                      v-for="item in ownerOptions"
                      :key="item.OwnerCode"
                      :label="item.OwnerName"
                      :value="item.OwnerCode">
              </el-option>
            </el-select>
            <div class="inner-txt">受日</div>
            <el-select class="mb20" v-model="inputInfo.UkerukeDate" placeholder="">
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
                <el-input v-model="inputInfo.EnkaiNum" class="mr30"></el-input>
              </div>
              <div class="pull-left">
                <div class="inner-txt">法人レストラン履</div>
                <el-input v-model="inputInfo.CompanyReservationNum"></el-input>
              </div>
            </div>
            <div class="info">
              <div class="pull-left">
                <div class="inner-txt">結婚式</div>
                <el-input v-model="inputInfo.KonReiJissiDate" class="mr30"></el-input>
              </div>
              <div class="pull-left">
                <div class="inner-txt">个人レストラン履</div>
                <el-input v-model="inputInfo.ReservationNum"></el-input>
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
            <div class="inner-txt mb20 flex-center">料理詳細
              <el-checkbox class="font-small" label="強調" name="type"></el-checkbox>
            </div>
            <el-input class="mb30" type="textarea" v-model="inputInfo.RyouriRemark"></el-input>
            <div class="inner-txt mb20 flex-center">シチュエーション
              <el-checkbox class="font-small" label="強調" name="type"></el-checkbox>
            </div>
            <el-input type="textarea" class="mb30" v-model="inputInfo.SituationRemark"></el-input>
            <div class="inner-txt mb20 flex-center">その他備考
              <el-checkbox class="font-small" label="強調" name="type"></el-checkbox>
            </div>
            <el-input type="textarea" class="mb30" v-model="inputInfo.OthersRemarke"></el-input>
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
    <div v-if="calendarShow" class="calendar-container">
      <a @click="closeCalendar" class="xd xd-close">close</a>
      <app-calendar :events="eventsData"
                    :dateItemRender="itemRender"
                    :startWeek="0"
                    @date-click="chooseDate"
                    @event-click="chooseDate2"
                    @event-dragend="changeDate"></app-calendar>
    </div>
    <app-modal :options="modalOptions" v-show="modalOptions.show" @submit="doConfirm">
      <div slot="body">
        <p class="model-body-txt">{{ modalMsg }}</p>
      </div>
    </app-modal>

  </div>
</template>

<script>
  import AppModal from "../components/AppModal.vue"
  import AppHeader from "../components/AppHeader.vue"
  import AppCalendar from '../components/AppCalendar'
  import {getTimeList} from '../utils/func'

  export default {
    data() {
      return {
        clickDate: localStorage.clickDate,
        setInfoType: localStorage.setInfoType,
        timeOptions: [],
        fieldOptions: [],
        tableOptions: [],
        typeOptions: [],
        foodOptions: [],
        ownerOptions: [],
        filterOptionsData: [],

        CustTel: '', // 电话
        CustCompanyName: '', // 法人团体名
        CustName: '', // 预约人姓名
        inputInfo: {
          KaijoName: '', // 会场
          TableNo: '', // 桌号
          StartTime: '', // 时间
          CustTel: '', // 电话
          CustCompanyName: '', // 法人团体名
          CustBusyoName: '', // 部署名
          CustName: '', // 预约人姓名
          CustNameKana: '', // 预约人日文发音
          KbnName: '', // 区分
          AdultNum: '', // 大人数
          ChildNum: '', // 小孩数
          MenuName: '', // 料理
          OwnerName: '', // 担当人信息
          UkerukeDate: '', // 预订提交日期
          EnkaiNum: '', // 宴会次数
          CompanyReservationNum: '', // 法人餐厅预约次数
          KonReiJissiDate: '', // 婚礼日期
          ReservationNum: '', // 个人餐厅预约次数
          RyouriRemark: '', // 料理备注
          RyouriRemarke: '', // 料理备注勾选 1选中
          SituationRemark: '', // 情况备注
          SituationRemarke: '', // 情况备注勾选 1选中
          OthersRemark: '', // 其他备注
          OthersRemarke: '', // 其他备注勾选 1选中
        },
        value: '',
        options: [],
        value1: '',
        input: '',
        modalMsg: '111',
        modalStatus: 1,
        modalOptions: {
          show: false,
          title: ' ',
          showCancelButton: true,
          cancelButtonText: 'キャンセル',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        },
        calendarShow: false,
        events: [
          {
            id: 1,
            date: '2018/08/02',
            DailyDate: "2018/08/20",
            TimeKbn: "1",
            YoyakuLevel: "2",
            DayoffKben: "0"
          },
          {
            id: 2,
            date: '2018/08/02',
            DailyDate: "2018/08/20",
            TimeKbn: "2",
            YoyakuLevel: "1",
            DayoffKben: "0"
          },
          {
            id: 3,
            date: '2018/08/09',
            DailyDate: "2018/08/21",
            TimeKbn: "1",
            YoyakuLevel: "0",
            DayoffKben: "0"
          },
          {
            id: 4,
            date: '2018/08/09',
            DailyDate: "2018/08/21",
            TimeKbn: "2",
            YoyakuLevel: "2",
            DayoffKben: "0"
          }
        ],
        itemRender(item) {
          const h = this.$createElement
          return h('div', {
                class: 'calendar-text-container'
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
      }
    },
    components: {
      AppModal,
      AppHeader,
      AppCalendar
    },
    computed: {
      eventsData() {
        let arr = this.events.filter(item => item.TimeKbn === localStorage.mealsType)
        return arr
      },
    },
    methods: {
      handleSelect(item) {
        console.log(item)
        this.CustTel = item.CustTel
        this.CustName = item.CustName
        this.CustCompanyName = item.CustCompanyName
        this.inputInfo.CustBusyoName = item.CustBusyoName
        this.inputInfo.KonReiJissiDate = item.KonReiJissiDate
        this.inputInfo.EnkaiNum = item.EnkaiNum
        this.inputInfo.ReservationNum = item.ReservationNum
      },
      querySearchTel(queryString, cb) {
        let arr = this.filterOptionsData
        let results =  arr.filter(this.createFilterTel(queryString))
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilterTel(queryString) {
        return (item) => {
          return (String(item.CustTel).indexOf(String(queryString)) > -1)
              && (String(item.CustCompanyName).indexOf(String(this.CustCompanyName)) > -1)
              && (String(item.CustName).indexOf(String(this.CustName)) > -1)
        }
      },

      querySearchCompany(queryString, cb) {
        let arr = this.filterOptionsData
        let results =   arr.filter(this.createFilterCompany(queryString))
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilterCompany(queryString) {
        return (item) => {
          return (String(item.CustCompanyName).indexOf(String(queryString)) > -1)
              && (String(item.CustTel).indexOf(String(this.CustTel)) > -1)
              && (String(item.CustName).indexOf(String(this.CustName)) > -1)
        }
      },

      querySearchName(queryString, cb) {
        let arr = this.filterOptionsData
        let results =  arr.filter(this.createFilterName(queryString))
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilterName(queryString) {
        return (item) => {
          return (String(item.CustName).indexOf(String(queryString)) > -1)
              && (String(item.CustCompanyName).indexOf(String(this.CustCompanyName)) > -1)
              && (String(item.CustTel).indexOf(String(this.CustTel)) > -1)
        }
      },
      getData() {
        this.timeOptions = getTimeList()
        // 会场
        this.fieldOptions = [
          {
            "KaijoId": "001",
            "KaijoName": "１Fレストラン",
          },
          {
            "KaijoId": "002",
            "KaijoName": "2Fダイニング",
          }
        ]
        // 桌号
        this.tableOptions = [
          {
            "TableId": "010",
            "KaijoId": "001",
            "TableName": "T-1",
          },
          {
            "TableId": "020",
            "KaijoId": "001",
            "TableName": "T-1-bis",
          }
        ]
        // 时间
        this.timeData = {
          "StartTime": "13：00",
          "EndTime": "15：00"
        }
        // 区分
        this.typeOptions = [
          {
            "KbnId": "010",
            "KbnName": "Ticket",
          },
          {
            "KbnId": "020",
            "KbnName": "Soigner",
          }
        ]
        // 料理
        this.foodOptions = [
          {
            "MenuId": "010",
            "MenuName": "当日",
          },
          {
            "MenuId": "020",
            "MenuName": "2800",
          }
        ]
        // 所有者信息
        this.ownerOptions = [
          {
            "OwnerCode": "A0001",
            "OwnerName": "社長",
          },
          {
            "OwnerCode": "N0001",
            "OwnerName": "常務",
          }
        ]
        // 模糊查询
        this.filterOptionsData = [
          {
            "PrimaryId": null,
            "ReservationDate": "2018/08/20",
            "KbnName": "LLLLLLLLLDDDD",
            "CustName": "黎漢",
            "CustNameKana": "レイハン",
            "CustCompanyName": "DATAMAX",
            "CustBusyoName": "開発部",
            "CustTel": "080XXXXXXXX",
            "ReservationNum": "2",
            "EnkaiSyusaiName": null,
            "EnkaiSyusaiNameKana": null,
            "EnkaiSyusaiTel": null,
            "EnkaiName": null,
            "EnkaiDate": null,
            "EnkaiNum": "",
            "JissiDate": '111',
            "HiroenEnkaijo": null,
            "Name": null,
            "NameKana": null,
            "Tel": null,
            "Kankei": '222'
          },
          {
            "PrimaryId": null,
            "ReservationDate": "2018/08/20",
            "KbnName": "LLLLLLLLLDDDD",
            "CustName": "于",
            "CustNameKana": "レイハン",
            "CustCompanyName": "DATAMAX",
            "CustBusyoName": "開発部",
            "CustTel": "080XXXXXXXX",
            "ReservationNum": "2",
            "EnkaiSyusaiName": null,
            "EnkaiSyusaiNameKana": null,
            "EnkaiSyusaiTel": null,
            "EnkaiName": null,
            "EnkaiDate": null,
            "EnkaiNum": "",
            "JissiDate": '111',
            "HiroenEnkaijo": null,
            "Name": null,
            "NameKana": null,
            "Tel": null,
            "Kankei": '222'
          },
          {
            "PrimaryId": null,
            "ReservationDate": "2018/08/20",
            "KbnName": "LLLLLLLLLDDDD",
            "CustName": "王",
            "CustNameKana": "レイハン",
            "CustCompanyName": "baidu",
            "CustBusyoName": "開発部",
            "CustTel": "080XXXXXXXX",
            "ReservationNum": "2",
            "EnkaiSyusaiName": null,
            "EnkaiSyusaiNameKana": null,
            "EnkaiSyusaiTel": null,
            "EnkaiName": null,
            "EnkaiDate": null,
            "EnkaiNum": "",
            "JissiDate": '111',
            "HiroenEnkaijo": null,
            "Name": null,
            "NameKana": null,
            "Tel": null,
            "Kankei": '222'
          },
          {
            "PrimaryId": null,
            "ReservationDate": "2018/08/20",
            "KbnName": "LLLLLLLLLDDDD",
            "CustName": "yu",
            "CustNameKana": "レイハン",
            "CustCompanyName": "sina",
            "CustBusyoName": "開発部",
            "CustTel": "080XXXXXXXX",
            "ReservationNum": "2",
            "EnkaiSyusaiName": null,
            "EnkaiSyusaiNameKana": null,
            "EnkaiSyusaiTel": null,
            "EnkaiName": null,
            "EnkaiDate": null,
            "EnkaiNum": "",
            "JissiDate": '111',
            "HiroenEnkaijo": null,
            "Name": null,
            "NameKana": null,
            "Tel": null,
            "Kankei": '222'
          },
          {
            "PrimaryId": null,
            "ReservationDate": null,
            "KbnName": null,
            "CustName": null,
            "CustNameKana": null,
            "CustCompanyName": null,
            "CustBusyoName": null,
            "CustTel": "080123456",
            "ReservationNum": "",
            "EnkaiSyusaiName": "前橋龍様・金沢直美様ｱﾌﾀｰﾊﾟｰﾃｨｰ",
            "EnkaiSyusaiNameKana": null,
            "EnkaiSyusaiTel": "090-2933-9985",
            "EnkaiName": "前橋龍様・金沢直美様ｱﾌﾀｰﾊﾟｰﾃｨｰ",
            "EnkaiDate": "2003/01/11",
            "EnkaiNum": "1",
            "JissiDate": null,
            "HiroenEnkaijo": null,
            "Name": null,
            "NameKana": null,
            "Tel": null,
            "Kankei": null
          },
          {
            "PrimaryId": null,
            "ReservationDate": null,
            "KbnName": null,
            "CustName": null,
            "CustNameKana": null,
            "CustCompanyName": null,
            "CustBusyoName": null,
            "CustTel": "0801111",
            "ReservationNum": "",
            "EnkaiSyusaiName": "風間・風間様　披露パーティー",
            "EnkaiSyusaiNameKana": null,
            "EnkaiSyusaiTel": "090-4527-3100",
            "EnkaiName": "風間・風間様　披露パーティー",
            "EnkaiDate": "2003/01/12",
            "EnkaiNum": "1",
            "JissiDate": null,
            "HiroenEnkaijo": null,
            "Name": null,
            "NameKana": null,
            "Tel": null,
            "Kankei": null
          },
          {
            "PrimaryId": null,
            "ReservationDate": null,
            "KbnName": null,
            "CustName": null,
            "CustNameKana": null,
            "CustCompanyName": null,
            "CustBusyoName": null,
            "CustTel": "0802222",
            "ReservationNum": "",
            "EnkaiSyusaiName": "土屋賢太郎様・鈴木紗保美様ｱﾌﾀｰﾊﾟｰﾃｨｰ",
            "EnkaiSyusaiNameKana": null,
            "EnkaiSyusaiTel": "046-234-0261",
            "EnkaiName": "土屋賢太郎様・鈴木紗保美様ｱﾌﾀｰﾊﾟｰﾃｨｰ",
            "EnkaiDate": "2003/01/25",
            "EnkaiNum": "1",
            "JissiDate": null,
            "HiroenEnkaijo": null,
            "Name": null,
            "NameKana": null,
            "Tel": null,
            "Kankei": null
          },
          {
            "PrimaryId": null,
            "ReservationDate": null,
            "KbnName": null,
            "CustName": null,
            "CustNameKana": null,
            "CustCompanyName": null,
            "CustBusyoName": null,
            "CustTel": "0803333",
            "ReservationNum": "",
            "EnkaiSyusaiName": "石井家・長尾家ｱﾌﾀｰﾊﾟｰﾃｨ",
            "EnkaiSyusaiNameKana": null,
            "EnkaiSyusaiTel": "03-5483-7187",
            "EnkaiName": "石井家・長尾家ｱﾌﾀｰﾊﾟｰﾃｨ",
            "EnkaiDate": "2003/02/01",
            "EnkaiNum": "1",
            "JissiDate": null,
            "HiroenEnkaijo": null,
            "Name": null,
            "NameKana": null,
            "Tel": null,
            "Kankei": null
          },
          {
            "PrimaryId": null,
            "ReservationDate": null,
            "KbnName": null,
            "CustName": null,
            "CustNameKana": null,
            "CustCompanyName": null,
            "CustBusyoName": null,
            "CustTel": "0804444",
            "ReservationNum": "",
            "EnkaiSyusaiName": "新倉家・服部家ｱﾌﾀｰﾊﾟｰﾃｨｰ",
            "EnkaiSyusaiNameKana": null,
            "EnkaiSyusaiTel": "070-6655-9268",
            "EnkaiName": "新倉家・服部家ｱﾌﾀｰﾊﾟｰﾃｨｰ",
            "EnkaiDate": "2003/02/02",
            "EnkaiNum": "1",
            "JissiDate": null,
            "HiroenEnkaijo": null,
            "Name": null,
            "NameKana": null,
            "Tel": null,
            "Kankei": null
          },
          {
            "PrimaryId": null,
            "ReservationDate": null,
            "KbnName": null,
            "CustName": null,
            "CustNameKana": null,
            "CustCompanyName": null,
            "CustBusyoName": null,
            "CustTel": null,
            "ReservationNum": "",
            "EnkaiSyusaiName": "遠藤様・榊原様二次会ﾊﾟｰﾃｨｰ",
            "EnkaiSyusaiNameKana": null,
            "EnkaiSyusaiTel": "0466-29-3103",
            "EnkaiName": "遠藤様・榊原様二次会ﾊﾟｰﾃｨｰ",
            "EnkaiDate": "2003/02/08",
            "EnkaiNum": "1",
            "JissiDate": null,
            "HiroenEnkaijo": null,
            "Name": null,
            "NameKana": null,
            "Tel": null,
            "Kankei": null
          },
          {
            "PrimaryId": null,
            "ReservationDate": null,
            "KbnName": null,
            "CustName": null,
            "CustNameKana": null,
            "CustCompanyName": null,
            "CustBusyoName": null,
            "CustTel": null,
            "ReservationNum": "",
            "EnkaiSyusaiName": "青木雄一様・佐藤倫子様二次会パーティー",
            "EnkaiSyusaiNameKana": null,
            "EnkaiSyusaiTel": "042-770-5319",
            "EnkaiName": "青木雄一様・佐藤倫子様二次会パーティー",
            "EnkaiDate": "2003/02/11",
            "EnkaiNum": "1",
            "JissiDate": null,
            "HiroenEnkaijo": null,
            "Name": null,
            "NameKana": null,
            "Tel": null,
            "Kankei": null
          },
          {
            "PrimaryId": null,
            "ReservationDate": null,
            "KbnName": null,
            "CustName": null,
            "CustNameKana": null,
            "CustCompanyName": null,
            "CustBusyoName": null,
            "CustTel": null,
            "ReservationNum": "",
            "EnkaiSyusaiName": "宇野家・丹家ｱﾌﾀｰﾊﾟｰﾃｨｰ",
            "EnkaiSyusaiNameKana": null,
            "EnkaiSyusaiTel": "090-9137-0707",
            "EnkaiName": "宇野家・丹家ｱﾌﾀｰﾊﾟｰﾃｨｰ",
            "EnkaiDate": "2003/02/15",
            "EnkaiNum": "1",
            "JissiDate": null,
            "HiroenEnkaijo": null,
            "Name": null,
            "NameKana": null,
            "Tel": null,
            "Kankei": null
          },
          {
            "PrimaryId": null,
            "ReservationDate": null,
            "KbnName": null,
            "CustName": null,
            "CustNameKana": null,
            "CustCompanyName": null,
            "CustBusyoName": null,
            "CustTel": null,
            "ReservationNum": "",
            "EnkaiSyusaiName": "柏田家・江口家ｱﾌﾀｰﾊﾟｰﾃｨ",
            "EnkaiSyusaiNameKana": null,
            "EnkaiSyusaiTel": "0466-44-2709",
            "EnkaiName": "柏田家・江口家ｱﾌﾀｰﾊﾟｰﾃｨ",
            "EnkaiDate": "2003/02/22",
            "EnkaiNum": "1",
            "JissiDate": null,
            "HiroenEnkaijo": null,
            "Name": null,
            "NameKana": null,
            "Tel": null,
            "Kankei": null
          },
        ]
        // 修改时从前页传过来的全部信息
        if (localStorage.setInfoType === '2') {
          this.inputInfo = JSON.parse(localStorage.getItem('scheduleInfo'))
          this.CustTel = this.inputInfo.CustTel
          this.CustCompanyName = this.inputInfo.CustCompanyName
          this.CustName = this.inputInfo.CustName
        }

      },
      login() {
        this.modalOptions.show = true
        this.modalMsg = '登録してよろしいでしょうか？'
      },
      sign() {
        this.modalOptions.show = true
        this.modalMsg = '台帳に戻ってよろしいでしょうか？'
        this.modalStatus = 2
      },
      cancel() {
        this.modalOptions.show = true
        this.modalMsg = '予約をキャンセルしてよろしいでしょうか？'
      },
      delReserve() {
        this.modalOptions.show = true
        this.modalMsg = '予約データを削除してよろしいでしょうか？'
      },
      doConfirm() {
        if (this.modalStatus === 1) {
          console.log('接口：保存')
        } else if (this.modalStatus === 2) {
          this.$router.push('calendar')
        }
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
        })
      },
      chooseDate(e, date) {
        this.clickDate = date
        this.calendarShow = false
      },
      chooseDate2(e, item) {
        console.log(item.date)
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style lang="scss">
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

  .container {
    transform: scale(.75);
    margin: -140px auto;
    display: flex;
    flex-wrap: wrap;
    width: 90vw;
    max-width: 1200px;
    background: url('../assets/img/info-bg.png') no-repeat;
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
          font-size: 20px;
          margin-bottom: 10px;
          color: #142343;
        }
        .group1 {
          margin-bottom: 30px;
        }
      }
      .info {
        display: flex;
        flex-wrap: wrap;
        > div {
          margin-bottom: 20px;
        }
        .el-input {
          width: 240px;
        }
      }
      .name-wrap {
        margin-left: 10px;
      }
      .remark {
        .el-checkbox {
          .el-checkbox__label {
            font-size: 18px;
          }
        }
      }
    }

  }

  .calendar-container {
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

  .font-bold {
    font-weight: bold;
  }

  @media screen and(max-width: 1250px) {
    .container .tab .name-wrap {
      margin-left: 0;
    }
  }

  @media screen and(max-width: 750px) {
    .container {
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
    .calendar-container {
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
    .container .tab .info {
    }
    .container .tab .name-wrap {
      margin-left: 0;
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
