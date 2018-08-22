<template>
  <div class="unified-bg">
    <app-header :btnShow="$store.isRoot"></app-header>
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
    data() {
      return {
        isRoot: true,
        events: [
          {
            id: 1,
            date: '2018/08/02',
            DailyDate: "2018/08/20",
            TimeKbn: "1",
            YoyakuLevel: "2",
            DayoffKben: "0"
          },
          {
            id: 2,
            date: '2018/08/02',
            DailyDate: "2018/08/20",
            TimeKbn: "2",
            YoyakuLevel: "1",
            DayoffKben: "0"
          },
          {
            id: 3,
            date: '2018/08/09',
            DailyDate: "2018/08/21",
            TimeKbn: "1",
            YoyakuLevel: "0",
            DayoffKben: "0"
          },
          {
            id: 4,
            date: '2018/08/09',
            DailyDate: "2018/08/21",
            TimeKbn: "2",
            YoyakuLevel: "2",
            DayoffKben: "0"
          }
        ],
        itemRender(item) {
          const h = this.$createElement
          return h('div', {
              class: 'calendar-text-contianer'
            },
            [
              h('span', {
                  class: 'calendar-text'
                }, item.TimeKbn === "1" ? 'ランチ' : 'ディナー'
              ),
              h('span', {
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
    computed: {},
    methods: {
      getData() {
        // this.axios.get('topics').then(res=>{
        // this.axios.post('calendar/getcalendarinfo').then(res=>{
        //   console.log(res)
        // })
        this.events = [
          {
            "DailyDate": "2018/08/05",
            "TimeKbn": "1",
            "YoyakuLevel": "0",
            "DayoffKbn": "1"
          },
          {
            "DailyDate": "2018/08/05",
            "TimeKbn": "2",
            "YoyakuLevel": "1",
            "DayoffKbn": "1"
          },
          {
            "DailyDate": "2018/08/06",
            "TimeKbn": "1",
            "YoyakuLevel": "2",
            "DayoffKbn": "1"
          },
          {
            "DailyDate": "2018/08/06",
            "TimeKbn": "2",
            "YoyakuLevel": "1",
            "DayoffKbn": "1"
          },
          {
            "DailyDate": "2018/08/09",
            "TimeKbn": "1",
            "YoyakuLevel": "0",
            "DayoffKbn": "0"
          },
          {
            "DailyDate": "2018/08/09",
            "TimeKbn": "2",
            "YoyakuLevel": "2",
            "DayoffKbn": "0"
          },
          {
            "DailyDate": "2018/08/19",
            "TimeKbn": "1",
            "YoyakuLevel": "1",
            "DayoffKbn": "0"
          },
          {
            "DailyDate": "2018/08/19",
            "TimeKbn": "2",
            "YoyakuLevel": "2",
            "DayoffKbn": "0"
          }
        ]
      },
      toNext(e, item) {
        if (item.TimeKbn === "1") {
          localStorage.mealsType = '1';
        } else {
          localStorage.mealsType = '2';
        }
        localStorage.clickDate = item.DailyDate
        this.$router.push('schedule');

      },
      changeDate(e, item, date) {
        const updateIndex = this.events.findIndex(ele => ele.id === item.id)
        this.$set(this.events, updateIndex, {
          ...this.events[updateIndex],
          date
        });
      }
    },
    mounted() {
      this.getData()
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
