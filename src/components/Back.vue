<template>
  <!-- 返回上一页组件 -->
  <div class="goback">
    <span class="el-icon-back" @click="goback">返回上一页</span>
  </div>
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.go(-1); //后退+刷新
    },
  },
};
</script>

<style lang="scss" scoped>
.goback{
    cursor: pointer;
    font-size: .16rem;
}
</style>