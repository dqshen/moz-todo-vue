<template>
  <div class="custom-checkbox">
    <!-- html中的input是一个labelable标签（一个表单元素），它的id值会将它与上下文中用for标记了相同id值的label绑定-->
    <!-- 使用前缀v-bind:或者简写前缀:将标签的attribute与一个data()里的对象关联 -->
    <input type="checkbox" class="checkbox" :id="id" v-bind:checked="isDone" />
    <!-- 使用{{ }}语法可以在template标签的内容位置调用注册在props里的字段 -->
    <!-- label的for属性用来标记它的id值，这个id值将它与第一个有相同id值的labelable对象绑定 -->
    <!-- 可以有多个label有相同的for值，它们会绑定到同一个labelable标签上 -->
    <label class="checkbox-label" :for="id">{{ label }}</label>
  </div>
</template>
<script>
export default {
  // props是专门用于存放属性值prop的标签，这种声明的特点是可以给每个prop增加约束条件
  // props与组件的构建有关，和类的实例无关，类似于类的构造函数的参数
  //    type: 告知vue cli这个prop的类型，方便检查语法错误，仅在开发阶段有效
  //    required: 约定这个prop在组件被调用时需要被定义
  //    default: 约定这个prop没有被显式定义时的默认值，可以和required配合使用
  props: {
    label: { required: true, type: String },
    done: { default: false, type: Boolean },
    id: { required: true, type: String }
  },
  // data是专门用于声明component内模型对象的方法
  // data里声明的对象是跟着component一起的，当component被引用/被创建时，每个component实例都有自己的一组对象，类似于类的对象
  data() {
    return {
      // 定义一个名为isDone的对象，并且用props里的done进行赋值，类似于类的构造函数在创建类的实例时，给类的对象赋值
      // template中需要使用v-bind:语法调用这个对象，调用时这个对象已经通过框架赋值完毕
      isDone: this.done,
    };
  },
};
</script>
<style scoped>
.custom-checkbox > .checkbox-label {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  font-size: 16px;
  font-size: 1rem;
  line-height: 1.25;
  color: #0b0c0c;
  display: block;
  margin-bottom: 5px;
}
.custom-checkbox > .checkbox {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  font-size: 16px;
  font-size: 1rem;
  line-height: 1.25;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  height: 2.5rem;
  margin-top: 0;
  padding: 5px;
  border: 2px solid #0b0c0c;
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.custom-checkbox > input:focus {
  outline: 3px dashed #fd0;
  outline-offset: 0;
  box-shadow: inset 0 0 0 2px;
}
.custom-checkbox {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.25;
  display: block;
  position: relative;
  min-height: 40px;
  margin-bottom: 10px;
  padding-left: 40px;
  clear: left;
}
.custom-checkbox > input[type="checkbox"] {
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: -2px;
  left: -2px;
  width: 44px;
  height: 44px;
  margin: 0;
  opacity: 0;
}
.custom-checkbox > .checkbox-label {
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  display: inline-block;
  margin-bottom: 0;
  padding: 8px 15px 5px;
  cursor: pointer;
  touch-action: manipulation;
}
.custom-checkbox > label::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 2px solid currentColor;
  background: transparent;
}
.custom-checkbox > input[type="checkbox"]:focus + label::before {
  border-width: 4px;
  outline: 3px dashed #228bec;
}
.custom-checkbox > label::after {
  box-sizing: content-box;
  content: "";
  position: absolute;
  top: 11px;
  left: 9px;
  width: 18px;
  height: 7px;
  transform: rotate(-45deg);
  border: solid;
  border-width: 0 0 5px 5px;
  border-top-color: transparent;
  opacity: 0;
  background: transparent;
}
.custom-checkbox > input[type="checkbox"]:checked + label::after {
  opacity: 1;
}
@media only screen and (min-width: 40rem) {
  label,
  input,
  .custom-checkbox {
    font-size: 19px;
    font-size: 1.9rem;
    line-height: 1.31579;
  }
}
</style>


