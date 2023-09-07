<template>
  <!-- 懒加载lazyLoad指令 -->
  <div style="padding-top: 100vh">
    <p>懒加载lazyLoad指令</p>
    <img style="width: 535px; height: 500px" v-lazyLoad="'https://img2.baidu.com/it/u=3515918320,4106870013&fm=253&fmt=auto&app=138&f=JPEG?w=535&h=500'" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
