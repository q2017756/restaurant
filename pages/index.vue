<template>
  <section class="container">
    <AccountCoinItem />
  </section>
</template>

<script>
import AccountCoinItem from "~/components/AccountCoinItem.vue";
import Storage from "~/utils/storage.js";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    AccountCoinItem
  },
  created () {

  },
  computed:{
    ...mapState({

    })
  },
  methods:{
    ...mapActions({

    })
  }
};
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
