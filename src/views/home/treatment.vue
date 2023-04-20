<template>
  <!-- 所有人才信息统计 -->
  <div class="userInfo">
    <div class="head">
      <el-form
        :model="selectForm"
        ref="selectForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="5">
          <el-col :span="4">
            <el-form-item label-width="60px" label="姓名">
              <el-input
                v-model="selectForm.name"
                clearable
                @change="handlerPageNo"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="60px" label="工号">
              <el-input
                v-model="selectForm.pno"
                clearable
                @change="handlerPageNo"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="80px" label="人才类别">
              <el-select
                v-model="selectForm.talentId"
                clearable
                @change="handlerPageNo"
                placeholder="请选择人才类别"
              >
                <el-option
                  v-for="item in talentLiat"
                  :key="item.id"
                  :label="item.info"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="7px">
              <el-button type="primary" @click="daochuuserinfo"
                >对选中人才生成单据</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 人才信息表格 -->
    <div class="table">
      <el-table
        :data="userTab"
        border
        ref="multipleTable"
        style="width: 100%"
        height="4rem"
        v-loading="loading"
        :row-key="(row) => row.userid"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true">
        </el-table-column>
        <el-table-column
          fixed
          prop="userid"
          label="序号"
          width="150"
          v-if="false"
        >
        </el-table-column>
        <el-table-column fixed prop="pno" label="工号" width="250">
        </el-table-column>
        <el-table-column fixed prop="name" label="姓名" width="250">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="250"> </el-table-column>
        <el-table-column prop="birthdaydate" label="出生日期" width="250">
        </el-table-column>
        <!-- <el-table-column prop="birthplace" label="出生地" width="120">
        </el-table-column>
        <el-table-column prop="international" label="国籍" width="100">
        </el-table-column>
        <el-table-column prop="political" label="政治面貌" width="120">
        </el-table-column>
        <el-table-column prop="address" label="现居地址" width="150">
        </el-table-column>
        <el-table-column prop="phone" label="电话号码" width="120">
        </el-table-column>
        <el-table-column prop="email" label="邮箱号" width="120">
        </el-table-column>
        <el-table-column prop="idcard" label="身份证/签证" width="180">
        </el-table-column> -->

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row.userid)"
              type="text"
              size="small"
              >查看详细信息</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 个人详细信息弹出窗 -->
      <treatment
        v-show="dialog_visible"
        @closeMask="showMask"
        :personInfo="personInfo"
      >
      </treatment>
    </div>
    <div class="bottom">
      <!-- 分页组件 -->
      <pagehelper :page="page" @changePage="changePage"></pagehelper>
    </div>
  </div>
</template>

<script>
//引入弹出层组件
import Treatment from "../../components/treatmentdamjv.vue";
//引入分页组件
import Pagehelper from "../../components/Pagehelper.vue";

import {
  getUserInfo,
  userDetail,
  getTalent,
  dowwnload,
  uploadexcel,
  daochuuserinfo,
} from "@/api/request";

export default {
  components: { Pagehelper, Treatment },

  data() {
    return {
      headerobj: {
        //'Content-Type': 'application/json'
        "Content-Type": "multipart/form-data",
      },
      fileList: [
        //{ name: "", url: "" }
      ],
      filename: "模板",
      ids: [],
      selectList: [],
      //是否显示弹出层
      dialog_visible: false,
      //loading
      loading: true,

      //所有用户数据
      userTab: [
        // {
        //     userId:1,//用户id
        //     pno: "",//工号
        //     name: "",//姓名
        //     sex: "",//性别
        //     birthdayDate: "",//出生日期
        //     national:"",//民族
        //     birthPlace:"",//出生地
        //     interNational:"",//国籍
        //     political:"",//政治面貌
        //     address:"",//现居地址
        //     phone:"",//电话号码
        //     email:"",//邮箱号
        //     idCard:"",//身份证/签证
        // }
      ],

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

      //人才类别列表
      talentLiat: [],
      //个人详细信息
      personInfo: {},

      //查询的表单数据
      selectForm: {
        name: "",
        pno: "",
        talentId: "",
        archive: "",
      },
    };
  },
  methods: {
    //文件上传控制
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
    //下载excel
    downExcel() {
      dowwnload(214).then((res) => {
        console.log(res);
        const blob = res;
        let url = URL.createObjectURL(blob);
        const aLink = document.createElement("a");
        aLink.href = url;
        aLink.download = this.filename;
        aLink.click();
        URL.revokeObjectURL(url);
      });
    },
    //上传excel
    upload() {
      let formData = new FormData();
      formData = this.fileList;
      console.log(formData);
      uploadexcel(formData).then((res) => {
        console.log(res);
        if (res.message == "success") {
          this.$message({
            message: "上传成功",
            type: "success",
          });
        } else {
          this.$message.error("上传失败");
        }
      });
    },

    //多项框
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.selectList = val;
      console.log(this.selectList);
      this.ids = val.map((item) => {
        return item.userid; //要id 要什么字段这里写什么字段
      });
      console.log(this.ids);
    },
    //导出用户信息
    daochuuserinfo() {
      daochuuserinfo(this.ids).then((res) => {
        const blob = res;
        let url = URL.createObjectURL(blob);
        const aLink = document.createElement("a");
        aLink.href = url;
        aLink.download = this.filename;
        aLink.click();
        URL.revokeObjectURL(url);
      });
    },
    //点击,发送请求,弹出个人信息，传递参数
    handleClick(userId) {
      this.dialog_visible = true;
      //发送请求获取个人详细信息
      userDetail(userId).then((res) => {
        this.personInfo = res.data;
        console.log(res.data);
      });
    },
    //获取所有用户
    getInfo(current, pageSizesIndex, name, pno, talentId, archive) {
      getUserInfo(current, pageSizesIndex, name, pno, talentId, archive).then(
        (res) => {
          console.log(res);
          //获取数据response
          this.userTab = res.data.records;
          //关闭loading
          this.loading = false;
          //获取总数
          this.page.total = res.data.total;
          // console.log(res.data);
        }
      );
    },
    //关闭弹窗
    showMask(isShow) {
      this.dialog_visible = isShow;
    },
    //接收分页组件传来的page
    //换页
    changePage(page) {
      this.page = page;
      // console.log(this.page);
      //获取用户信息
      this.getInfo(
        this.page.current,
        this.page.pageSizes[this.page.pageSizesIndex],
        this.selectForm.name,
        this.selectForm.pno,
        this.selectForm.talentId,
        this.selectForm.archive
      );
    },

    // 获取所有人才类别
    getTalentClass() {
      getTalent().then((res) => {
        this.talentLiat = res.data;
        // console.log(this.talentLiat);
      });
    },

    //查询
    handlerPageNo() {
      // console.log(this.selectForm);
      this.getInfo(
        this.page.current,
        this.page.pageSizes[this.page.pageSizesIndex],
        this.selectForm.name,
        this.selectForm.pno,
        this.selectForm.talentId,
        this.selectForm.archive
      );
    },
  },

  created() {
    //获取用户信息
    this.getInfo(
      this.page.current,
      this.page.pageSizes[this.page.pageSizesIndex],
      this.selectForm.name,
      this.selectForm.pno,
      this.selectForm.talentId,
      this.selectForm.archive
    );
    // 获取所有人才类别
    this.getTalentClass();
  },
};
</script>

<style lang="scss" scoped>
.el-row1 {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}

.head {
  height: 0.5rem;
  // border: 1px solid #f00;
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
