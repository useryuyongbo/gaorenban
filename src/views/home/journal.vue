<template>
  <!-- 所有日志信息 -->
  <div class="userInfo">
    <div class="head">
      <el-form
        :model="selectForm"
        ref="selectForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="5">
          <el-col :span="6">
            <el-form-item label-width="60px" label="姓名">
              <el-input
                v-model="selectForm.name"
                clearable
                @input="handlerPageNo"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 日志信息 -->
    <div class="table">
      <el-table
        :data="journalTab"
        border
        style="width: 100%"
        height="4rem"
        v-loading="loading"
      >
        <el-table-column fixed prop="id" label="序号" width="150">
        </el-table-column>
        <el-table-column fixed prop="userid" label="编号" width="120">
        </el-table-column>
        <el-table-column fixed prop="username" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="150">
        </el-table-column>
        <el-table-column prop="args" label="提示" width="180"> </el-table-column
        >opttime
        <el-table-column prop="opttime" label="操作时间" width="180">
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

import { getjournal } from "@/api/request";

export default {
  components: { Pagehelper },

  data() {
    return {
      //loading
      loading: true,

      //所有用户数据
      journalTab: [
        // {
        //     "id": 15,
        //      "username": "贺总",
        //      "userid": "8",
        //      "operation": "登录",
        //      "args": "涉及密码等不予展示",
        //      "opttime": "2022年11月05日 18时29分05秒"
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
      },
    };
  },

  methods: {
    //获取日志
    getJournal(current, size, userName) {
      let data = { current, size, userName };
      console.log(data);
      getjournal(data).then((res) => {
        console.log("res");
        console.log(res);
        this.journalTab = res.data.records;
        this.loading = false;
        //获取总数
        this.page.total = res.data.total;
      });
    },

    //接收分页组件传来的page
    //换页
    changePage(page) {
      this.page = page;
      // console.log(this.page);
      //获取用户信息
      this.getJournal(
        this.page.current,
        this.page.pageSizes[this.page.pageSizesIndex],
        this.selectForm.name
      );
    },

    //查询
    handlerPageNo() {
      //console.log(this.selectForm);
      this.getJournal(
        this.page.current,
        this.page.pageSizes[this.page.pageSizesIndex],
        this.selectForm.name
      );
    },
  },

  created() {
    //获取用户信息
    this.getJournal(
      this.page.current,
      this.page.pageSizes[this.page.pageSizesIndex],
      this.selectForm.name
    );
    // 获取所有人才类别
  },
};
</script>

<style lang="scss" scoped>
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
