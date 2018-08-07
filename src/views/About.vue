<template>
  <div class="about">
    <h1>This is an about pag222e</h1>
    <app-calendar :events="events"
                       :dateItemRender="itemRender"
                       :startWeek="0"
                       @event-dragend="changeDate"></app-calendar>
  </div>
</template>
<script>
import AppCalendar from "../components/AppCalendar";
export default {
  name: "about",
  data() {
    return {
      events: [
        {
          id: 1,
          date: "2018/08/02",
          text: "1老铁，扎心了1",
          DailyDate: "2017/12/31",
          TimeKbn: "1",
          YoyakuLevel: "2",
          DayoffKben: "0"
        },
        {
          id: 2,
          date: "2018/08/02",
          text: "1老铁，扎心了1",
          DailyDate: "2017/12/31",
          TimeKbn: "2",
          YoyakuLevel: "1",
          DayoffKben: "0"
        }
      ],
      itemRender(item) {
        const h = this.$createElement;
        return h(
          "div",
          {
            class: "calendar-text-contianer"
          },
          [
            h(
              "span",
              {
                class: "calendar-text"
              },
              item.TimeKbn === "1" ? "午餐" : "晚餐"
            ),
            h("span", {
              class:
                item.YoyakuLevel === "0"
                  ? "calendar-icon-circle"
                  : item.YoyakuLevel === "1"
                    ? "calendar-icon-triangle"
                    : "calendar-icon-x"
            })
          ]
        );
      }
    };
  },
  methods: {
    changeDate(e, item, date) {
      const updateIndex = this.events.findIndex(ele => ele.id === item.id);
      this.$set(this.events, updateIndex, {
        ...this.events[updateIndex],
        date
      });
    }
  },
  created() {
    // 显示为当月的数据
    //    const now = new Date()
    //      console.log('old=',this.events)
    //
    //      this.events = this.events.map(item => {
    //      const d = item.date.split('-')[2];
    //      item.date = `${now.getFullYear()}-${now.getMonth() + 1}-${d}`;
    //          console.log('new=',this.events)
    //
    //          return item;
    //    });
  },
  components: {
    AppCalendar
  }
};
</script>
<style scoped lang="scss">
.about {
  height: 100%;
  padding: 0 10%;
}
</style>
