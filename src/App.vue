<template>
  <div id="app">
    <h1>To-Do List</h1>
    <ul>
      <!-- 用 v-for ... in ... 语法创建item枚举后,li下的属性都可以用item以及它的子属性赋值了,赋值时需要用v-bind语法转义-->
      <li v-for="item in ToDoItems" :key="item.id">
        <!-- label是给prop里的label赋值 -->
        <!-- :done是v-bind:done的缩写，告知vue cli这是给todoitem的prop对象done按照它的类型(boolean)赋值 -->
        <to-do-item :label="item.label" :done="item.done"></to-do-item>
      </li>
    </ul>
  </div>
</template>

<script>
import ToDoItem from "./components/ToDoItem.vue";
import uniqueid from 'lodash.uniqueid'

export default {
  name: "App",
  components: {
    ToDoItem,
  },
  data() {
    return {
      ToDoItems: [
        { id: uniqueid('todo-'), label: "Learn Vue", done: false },
        { id: uniqueid('todo-'), label: "Create a Vue project with the CLI", done: true },
        { id: uniqueid('todo-'), label: "Have fun", done: true },
        { id: uniqueid('todo-'), label: "Create a to-do list", done: false },
      ]
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
