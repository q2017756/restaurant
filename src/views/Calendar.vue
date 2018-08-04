<template>
    <div class="unified-bg">

    </div>
</template>

<script>
    import AppModal from "../components/AppModal.vue";
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
            AppModal
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
