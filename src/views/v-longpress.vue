<template>
  <!-- longpress(长按)指令 -->
  <div>
    <button v-longpress="longFn" longTime="1000">长按指令</button>
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
