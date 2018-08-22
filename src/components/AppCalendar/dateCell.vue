<template>
    <div class="schedule-calendar-date"
         :class="[type, { today: isToday, dragged: draggedIndex === index ,off: notWorkDay}]"
         @dragover.prevent=""
         @dragenter.prevent="dragenter"
         @drop="onDrop"
         @click="cellClick"
         ref="b">
        <div class="schedule-calendar-date-hd">
            <div class="schedule-calendar-date-label">{{date.getDate()}}</div>
            <!--<button type="button"-->
                    <!--class="schedule-calendar-counter"-->
                    <!--v-if="details.length > volume"-->
                    <!--@click.stop.prevent="expandAll">共 {{details.length}} 项</button>-->
        </div>
        <div class="schedule-calendar-details"
             :class="{ expanded }"
             :style="detailsPost"
             ref="details">
            <!--<div v-show="expanded"-->
                 <!--class="schedule-calendar-details-hd">{{ dateString }}</div>-->
            <div class="schedule-calendar-details-bd" :class="{ scale: scale1 }">
                <event-item v-if="details.length"
                            v-for="item in displayDetails"
                            :item="item"
                            :date="date"
                            :type="type"
                            :itemRender="itemRender"
                            @item-dragstart="dragItem"
                            :key="item.id"></event-item>
            </div>
        </div>
    </div>
</template>
<script>
import { EventBus, isSameDay, format, Store } from './utils'
import eventItem from './eventItem'

export default {
    components: {
        eventItem
    },
    props: {
        date: Date,
        type: String,
        data: Array,
        index: Number,
        draggedIndex: Number,
        itemRender: Function
    },
    data() {
        return {
            volume: 0,
            expanded: false,
            scale: false,
            num: 0
        }
    },
    computed: {
        isToday() {
            return isSameDay(new Date(), this.date)
        },
        notWorkDay() {
            let details = this.data.length ? this.data.filter(item => isSameDay(item.DailyDate, this.date)) : []
            return (details[0] ? (details[0].DayoffKbn == "1" ? true : false) : false)
        },
        details() {
            return this.data.length ? this.data.filter(item => isSameDay(item.DailyDate, this.date)) : []
        },
        displayDetails() {
//            return this.expanded ? this.details : this.details.slice(0, this.volume)
            return this.expanded ? this.details : this.details
        },
        scale1() {
            return this.num > 90 ? false : true;
        },
        dateString() {
            return format(this.date)
        },
        detailsPost() {
            const post = {}

            if (this.index >= 35) {
                post.bottom = 0
            } else {
                post.top = 0
            }

            if ((this.index + 1) % 7 === 0) {
                post.right = 0
            } else {
                post.left = 0
            }

            return post
        }
    },
    methods: {
        calcVolume() {
            this.volume = Math.floor(this.$refs.details.clientHeight / 27)
        },
        expandAll() {
            this.expanded = true
            document.addEventListener('mouseup', this.reduceAll)
        },
        reduceAll(e) {
            if (!this.$refs.details.contains(e.target)) {
                this.expanded = false
                Store.hasExpand = true // 设为 true，当前点击仅仅是为了收缩单元格
                document.removeEventListener('mouseup', this.reduceAll)
            }
        },
        dragenter(e) {
            if (this.$el.contains(e.target)) {
                this.$emit('highlight', this.index)

                if (this.$el === e.target) {
                    EventBus.$emit('cell-dragenter', e, format(this.date, 'yyyy-MM-dd'), this.type, this.index)
                }
            }
        },
        dragItem(e, item, date, type) {
            this.$emit('highlight', this.index)
            EventBus.$emit('item-dragstart', e, item, format(date, 'yyyy-MM-dd'), type)
        },
        onDrop(e) {
            this.$emit('highlight', -1)
            EventBus.$emit('item-drop', e, format(this.date, 'yyyy-MM-dd'), this.type, this.index)
        },
        cellClick(e) {
            // 此时为收缩单页格，不触发 date-click
            if (Store.hasExpand) {
                // 设为 false，下次正常触发 date-click
                Store.hasExpand = false
                return
            }
            EventBus.$emit('date-click', e, format(this.date, 'yyyy-MM-dd'))
        }
    },
    mounted() {
        this.num = this.$refs.b.getBoundingClientRect().height;
        this.calcVolume()
        window.addEventListener('resize', this.calcVolume)
    },
    destroyed() {
        window.removeEventListener('resize', this.calcVolume)
    }
}
</script>
<style lang="scss">
@import "variables.scss";

.schedule-calendar- {
    &date {
        position: relative;
        display: flex;
        flex-direction: column;
        width: calc(100% / 7);
        height: calc(100% / 6);
        min-width: 94px;
        min-height: 40px;
        padding: 4px;
        border-top: 1px solid $sc-border-color;
        border-left: 1px solid $sc-border-color;
        user-select: none;

        &:nth-child(7n + 1) {
            border-left: none;
        }

        &.prev,
        &.next {
            color: $sc-gray-light-color;
            background: $sc-gray-background;
        }

        &-label {
            width: $sc-data-label-size;
            height: $sc-data-label-size;
            line-height: $sc-data-label-size;
            text-align: center;
            border-radius: 50%;
            color: #142343;
        }

        &.today {
            .schedule-calendar-date-label {
                color: $sc-body-color;
                background: $sc-primary-color;
            }
        }

        &.dragged {
            background: $sc-primary-light-color;
            .schedule-calendar-details {
                background: $sc-primary-light-color;
            }
        }
        &.off {
            background: #FEF5F3;
        }
    }
    &date-hd {
        display: flex;
        justify-content: space-between;
        align-content: center;
        .schedule-calendar-date-label {
            z-index: 99;
        }
    }
    &details {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-content: center;

        &.expanded {
            position: absolute;
            z-index: 2;
            width: $sc-details-width;
            min-width: 100%;
            padding: 0 6px 10px;
            background: $sc-body-color;
            box-shadow: $sc-box-shadow;
            .schedule-calendar-details-bd {
                overflow-y: auto;
                max-height: $sc-details-height - $sc-details-hd-height;
            }
        }
    }
    &details-hd {
        height: $sc-details-hd-height;
        line-height: $sc-details-hd-height;
        font-size: 13px;
        color: $sc-gray-color;
        text-align: center;
    }
    &counter {
        font-size: 13px;
        color: $sc-primary-color;
    }
}
.schedule-calendar-details-bd.scale {
    position: absolute;
    transform: scale(0.9);
    top: 0;
    right: 0;
}
@media screen and(max-height: 580px) {
    .schedule-calendar-details-bd.scale {
        transform: scale(0.5);
        top: -12px;
        right: 0;
    }
}
@media screen and(max-height: 680px) {
    .schedule-calendar-details-bd.scale {
        transform: scale(0.7);
        top: -6px;
        right: 0;
    }
}
</style>
