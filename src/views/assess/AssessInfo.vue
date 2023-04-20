<template>
  <!-- 所有申报信息统计 -->
  <div class="recordInfo">
    <!-- <template>
      <el-alert
        title="有中期考核提醒"
        type="info"
        effect="dark"
        show-icon
        close-text="知道了"
      >
      </el-alert>
      <el-alert
        title="有届满考核提醒"
        type="info"
        effect="dark"
        show-icon
        close-text="知道了"
      >
      </el-alert>
    </template> -->

    <div class="head">
      <el-form
        :model="selectForm"
        ref="selectForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="8">
          <el-col :span="6">
            <el-form-item label-width="60px" label="姓名">
              <el-input
                v-model="selectForm.name"
                clearable
                @change="handlerPageNo"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="审核状态">
              <el-select
                v-model="selectForm.statusId"
                clearable
                @change="handlerPageNo"
                placeholder="请选择审核状态"
              >
                <el-option
                  v-for="item in auditStatus"
                  :key="item.state"
                  :label="item.state"
                  :value="item.state"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
<!--          <el-col :span="8">-->
<!--            <el-form-item label="选择时间范围">-->
<!--              <div class="block" >-->
<!--                <el-date-picker-->
<!--                  v-model="value1"-->
<!--                  @change="selectTime"-->
<!--                  type="daterange"-->
<!--                  range-separator="至"-->
<!--                  start-placeholder="开始日期"-->
<!--                  end-placeholder="结束日期"-->
<!--                >-->
<!--                </el-date-picker>-->
<!--              </div>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="5">
            <el-form-item label-width="4"
              ><el-button type="primary"
                >导出中期/届满名单</el-button
              ></el-form-item
            >
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="80px">
              <el-button type="primary" @click="openbox1" plain
                >增加材料类别</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 审核信息表格 -->
    <div class="table">
      <el-table
        v-loading="loading"
        :data="declareInfo"
        border
        style="width: 100%"
        height="4rem"
      >
        <el-table-column
          fixed
          prop="declareid"
          label="审核id"
          width="150"
          v-if="false"
        >
        </el-table-column>
        <el-table-column fixed prop="pno" label="工号"> </el-table-column>
        <el-table-column fixed prop="userName" label="姓名"> </el-table-column>
<!--        <el-table-column prop="createtime" label="提交时间"> </el-table-column>-->
        <el-table-column
            prop="createtime"
            label="提交时间"
            sortable
            width="180">
        </el-table-column>
        <el-table-column prop="state" label="审核状态"> </el-table-column>
        <el-table-column prop="audittime" label="审核时间"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              @click="send(scope.row.userId)"
              type="primary"
              size="small"
              >发送考核提醒</el-button
            >
            <el-button
              @click="sendanymind(scope.row.userId)"
              type="primary"
              size="small"
              >发送自定义提醒</el-button
            >
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row.id)"
              type="text"
              size="small"
              >查看审核材料</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom">
      <!-- 分页组件 -->
      <pagehelper :page="page" @changePage="changePage"></pagehelper>
    </div>
    <Addprojectitem
      :AddRecordVisbile="AddRecordVisbile"
      @changeShow="show1"
    ></Addprojectitem>
  </div>
</template>

<script>
//引入分页组件
import Pagehelper from "../../components/Pagehelper.vue";
import Addprojectitem from "../home/addExamtype.vue";
import {
  getDeclareInfo,
  getfinalExam,
  getmidExam,
  examgetBypage,
  sendRemind,
  sendanyRemind,
} from "@/api/request";
import declareInfo from "@/views/declare/DeclareInfo.vue";

export default {
  components: { Pagehelper, Addprojectitem },

  data() {
    return {
      value1: "",
      //控制显示隐藏
      AddRecordVisbile: false,
      panduan1: 1,
      panduan2: 1,
      //loading
      loading: true,

      //所有文件数据
      declareInfo: [],
      //时间筛选后的数据
      sTime: [],

      // 分页对象
      page: {
        //总数据
        total: 0,
        //当前页
        current: 1,
        //一页最大条数
        pageSizes: [5, 10, 20],
        //选择一页最大数下标
        pageSizesIndex: 0,
      },

      //人才审核状态列表
      auditStatus: [
        {
          id: 0,
          state: "未审核",
        },
        {
          id: 1,
          state: "已通过",
        },
        {
          id: 2,
          state: "未通过",
        },
        {
          id: 3,
          state: "已退回",
        },
      ],

      //查询的表单数据
      selectForm: {
        name: "",
        statusId: "",
      },
    };
  },

  methods: {
    //发送自定义提醒
    sendanymind(data) {
      this.$prompt("请输入发送内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          sendanyRemind(value, data).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "已发送" + value,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    //发送考核提醒
    send(data) {
      sendRemind(data).then((res) => {
        console.log(res);
      });
    },
    //显示隐藏
    show1(data) {
      if (data == "false") {
        console.log(this.addRecordVisbile);
        this.AddRecordVisbile = false;
      } else {
        this.AddRecordVisbile = true;
      }
    },
    //显示隐藏
    openbox1() {
      this.AddRecordVisbile = true;
      console.log(this.AddRecordVisbile);
    },
    // 查看个人审核材料
    handleClick(declareid) {
      console.log(declareid);
      this.$router.push({
        path: "/home/assess/PersonAssess?declareid=" + declareid,
      });
    },
    //中期、届满考核提醒
    open1() {
      this.$notify({
        title: "提示",
        message: "有中期考核提醒",
        type: "warning",
        duration: 0,
      });
    },

    open2() {
      this.$notify({
        title: "提示",
        message: "有届满考核提醒",
        type: "warning",
        duration: 0,
      });
    },

    //获取所有档案文件
    getInfo(current, pageSizesIndex, name, state) {
      // getUserInfo(this.page.current,this.page.pageSizes[this.page.pageSizesIndex]).then(res=>{
      examgetBypage(current, name, pageSizesIndex, state).then((res) => {
        // 获取数据response
        this.declareInfo = res.data.records;
        //关闭loading
        this.loading = false;
        //获取总数
        this.page.total = res.data.total;
        console.log(res.data);
        console.log(this.declareInfo)
        // console.log(this.declareInfo[0].state);
      });
    },

    //接收分页组件传来的page
    //换页
    changePage(page) {
      this.page = page;
      // console.log(this.page);
      //获取分页后的文件信息
      this.getInfo(
        this.page.current,
        this.page.pageSizes[this.page.pageSizesIndex],
        this.selectForm.name,
        this.selectForm.statusId
      );
    },

    //查询
    handlerPageNo() {
      console.log(this.declareInfo)
      this.getInfo(
        this.page.current,
        this.page.pageSizes[this.page.pageSizesIndex],
        this.selectForm.name,
        this.selectForm.statusId
      );
      console.log(this.selectForm)
      console.log(this.auditStatus)
      console.log(this.declareInfo)
    },
    selectTime() {
      // for(i=0;i<this.declareInfo.length;i++){
      //   if (this.declareInfo[i].createtime in this.value1)
      //       this.sTime.push(this.declareInfo[i])
      // }
      console.log(this.declareInfo[1].createtime)
      console.log(this.value1)
    }
  },

  created() {
    //获取所有申报信息
    this.getInfo(
      this.page.current,
      this.page.pageSizes[this.page.pageSizesIndex],
      this.selectForm.name,
      this.selectForm.statusId
    );
    getfinalExam().then((res) => {
      if (res.data == true) {
        this.open1();
      }
    });
    getmidExam().then((res) => {
      if (res.data == true) {
        this.open2();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.head {
  height: 0.5rem;
  margin-bottom: 0.1rem;
}
// .table{
//   height: 400px;
//   overflow: auto;
// }
.bottom {
  height: 0.5rem;
  margin-top: 0.1rem;
}
.el-alert {
  height: 1rem;
}
</style>
