<template>
  <div id="app">
    <h1>To-Do List</h1>
    <ul>
      <!-- v-on语法可以为自定义事件绑定回调 -->
      <!-- 这里绑定的自定义事件是todo-added，等价于ele.addEventListenr('todo-added',...)语句 -->
      <!-- 回调函数可以从methods里获取 -->
      <to-do-form @todo-added="addToDo"></to-do-form>
      <!-- 用 v-for ... in ... 语法创建item枚举后,li下的属性都可以用item以及它的子属性赋值了,赋值时需要用v-bind语法转义-->
      <!-- v-for会不断扫描列表中的对象，根据列表实际内容更新li列表 -->
      <!-- key属性是vue中配合v-for语法的自有属性，当vue在v-for遍历中创建li对象时需要从列表中取到每个对象的一个唯一id用于前后比较-->
      <li v-for="item in ToDoItems" :key="item.id">
        <!-- label是给prop里的label赋值 -->
        <!-- :done是v-bind:done的缩写，告知vue cli这是给todoitem的prop对象done按照它的类型(boolean)赋值 -->
        <!-- 把v-for用来进行key值检查的item.id赋值给id属性，便于检查定位创建的li对象 -->
        <to-do-item :label="item.label" :done="item.done" :id="item.id"></to-do-item>
      </li>
    </ul>
  </div>
</template>

<script>
import ToDoItem from "./components/ToDoItem.vue";
import ToDoForm from "./components/ToDoForm.vue";
import uniqueid from "lodash.uniqueid";

export default {
  name: "App",
  components: {
    ToDoItem,
    ToDoForm,
  },
  data() {
    return {
      ToDoItems: [
        { id: uniqueid("todo-"), label: "Learn Vue", done: false },
        {
          id: uniqueid("todo-"),
          label: "Create a Vue project with the CLI",
          done: true,
        },
        { id: uniqueid("todo-"), label: "Have fun", done: true },
        { id: uniqueid("todo-"), label: "Create a to-do list", done: false },
      ],
    };
  },
  methods: {
    addToDo(toDoLabel) {
      console.log("To-do added");
      this.ToDoItems.push({id:uniqueid("todo-"), label: toDoLabel, done: false});
    },
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
