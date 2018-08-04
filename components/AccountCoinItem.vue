<template>
  <section class="coin-wapper">
      <div class="coin-operate">
        <button class="primary-btn" @click="rechargeHandle">增加</button>
        <button class="default-btn" @click="transferHandle">减少</button>
      </div>
      <FormModal :display="modalDisplayRearch" :close="toDisabledRearch" :width="600" :height="500">
        <div>充值</div>
      </FormModal>

      <FormModal :display="modalDisplayTransfer" :close="toDisabledTransfer" :width="350" :height="400">
        <div>划转</div>
      </FormModal>
  </section>
</template>
<script>
import FormModal from "~/components/FormModal.vue";

export default {
  props: ["coinType","legalTenderUsable","legalTenderFreeze","coinsCoinsUsable","coinsCoinsFreeze"],
  components: {
    FormModal
  },
  computed: {

  },
  created() {

  },
  data(){
    return {
      modalDisplayRearch:false,
      modalDisplayTransfer:false
    };
  },
  methods: {
    toDisabledRearch(){
      this.modalDisplayRearch = false;
    },
    toDisabledTransfer(){
      this.modalDisplayTransfer = false;
    },
    rechargeHandle(){
      this.modalDisplayRearch = true;
    },
    transferHandle(){
      this.modalDisplayTransfer = true;
      // const h = this.$createElement;
      // const message = h("div",null,[
      //   h("p", null, "提币请划转至币币交易账户"),
      //   h("p", null, "币种"),
      //   h("select", null, [
      //     h("option", null, "BTC"),
      //     h("option", null, "ETH"),
      //     h("option", null, "USDT")
      //   ]),
      //   h("p", null, "从"),
      //   h("select", null, [
      //     h("option", null, "法币账户"),
      //     h("option", null, "币币账户")
      //   ]),
      //   h("p", null, "转至"),
      //   h("select", null, [
      //     h("option", null, "币币账户"),
      //     h("option", null, "法币账户")
      //   ]),
      //   h("p", null, "数量"),
      //   h("el-input-number", {
      //     attrs: {
      //       "controls-position": "right",
      //       precision:8,
      //       min:0,
      //       max:10,
      //       step:0.01
      //     }
      //   }, "")
      // ]);
      // // const message = "<p>提币请划转至币币交易账户</p>";
      // this.$msgbox({
      //   title: "资产划转",
      //   message,
      //   // dangerouslyUseHTMLString:true,
      //   showCancelButton: true,
      //   confirmButtonText: "立即划转",
      //   cancelButtonText: "取消",
      //   beforeClose: (action, instance, done) => {
      //     if (action === "confirm") {
      //       instance.confirmButtonLoading = true;
      //       instance.confirmButtonText = "执行中...";
      //       // setTimeout(() => {
      //       //   done();
      //       //   setTimeout(() => {
      //       //     instance.confirmButtonLoading = false;
      //       //   }, 300);
      //       // }, 3000);
      //     } else {
      //       done();
      //     }
      //   }
      // }).then(action => {
      //   this.$message({
      //     type: "info",
      //     message: "action: " + action
      //   });
      // });
    }
  }
};
</script>
<style lang="scss" scoped>
.coin-wapper{
  border:1px solid #ddd;
  width:1000px;
  height:100px;
  display:flex;

  // div {
    // margin-top: 16px;
  // }

  .coin-type,.coin-name,.coin-operate{
    flex:0 0 100px;
    padding-top: 16px;
    background: #F2F6FC;
  }
  .legal-tender{
    flex:0 0 360px;
    padding-top: 16px;
    background: #67C23A;
  }
  .coins-coins{
    flex:0 0 440px;
    padding-top: 16px;
    background: #F56C6C;
  }

  button{
    width: 80px;
    height: 30px;
  }
  .primary-btn{
    background: #409EFF;
    color:#fff;
    border-radius:5px;
  }
  .default-btn{
    margin-top:5px;
    color:#333;
    border-radius:5px;
  }
}


</style>
