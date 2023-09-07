<template>
  <!-- loading指令 -->
  <div class="loading" v-myLoading="loadingObj">loading</div>
</template>

<script>
export default {
  data() {
    return {
      // loading配置
      loadingObj: {
        // loading的加载状态
        loading: true,
        // 自定义icon
        icon: '',
        // loading样式
        style: {
          backgroundColor: 'rgba(255,255,255,0.5)',
        },
      },
    };
  },
  created() {
    setTimeout(() => {
      this.loadingObj.loading = false;
    }, 2000);
  },
  methods: {},
};
</script>

<style></style>
