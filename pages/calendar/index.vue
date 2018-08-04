<template>
  <div class="unified-bg">


  </div>
</template>

<script>
import modal from "~/components/modal.vue";
export default {
  data(){
    return {
      showModal: false,
      modalOptions: {
        show: true,
        title: ' ',
        showCancelButton: true,
        cancelButtonText: 'ok',
        showConfirmButton: true,
        confirmButtonText: ' '
      }
    };
  },
  components: {
    modal
  },
  computed: {

  },
  methods: {
    login() {
      console.log('登录')
    }
  }
}
</script>

<style scoped>

</style>
