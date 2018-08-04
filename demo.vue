<template>
  <section class="demo">

  </section>
</template>

<script>
import Storage from "~/utils/storage.js";
import { mapActions, mapState } from "vuex";
export default {
  components: {

  },
  created () {

    // cookie的用法
    Storage.set("name","abc");
    Storage.get("name");
    // localStorage的用法
    Storage.setItem("job","abc");
    Storage.getItem("job");
  },
  computed:{
    ...mapState({
      name: state => {
        return state.demo.name;
      }
    })
  },
  methods:{
    ...mapActions({
      set:"DEMO"
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
