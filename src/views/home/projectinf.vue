<template>
  <!-- 所有申报信息统计 -->
  <div class="recordInfo">
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
                  :key="item.id"
                  :label="item.statusName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="6">
            <el-form-item label-width="80px">
              <el-button type="primary" @click="openbox1" plain
                >增加材料类别</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <Addprojectitem
          :AddRecordVisbile="AddRecordVisbile"
          @changeShow="show1"
        ></Addprojectitem>
      </div>
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
        <el-table-column prop="createtime" label="提交时间"> </el-table-column>
        <el-table-column prop="state" label="审核状态"> </el-table-column>
        <el-table-column prop="audittime" label="审核时间"> </el-table-column>
<!--        <el-table-column fixed="right" label="操作" width="100">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              @click="handleClick(scope.row.declareid)"-->
<!--              type="text"-->
<!--              size="small"-->
<!--              >查看审核材料</el-button-->
<!--            >-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
    </div>
    <div class="bottom">
      <!-- 分页组件 -->
      <pagehelper :page="page" @changePage="changePage"></pagehelper>
    </div>
  </div>
</template>

<script>
//引入分页组件
import Pagehelper from "../../components/Pagehelper.vue";
import Addprojectitem from "../home/addprojectitem.vue";

import { getDeclareInfo } from "@/api/request";

export default {
  components: { Pagehelper, Addprojectitem },

  data() {
    return {
      //loading
      loading: true,

      //所有文件数据
      declareInfo: [],

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
      //控制显示隐藏
      AddRecordVisbile: false,

      //人才审核状态列表
      auditStatus: [
        {
          id: 0,
          statusName: "未审核",
        },
        {
          id: 1,
          statusName: "已通过",
        },
        {
          id: 2,
          statusName: "未通过",
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
    // 查看个人审核材料
    handleClick(declareid) {
      console.log(declareid);
      this.$router.push({
        path: "/home/project/projectDeclare?projectid=" + declareid,
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

    //获取所有档案文件
    getInfo(current, pageSizesIndex, name, state) {
      // getUserInfo(this.page.current,this.page.pageSizes[this.page.pageSizesIndex]).then(res=>{
      getDeclareInfo(current, pageSizesIndex, name, state).then((res) => {
        // 获取数据response
        this.declareInfo = res.data.records;
        //关闭loading
        this.loading = false;
        //获取总数
        this.page.total = res.data.total;
        console.log(res.data);
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
      console.log(this.selectForm);
      this.getInfo(
        this.page.current,
        this.page.pageSizes[this.page.pageSizesIndex],
        this.selectForm.name,
        this.selectForm.statusId
      );
    },
  },

  created() {
    //获取所有申报信息
    this.getInfo(
      this.page.current,
      this.page.pageSizes[this.page.pageSizesIndex],
      this.selectForm.name,
      this.selectForm.statusId
    );
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
</style>
