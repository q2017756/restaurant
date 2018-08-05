<template>
    <div class="unified-bg">
        <app-header></app-header>
        <div class="contianer">
            <app-calendar :events="events"
                          :dateItemRender="itemRender"
                          :startWeek="0"
                          @event-dragend="changeDate"></app-calendar>
        </div>
    </div>
</template>

<script>
    import AppModal from "../components/AppModal.vue";
    import AppHeader from "../components/AppHeader.vue";
    import AppCalendar from '../components/AppCalendar';

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
                },
                events: [
                    {
                        id: 1,
                        date: '2018/08/02',
                        DailyDate: "2017/12/31",
                        TimeKbn: "1",
                        YoyakuLevel: "2",
                        DayoffKben: "0"
                    },
                    {
                        id: 2,
                        date: '2018/08/02',
                        DailyDate: "2017/12/31",
                        TimeKbn: "2",
                        YoyakuLevel: "1",
                        DayoffKben: "0"
                    }
                ],
                itemRender(item) {
                    const h = this.$createElement
                    return h('div',{
                            class: 'calendar-text-contianer'
                        },
                        [
                            h('span',{
                                    class: 'calendar-text'
                                },item.TimeKbn === "1" ? '午餐' : '晚餐'
                            ),
                            h('span',{
                                class: item.YoyakuLevel === '0' ? 'calendar-icon-circle' : (item.YoyakuLevel === '1' ? 'calendar-icon-triangle' : 'calendar-icon-x')
                            })
                        ]
                    )
                },
            };
        },
        components: {
            AppModal,
            AppHeader,
            AppCalendar
        },
        computed: {

        },
        methods: {
            changeDate(e, item, date) {
                const updateIndex = this.events.findIndex(ele => ele.id === item.id)
                this.$set(this.events, updateIndex, {
                    ...this.events[updateIndex],
                    date
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .contianer {
        width: 80vw;
        min-width: 1000px;
        height: 100vh;
        margin: 60px auto;
    }
</style>
