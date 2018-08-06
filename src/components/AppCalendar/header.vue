<template>
    <div class="header">
        <div class="header-top">
            <div class="year-selector">
                <img src="../../assets/img/arrow-left.png" alt="" @click="prevYear">
                <p>{{year}} 年</p>
                <img src="../../assets/img/arrow-right.png" alt="" @click="nextYear">
            </div>
            <p>
                {{year}} 年 {{month + 1}} 月 {{day}} 日
            </p>
        </div>
        <ul class="month-selector">
            <li v-for="n in 12"
                :class="{prev: n < (currentMonth + 1), current: n === currentMonth + 1, active: n === month + 1}"
                @click="updateValue(year,n - 1)">{{n}}</li>
        </ul>
    </div>
</template>
<script>
import { calcPrevMonth, calcNextMonth } from './utils'
import picker from './picker'

export default {
    components: {
        picker
    },
    props: {
        year: Number,
        month: Number,
        currentMonth: Number,
        day: Number
    },
    data() {
        return {
            pickerVisible: false,
        }
    },
    computed: {

    },
    methods: {
        updateValue(year, month = this.month) {
            this.$emit('updateValue', year, month)
        },
        prevYear() {
            this.updateValue(this.year - 1)
        },
        nextYear() {
            this.updateValue(this.year + 1)
        },
        prevMonth() {
            const { year, month } = calcPrevMonth(this.year, this.month)
            this.updateValue(year, month)
        },
        nextMonth() {
            const { year, month } = calcNextMonth(this.year, this.month)
            this.updateValue(year, month)
        },
        clickOutSide(e) {
            if (this.pickerVisible && !this.$refs.picker.contains(e.target)) {
                this.pickerVisible = false
            }
        }
    },

    created() {
        document.addEventListener('mouseup', this.clickOutSide)
    },
    destoryed() {
        document.removeEventListener('mouseup', this.clickOutSide)
    }
}
</script>
<style scoped lang="scss">
@import "variables.scss";

.header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    .year-selector{
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
            padding: 10px;
            &:first-child {
                padding-left: 0;
            }
        }
    }
}
ul, li {
    list-style: none;
}
.month-selector {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0;
    border: 1px solid #DFD4A7;
    font-size: 24px;
    li {
        flex: 1;
        height: 50px;
        background: #DED5A7;
        border: 1px solid transparent;
        border-right: 1px solid #fff;
        text-align: center;
        line-height: 50px;
        color: #fff;
        cursor: pointer;
        &:last-child {
            border-right: 0 solid #fff;
        }
        &.prev {
            background: #F1EEDE;
        }
        &.current {
            background: #fff;
            color: #142343;
        }
        &.active, &:hover {
            background: #2196f3;
        }
    }
}
</style>
