<template>
  <div>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.path" @click="$router.push(item.path)">{{ item.path }}</div>
    </div>
  </div>
</template>

<script>
import { constantRoutes } from '@/router';
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.list = constantRoutes.filter(item => item.path !== '/');
  },
};
</script>

<style>
.list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}
.item {
  width: 200px;
  height: 200px;
  display: inline-block;
  margin: 15px;
  text-align: center;
  line-height: 200px;
  box-shadow: 10px 20.48px 27.31px 30px rgba(82, 82, 152, 0.06);
  border-radius: 10px;
  cursor: pointer;
}
</style>
