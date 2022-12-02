<template>
  <!-- 系统分栏布局首页 -->
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header height="0.6rem"><Header></Header></el-header>
      <!-- 内容 -->
      <el-container>
        <!-- 侧边栏导航 -->
        <el-aside width="2.5rem"><Aside></Aside></el-aside>
        <el-main>
          <!-- 页面切换 -->
          <router-view></router-view>
        </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Aside from "@/components/Aside.vue"


export default {
    
    components: { Header, Aside },
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #ffffff;
  color: #fff;
  text-align: center;
  padding: 0;
}

.el-aside {
  background-color:#263238;
  color: #333;
  text-align: center;
  // height: calc(100vh - 60px);
  height: auto;
  width: 2.5rem;
}
.el-aside::-webkit-scrollbar {
  display: none;
}

.el-main {
  background-position: 0;
  background-color: #f1f4f5;
  color: #333;
  position: relative;
}
.element::-webkit-scrollbar {
  display: none;
}
</style>