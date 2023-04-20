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
            <el-form-item label-width="80px" label="档案到否">
              <el-select
                v-model="selectForm.archive"
                clearable
                placeholder="请选择档案到否"
                @change="handlerPageNo"
              >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label-width="5px">
              <el-upload
                class="upload-demo"
                action="http://81.69.222.253:8080/api/excel/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">请上传人才excel</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="0.5">
            <el-form-item label-width="5px">
              <el-button type="primary" @click="downExcel">下载模板</el-button>
            </el-form-item>
          </el-col>
        </el-row>
<!--        <el-row :gutter="5">-->
<!--          <el-col :span="4">-->
<!--            <el-form-item label-width="80px" label="所在单位">-->
<!--              <el-select-->
<!--                v-model="selectForm.nowUnit"-->
<!--                clearable-->
<!--                @change="handlerPageNo"-->
<!--                placeholder="请选择"-->
<!--              >-->
<!--                <el-option-->
<!--                  v-for="item in unitlist"-->
<!--                  :key="item.id"-->
<!--                  :label="item.info"-->
<!--                  :value="item.id"-->
<!--                ></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <!-- <el-col :span="4">
            <el-form-item label-width="80px" label="所在专业">
              <el-select
                v-model="selectForm.talentId"
                clearable
                @change="handlerPageNo"
                placeholder="请选择专业"
              >
                <el-option
                  v-for="item in talentLiat"
                  :key="item.id"
                  :label="item.info"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
<!--          <el-col :span="4">-->
<!--            <el-form-item label-width="80px" label="人才类型">-->
<!--              <el-select-->
<!--                v-model="selectForm.talentType"-->
<!--                clearable-->
<!--                @change="handlerPageNo"-->
<!--                placeholder="请选择"-->
<!--              >-->
<!--                <el-option-->
<!--                  v-for="item in talentTypelist"-->
<!--                  :key="item.id"-->
<!--                  :label="item.info"-->
<!--                  :value="item.info"-->
<!--                ></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <!-- <el-col :span="4">
            <el-form-item label-width="80px" label="人才级别">
              <el-select
                v-model="selectForm.talentId"
                clearable
                @change="handlerPageNo"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in talentLiat"
                  :key="item.id"
                  :label="item.info"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="4">
            <el-form-item label-width="80px" label="人才称号">
              <el-select
                v-model="selectForm.talentId"
                clearable
                @change="handlerPageNo"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in talentLiat"
                  :key="item.id"
                  :label="item.info"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
<!--          <el-col :span="5">-->
<!--            <el-form-item label="选择时间范围">-->
<!--              <el-date-picker-->
<!--                v-model="value1"-->
<!--                type="daterange"-->
<!--                range-separator="至"-->
<!--                start-placeholder="开始日期"-->
<!--                end-placeholder="结束日期"-->
<!--              >-->
<!--              </el-date-picker>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row :gutter="5">-->
<!--          <el-col :span="4">-->
<!--            <el-form-item label-width="80px" label="在岗状态">-->
<!--              <el-select-->
<!--                v-model="selectForm.ifDuty"-->
<!--                clearable-->
<!--                @change="handlerPageNo"-->
<!--                placeholder="请选择在岗状态"-->
<!--              >-->
<!--                <el-option-->
<!--                  v-for="item in ifDutylist"-->
<!--                  :key="item.id"-->
<!--                  :label="item.info"-->
<!--                  :value="item.id"-->
<!--                ></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="4">-->
<!--            <el-form-item label-width="80px" label="引育方式">-->
<!--              <el-select-->
<!--                v-model="selectForm.workclass"-->
<!--                clearable-->
<!--                @change="handlerPageNo"-->
<!--                placeholder="请选择引育方式"-->
<!--              >-->
<!--                <el-option label="引进" value="引进"></el-option>-->
<!--                <el-option label="培养" value="培养"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="4">-->
<!--            <el-form-item label-width="80px" label="岗位类型">-->
<!--              <el-select-->
<!--                v-model="selectForm.workclass1"-->
<!--                clearable-->
<!--                @change="handlerPageNo"-->
<!--                placeholder="请选择"-->
<!--              >-->
<!--                <el-option-->
<!--                  v-for="item in workclasslist"-->
<!--                  :key="item.id"-->
<!--                  :label="item.info"-->
<!--                  :value="item.id"-->
<!--                ></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col class=".el-row1" :span="5">-->
<!--            <el-form-item label-width="5px">-->
<!--              <el-button type="primary" @click="daochuuserinfo"-->
<!--                >导出选择信息</el-button-->
<!--              >-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col class=".el-row1" :span="3">-->
<!--            <el-form-item label-width="0px">-->
<!--              <el-button type="primary" @click="dy"-->
<!--                >打印选择人才津贴</el-button-->
<!--              >-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col class=".el-row1" :span="3">-->
<!--            <el-form-item label-width="0px">-->
<!--              <el-button type="primary" @click="dy"-->
<!--                >打印选择人才年薪</el-button-->
<!--              >-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
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
        <el-table-column fixed prop="pno" label="工号" width="120">
        </el-table-column>
        <el-table-column fixed prop="name" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="80"> </el-table-column>
        <el-table-column prop="birthdaydate" label="出生日期" width="120">
        </el-table-column>
        <el-table-column prop="birthplace" label="出生地" width="120">
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
        </el-table-column>
<!--        <el-table-column-->
<!--          fixed="right"-->
<!--          label="打印安家费和住房补贴通知单"-->
<!--          width="230"-->
<!--        >-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              @click="dy(scope.row.userid)"-->
<!--              type="primary"-->
<!--              size="medium"-->
<!--              >打印</el-button-->
<!--            >-->
<!--          </template>-->
<!--        </el-table-column>-->

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
      <!-- :personInfo="personInfo" -->

      <personal
        v-show="dialog_visible"
        @closeMask="showMask"
        :personInfo="personInfo"
        :urlImg="urlImg"
      >
      </personal>
    </div>
    <div class="bottom">
      <!-- 分页组件 -->
      <pagehelper :page="page" @changePage="changePage"></pagehelper>
    </div>
  </div>
</template>

<script>
//引入弹出层组件
import Personal from "../../components/userInfo/Personal.vue";
//引入分页组件
import Pagehelper from "../../components/Pagehelper.vue";

import {
  getUserInfo,
  userDetail,
  getTalent,
  dowwnload,
  uploadexcel,
  daochuuserinfo,
  getUrl,
} from "@/api/request";

export default {
  components: { Personal, Pagehelper },

  data() {
    return {
      urlImg: "",
      flag: false,
      headerobj: {
        //'Content-Type': 'application/json'
        "Content-Type": "multipart/form-data",
      },
      fileList: [
        //{ name: "", url: "" }
      ],
      unitlist: [
        { id: 1, info: "单位1", period: 5 },
        { id: 2, info: "单位2", period: 5 },
      ],
      talentTypelist: [
        { id: 1, info: "人才类型", period: 5 },
        { id: 2, info: "人才类型", period: 5 },
      ],
      ifDutylist: [
        {
          id: 0,
          info: "不在岗",
        },
        { id: 1, info: "在岗" },
        { id: 2, info: "离职" },
      ],
      workclasslist: [
        { id: 1, info: "柔性" },
        { id: 2, info: "全职" },
      ],
      value1: "",
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
        //         "infoid": 2,
        //         "pno": "1",
        //         "name": "李缘琪1",
        //         "sex": "女",
        //         "birthdaydate": "1999-08-02",
        //         "national": "汉",
        //         "earnedTitle": null,
        //         "birthplace": "河南",
        //         "international": "中国",
        //         "political": "群众",
        //         "address": "开封",
        //         "phone": "1823",
        //         "email": "155",
        //         "idcard": "411329200004220339",
        //         "title": "职称",
        //         "nowunit": "现在单位",
        //         "preunit": "以前单位",
        //         "undergraduateschool": "本科学校",
        //         "undergraduateintime": "1999-08-08",
        //         "undergraduateprofessional": "本科专业",
        //         "masterschool": "研究生学校",
        //         "masterintime": "1999-08-09",
        //         "masterprofession": "研究生专业",
        //         "finalrecord": "最后学历",
        //         "finalprofession": "最终专业",
        //         "finalreach": "最终方向",
        //         "talentid": 1,
        //         "talenttype": "人才类型",
        //         "archive": "档案是否到了",
        //         "hireid": 1,
        //         "userid": 1,
        //         "workguard": "上岗依据",
        //         "workclass": "上岗类型",
        //         "comment": null,
        //         "image": null
        //       },
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
        endTime: "",
        ifDuty: "",
        nowUnit: "",
        startTime: "",
        talentType: "",
        workclass: "",
      },
    };
  },
  methods: {
    // 打印主方法
    dy(id) {
      this.getFile(id).then((result) => {
        const binaryData = [];
        binaryData.push(result.data);
        //获取blob链接
        let pdfUrl = window.URL.createObjectURL(
          new Blob(binaryData, { type: "application/pdf" })
        );
        if (pdfUrl) {
          this.handlePrint(pdfUrl);
        }
      });
    },
    // 调用打印预览功能
    handlePrint(pdf) {
      if (document.getElementById("print-iframe")) {
        document.body.removeChild(document.getElementById("print-iframe"));
      }
      //判断iframe是否存在，不存在则创建iframe
      let iframe = document.getElementById("print-iframe");
      if (!iframe) {
        iframe = document.createElement("IFRAME");
        let doc = null;
        iframe.setAttribute("src", pdf);
        iframe.setAttribute("id", "print-iframe");
        document.body.appendChild(iframe);
        doc = iframe.contentWindow.document;
        doc.close();
        iframe.contentWindow.focus();
      }
      iframe.contentWindow.print();
    },
    // 从后端获取文件流
    getFile(id) {
      return this.axios({
        method: "GET",
        url: this.baseUrl + "/getSafeDoc?id=" + id,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        responseType: "arraybuffer", //一定要设置响应类型，否则页面会是空白pdf
      });
    },

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
      var s = this.ids.toString();
      daochuuserinfo(s).then((res) => {
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
      //发送请求获取个人详细信息
      userDetail(userId).then((res) => {
        this.personInfo = res.data;
      });
      getUrl(userId).then((res) => {
        this.urlImg = res.message;
      });
      this.flag = true;
      this.dialog_visible = true;
    },
    //获取所有用户
    getInfo(
      current,
      pageSizesIndex,
      name,
      pno,
      talentId,
      archive,
      endTime,
      ifDuty,
      nowUnit,
      startTime,
      talentType,
      workclass
    ) {
      getUserInfo(
        current,
        pageSizesIndex,
        name,
        pno,
        talentId,
        archive,
        endTime,
        ifDuty,
        nowUnit,
        startTime,
        talentType,
        workclass
      ).then((res) => {
        console.log("获取全部用户");
        console.log(res);
        //获取数据response
        this.userTab = res.data.records;
        //关闭loading
        this.loading = false;
        //获取总数
        this.page.total = res.data.total;
        // console.log(res.data);
      });
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
        this.selectForm.archive,
        this.value1[1],
        this.selectForm.ifDuty,
        this.selectForm.nowUnit,
        this.value1[0],
        this.selectForm.talentType,
        this.selectForm.workclass
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
        this.selectForm.archive,
        this.value1[1],
        this.selectForm.ifDuty,
        this.selectForm.nowUnit,
        this.value1[0],
        this.selectForm.talentType,
        this.selectForm.workclass
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
      this.selectForm.archive,
      this.value1[1],
      this.selectForm.ifDuty,
      this.selectForm.nowUnit,
      this.value1[0],
      this.selectForm.talentType,
      this.selectForm.workclass
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
