<template>
  <!-- 页面水印指令 -->
  <div class="waterMarker" v-waterMarker="waterMarkerObj">111</div>
</template>

<script>
export default {
  data() {
    return {
      // 水印配置
      waterMarkerObj: {
        // 水印内容(必传项)
        text: '水印',
        // 水印字体配置
        font: '18px 宋体',
        // 水印文字颜色
        textColor: '#000',
        // 每个水印的大小
        width: 100,
        height: 100,
      },
    };
  },
  methods: {},
};
</script>

<style></style>
