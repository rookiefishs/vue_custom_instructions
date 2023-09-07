<template>
  <!-- 防抖指令 -->
  <div>
    自定义防抖指令:
    <br />
    <!-- v-debounce:防抖时间="执行的函数" event="事件触发方式" -->
    <button v-debounce:3000="clickFn" event="click">点击触发防抖</button>
    <br />
    <input type="text" v-debounce:1000="inputFn" event="input" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    clickFn() {
      console.log('点击按钮触发');
    },
    inputFn() {
      console.log('输入文字触发');
    },
  },
};
</script>

<style></style>
