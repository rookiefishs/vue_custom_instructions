<template>
  <div>
    <div class="box" v-tooltip="'我是tooltip的内容'">123</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.box {
  position: relative;
  width: 100px;
  height: 100px;
  line-height: 100px;
  background-color: red;
  text-align: center;
  color: #fff;
}
</style>
