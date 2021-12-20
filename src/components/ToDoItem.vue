<template>
  <div>
    <!-- 使用前缀v-bind:或者简写前缀:将标签的attribute与一个data()里的绑定关联 -->
    <input type="checkbox" id="todo-item" v-bind:checked="isDone"/>
    <!-- 使用{{ }}语法可以在template标签的内容位置调用注册在props里的字段 -->
    <label for="todo-item">{{label}}</label>
  </div>
</template>
<script>
export default {
  // props是专门用于存放属性值prop的标签，这种声明的特点是可以给每个prop增加约束条件
  //    type: 告知vue cli这个prop的类型，方便检查语法错误，仅在开发阶段有效
  //    required: 约定这个prop在组件被调用时需要被定义
  //    default: 约定这个prop没有被显式定义时的默认值，可以和required配合使用
  props: {
    label: { required: true, type: String },
    done: { default: false, type: Boolean }
  },
  // data是专门用于声明数据绑定的方法
  data(){
    return{
      // 定义一个名为isDone的绑定，绑定的作用是把模版里标签的属性值与脚本里props中的属性值绑定到一起
      // isDone这个绑定负责关联注册在props里面的done属性
      // template中使用v-bind:调用这个绑定，把绑定标记的this.done和被绑定的template标签属性checked关联起来，完成绑定
      isDone: this.done
    };
  }
};
</script>

