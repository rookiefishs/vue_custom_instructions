<template>
  <div>
    <!-- drag指令 -->
    <div class="box">
      <div class="child" v-drag></div>
      盒子
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.box {
  position: relative;
  width: 200px;
  background-color: #177cb0;
  color: #fff;
  line-height: 200px;
  text-align: center;
  user-select: none;
}
.exceed {
  line-height: 400px;
}
.child {
  width: 100%;
  height: 50px;
  background-color: red;
}
</style>
