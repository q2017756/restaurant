<template>
  <div class="unified-bg">
    <app-header :btnShow="$store.isRoot"></app-header>
    <div class="container-b">
      <div class="remarks">
        <div class="add-btn" @click="showModal">
          <!--<img src="../assets/img/add.png" alt="">-->
          新規登録
        </div>
        <el-input
                class="remarks-content"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"
                placeholder="当日備考"
                v-model="remarks">
        </el-input>
        <div class="btn-container">
          <el-button class="remarks-btn" size="mini" plain>料理MENU</el-button>
          <el-button class="remarks-btn" size="mini" plain>ドリンクMENU</el-button>
          <el-button class="remarks-btn" size="mini" plain>その他資料</el-button>
        </div>
      </div>
      <div class="table-container">
        <table>
          <thead>
          <tr>
            <th>会場名</th>
            <th>法人・団体名</th>
            <th>区分</th>
            <th>お料理</th>
            <th>料理詳細</th>
            <th>シチュエーション</th>
            <th>受日</th>
            <th colspan="2">宴会・法人履歴</th>
            <th>修正</th>
          </tr>
          <tr>
            <th>時間</th>
            <th>ご予約者名（フリガナ）</th>
            <th>人数（子供）</th>
            <th>TEL</th>
            <th colspan="2">その他備考</th>
            <th>受者</th>
            <th colspan="2">婚礼・個人履歴</th>
            <th></th>
          </tr>
          </thead>
          <tbody v-for="item in tableInfo" :key="item.ReservationCode">
          <tr>
            <!--{{ item. }}-->
            <td>{{ item.KaijoName }}</td>
            <td>{{ item.CustCompanyName }}</td>
            <td>{{ item.KbnName }}</td>
            <td>{{ item.MenuName }}</td>
            <td>{{ item.RyouriRemark }}</td>
            <td>{{ item.SituationRemark }}</td>
            <td>{{ item.UkerukeDate }}</td>
            <td><span class="color-btn blue">宴</span></td>
            <td class="long-td">{{ item.EnkaiNum }}</td>
            <td>
              <el-button size="mini" plain @click="toEdit">修正</el-button>
            </td>
          </tr>
          <!--<tr class="tr-disabled">-->
          <tr>
            <td>{{ item.StartTime }}</td>
            <td>{{ item.CustName }}({{ item.CustNameKana}})</td>
            <td>{{ item.AdultNum }}({{ item.ChildNum }})</td>
            <td>{{ item.CustTel }}</td>
            <td colspan="2">{{ item.OthersRemark }}</td>
            <td>{{ item.OwnerName }}</td>
            <td><span class="color-btn">婚</span></td>
            <td class="long-td">{{ item.KonReiNum }}</td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <app-modal :options="modalOptions" v-show="modalOptions.show" @submit="toAdd">
      <div slot="body">
        <p class="model-body-txt">{{ modalMsg }}</p>
      </div>
    </app-modal>

    <app-modal :options="leaveModalOptions" v-show="leaveModalOptions.show" @submit="saveAndLeave">
      <div slot="body">
        <p class="model-body-txt">当日備考が修正されました。登録してよろしいでしょうか？</p>
      </div>
      <span slot="btn" @click="forceLeave">
                <a class="btn-cancel">いいえ</a>
            </span>
    </app-modal>
  </div>
</template>

<script>
  import AppModal from "../components/AppModal.vue"
  import AppHeader from "../components/AppHeader.vue"

  export default {
    data() {
      return {
        oldRemarks: '',
        remarks: '',
        tableInfo: [],
        canILeave: false, // 能否进行路有跳转
        toName: '', // 路由将要跳转的地址

        // modal相关
        modalStatus: 1,
        modalMsg: '',
        otherBtnShow: false,
        modalOptions: {
          show: false,
          title: ' ',
          showCancelButton: true,
          cancelButtonText: 'キャンセル',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        },
        leaveModalOptions: {
          show: false,
          title: ' ',
          showCancelButton: true,
          cancelButtonText: 'キャンセル',
          showConfirmButton: true,
          confirmButtonText: 'はい'
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
        //  调用获取备注接口
        const remarkInfo = {
          "DailyDate": "2017/11/21",
          "DailyMessage": "今天是个好日子，大家好好工作XXXXXXXXXXXXXXX",
        }
        this.oldRemarks = remarkInfo.DailyMessage
        this.remarks = remarkInfo.DailyMessage
        //  调用获取表格信息接口
        this.tableInfo = [
          {
            "ReservationCode": "20170214001",
            "ReservationDate": "2017/02/14",
            "TimeKbn": "1",
            "KbnName": "結婚記念日",
            "StartTime": "12：00",
            "EndTime": "14：00",
            "CustName": "黎汉",
            "CustNameKana": "レイハン",
            "CustCompanyName": "（DATAMAX）",
            "CustBusyoName": "（DATAMAX 本部）",
            "CustTel": "080-XXXX-XXXX",
            "AdultNum": "10",
            "ChildNum": "1",
            "OwnerName": "西村",
            "UkerukeDate": "2017/02/10",
            "VisitingPlace": "レストラン",
            "MenuName": "当日",
            "KaijoName": "１Fレストラン",
            "TableNo": "T-1-bis",
            "RyouriRemark": "不能吃香菜",
            "SituationRemark": "不要放香菜，小孩不能喝酒",
            "OthersRemark": "没了",
            "RyouriRemarke": "0",
            "SituationRemarke": "0",
            "OthersRemarke": "0",
            "KonReiNum": "1",
            "EnkaiNum": "6",
            "KonReiJissiDate": "2016/11/08",
            "ReservationNum": "10",
            "CompanyReservationNum": "10",
            "ActiveFlg": "0"
          },
          {
            "ReservationCode": "20170215002",
            "ReservationDate": "2017/02/15",
            "TimeKbn": "1",
            "KbnName": "結婚記念日",
            "StartTime": "13：00",
            "EndTime": "15：00",
            "CustName": "謝",
            "CustNameKana": "シャ",
            "CustCompanyName": "（DATAMAX）",
            "CustBusyoName": "（DATAMAX 本部）",
            "CustTel": "080-XXXX-XXXX",
            "AdultNum": "11",
            "ChildNum": "12",
            "OwnerName": "西村",
            "UkerukeDate": "2017/02/08",
            "VisitingPlace": "レストラン",
            "MenuName": "結納メニュー",
            "KaijoName": "１Fレストラン",
            "TableNo": "T-1-bis",
            "RyouriRemark": "不能吃肉",
            "SituationRemark": "不要放肉，小孩不能喝酒",
            "OthersRemark": "没了",
            "RyouriRemarke": "1",
            "SituationRemarke": "1",
            "OthersRemarke": "0",
            "KonReiNum": "1",
            "EnkaiNum": "10",
            "KonReiJissiDate": "2017/11/08",
            "ReservationNum": "10",
            "CompanyReservationNum": "10",
            "ActiveFlg": "0"
          }
        ]
      },
      showModal() {
        this.modalOptions.show = true
        if (this.modalStatus === 1) {
          this.modalMsg = '混雑条件以上なっています！'
        } else if (this.modalStatus === 2) {
          this.modalMsg = '満席条件以上入っています！'
        } else if (this.modalStatus === 3) {
          this.modalMsg = '満席条件以上入っています！'
        }
      },
      toAdd() {
        if (this.modalStatus === 1 || this.modalStatus === 2) {
          localStorage.setInfoType = 1
          this.$router.push('reserveInfo')
          localStorage.setItem('scheduleInfo','')
        }
      },
      toEdit() {
        localStorage.setInfoType = 2
        this.$router.push('reserveInfo')
        localStorage.setItem('scheduleInfo',JSON.stringify(this.tableInfo[0]))
      },
      saveAndLeave() {
        console.log('保存备注')
        this.canILeave = true
        this.$router.push(this.toName)
      },
      forceLeave() {
        console.log('不保存备注，强制离开')
        this.canILeave = true
        this.$router.push(this.toName)
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.remarks === this.oldRemarks) {
        next()
      } else {
        this.leaveModalOptions.show = true
        this.toName = to.name
        if (this.canILeave) {
          next()
        } else {
          next(false)
        }
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .container-b {
    width: 80vw;
    min-width: 1000px;
    margin: 60px auto;
  }

  .remarks {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .add-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 120px;
      background: #DED5A7;
      border: 1px solid #DED5A7;
      box-shadow: 2px 2px 10px 2px #666;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        box-shadow: 2px 2px 10px 0 #666;
      }
    }
    .remarks-content {
      width: 60%;
      height: 120px;
      font-size: 18px;
    }
    .btn-container {
      flex: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 120px;
    }
    .remarks-btn {
      width: 200px;
      margin-left: 30px;
      font-size: 18px;
    }
  }

  .table-container {

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: center;
      th {
        padding: 10px 0;
        border: 1px solid #fff;
        background: #DED5A7;
        color: #142343;
      }
      tbody {
        tr {
          background: #F9F9F9;
          &:nth-child(4n - 1), &:nth-child(4n) {
            background: #F0F0F0;
          }
        }
        .tr-disabled {
          opacity: 0.3;
        }
        td {
          width: 70px;
          padding: 10px 0;
          border: 1px solid #ddd;
          color: #142343;
        }
        .long-td {
          width: 100px;
        }
      }
    }

    .color-btn {
      display: inline-block;
      width: 60px;
      height: 30px;
      background: #F95F5A;
      border: 1px solid #F95F5A;
      border-radius: 10px;
      line-height: 30px;
      color: #fff;
      &.gray {
        background: #fff;
        border: 1px solid #ddd;
        color: #ddd;
      }
      &.blue {
        background: #39B5E2;
        border: 1px solid #39B5E2;
        color: #fff;
      }
    }
  }
</style>
