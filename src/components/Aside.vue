<template>
  <div>
    <el-row class="tac">
      <el-col>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#263238"
          text-color="#909399"
          active-text-color="#ffd04b"
          router
        >
          <treeMenu :treeData="treeData" />

          <!-- 首页 -->
          <!-- <router-link to="/home/index">
            <el-menu-item index="0">
              <i class="el-icon-house"></i>
              <span slot="title">首页</span>
            </el-menu-item>
          </router-link> -->

          <!-- 人才信息 -->
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>信息统计</span>
            </template>
            <el-menu-item-group>
              <router-link to="/home/infoStatis/Userinfo">
                <el-menu-item index="1-1">人才信息统计</el-menu-item>
              </router-link>
              <router-link to="/home/infoStatis/Personinfo">
                <el-menu-item index="1-2">个人详细信息</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu> -->

          <!-- 导航二 -->
          <!-- <router-link to="/home/go">
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-coin"></i>
                <span>经费申报</span>
              </template>
            </el-submenu>
          </router-link> -->

          <!-- 人才考核 -->
          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-finished"></i>
              <span>人才考核</span>
            </template>
            <el-menu-item-group>
              <router-link to="/home/assess/subAssess">
                <el-menu-item index="3-1">提交考核材料</el-menu-item>
              </router-link>
              <router-link to="/home/assess/assessInfo">
                <el-menu-item index="3-2">考核信息</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu> -->

          <!-- 人才申报 -->
          <!-- <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>人才申报</span>
            </template>
            <el-menu-item-group>
              <router-link to="/home/declare/subDeclare">
                <el-menu-item index="4-1">提交申报材料</el-menu-item>
              </router-link>
              <router-link to="/home/declare/declareInfo">
                <el-menu-item index="4-2">申报信息</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu> -->

          <!-- 导航五 -->
          <!-- <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>待遇兑现</span>
            </template>
          </el-submenu> -->

          <!-- 电子档案 -->
          <!-- <router-link to="/home/record">
            <el-menu-item index="6">
              <i class="el-icon-receiving"></i>
              <span>电子档案</span>
            </el-menu-item>
          </router-link> -->

          <!-- 导航七 -->
          <!-- <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>项目申报</span>
            </template>
          </el-submenu> -->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import treeMenu from "../components/TreeMenu.vue";
import treeDatak from "../components/AsideRouter.json";
import store from "@/store";
export default {
  components: { treeMenu },
  data() {
    return {
      treeData: [],
      identity: "",
      treeDatak,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {
    if (this.$store.state.role == "admin1") {
      this.treeData = this.treeDatak[0];
    } else if (this.$store.state.role == "admin2") {
      this.treeData = this.treeDatak[1];
    }
  },
};
</script>

<style lang="scss" scoped>
.tac {
  // height: 100vh;
  height: calc(100vh - 0.6rem);
}

:deep(.el-submenu__title, .el-menu-item) {
  width: 2.5rem;
  text-align: left;
}
:deep(.el-menu .el-menu--inline) {
  width: 2.5rem;
}
:deep(.el-menu-item) {
  text-align: left;
  width: 2.5rem;
}
</style>
