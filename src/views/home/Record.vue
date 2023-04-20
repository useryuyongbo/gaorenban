<template>
  <!-- 所有档案文件统计 -->
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
            <el-form-item label-width="80px" label="档案类别">
              <el-select
                v-model="selectForm.recordItemId"
                clearable
                @change="handlerPageNo"
                placeholder="请选择档案类别"
              >
                <el-option
                  v-for="item in recordLiat"
                  :key="item.id"
                  :label="item.itemname"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <el-form-item label-width="30px">
              <el-button type="primary" @click="openbox1" plain
                >增加档案类别</el-button
              >
            </el-form-item>
          </el-col>

          <el-col :span="6" :offset="3">
            <el-form-item label-width="80px">
              <el-button type="primary" @click="openbox" plain
                >上传文件</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <Addrecorditem
        :AddRecordVisbile="AddRecordVisbile"
        @changeShow="show1"
      ></Addrecorditem>
    </div>
    <div>
      <SubRecord
        :SubRecordVisbile="SubRecordVisbile"
        @changeShow="show"
      ></SubRecord>
    </div>

    <!-- 档案文件表格 -->
    <div class="table">
      <el-table
        :data="recordInfo"
        border
        style="width: 100%"
        height="4rem"
        v-loading="loading"
      >
        <el-table-column
          fixed
          prop="fileId"
          label="文件id"
          width="150"
          v-if="false"
        >
        </el-table-column>
        <el-table-column v-if="false" prop="fileId" label="文件id">
        </el-table-column>
        <el-table-column fixed prop="pno" label="工号"> </el-table-column>
        <el-table-column fixed prop="userName" label="姓名"> </el-table-column>
        <el-table-column prop="itemName" label="档案类别"> </el-table-column>
        <el-table-column prop="fileName" label="文件名称"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handleClickdel(scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
            <el-button
              @click="handleClickdownload(scope.row)"
              type="text"
              size="small"
              >下载</el-button
            >
          </template>
        </el-table-column>
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
import SubRecord from "../home/Subrecord.vue";
import Addrecorditem from "../home/addrecorditem.vue";

import {
  getRecorditem,
  getFileInfo,
  delectfile,
  dowwnload,
} from "@/api/request";

export default {
  components: { Pagehelper, SubRecord, Addrecorditem },
  inject: ["reload"],

  data() {
    return {
      //所有文件数据
      recordInfo: [],
      //loading
      loading: true,
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

      //档案类别列表
      recordLiat: [],

      //查询的表单数据
      selectForm: {
        name: "",
        recordItemId: "",
      },
      // 控制新增编辑弹窗的显示与隐藏
      SubRecordVisbile: false,
      AddRecordVisbile: false,
    };
  },

  methods: {
    show(data) {
      if (data == "false") {
        this.SubRecordVisbile = false;
      } else {
        this.SubRecordVisbile = true;
      }
    },
    show1(data) {
      if (data == "false") {
        console.log(this.addRecordVisbile);
        this.AddRecordVisbile = false;
      } else {
        this.AddRecordVisbile = true;
      }
    },
    //打开上传弹出框
    openbox() {
      this.SubRecordVisbile = true;
    },
    //打开添加档案类别弹出框
    openbox1() {
      this.AddRecordVisbile = true;
      console.log(this.AddRecordVisbile);
    },
    //删除
    handleClickdel(file) {
      var _this = this;
      delectfile(file.fileId).then((res) => {
        console.log(res);
      });
      _this.reload();
    },
    //下载
    handleClickdownload(file) {
      dowwnload(file.fileId).then((res) => {
        console.log(res);
        const blob = res;
        let url = URL.createObjectURL(blob);
        const aLink = document.createElement("a");
        aLink.href = url;
        aLink.download = file.fileName;
        aLink.click();
        URL.revokeObjectURL(url);
      });
      //let filename = file.fileName;
      //let extname = filename.substring(filename.indexOf("."));
      //console.log(extname);
    },
    //获取所有档案文件
    getInfo(current, pageSizesIndex, name, recordItemId) {
      // getUserInfo(this.page.current,this.page.pageSizes[this.page.pageSizesIndex]).then(res=>{
      getFileInfo(current, pageSizesIndex, name, recordItemId).then((res) => {
        // 获取数据response
        this.recordInfo = res.data.records;
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
        this.selectForm.recordItemId
      );
    },

    // 获取所有档案类别
    getRecorditemclass() {
      getRecorditem().then((res) => {
        this.recordLiat = res.data;
      });
    },

    //查询
    handlerPageNo() {
      console.log(this.selectForm);
      this.getInfo(
        this.page.current,
        this.page.pageSizes[this.page.pageSizesIndex],
        this.selectForm.name,
        this.selectForm.recordItemId
      );
      console.log(this.recordLiat)
      console.log(this.selectForm)
      console.log(this.recordInfo)
    },
  },

  created() {
    //获取所有档案文件
    this.getInfo(
      this.page.current,
      this.page.pageSizes[this.page.pageSizesIndex],
      this.selectForm.name,
      this.selectForm.recordItemId
    );
    // 获取所有档案类别
    this.getRecorditemclass();
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
