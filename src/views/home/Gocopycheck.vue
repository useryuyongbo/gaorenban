<template>
  <!-- 个人申报所有申报材料 -->
  <div class="block" v-loading="loading">
    <div class="top">
      <back></back>
    </div>
    <div class="head">
      {{ userName }}的申请资金详情
      <!-- <div class="perstate">{{ state }}</div> -->
    </div>
    <el-table :data="declareList" border style="width: 100%">
      <el-table-column fixed prop="comment" label="申报名称" width="150">
      </el-table-column>
      <el-table-column fixed prop="createtime" label="日期" width="150">
      </el-table-column>
      <el-table-column
        prop="applyMoney"
        label="此次申报金额"
        width="300"
      ></el-table-column>
      <el-table-column prop="agreemoney" label="同意金额" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.state === '1'">{{ scope.row.agreemoney }}</span>
          <el-input
            type="number"
            v-if="scope.row.state === '0'"
            v-model="scope.row.agreemoney"
          ></el-input>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="after" label="申报后剩余金额" width="300">
      </el-table-column> -->
      <el-table-column prop="state" label="是否录入" width="120">
        <template slot-scope="scope">
          <span>{{ code[scope.row.state] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="message" label="拒录原因" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.state === '2'">{{ scope.row.message }}</span>
          <el-input
            v-if="scope.row.state === '0'"
            v-model="scope.row.message"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleClick([scope.row, 1])"
            type="text"
            size="small"
            :disabled="
              scope.row.state === '1' || scope.row.state === '2' ? true : false
            "
            >录入</el-button
          >
          <el-button
            @click="handleClick([scope.row, 2])"
            type="text"
            size="small"
            :disabled="
              scope.row.state === '1' || scope.row.state === '2' ? true : false
            "
            >拒绝</el-button
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="delectapplymoney([scope.row.id])"
            type="text"
            size="small"
            >删除该经费申请</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-collapse accordion>
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
                  @click="handleClickdel(scope.row)"
                  type="text"
                  size="small"
                  ><span class="el-icon-delete"></span>删除</el-button
                >
                <el-button
                  @click="handleClickdownload(scope.row)"
                  type="text"
                  size="small"
                  ><span class="el-icon-download"></span>下载</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse> -->
    <!-- <div class="state" v-if="isShow">
      <el-button type="success" @click="changeState(1)">审核通过</el-button>
      <el-button type="danger" @click="changeState(2)">审核未通过</el-button>
    </div>
    <div>
      <el-button @click="handleClickdownloadall">下载全部材料</el-button>
    </div> -->
  </div>
</template>

<script>
import {
  getDeclarefile,
  changeDeclare,
  shenbaodelectfile,
  shenbaodowwnload,
  shenbaodowwnloadall,
  getDetailfund,
  selectNameById,
  getfundState,
  changeStatefund,
  deletefund,
} from "@/api/request";
import Back from "@/components/Back";
export default {
  components: { Back },
  inject: ["reload"],
  data() {
    return {
      declareid: 0,
      declareList: "",
      userName: "",
      userid: 0,
      state: "",
      isShow: true,
      //loading
      loading: true,

      code: {
        1: "已录入",
        0: "未录入",
        2: "已拒绝",
      },

      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          total: 130,
          before: 130,
          this: 10,
          after: 120,
          iswrite: 1,
          yvanyin: "",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          total: 130,
          before: 120,
          this: 10,
          after: 110,
          iswrite: 1,
          yvanyin: "",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          total: 130,
          before: 110,
          this: 10,
          after: 100,
          iswrite: 1,
          yvanyin: "",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          total: 130,
          before: 100,
          this: 10,
          after: 90,
          iswrite: 0,
          yvanyin: "",
        },
      ],
    };
  },
  methods: {
    //删除经费申请
    delectapplymoney(id) {
      this.$confirm("此操作将删除该申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletefund(id[0]).then((res) => {
            if (res.code == 200) {
              this.getDeclare();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //修改经费审核状态
    handleClick(row, state) {
      if (row[1] == 1 && !row[0].agreemoney) {
        this.$prompt("请输入同意金额", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^0|[^\d]/g,
          inputErrorMessage: "输入不是数字",
        })
          .then(({ value }) => {
            changeStatefund({
              aggrementMoney: value,
              id: row[0].id,
              message: row[0].message,
              state: row[1],
            }).then((res) => {
              if (res.code == 200) {
                this.getDeclare();
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
              }
            });
            this.$message({
              type: "success",
              message: "你同意录入的金额是: " + value,
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
            });
          });
      } else {
        this.$confirm("确认审核结果？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            changeStatefund({
              aggrementMoney: row[0].agreemoney,
              id: row[0].id,
              message: row[0].message,
              state: row[1],
            }).then((res) => {
              if (res.code == 200) {
                this.getDeclare();
                this.$message({
                  type: "success",
                  message: "修改成功!",
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
      }
    },

    // handleClick(id) {
    //   console.log(id);
    // },
    //删除
    handleClickdel(file) {
      var _this = this;
      shenbaodelectfile(file.id).then((res) => {
        console.log(res);
      });
      _this.reload();
    },
    //下载
    handleClickdownload(file) {
      console.log(file);
      shenbaodowwnload(file.id).then((res) => {
        console.log(res);
        const blob = res;
        let url = URL.createObjectURL(blob);
        const aLink = document.createElement("a");
        aLink.href = url;
        aLink.download = file.filename;
        aLink.click();
        URL.revokeObjectURL(url);
      });

      //let filename = file.fileName;
      //let extname = filename.substring(filename.indexOf("."));
      //console.log(extname);
    },
    //下载全部
    // handleClickdownloadall() {
    //   var declareId = this.declareid;
    //   var userId = this.userid;
    //   shenbaodowwnloadall(declareId, userId).then((res) => {
    //     console.log(declareId);
    //     console.log(res);
    //     const blob = res;
    //     let url = URL.createObjectURL(blob);
    //     const aLink = document.createElement("a");
    //     aLink.href = url;
    //     aLink.download = this.userName;
    //     aLink.click();
    //     URL.revokeObjectURL(url);
    //   });
    // },

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
                customClass: "notice",
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
    //获取用户资金信息
    getDeclare() {
      getDetailfund(this.declareid).then((res) => {
        console.log(res);
        this.declareList = res.data;
        //关闭loading
        this.loading = false;
      });
    },
    //获取用户名称
    selectName(id) {
      selectNameById(id).then((res) => {
        this.userName = res.data[id];
      });
    },
  },
  created() {
    this.declareid = this.$route.query.projectid;
    this.selectName(this.declareid);
    console.log(this.declareid);
    //获取用户资金信息
    this.getDeclare();
    getfundState.then((res) => {
      this.code = res.data;
    });
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
