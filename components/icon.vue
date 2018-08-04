<template>
  <text :class="classes" :style="styles">{{styles}}</text>
</template>
<script>
const prefixCls = 'iconfont icon-';

export default {
  name: 'icon',
  data() {
    return {
      str: ""
    }
  },
  beforeCreate() {
    console.log('icon before create')
  },
  created() {
    console.log('icon created')
  },
  beforeMount() {
    console.log('icon beforeMount')
  },
  mounted() {
    console.log('icon mounted')
  },
  beforeUpdate() {
    console.log('icon beforeUpdate')
  },
  updated() {
    console.log('icon updated')
  },
  beforeDestroy() {
    console.log('icon beforeDestroy')
  },
  destroyed() {
    console.log('icon destroyed')
  },
  props: {
    type: String,
    size: [Number, String],
    color: String
  },
  computed: {
    classes() {
      return `${prefixCls}${this.type}`;
    },
    styles() {
      let style = {};
      if (this.size) {
        style['font-size'] = `${this.size}px`;
      }
      // if (this.color) {
      //     style.color = this.color;
      // }
      let arr = []
      for (const i in style) {
        arr.push(`${i}:${style[i]};`)
      }
      console.log('计算')
      return arr.join(';');

      // let style = {};
      // style['font-size'] = `42px`;
      // console.log('style=',style);
      // let arr = [];
      // for(const i in style){
      //   arr.push(`${i}:${style[i]};`)
      // }
      // console.log('str=',arr.join(';'));
      //
      // return arr.join(';')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
