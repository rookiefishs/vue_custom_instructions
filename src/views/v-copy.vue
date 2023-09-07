<template>
  <!-- copy指令 -->
  <div>
    <button v-copy="copyValue" @click="copyValue = 123">复制按钮</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copyValue: '我是要复制的值',
    };
  },
};
</script>

<style></style>
