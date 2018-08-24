<template>
  <div class="info">
    <span v-if="item.ReservationDate">
      <span class="font-bold">予定日：</span>{{item.ReservationDate}},
    </span>
    <span v-if="item.KbnName">
                    <span class="font-bold">区分：</span>{{item.KbnName}},
                  </span>
    <span v-if="item.CustName">
                    <span class="font-bold">予約者：</span>{{item.CustName}},
                  </span>
    <span v-if="item.CustNameKana">
                    <span class="font-bold">カナ：</span>{{item.CustNameKana}},
                  </span>
    <span v-if="item.CustCompanyName">
                    <span class="font-bold">法人名（団体）：</span>{{item.CustCompanyName}},
                  </span>
    <span v-if="item.CustBusyoName">
                    <span class="font-bold">部署：</span>{{item.CustBusyoName}},
                  </span>
    <span v-if="item.CustTel">
                    <span class="font-bold">電話番号：</span>{{item.CustTel}},
                  </span>
    <span v-if="item.EnkaiSyusaiName">
                    <span class="font-bold">宴会主催者名：</span>{{item.EnkaiSyusaiName}},
                  </span>
    <span v-if="item.EnkaiSyusaiNameKana">
                    <span class="font-bold">主催者カナ：</span>{{item.EnkaiSyusaiNameKana}},
                  </span>
    <span v-if="item.EnkaiSyusaiTel">
                    <span class="font-bold">主催者電話：</span>{{item.EnkaiSyusaiTel}},
                  </span>
    <span v-if="item.EnkaiName">
                    <span class="font-bold">宴会名：</span>{{item.EnkaiName}},
                  </span>
    <span v-if="item.EnkaiDate">
                    <span class="font-bold">宴会日：</span>{{item.EnkaiDate}},
                  </span>
    <span v-if="item.EnkaiNum">
                    <span class="font-bold">宴会回数：</span>{{item.EnkaiNum}},
                  </span>
    <span v-if="item.JissiDate">
                    <span class="font-bold">婚礼日：</span>{{item.JissiDate}},
                  </span>
    <span v-if="item.HiroenEnkaijo">
                    <span class="font-bold">披露宴会場：</span>{{item.HiroenEnkaijo}},
                  </span>
    <span v-if="item.Name">
                    <span class="font-bold">関係者名：</span>{{item.Name}},
                  </span>
    <span v-if="item.NameKana">
                    <span class="font-bold">関係者カナ：</span>{{item.NameKana}},
                  </span>
    <span v-if="item.Tel">
                    <span class="font-bold">関係者電話：</span>{{item.Tel}},
                  </span>
    <span v-if="item.Kankei">
                    <span class="font-bold">関係：</span>{{item.Kankei}},
                  </span>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .info {
    overflow-x: scroll;
    span {
      display: inline-block;
    }
  }
</style>
