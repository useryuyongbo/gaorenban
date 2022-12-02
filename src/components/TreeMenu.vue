<template>
  <div>
    <template v-for="item in treeData">
      <div :key="item._id" v-if="item.children && item.children.length > 0">
        <!-- <div v-for="next in item">{{ next }}</div> -->
        <el-submenu v-if="item.children[0].menuType.toString() === '2'">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.menuName }}</span>
          </template>
          <TreeMenu :treeData="item.children"></TreeMenu>
        </el-submenu>
      </div>
      <el-menu-item
        v-else-if="item.menuType === '2'"
        :index="item.path"
        :key="item._id"
      >
        {{ item.menuName }}
      </el-menu-item>
      <el-menu-item :key="item._id" :index="item.path" v-else>
        {{ item.menuName }}
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "TreeMenu",
  props: {
    treeData: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  created() {
    console.log(this.treeData[1].children);
  },
};
</script>
<style scoped></style>
