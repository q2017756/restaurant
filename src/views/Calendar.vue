<template>
  <div class="unified-bg">
    <app-header :btnShow="$store.isRoot"></app-header>
    <div class="contianer" v-loading="loading">
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
        loading: true,
        events: [],
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
        localStorage.setItem('clickDate','')
        this.axios.post('calendar/getcalendarinfo').then(res=>{

          if(res.data.Code === "SC-001") {
            this.loading = false
            this.events = res.data.Data
          }else {
            this.$message.error(res.data.Message)
          }
        })
      },
      toNext(e, item) {
        if (item.TimeKbn === "1") {
          localStorage.setItem('mealsType','1')
        } else {
          localStorage.setItem('mealsType','2')
        }
        localStorage.setItem('clickDate',item.DailyDate.replace(/-/g, '/'))
        localStorage.setItem('mealsStatus',item.YoyakuLevel)
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
