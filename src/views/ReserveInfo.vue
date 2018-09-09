<template>
  <div class="unified-bg" v-loading="loading || loading2">
    <app-header/>
    <div class="container">
      <div class="inner-left">
        <div v-if="setInfoType === '1' ? false : true" class="tab sel-date">
          <div class="tab-title pull-left mr30">
            <span class="title-line"></span>
            <span class="title-txt">予約日</span>
          </div>
          <div class="pull-left">
            <el-input v-model="inputInfo.ReservationDate" class="mr30"/>
            <el-button class="remarks-btn" type="primary" @click="calendarShow = true">予約日変更</el-button>
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
              <el-time-select class="mb20"
                              v-model="inputInfo.StartTime"
                              :picker-options="{
                        start: inputInfo.StartTime ? inputInfo.StartTime : '00:00',
                        step: '00:30',
                        end: inputInfo.EndTime ? inputInfo.EndTime : '24:00'
                      }"
                              placeholder="">
              </el-time-select>
              <div class="inner-txt">TEL</div>
              <el-autocomplete
                      popper-class="my-autocomplete"
                      v-model="inputInfo.CustTel"
                      :fetch-suggestions="querySearchTel"
                      placeholder="内容を入力してください"
                      @select="handleSelect">
                <template slot-scope="{ item }">
                  <app-info :item="item"/>
                </template>
              </el-autocomplete>
              <div class="info" style="margin-top: 20px">
                <div class="">
                  <div class="inner-txt">法人・団体名</div>
                  <el-autocomplete
                          popper-class="my-autocomplete"
                          v-model="inputInfo.CustCompanyName"
                          :fetch-suggestions="querySearchCompany"
                          placeholder="内容を入力してください"
                          @select="handleSelect">
                    <template slot-scope="{ item }">
                      <app-info :item="item"/>
                    </template>
                  </el-autocomplete>
                </div>
                <div class="name-wrap">
                  <div class="inner-txt">部署名</div>
                  <el-input v-model="inputInfo.CustBusyoName"/>
                </div>
              </div>
              <div class="info">
                <div class="">
                  <div class="inner-txt">予約者</div>
                  <el-autocomplete
                          popper-class="my-autocomplete"
                          v-model="inputInfo.CustName"
                          :fetch-suggestions="querySearchName"
                          placeholder="内容を入力してください"
                          @select="handleSelect">
                    <template slot-scope="{ item }">
                      <app-info :item="item"/>
                    </template>
                  </el-autocomplete>
                </div>
                <div class="name-wrap">
                  <div class="inner-txt">ふりがな</div>
                  <el-autocomplete
                          popper-class="my-autocomplete"
                          v-model="inputInfo.CustNameKana"
                          :fetch-suggestions="querySearchName2"
                          placeholder="内容を入力してください"
                          @select="handleSelect">
                    <template slot-scope="{ item }">
                      <app-info :item="item"/>
                    </template>
                  </el-autocomplete>
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
                <el-input v-model="inputInfo.AdultNum" class="mr30"/>
              </div>
              <div class="name-wrap">
                <div class="inner-txt">子供人数</div>
                <el-input v-model="inputInfo.ChildNum"/>
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
            <el-date-picker
                    v-model="inputInfo.UketukeDate"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                    placeholder="日付選択">
            </el-date-picker>
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
                <el-input v-model="inputInfo.EnkaiNum" class="mr30"/>
              </div>
              <div class="pull-left">
                <div class="inner-txt">法人レストラン履</div>
                <el-input v-model="inputInfo.CompanyReservationNum"/>
              </div>
            </div>
            <div class="info">
              <div class="pull-left">
                <div class="inner-txt">結婚式</div>
                <el-date-picker
                        v-model="inputInfo.KonreiJissidate"
                        type="date"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        placeholder="日付選択">
                </el-date-picker>
              </div>
              <div class="pull-left">
                <div class="inner-txt">個人レストラン履</div>
                <el-input v-model="inputInfo.ReservationNum"/>
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
              <el-checkbox class="font-small" label="強調" name="type" v-model="inputInfo.RyouriRemarke" true-label="1"
                           false-label="0"/>
            </div>
            <el-input class="mb30" type="textarea" v-model="inputInfo.RyouriRemark"/>
            <div class="inner-txt mb20 flex-center">シチュエーション
              <el-checkbox class="font-small" label="強調" name="type" v-model="inputInfo.SituationRemarke" true-label="1"
                           false-label="0"/>
            </div>
            <el-input type="textarea" class="mb30" v-model="inputInfo.SituationRemark"/>
            <div class="inner-txt mb20 flex-center">その他備考
              <el-checkbox class="font-small" label="強調" name="type" v-model="inputInfo.OthersRemarke" true-label="1"
                           false-label="0"/>
            </div>
            <el-input type="textarea" class="mb30" v-model="inputInfo.OthersRemark"/>
          </div>
        </div>
      </div>
      <div class="opr-btns">
        <el-button class="remarks-btn" type="primary" @click="setInfo">登録</el-button>
        <el-button class="remarks-btn" plain @click="toPre">戻る</el-button>
        <el-button v-if="setInfoType === '1' ? false : true" class="remarks-btn" plain @click="cancelSet">予約ＣＸＬ
        </el-button>
        <el-button v-if="setInfoType === '1' ? false : true" class="remarks-btn" plain @click="deleteSet">データ削除
        </el-button>
      </div>
    </div>
    <div v-if="calendarShow" class="calendar-container">
      <a @click="calendarShow = false" class="xd xd-close">close</a>
      <app-calendar :events="eventsData"
                    :dateItemRender="itemRender"
                    :startWeek="0"
                    @date-click="chooseDate"
                    @event-click="chooseDate2"/>
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
  import AppCalendar from '../components/AppCalendar'
  import AppInfo from '../components/AppInfo'
  import {getTimeList} from '../utils/func'

  export default {
    data() {
      return {
        loading: true,
        loading2: false,
        setInfoType: localStorage.setInfoType, // 提交状态 1新增 2修改
        // 下拉框
        fieldOptions: [],
        tableOptions: [],
        typeOptions: [],
        foodOptions: [],
        ownerOptions: [],
        filterOptionsData: [],
        // 表单信息
        oldInfo: {
          CustTel: '', // 电话
          CustCompanyName: '', // 法人团体名
          CustName: '', // 预约人姓名
          CustNameKana: '', // 预约人日文发音
        },
        suggestArr: [],
        inputInfo: {
          ReservationCode: '', // 日期编码
          ReservationDate: localStorage.getItem('clickDate'), // 日期
          TimeKbn: localStorage.getItem('mealsType'), // 预定时间段
          KbnName: '', // 区分
          StartTime: '', // 时间
          EndTime: '', // 时间
          CustName: '', // 预约人姓名
          CustNameKana: '', // 预约人日文发音
          CustCompanyName: '', // 法人团体名
          CustBusyoName: '', // 公司部门名
          CustTel: '', // 电话
          AdultNum: '', // 大人数
          ChildNum: '', // 小孩数
          OwnerName: '', // 担当人信息
          UketukeDate: '', // 预订提交日期
          VisitingPlace: '', // 预定地点
          MenuName: '', // 料理
          KaijoName: '', // 会场
          TableNo: '', // 桌号
          RyouriRemark: '', // 料理备注
          SituationRemark: '', // 情况备注
          OthersRemark: '', // 其他备注
          RyouriRemarke: '', // 料理备注勾选 1选中
          SituationRemarke: '', // 情况备注勾选 1选中
          OthersRemarke: '', // 其他备注勾选 1选中
          EnkaiNum: '', // 宴会次数
          KonreiJissidate: '', // 婚礼日期
          ReservationNum: '', // 个人餐厅预约次数
          CompanyReservationNum: '', // 法人餐厅预约次数
          ActiveFlg: "", // 状态 0 取消或删除 “1”=取消 “2”=删除
        },
        // 模态框
        modalMsg: '',
        modalStatus: 1,
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
        // 日历
        calendarShow: false,
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
      AppCalendar,
      AppInfo
    },
    computed: {
      eventsData() {
        let arr = this.$store.state.calendarDataOne.filter(item => item.TimeKbn === localStorage.mealsType)
        return arr
      },
    },
    methods: {
      getData() {
        // 获取下拉框信息
        this.getSelectInfo()
        // 如果为修改
        if (this.setInfoType === '2') {
          // 获取上一页信息
          this.inputInfo = JSON.parse(localStorage.getItem('scheduleInfo'))
          this.oldInfo.CustTel = this.inputInfo.CustTel
          this.oldInfo.CustCompanyName = this.inputInfo.CustCompanyName
          this.oldInfo.CustName = this.inputInfo.CustName
          this.oldInfo.CustNameKana = this.inputInfo.CustNameKana
          // 获取日历
          this.loading = true
          this.axios.post('calendar/getcalendarinfo').then(res => {
            if (res.data.Code === "SC-001") {
              this.loading = false
              this.$store.dispatch('setCalendarData', res.data.Data)
              const data = res.data.Data.filter((item) => {
                const date = new Date()
                const year = date.getFullYear()
                const month = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
                return item.DailyDate.indexOf(year + '/' + month) > -1
              })
              this.$store.dispatch('setCalendarDataOne', data)
            } else {
              this.$message.error(res.data.Message)
            }
          })
          // 时间
          this.axios.post('setting/starttime', {
            DailyDate: localStorage.getItem('clickDate'),
            TimeKbn: localStorage.getItem('mealsType')
          }).then(res => {
            if (res.data.Code === "SC-001") {
              this.inputInfo.StartTime = res.data.Data[0].SrartTime
              this.inputInfo.EndTime = res.data.Data[0].EndTime
            } else {
              this.$message.error(res.data.Message)
            }
          })
        }
      },
      getSelectInfo() {
        // 会场
        this.axios.post('master/getkaijo').then(res => {
          if (res.data.Code === "SC-001") {
            this.fieldOptions = res.data.Data
          } else {
            this.$message.error(res.data.Message)
          }
        })
        // 桌号
        this.axios.post('master/gettable').then(res => {
          if (res.data.Code === "SC-001") {
            this.tableOptions = res.data.Data
          } else {
            this.$message.error(res.data.Message)
          }
        })
        // 区分
        this.axios.post('master/getkbn').then(res => {
          if (res.data.Code === "SC-001") {
            this.typeOptions = res.data.Data
          } else {
            this.$message.error(res.data.Message)
          }
        })
        // 料理
        this.axios.post('master/getmenu').then(res => {
          if (res.data.Code === "SC-001") {
            this.foodOptions = res.data.Data
          } else {
            this.$message.error(res.data.Message)
          }
        })
        // 所有者信息
        this.axios.post('master/getowner').then(res => {
          if (res.data.Code === "SC-001") {
            this.loading = false
            this.ownerOptions = res.data.Data
          } else {
            this.$message.error(res.data.Message)
          }
        })
        // 获取推荐信息
//        this.axios.post('reservation/suggestdata').then(res => {
//          if (res.data.Code === "SC-001") {
//            this.loading2 = false
//            this.filterOptionsData = res.data.Data
//          } else {
//            this.$message.error(res.data.Message)
//          }
//        })
      },
      setInfo() {
        this.modalOptions.show = true
        this.modalMsg = '登録してよろしいでしょうか？'
        this.modalStatus = 1
      },
      toPre() {
        this.modalOptions.show = true
        this.modalMsg = this.setInfoType === '1' ? '入力情報は登録されていません。一覧画面に戻ってよろしいでしょうか？' : '台帳に戻ってよろしいでしょうか？'
        this.modalStatus = 2
      },
      cancelSet() {
        this.modalOptions.show = true
        this.modalMsg = '予約をキャンセルしてよろしいでしょうか？'
        this.modalStatus = 3
      },
      deleteSet() {
        this.modalOptions.show = true
        this.modalMsg = '予約データを削除してよろしいでしょうか？'
        this.modalStatus = 4
      },
      doConfirm() {
        if (this.modalStatus === 1) {
          console.log('接口：保存')
          this.loading = true
          this.inputInfo.ActiveFlg = '0'
          this.axios.post('reservation/updatereservation', this.inputInfo).then(res => {
            this.loading = false
            if (res.data.Code === "SC-001") {
              this.modalOptions.show = false
              this.modalOptions2.show = true
              this.modalMsg2 = '登録は成功しました'
            } else {
              this.$message.error(res.data.Message)
            }
          })
        } else if (this.modalStatus === 2) {
          this.$router.push('schedule')
        } else if (this.modalStatus === 3) {
          console.log('接口：取消')
          this.loading = true
          this.inputInfo.ActiveFlg = '1'
          this.axios.post('reservation/updatereservation', this.inputInfo).then(res => {
            this.loading = false
            if (res.data.Code === "SC-001") {
              this.modalOptions.show = false
              this.modalOptions2.show = true
              this.modalMsg2 = '予約をキャンセルしました'
            } else {
              // this.modalOptions.show = false
              // this.modalOptions2.show = true
              // this.modalMsg2 = '問題が発生しました。システム管理者へ連絡してください'
              this.$message.error(res.data.Message)
            }
          })
        } else if (this.modalStatus === 4) {
          console.log('接口：删除')
          this.loading = true
          this.inputInfo.ActiveFlg = '2'
          this.axios.post('reservation/updatereservation', this.inputInfo).then(res => {
            this.loading = false
            if (res.data.Code === "SC-001") {
              this.modalOptions.show = false
              this.modalOptions2.show = true
              this.modalMsg2 = '予約データを削除しました'
            } else {
              // this.modalOptions.show = false
              // this.modalOptions2.show = true
              // this.modalMsg2 = '問題が発生しました。システム管理者へ連絡してください'
              this.$message.error(res.data.Message)
            }
          })
        }
      },
      doConfirm2() {
        this.$router.push('calendar')
      },
      chooseDate(e, date) {
        this.inputInfo.ReservationDate = date.replace(/-/g, '/')
        this.calendarShow = false
      },
      chooseDate2(e, item) {
        this.inputInfo.ReservationDate = item.DailyDate.replace(/-/g, '/')
        this.calendarShow = false
      },
      handleSelect(item) {
        console.log(item)
        this.inputInfo.CustTel = item.CustTel ? item.CustTel :
          (item.EnkaiSyusaiTel ? item.EnkaiSyusaiTel :
            (item.Tel ? item.Tel : ''))
        this.inputInfo.CustCompanyName = item.CustCompanyName ? item.CustCompanyName :
          (item.EnkaiSyusaiName ? item.EnkaiSyusaiName : '')
        this.inputInfo.CustName = item.CustName ? item.CustName :
          (item.Name ? item.Name : '')
        this.inputInfo.CustNameKana = item.CustNameKana ? item.CustNameKana :
          (item.EnkaiSyusaiNameKana ? item.EnkaiSyusaiNameKana :
            (item.NameKana ? item.NameKana : ''))
        this.inputInfo.CustBusyoName = item.CustBusyoName

        this.inputInfo.EnkaiNum = item.EnkaiNum
        this.inputInfo.JissiDate = item.JissiDate
        if (item.CustCompanyName || item.EnkaiSyusaiName) {
          this.inputInfo.CompanyReservationNum = item.ReservationNum
        } else {
          this.inputInfo.ReservationNum = item.ReservationNum
        }
      },
      querySearchTel(queryString, cb) {
//        let arr = this.filterOptionsData
//        let results = arr.filter(this.createFilterTel(queryString))
//        // 调用 callback 返回建议列表的数据
//        cb(results.slice(0, 10))
        if (queryString != this.oldInfo.CustTel) {
          this.axios.post('reservation/suggestdata', {
            CustTel: queryString,
            CustCompanyName: this.inputInfo.CustCompanyName,
            CustName: this.inputInfo.CustName,
            CustNameKana: this.inputInfo.CustNameKana,
          }).then(res => {
            if (res.data.Code === "SC-001") {
              this.suggestArr = res.data.Data
              this.oldInfo.CustTel = this.inputInfo.CustTel
              this.oldInfo.CustCompanyName = this.inputInfo.CustCompanyName
              this.oldInfo.CustName = this.inputInfo.CustName
              this.oldInfo.CustNameKana = this.inputInfo.CustNameKana
              cb(res.data.Data)
            } else {
              this.$message.error(res.data.Message)
            }
          })
        } else {
          cb(this.suggestArr)
        }
      },

      querySearchCompany(queryString, cb) {
//        let arr = this.filterOptionsData
//        let results = arr.filter(this.createFilterCompany(queryString))
//        // 调用 callback 返回建议列表的数据
//        cb(results.slice(0, 10))
        if (queryString != this.oldInfo.CustCompanyName) {
          this.axios.post('reservation/suggestdata', {
            CustCompanyName: queryString,
            CustTel: this.inputInfo.CustTel,
            CustName: this.inputInfo.CustName,
            CustNameKana: this.inputInfo.CustNameKana,
          }).then(res => {
            if (res.data.Code === "SC-001") {
              this.suggestArr = res.data.Data
              this.oldInfo.CustTel = this.inputInfo.CustTel
              this.oldInfo.CustCompanyName = this.inputInfo.CustCompanyName
              this.oldInfo.CustName = this.inputInfo.CustName
              this.oldInfo.CustNameKana = this.inputInfo.CustNameKana
              cb(res.data.Data)
            } else {
              this.$message.error(res.data.Message)
            }
          })
        } else {
          cb(this.suggestArr)
        }
      },

      querySearchName(queryString, cb) {
//        let arr = this.filterOptionsData
//        let results = arr.filter(this.createFilterName(queryString))
//        // 调用 callback 返回建议列表的数据
//        cb(results.slice(0, 10))
        if (queryString != this.oldInfo.CustName) {
          this.axios.post('reservation/suggestdata', {
            CustName: queryString,
            CustTel: this.inputInfo.CustTel,
            CustCompanyName: this.inputInfo.CustCompanyName,
            CustNameKana: this.inputInfo.CustNameKana,
          }).then(res => {
            if (res.data.Code === "SC-001") {
              this.suggestArr = res.data.Data
              this.oldInfo.CustTel = this.inputInfo.CustTel
              this.oldInfo.CustCompanyName = this.inputInfo.CustCompanyName
              this.oldInfo.CustName = this.inputInfo.CustName
              this.oldInfo.CustNameKana = this.inputInfo.CustNameKana
              cb(res.data.Data)
            } else {
              this.$message.error(res.data.Message)
            }
          })
        } else {
          cb(this.suggestArr)
        }
      },

      querySearchName2(queryString, cb) {
//        let arr = this.filterOptionsData
//        let results = arr.filter(this.createFilterName2(queryString))
//        // 调用 callback 返回建议列表的数据
//        cb(results.slice(0, 10))
        if (queryString != this.oldInfo.CustNameKana) {
          this.axios.post('reservation/suggestdata', {
            CustNameKana: queryString,
            CustTel: this.inputInfo.CustTel,
            CustName: this.inputInfo.CustName,
            CustCompanyName: this.inputInfo.CustCompanyName,
          }).then(res => {
            if (res.data.Code === "SC-001") {
              this.suggestArr = res.data.Data
              this.oldInfo.CustTel = this.inputInfo.CustTel
              this.oldInfo.CustCompanyName = this.inputInfo.CustCompanyName
              this.oldInfo.CustName = this.inputInfo.CustName
              this.oldInfo.CustNameKana = this.inputInfo.CustNameKana
              cb(res.data.Data)
            } else {
              this.$message.error(res.data.Message)
            }
          })
        } else {
          cb(this.suggestArr)
        }
      },
      createFilterTel(queryString) {
        return (item) => {
          return (
              (String(item.CustTel).indexOf(String(queryString)) > -1)
              || (String(item.EnkaiSyusaiTel).indexOf(String(queryString)) > -1)
              || (String(item.Tel).indexOf(String(queryString)) > -1)
            )
            && (
              (String(item.CustCompanyName).indexOf(String(this.inputInfo.CustCompanyName)) > -1)
              || (String(item.EnkaiSyusaiName).indexOf(String(this.inputInfo.CustCompanyName)) > -1)
            )
            && (
              (String(item.CustName).indexOf(String(this.inputInfo.CustName)) > -1)
              || (String(item.Name).indexOf(String(this.inputInfo.CustName)) > -1)
            )
            && (
              (String(item.CustNameKana).indexOf(String(this.inputInfo.CustNameKana)) > -1)
              || (String(item.EnkaiSyusaiNameKana).indexOf(String(this.inputInfo.CustNameKana)) > -1)
              || (String(item.NameKana).indexOf(String(this.inputInfo.CustNameKana)) > -1)
            )
        }
      },
      createFilterCompany(queryString) {
        return (item) => {
          return (
              (String(item.CustCompanyName).indexOf(String(queryString)) > -1)
              || (String(item.EnkaiSyusaiName).indexOf(String(queryString)) > -1)
            )
            && (
              (String(item.CustTel).indexOf(String(this.inputInfo.CustTel)) > -1)
              || (String(item.EnkaiSyusaiTel).indexOf(String(this.inputInfo.CustTel)) > -1)
              || (String(item.Tel).indexOf(String(this.inputInfo.CustTel)) > -1)
            )
            && (
              (String(item.CustName).indexOf(String(this.inputInfo.CustName)) > -1)
              || (String(item.Name).indexOf(String(this.inputInfo.CustName)) > -1)
            )
            && (
              (String(item.CustNameKana).indexOf(String(this.inputInfo.CustNameKana)) > -1)
              || (String(item.EnkaiSyusaiNameKana).indexOf(String(this.inputInfo.CustNameKana)) > -1)
              || (String(item.NameKana).indexOf(String(this.inputInfo.CustNameKana)) > -1)
            )
        }
      },
      createFilterName(queryString) {
        return (item) => {
          return (
              (String(item.CustName).indexOf(String(queryString)) > -1)
              || (String(item.Name).indexOf(String(queryString)) > -1)
            )
            && (
              (String(item.CustCompanyName).indexOf(String(this.inputInfo.CustCompanyName)) > -1)
              || (String(item.EnkaiSyusaiName).indexOf(String(this.inputInfo.CustCompanyName)) > -1)
            )
            && (
              (String(item.CustTel).indexOf(String(this.inputInfo.CustTel)) > -1)
              || (String(item.EnkaiSyusaiTel).indexOf(String(this.inputInfo.CustTel)) > -1)
              || (String(item.Tel).indexOf(String(this.inputInfo.CustTel)) > -1)
            )
            && (
              (String(item.CustNameKana).indexOf(String(this.inputInfo.CustNameKana)) > -1)
              || (String(item.EnkaiSyusaiNameKana).indexOf(String(this.inputInfo.CustNameKana)) > -1)
              || (String(item.NameKana).indexOf(String(this.inputInfo.CustNameKana)) > -1)
            )
        }
      },
      createFilterName2(queryString) {
        return (item) => {
          return (
              (String(item.CustNameKana).indexOf(String(queryString)) > -1)
              || (String(item.EnkaiSyusaiNameKana).indexOf(String(queryString)) > -1)
              || (String(item.NameKana).indexOf(String(queryString)) > -1)
            )
            && (
              (String(item.CustCompanyName).indexOf(String(this.inputInfo.CustCompanyName)) > -1)
              || (String(item.EnkaiSyusaiName).indexOf(String(this.inputInfo.CustCompanyName)) > -1)
            )
            && (
              (String(item.CustTel).indexOf(String(this.inputInfo.CustTel)) > -1)
              || (String(item.EnkaiSyusaiTel).indexOf(String(this.inputInfo.CustTel)) > -1)
              || (String(item.Tel).indexOf(String(this.inputInfo.CustTel)) > -1)
            )
            && (
              (String(item.CustName).indexOf(String(this.inputInfo.CustName)) > -1)
              || (String(item.Name).indexOf(String(this.inputInfo.CustName)) > -1)
            )
        }
      },
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
    margin: 20px auto;
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
        font-size: 20px;
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
        }
      }
      .tab-inner {
        .sel-week .el-checkbox {
          border: 1px solid #ddd;
          box-shadow: 1px 1px 1px #ddd;
          padding: 15px 20px;
          span.el-checkbox__label {
            font-size: 20px;
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
          font-size: 18px;
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
          margin: 0 10px 20px 0;
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
