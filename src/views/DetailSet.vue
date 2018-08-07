<template>
    <div class="unified-bg">
        <app-header :btnShow="false"></app-header>
        <div class="contianer">
            <div class="tab sel-date">
                <div class="tab-title pull-left mr30">
                    <span class="title-line"></span>
                    <span class="title-txt">予約日</span>
                </div>
                <div class="pull-left">
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="tab">
                <div class="tab-title">
                    <span class="title-line"></span>
                    <span class="title-txt">营业</span>
                </div>
                <div class="tab-inner">
                    <el-checkbox-group class="sel-week" v-model="checkList">
                        <el-checkbox label="营业日"></el-checkbox>
                        <el-checkbox label="定休日"></el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="tab">
                <div class="tab-title">
                    <span class="title-line"></span>
                    <span class="title-txt">起止时间</span>
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
                    </div>
                </div>
            </div>
            <div class="tab">
                <div class="tab-title">
                    <span class="title-line"></span>
                    <span class="title-txt">预定标准</span>
                </div>
                <div class="tab-inner">
                    <div class="inner-txt">混雑基準</div>
                    <div class="group-input group1">
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                        <span class="ml12 mr24">组以上</span>
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                        <span class="ml12">人以上</span>
                    </div>
                    <div class="inner-txt">混雑基準</div>
                    <div class="group-input">
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                        <span class="ml12 mr24">组以上</span>
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                        <span class="ml12">人以上</span>
                    </div>
                </div>
            </div>
            <div class="tab">
                <div class="tab-title">
                    <span class="title-line"></span>
                    <span class="title-txt">予约可否</span>
                </div>
                <div class="tab-inner">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="空席有"></el-checkbox>
                        <el-checkbox label="混雑"></el-checkbox>
                        <el-checkbox label="満席"></el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="opr-btns pull-right">
                <el-button class="remarks-btn" type="primary" @click="setInfo">登録</el-button>
                <el-button class="remarks-btn" plain  @click="toPre">戻る</el-button>
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
      value: "",
      options: [],
      value1: "",
      input: "",
      modalStatus: 1,
      modalMsg: "",
      modalOptions: {
        show: false,
        title: " ",
        showCancelButton: true,
        cancelButtonText: "取消",
        showConfirmButton: true,
        confirmButtonText: "確認"
      }
    };
  },
  components: {
    AppModal,
    AppHeader
  },
  computed: {},
  methods: {
    setInfo() {
      this.modalOptions.show = true;
      this.modalMsg = "登録してよろしいでしょうか？";
      this.modalStatus = 1;
    },
    toPre() {
      this.modalOptions.show = true;
      this.modalMsg = "台帳に戻ってよろしいでしょうか？";
      this.modalStatus = 2;
    },
    doConfirm() {
      if (this.modalStatus === 1) {
        console.log("接口：保存");
      } else if (this.modalStatus === 2) {
        this.$router.push("calendar");
      }
    }
  }
};
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
.contianer {
  width: 980px;
  margin: 60px auto;
  background-color: #fff;
  padding: 60px 30px 150px 30px;
  .sel-date {
    height: 42px;
  }
  .tab {
    margin-bottom: 30px;
    .group-input .el-input {
      width: 240px;
    }
    .tab-title {
      margin-bottom: 30px;
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
    .mr30 {
        margin-right: 30px;
    }
    .contianer {
        background: url('../assets/img/set-bg.png') no-repeat;
        width: 980px;
        margin: 60px auto;
        background-color: #fff;
        padding: 60px 30px 150px 30px;
        .sel-date {
            height: 42px;
        }
      }
      .time-line {
        width: 1px;
        height: 100%;
        background-color: #ddd;
        margin: 0 30px;
      }
      .time-wrap {
        height: 85px;
      }
      .group-input .el-input {
        width: 240px;
      }
      .inner-txt {
        font-size: 24px;
        margin-bottom: 18px;
        color: #142343;
      }
      .group1 {
        margin-bottom: 30px;
      }
    }
  }
  .opr-btns {
    height: 46px;
    margin-top: 30px;
    button {
      margin-left: 30px;
      padding: 15px 91px;
    }
  }
</style>
