<template>
  <!-- 表格下载 -->
  <div class="recordInfo">
    <!-- <download-excel :data="DetailsForm" :fields="json_fields" :name="excelName">
      <el-button type="primary" plain class="down">下载表格</el-button>
    </download-excel> -->

    <!-- 所有申报信息统计 -->

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
            <el-form-item label-width="80px" label="录入状态">
              <el-select
                v-model="selectForm.statusId"
                clearable
                @change="handlerPageNo"
                placeholder="请选择录入状态"
              >
                <el-option
                  v-for="(item, index) in auditStatus"
                  :key="index"
                  :label="item"
                  :value="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <p v-if="funcheck == false">当前已全部审核</p>
              <p v-if="funcheck != false">当前未全部审核</p>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label-width="80px">
              <el-button type="primary">导出人才经费申报excel</el-button>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="6">
            <el-form-item label-width="80px">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary"
                  >上传财政处下拨经费excel</el-button
                >
                <div slot="tip" class="el-upload__tip">点击上传</div>
              </el-upload>
            </el-form-item>
          </el-col> -->
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
        <el-table-column fixed prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="totalMoney" label="全部金额"> </el-table-column>
        <el-table-column prop="usedMoney" label="已使用金额"> </el-table-column>
        <el-table-column prop="effectiveUsed" label="已通过数目">
        </el-table-column>
        <el-table-column prop="unCheck" label="未审核数目"> </el-table-column>
        <el-table-column prop="unPass" label="未通过数目"> </el-table-column>
        <!-- <el-table-column
          :label="index + 1"
          v-for="(item, index) in jingfeicishu"
          :key="index"
        >
          <template slot-scope="scope">
            {{ item.qian }}
          </template>
        </el-table-column> -->
        <el-table-column fixed="" label="申请详情" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row.userId)"
              type="text"
              size="small"
              >审核资金申请</el-button
            >
          </template>
        </el-table-column>
        <!-- <el-table-column fixed="right" prop="" label="申请详情">
          <template slot-scope="scope">
            {{ scope.row }}
            <el-button
              @click="handleClick(scope.row.userid)"
              type="text"
              size="small"
              >审核资金申请</el-button
            >
          </template>
        </el-table-column> -->
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

import {
  getDeclareInfo,
  getfundState,
  ifUndcheck,
  getByPagefund,
} from "@/api/request";

export default {
  components: { Pagehelper, Addprojectitem },

  data() {
    return {
      //是否审核标志
      funcheck: "",
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

      //经费审核状态列表
      // auditStatus: [
      //   {
      //     id: 0,
      //     statusName: "未录入",
      //   },
      //   {
      //     id: 1,
      //     statusName: "未通过",
      //   },
      //   {
      //     id: 2,
      //     statusName: "均录入",
      //   },
      // ],
      auditStatus: {
        0: "未审核",
        1: "已录入",
        2: "未录入",
      },
      //经费次数
      jingfeicishu: [
        { qian: 1000 },
        { qian: 2000 },
        { qian: 3000 },
        { qian: 4000 },
        { qian: 100 },
        { qian: 100 },
        { qian: 20 },
        { qian: 20 },
        { qian: 20 },
        { qian: 20 },
      ],
      //查询的表单数据
      selectForm: {
        name: "",
        statusId: "",
      },
    };
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 查看个人审核材料
    handleClick(declareid) {
      console.log(declareid);
      this.$router.push({
        path: "/home/expenditure/gocopyshenhe?projectid=" + declareid,
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
    // getInfo(current, pageSizesIndex, name, state) {
    //   // getUserInfo(this.page.current,this.page.pageSizes[this.page.pageSizesIndex]).then(res=>{
    //   getDeclareInfo(current, pageSizesIndex, name, state).then((res) => {
    //     // 获取数据response
    //     this.declareInfo = res.data.records;
    //     //关闭loading
    //     this.loading = false;
    //     //获取总数
    //     this.page.total = res.data.total;
    //     console.log(res.data);
    //   });
    // },
    //获取所有经费申请
    getPagefund(current, size, name, state) {
      getByPagefund(current, name, size, state).then((res) => {
        if (res.data == null) {
          this.declareInfo = null;
          console.log("jingfei");
          console.log(this.declareInfo);
        } else if (res.data != null) {
          this.declareInfo = res.data.records;
          console.log("jingfei");
          console.log(this.declareInfo);
        }

        this.loading = false;

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
      this.getPagefund(
        this.page.current,
        this.page.pageSizes[this.page.pageSizesIndex],
        this.selectForm.name,
        this.selectForm.statusId
      );
    },

    //查询
    handlerPageNo() {
      console.log(this.selectForm);
      this.getPagefund(
        this.page.current,
        this.page.pageSizes[this.page.pageSizesIndex],
        this.selectForm.name,
        this.selectForm.statusId
      );
    },
    //获得审核状态
    getfundState() {
      getfundState().then((res) => {
        var that = this;
        that.auditStatus = res.data;
      });
    },

    //查询是否有未审核
    fundcheck() {
      ifUndcheck().then((res) => {
        console.log(res);
        var that = this;
        that.funcheck = res.data;
      });
    },
  },

  created() {
    //获取所有申报信息
    // this.getInfo(
    //   this.page.current,
    //   this.page.pageSizes[this.page.pageSizesIndex],
    //   this.selectForm.name,
    //   this.selectForm.statusId
    // );
    // this.getfundState();
    // this.fundcheck();
    this.getPagefund(
      this.page.current,
      this.page.pageSizes[this.page.pageSizesIndex],
      this.selectForm.name,
      this.selectForm.statusId
    );
    this.getfundState();
    this.fundcheck();
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
