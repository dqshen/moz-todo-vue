<template>
  <div id="app">
  <h1>To-Do List</h1>
  <ul>
    <li>
      <!-- label是给prop里的label赋值 -->
      <!-- :done是v-bind:done的缩写，告知vue cli这是给todoitem的prop对象done按照它的类型(boolean)赋值 -->
     <to-do-item label="My Todo Item" :done="false"></to-do-item>
    </li>
  </ul>
</div>

</template>

<script>
import ToDoItem from "./components/ToDoItem.vue";
export default {
  name: "App",
  components: {
    ToDoItem,
  },
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
