<template>
  <div class="unified-bg">
    <app-header></app-header>
    <div class="container-b">
      <div class="remarks">
        <div class="add-btn" v-if="Date.parse(new Date(new Date().setHours(0,0,0,0))) <= Date.parse(new Date(clickDate))" @click="showModal">
          新規登録
        </div>
        <el-input  v-loading="loading"
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
      <div class="table-container" v-loading="loading2">
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
          <tr :class="item.ActiveFlg === '1' ? 'tr-disabled': (item.ActiveFlg === '2' ? 'tr-hidden': '')">
            <td>{{ item.KaijoName }}</td>
            <td>{{ item.CustCompanyName }}</td>
            <td>{{ item.KbnName }}</td>
            <td>{{ item.MenuName }}</td>
            <td class="longer-td">{{ item.RyouriRemark }}</td>
            <td class="longer-td">{{ item.SituationRemark }}</td>
            <td>{{ item.UketukeDate }}</td>
            <td><span class="color-btn" :class="(item.EnkaiNum)? 'blue' : 'gray'">宴</span></td>
            <td class="long-td">{{ item.EnkaiNum }}</td>
            <td>
              <el-button size="mini" plain @click="toEdit(item)">修正</el-button>
            </td>
          </tr>
          <tr :class="item.ActiveFlg === '1' ? 'tr-disabled': (item.ActiveFlg === '2' ? 'tr-hidden': '')">
            <td>{{ item.StartTime }}</td>
            <td>{{ item.CustName }}({{ item.CustNameKana}})</td>
            <td>{{ item.AdultNum }}<span v-if="item.ChildNum && item.ChildNum !== '0'">({{ item.ChildNum }})</span></td>
            <td>{{ item.CustTel }}</td>
            <td colspan="2" class="longer-td">{{ item.OthersRemark }}</td>
            <td>{{ item.OwnerName }}</td>
            <td><span class="color-btn" :class="item.KonreiNum ? '' : 'gray'">婚</span></td>
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
        loading: true,
        loading2: true,
        tableInfo: [],
        canILeave: false, // 能否进行路有跳转
        toName: '', // 路由将要跳转的地址
        clickDate: localStorage.getItem('clickDate'),
        // modal相关
        modalStatus: localStorage.getItem('mealsStatus'),
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
        this.axios.post('setting/getdailyInfo',{
          DailyDate: localStorage.getItem('clickDate'),
          TimeKbn: localStorage.getItem('mealsType')
        }).then(res=>{

          if(res.data.Code === "SC-001") {
            this.loading = false
            this.oldRemarks = res.data.Data[0].DailyMessage
            this.remarks = res.data.Data[0].DailyMessage
          }else {
            this.$message.error(res.data.Message)
          }
        })
        //  调用获取表格信息接口
        this.axios.post('reservation/reservationdata',{
          DailyDate: localStorage.getItem('clickDate'),
          TimeKbn: localStorage.getItem('mealsType')
        }).then(res=>{

          if(res.data.Code === "SC-001") {
            this.loading2 = false
            this.tableInfo = res.data.Data
          }else {
            this.$message.error(res.data.Message)
          }
        })
      },
      showModal() {
        if (this.modalStatus === "0") {
          localStorage.setItem('setInfoType', '1')
          localStorage.setItem('scheduleInfo','')
          this.$router.push('reserveInfo')
        } else if (this.modalStatus === "1") {
          this.modalOptions.show = true
          this.modalMsg = '混雑条件以上入っています！'
        } else if (this.modalStatus === "2") {
          this.modalOptions.show = true
          this.modalMsg = '満席条件以上入っています！'
        }
      },
      toAdd() {
        localStorage.setItem('setInfoType', '1')
        localStorage.setItem('scheduleInfo','')
        this.$router.push('reserveInfo')
      },
      toEdit(item) {
        localStorage.setItem('setInfoType', '2')
        localStorage.setItem('scheduleInfo',JSON.stringify(item))
        this.$router.push('reserveInfo')
      },
      saveAndLeave() {
        console.log('保存备注')
        if(this.remarks.length > 500) {
          this.$message.error('500文字以内で入力してください')
          this.leaveModalOptions.show = false
        }else {
          this.axios.post('setting/updatedailymessage',{
            DailyDate: localStorage.getItem('clickDate'),
            DailyMessage: this.remarks
          }).then(res=>{
            if(res.data.Code === "SC-001") {
              this.canILeave = true
              this.$router.push(this.toName)
            }else {
              this.$message.error(res.data.Message)
            }
          })
        }
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
        .tr-hidden {
          display: none;
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
        .longer-td {
          word-break:break-all;
          width: 15%;
          max-width: 500px;
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
