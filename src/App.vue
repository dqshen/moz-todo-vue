<template>
  <div id="app">
    <h1>To-Do List</h1>
    <!-- 标签的text content除了可以用{{}}语法获取props里的内容以外，还可以用{{}}语法获取computed的内容 -->
    <h2 id="list-summary" ref="listSummary">{{ listSummary }}</h2>
    <!-- aria-labelledby是ARIA无障碍功能用的属性 -->
    <ul aria-labelledby="list-summary" class="stack-large">
      <!-- v-on语法可以为自定义事件绑定回调 -->
      <!-- 这里绑定的自定义事件是todo-added，等价于ele.addEventListenr('todo-added',...)语句 -->
      <!-- 回调函数可以从methods里获取 -->
      <to-do-form @todo-added="addToDo"></to-do-form>
      <!-- 用 v-for ... in ... 语法创建item枚举后,li下的属性都可以用item以及它的子属性赋值了,赋值时需要用v-bind语法转义-->
      <!-- v-for会不断扫描列表中的对象，根据列表实际内容更新li列表 -->
      <!-- key属性是vue中配合v-for语法的自有属性，当vue在v-for遍历中创建li对象时需要从列表中取到每个对象的一个唯一id用于前后比较-->
      <!-- vue3以后，对v-for对象用:ref语法不能直接获取内部的DOM对象，更不能获取V-DOM对象，注意下面的setItemRef函数写法 -->
      <!-- vue3.2.25版本以后，又能够获取了 可以写作 ref="items",在脚本中用this.$refs.items就可以访问DOM数组-->
      <li v-for="item in ToDoItems" :key="item.id" :ref="setItemRef">
        <!-- label是给prop里的label赋值 -->
        <!-- :done是v-bind:done的缩写，告知vue cli这是给todoitem的prop对象done按照它的类型(boolean)赋值 -->
        <!-- 把v-for用来进行key值检查的item.id赋值给id属性，便于检查定位创建的li对象 -->
        <!-- v-on语法将ToDoItem内部传出的事件响应和methods()中的updateDoneStatus方法绑定，方便在App.vue这个scope处理一些事情 -->
        <!-- v-on语法将ToDoItem内部传出的事件响应和methods()中的deleteToDo方法绑定，方便在App.vue这个scope处理一些事情 -->
        <!-- v-on语法将ToDoItem内部传出的事件响应和methods()中的editToDo方法绑定，方便在App.vue这个scope处理一些事情 -->
        <!-- ref可以在component中获取针对对象的ref，注意和一般DOM对象的ref不同，这里要用this.$refs[lists]先访问一个V-DOM数组，再从数组中选择某个V-DOM对象 -->
        <to-do-item
          :label="item.label"
          :done="item.done"
          :id="item.id"
          ref="lists"
          @checkbox-changed="updateDoneStatus(item.id)"
          @item-deleted="deleteToDo(item.id)"
          @item-edited="editToDo(item.id, $event)"
        ></to-do-item>
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
      itemRefs: [],
    };
  },
  methods: {
    callFromExternal(){
      return this.ToDoItems;
    },
    addToDo(toDoLabel) {
      console.log("To-do added");
      this.ToDoItems.push({
        id: uniqueid("todo-"),
        label: toDoLabel,
        done: false,
      });
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToUpdate.done = !toDoToUpdate.done;
      // ref语法从v-for中获取一个V-DOM数组
      console.log(this.$refs["lists"]);
      // 在数组中筛选需要的对象
      const eurekaItem = this.$refs["lists"].find((el) => el.id === toDoId);
      // el => el.$attrs["id"] === toDoId
      console.log(eurekaItem);
      // 通过ref语法调用子对象的方法
      eurekaItem.editFocus();
      eurekaItem.focusOnEditButton();
    },
    deleteToDo(toDoId) {
      const itemIndex = this.ToDoItems.findIndex((item) => item.id === toDoId);
      this.ToDoItems.splice(itemIndex, 1);
      this.$refs.listSummary.focus();
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find((item) => item.id === toDoId);
      toDoToEdit.label = newLabel;
    },
    // 维护itemRefs数组，实现v-for的ref对象
    setItemRef(el) {
      console.log(el);
      this.itemRefs.push(el);
    },
  },
  beforeUpdate() {
    // 维护itemRefs数组，实现v-for的ref对象
    this.itemRefs = [];
  },
  updated() {
    // 维护itemRefs数组，实现v-for的ref对象
    console.log(this.itemRefs);
  },
  computed: {
    listSummary() {
      const numberFinishedItems = this.ToDoItems.filter(
        (item) => item.done
      ).length;
      return `${numberFinishedItems} out of ${this.ToDoItems.length} items completed`;
    },
  },
  mounted() {
    // 在页面上定义一个对象指向App
    window.test = this;
  },
};
</script>

<style>
/* Global styles */
.btn {
  padding: 0.8rem 1rem 0.7rem;
  border: 0.2rem solid #4d4d4d;
  cursor: pointer;
  text-transform: capitalize;
}
.btn__danger {
  color: #fff;
  background-color: #ca3c3c;
  border-color: #bd2130;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__danger:focus {
  outline-color: #c82333;
}
.btn__primary {
  color: #fff;
  background-color: #000;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
/* class值为btn-group的标签的第一个下级标签 */
.btn-group > * {
  flex: 1 1 auto;
}
/* class值为btn-group的标签的第一个下级标签后接的标签 */
.btn-group > * + * {
  margin-left: 0.8rem;
}
.label-wrapper {
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
}
/* class属性尾缀为__lg的标签 */
[class*="__lg"] {
  display: inline-block;
  width: 100%;
  font-size: 1.9rem;
}
/* class属性尾缀为__lg但不是列表最后一个的标签 */
[class*="__lg"]:not(:last-child) {
  margin-bottom: 1rem;
}
/* media query 用来适配不同显示设备的选择器 */
@media screen and (min-width: 620px) {
  [class*="__lg"] {
    font-size: 2.4rem;
  }
}
.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
[class*="stack"] > * {
  margin-top: 0;
  margin-bottom: 0;
}
.stack-small > * + * {
  margin-top: 1.25rem;
}
.stack-large > * + * {
  margin-top: 2.5rem;
}
@media screen and (min-width: 550px) {
  .stack-small > * + * {
    margin-top: 1.4rem;
  }
  .stack-large > * + * {
    margin-top: 2.8rem;
  }
}
/* End global styles */
#app {
  background: #fff;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  padding-top: 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
}
@media screen and (min-width: 550px) {
  #app {
    padding: 4rem;
  }
}
#app > * {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
#app > form {
  max-width: 100%;
}
#app h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}
</style>

