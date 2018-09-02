<template>
    <div class="schedule-calendar" @wheel="scrollToMonth">
        <header-bar ref="header" :year="year"
                    :month="month"
                    :day="day"
                    :currentYear="currentYear"
                    :currentMonth="currentMonth"
                    @updateValue="updateView"></header-bar>
        <div class="schedule-calendar-body">
            <week :startWeek="startWeek"></week>
            <month :year="year"
                   :month="month"
                   :startWeek="startWeek"
                   :data="events"
                   :itemRender="dateItemRender"></month>
        </div>
    </div>
</template>
<script>
import { EventBus } from './utils'
import headerBar from './header'
import week from './week'
import month from './month'

export default {
    name: 'schedule-calendar',
    components: {
        headerBar,
        week,
        month,
    },
    props: {
        startMonth: String,
        startWeek: {
            type: Number,
            default: 1
        },
        events: {
            type: Array,
            default: function () {
              return []
            }
        },
        dateItemRender: Function
    },
    data() {
        return {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate(),
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth(),
            dragItem: null
        }
    },
    methods: {
        updateView(year, month) {
            this.year = year
            this.month = month
        },
        cellDragenter(e, date, type, index) {
            this.$emit('event-dragenter', e, this.dragItem, date)
        },
        itemDragstart(e, item, date, type) {
            this.dragItem = item
            this.$emit('event-dragstart', e, item, date)
        },
        itemDrop(e, date, type, index) {
            if (!this.dragItem) return
            console.log('[event-dragend]:', this.dragItem, date)
            this.$emit('event-dragend', e, this.dragItem, date)
        },
        itemClick(e, item) {
            console.log('[event-click]:', item)
            this.$emit('event-click', e, item)
        },
        dateClick(e, date) {
            console.log('[date-click]:', date)
            this.$emit('date-click', e, date)
        },
        scrollToMonth(e) {
            e = e || window.event;
            if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                if (e.wheelDelta > 0) { //当滑轮向上滚动时
                    this.$refs.header.prevMonth();
                }
                if (e.wheelDelta < 0) { //当滑轮向下滚动时
                    this.$refs.header.nextMonth();
                }
            } else if (e.detail) {  //Firefox滑轮事件
                if (e.detail> 0) { //当滑轮向上滚动时
                    this.$refs.header.prevMonth();
                }
                if (e.detail< 0) { //当滑轮向下滚动时
                    this.$refs.header.nextMonth();
                }
            }
        }
    },
    created() {
        EventBus.$on('cell-dragenter', this.cellDragenter)
        EventBus.$on('item-dragstart', this.itemDragstart)
        EventBus.$on('item-drop', this.itemDrop)
        EventBus.$on('item-click', this.itemClick)
        EventBus.$on('date-click', this.dateClick)
    },
    destoryed() {
        EventBus.$off()
    }
}
</script>
<style lang="scss">
@import "variables.scss";

.schedule- {
    &calendar {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 96%;
        min-width: $sc-cell-min-width * 7;
        color: $sc-base-color;
        font-size: $sc-base-font-size;

        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        button {
            border: 0;
            outline: none;
            cursor: pointer;
            background: transparent;
        }

        &-body {
            position: relative;
            flex: 1;
            width: 100%;
            overflow: hidden;
            background: $sc-body-color;
        }
    }
}

</style>
