<template>
  <div>
    <router-view></router-view>
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
<style scoped>
* {
  padding: 0;
  margin: 0;
}

.waterMarker {
  width: 100vw;
  height: 100vh;
}
.loading {
  width: 200px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  background-color: red;
}
</style>
