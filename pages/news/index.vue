<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input type="checkbox" :checked="todo.done" @change="toggle(todo)">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <span @click="remove(todo)">remove</span>
    </li>
    <li><input placeholder="What needs to be done?" @keyup.enter="addTodo"></li>
    <div style="height: 300px;"></div>
    <!--<div :style="styles">{{styles}}</div>-->
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'
import icon from "~/components/icon.vue";
export default {
  name: "index",
  components: { icon },
  computed: {
    todos () { return this.$store.state.todos.list },
    styles() {
      let style = {};
      style['font-size'] = `42px`;
      console.log('style=',style);
      let arr = [];
      for(const i in style){
        arr.push(`${i}:${style[i]};`)
      }
      console.log('str=',arr.join(';'));

      return arr.join(';')
    }

  },
  methods: {
    addTodo (e) {
      this.$store.commit('add', e.target.value)
      e.target.value = ''
    },
    test (e) {
      console.log(e)
    },
    ...mapMutations({
      toggle: 'toggle',
      remove: 'remove'
    })
  }
}
</script>

<style scoped>
  .done {
    text-decoration: line-through;
  }
</style>
