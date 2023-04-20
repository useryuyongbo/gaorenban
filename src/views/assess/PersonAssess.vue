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
                  @click="examdeletefile(scope.row)"
                  type="text"
                  size="small"
                  ><span class="el-icon-delete"></span>删除</el-button
                >
                <el-button
                  @click="examdownloadfile(scope.row)"
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
      <el-button type="success" @click="changeStateput(1)">审核通过</el-button>
      <el-button type="warning" @click="changeStateput(3)">退回修改</el-button>
      <el-button type="danger" @click="changeStateput(2)">审核未通过</el-button>
    </div>
    <el-button @click="downloadall">打包下载</el-button>
  </div>
</template>

<script>
import {
  getDeclarefile,
  changeDeclare,
  examFiledetail,
  examFiledelete,
  examFiledownZip,
  examFiledownload,
  changeState,
} from "@/api/request";
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
      userid: "",
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
        case "3":
          this.state = "管理员已审核，已退回";
          this.isShow = false;
          break;
      }
    },
    //改变考核审核状态
    changeStateput(state) {
      let info = {};
      info.state = state;
      info.declareId = this.declareid;
      if (state == 3) {
        this.$prompt("请输入退回原因", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(({ value }) => {
            changeState(info.declareId, value, info.state).then((res) => {
              if (res.message == "success") {
                this.$message({
                  type: "success",
                  message: "退回原因是: " + value,
                });
              } else {
                this.$message.error("状态改变失败");
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
            });
          });
      } else {
        changeState(info.declareId, "", info.state).then((res) => {
          if (res.message == "success") {
            this.$message({
              type: "success",
              message: "改变状态成功",
            });
          } else {
            this.$message.error("状态改变失败");
          }
        });
      }
      this.getDeclare();
    },
    //根据id删除文件
    examdeletefile(row) {
      examFiledelete(row.id).then((res) => {
        if (res.message == "success") {
          this.$message("删除成功");
          this.getDeclare();
        } else {
          this.$message.error("删除失败");
        }
      });
    },

    //根据id下载文件
    examdownloadfile(file) {
      examFiledownload(file.id).then((res) => {
        const blob = res;
        // let url = URL.createObjectURL(blob);
        let binaryData = [];
        binaryData.push(blob);
        let url = window.URL.createObjectURL(new Blob(binaryData));

        const aLink = document.createElement("a");
        aLink.href = url;

        aLink.download = file.filename;
        aLink.click();
        URL.revokeObjectURL(url);
      });
    },
    //打包下载全部
    downloadall() {
      var declareId = this.declareid;
      var userId = this.userid;
      examFiledownZip(declareId, userId).then((res) => {
        // const blob = res;
        // let url = URL.createObjectURL(blob);
        // const aLink = document.createElement("a");
        // aLink.href = url;
        // aLink.download = this.userName;
        // aLink.click();
        // URL.revokeObjectURL(url);
        const blob = res;
        let url = null;
        const binaryData = [];
        binaryData.push(blob);
        url = window.URL.createObjectURL(
          new Blob(binaryData, { type: "application/pdf;chartset=UTF-8" })
        );

        // let binaryData = [];
        // binaryData.push(blob);
        // const url = window.URL.createObjectURL(binaryData);
        const link = window.document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", this.userName + "考核材料" + ".zip");
        document.body.appendChild(link);
        link.click();
      });
    },

    // //修改审核状态
    // changeState(statecord) {
    //   let info = {};
    //   info.state = statecord;
    //   info.declareId = this.declareid;

    //   //提示窗
    //   this.$confirm("确认修改该审核状态, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       //确认修改
    //       changeDeclare(info).then((res) => {
    //         console.log(res);
    //         if (res.code == 200) {
    //           this.$message({
    //             type: "success",
    //             message: res.message,
    //             customClass: "notice",
    //           });
    //         }
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消修改",
    //       });
    //     });
    // },
    //获取用户文件
    getDeclare() {
      // getDeclarefile(this.declareid).then((res) => {
      //   console.log(res.data);
      //   this.declareList = res.data.result;
      //   //关闭loading
      //   this.loading = false;
      //   //获取姓名
      //   this.userName = res.data.userName;
      //   //判断审核状态
      //   this.getState(res.data.state);
      // });
      examFiledetail(this.declareid).then((res) => {
        this.declareList = res.data.result;
        //关闭loading
        this.loading = false;
        //获取姓名
        this.userName = res.data.userName;
        this.userid = res.data.userId;
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
:deep(.el-message__icon) {
  color: #fff;
  font-size: 0.16rem !important;
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
