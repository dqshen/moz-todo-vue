<template>
  <!-- @submit是v-on:submit的简写 -->
  <!-- v-on:event="method"语法用于绑定标签的事件与脚本里methods中的方法 -->
  <!-- .prevent是vue的event modifiers语法，vue用这种配置形式的语法对事件处理做了一些常用的语法糖 -->
  <!-- 这些语法配置包括.stop .prevent .self .key .native .once .left .right .middle .passive-->
  <!-- .prevent相当于在js的事件回调中加入event.preventDefault()语句，阻止控件执行默认方法 -->
  <form @submit.prevent="onSubmit">
    <label for="new-todo-input"> What needs to be done? </label>
    <!-- v-model是vue中串联模型model与视图view的语法 -->
    <!-- 模型对应脚本中data()里声明的数据对象，视图就是template里的界面元素 而vue框架在这里起到控制器的作用 -->
    <!-- v-model的具体作用是把视图内容通过控制器绑定到具体的模型对象上，让模型对象的数据随着用户在视图的交互更新 -->
    <!-- v-model本质上是通过界面元素的事件回调函数去更新data()声明的绑定对象 -->
    <!-- 和v-on类似,v-model也有modifier语法，用来微调v-model背后的事件回调过程 -->
    <!-- .lazy定义回调需要绑定到表单的change事件上,.trim定义回调函数需要去掉输入参数的前后空格 -->
    <input
      type="text"
      id="new-todo-input"
      name="new-todo"
      autocomplete="off"
      v-model.lazy.trim="label"
    />
    <button type="submit">Add</button>
  </form>
</template>
<script>
export default {
  //   methods下适合写要在界面上立即生效的交互方法
  methods: {
    onSubmit() {
      console.log("Label value: ", this.label);
      /* if (this.label === "") {
        return;
      } */
      //  vue的$emit语法能够创建并发出一个事件，与js中CustomEvent创建过程等效
      //  创建的CustomEvent会围绕第二个参数构建事件体，此处的事件体就是一个string对象，用dispatchEvent发出事件
      //  由于组件一般会被上级组件引用，通过event bubbling机制，事件最终会被别的组件监听器接收处理
      this.$emit("todo-added", this.label);
      this.label="";
    },
  },
  data() {
    return {
      label: "",
    };
  },
};
</script>
