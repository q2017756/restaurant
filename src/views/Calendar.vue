<template>
    <div class="unified-bg">
        <app-header :btnShow="isRoot"></app-header>
        <div class="contianer">
            <app-calendar :events="events"
                          :dateItemRender="itemRender"
                          :startWeek="0"
                          @event-click="toNext"
                          @event-dragend="changeDate"></app-calendar>
        </div>
    </div>
</template>

<script>
    import AppHeader from "../components/AppHeader.vue";
    import AppCalendar from '../components/AppCalendar';

    export default {
        data(){
            return {
                isRoot: true,
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
                    },
                    {
                        id: 3,
                        date: '2018/08/03',
                        DailyDate: "2017/12/31",
                        TimeKbn: "1",
                        YoyakuLevel: "0",
                        DayoffKben: "0"
                    },
                    {
                        id: 4,
                        date: '2018/08/03',
                        DailyDate: "2017/12/31",
                        TimeKbn: "2",
                        YoyakuLevel: "2",
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
            AppHeader,
            AppCalendar
        },
        computed: {

        },
        methods: {
            toNext(e, item) {
                if(item.TimeKbn === "1") {
                    localStorage.mealsType = '1';
                } else {
                    localStorage.mealsType = '2';
                }
                this.$router.push('schedule');
            },
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
        height: calc(100vh - 30px - 90px);
        margin: 30px auto 0 auto;
    }
</style>
