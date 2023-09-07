<template>
  <!-- 防止输入emoji表情指令 -->
  <div>
    <p>防止输入emoji表情指令:</p>
    <input type="text" v-emoji />
    <br />
    <textarea v-emoji cols="10" rows="10"></textarea>
    <p>只有文本框和textarea v-emoji才会起作用</p>
    <input type="button" v-emoji />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    longFn() {
      console.log('触发长按');
    },
  },
};
</script>

<style></style>
