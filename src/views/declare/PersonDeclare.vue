<template>
  <!-- 个人申报所有申报材料 -->
  <div class="block" v-loading="loading">
    <div class="top">
      <back></back>
    </div>
    <div class="head">
      {{ userName }}的申报材料
      <div class="perstate">{{ state }}</div>
    </div>
    <el-collapse accordion>
      <el-collapse-item
        v-for="(item, key) in declareList"
        :key="key"
        :title="key"
        :name="key"
      >
        <div class="table">
          <el-table :data="item" stripe style="width: 100%">
            <el-table-column prop="id" v-if="false"> </el-table-column>
            <el-table-column prop="filename" label="文件名"> </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  ><span class="el-icon-delete"></span>删除</el-button
                >
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  ><span class="el-icon-download"></span>下载</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="state" v-if="isShow">
      <el-button type="success" @click="changeState(1)">审核通过</el-button>
      <el-button type="danger" @click="changeState(2)">审核未通过</el-button>
    </div>
  </div>
</template>

<script>
import { getDeclarefile, changeDeclare } from "@/api/request";
import Back from "@/components/Back";
export default {
  components: { Back },
  data() {
    return {
      declareid: 0,
      declareList: "",
      userName: "",
      state: "",
      isShow: true,
      //loading
      loading: true,
    };
  },
  methods: {
    handleClick(id) {
      console.log(id);
    },
    //判断审核状态
    getState(stateCord) {
      switch (stateCord) {
        case "0":
          this.state = "管理员未审核";
          this.isShow = true;
          break;
        case "1":
          this.state = "管理员已审核，审核已通过";
          this.isShow = false;
          break;
        case "2":
          this.state = "管理员已审核，审核未通过";
          this.isShow = false;
          break;
      }
    },
    //修改审核状态
    changeState(statecord) {
      let info = {};
      info.state = statecord;
      info.declareId = this.declareid;

      //提示窗
      this.$confirm("确认修改该审核状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确认修改
          changeDeclare(info).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.getDeclare();
              this.$message({
                type: "success",
                message: res.message,
                customClass:"notice"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    //获取用户文件
    getDeclare() {
      getDeclarefile(this.declareid).then((res) => {
        console.log(res.data);
        this.declareList = res.data.result;
        //关闭loading
        this.loading = false;
        //获取姓名
        this.userName = res.data.userName;
        //判断审核状态
        this.getState(res.data.state);
      });
    },
  },
  created() {
    this.declareid = this.$route.query.declareid;
    //获取用户文件
    this.getDeclare();
  },
};
</script>

<style lang="scss" scoped>
.head {
  position: relative;
  font-size: 0.2rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  background-color: #6fb7ff;
  color: #fff;
}
.perstate {
  position: absolute;
  //   width: 0.8rem;
  padding: 0 0.05rem;
  height: 0.3rem;
  line-height: 0.3rem;
  right: 0.5rem;
  // border: 0.01rem solid #fff;
  top: 50%;
  transform: translateY(-50%);
  // background-color: #aed5fc;
  font-size: 0.14rem;
}
.top {
  height: 0.4rem;
  line-height: 0.4rem;
  //   border: 1px solid #ccc;
  color: #6fb7ff;
}
// class=" el-icon-success"
:deep(.el-message__icon){
  color:#fff;
  font-size: .16rem !important;
}
// <div role="alert" class="el-message el-message--success notice" style="top: 20px; z-index: 2002;">…</div>flex
.state {
  //   border: 1px solid #ccc;
  height: 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
:deep(.el-collapse-item__header) {
  background-color: rgb(204, 204, 204);
  height: 0.4rem;
  color: rgb(88, 88, 88);
  font-size: 0.16rem;
}
.table {
  width: 80%;
  margin: 0 auto;
}
</style>