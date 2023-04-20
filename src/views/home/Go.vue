<template>
  <div class="block">
    <!-- <p>
      这是本年第{{ this.shenbaocishu }}次申报,您的余额为{{
        this.yve
      }},您当前的总经费为{{ this.zongjingfei }}
    </p> -->

    <div style="margin: 20px"></div>
    <div class="form">
      <el-form
        :label-position="labelPosition"
        label-width="120px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="本次申报名称" prop="shenbaomingcheng">
          <el-input v-model="ruleForm.shenbaomingcheng"></el-input>
        </el-form-item>
        <el-form-item label="本次申报金额" prop="shenbaojine">
          <el-input v-model.number="ruleForm.shenbaojine"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="open">申请</el-button> -->
          <!-- <el-button type="primary" @click="submitForm('ruleForm')"
            >申请</el-button
          > -->
          <el-button type="primary" @click="addFund(ruleForm)">申请</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p>您曾经的申请记录</p>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="createtime" label="日期" width="150">
      </el-table-column>
      <el-table-column prop="comment" label="申报名称" width="120">
      </el-table-column>
      <el-table-column prop="applyMoney" label="申请金额" width="120">
      </el-table-column>
      <el-table-column prop="agreemoney" label="同意金额" width="120">
      </el-table-column>
      <el-table-column prop="message" label="拒绝原因" width="120">
      </el-table-column>
      <el-table-column
        prop="audittime"
        label="审核时间"
        width="300"
      ></el-table-column>
      <!-- <el-table-column prop="this" label="此次申报金额" width="120">
      </el-table-column> -->
      <!-- <el-table-column prop="after" label="申报后剩余金额" width="300">
      </el-table-column> -->
      <el-table-column prop="state" label="是否录入" width="120">
        <template slot-scope="scope">
          <span>{{ code[scope.row.state] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addfund, getDetailfund } from "@/api/request";
import Upload from "@/components/Upload.vue";
export default {
  components: {
    Upload,
  },
  data() {
    var checkjine = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("金额不能为空"));
      }
      setTimeout(() => {
        console.log(value);
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value > this.yve) {
            callback(new Error("必须小于余额"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
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
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          total: 130,
          before: 120,
          this: 10,
          after: 110,
          iswrite: 1,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          total: 130,
          before: 110,
          this: 10,
          after: 100,
          iswrite: 1,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          total: 130,
          before: 100,
          this: 10,
          after: 90,
          iswrite: 0,
        },
      ],
      shenbaocishu: 1,
      zongjingfei: 6500,
      yve: 99999999999999,
      labelPosition: "right",
      ruleForm: {
        shenbaomingcheng: "",
        shenbaojine: "",
      },
      rules: {
        shenbaojine: [{ validator: checkjine, trigger: "blur" }],
      },
    };
  },
  methods: {
    //获取某人详细信息
    getDetail() {
      getDetailfund(this.$store.state.id).then((res) => {
        this.tableData = res.data;
      });
    },
    //经费申报
    addFund(ruleForm) {
      // let date = new Date();
      // //年
      // let year = new Date().getFullYear();
      // //月份是从0月开始获取的，所以要+1;
      // let month = new Date().getMonth() + 1;
      //日
      // let day = new Date().getDate();
      // //时
      // let hour = new Date().getHours();
      // //分
      // let minute = new Date().getMinutes();
      // //秒
      // let second = new Date().getSeconds();
      // let time = year + "-" + month + "-" + day;
      var date = new Date();
      var year = date.getFullYear(); //月份从0~11，所以加一
      let month = date.getMonth();
      console.log("month", month);
      var dateArr = [
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ];
      //如果格式是MM则需要此步骤，如果是M格式则此循环注释掉
      for (var i = 0; i < dateArr.length; i++) {
        if (dateArr[i] >= 1 && dateArr[i] <= 9) {
          dateArr[i] = "0" + dateArr[i];
        }
      }
      var strDate =
        year +
        "/" +
        dateArr[0] +
        "/" +
        dateArr[1] +
        " " +
        dateArr[2] +
        ":" +
        dateArr[3] +
        ":" +
        dateArr[4];
      //此处可以拿外部的变量接收  strDate:2022-05-01 13:25:30
      //this.date = strDate;
      addfund(
        ruleForm.shenbaojine,
        ruleForm.shenbaomingcheng,
        this.$store.state.id
      ).then((res) => {
        console.log(res);
        this.getDetail(),
          this.$alert(res.message, {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$message({
                type: "info",
                message: `action: ${action}`,
              });
            },
          });
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // open() {
    //   this.$confirm("此操作将提交申请, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       if (this.formLabelAlign.shenbaojine <= this.yve) {
    //         submitForm("ruleForm");
    //         this.$message({
    //           type: "success",
    //           message: "提交成功!",
    //         });
    //       } else {
    //         this.$message({
    //           type: "info",
    //           message: "申报金额超出余额",
    //         });
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "提交失败",
    //       });
    //     });
    // },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
  },
  created() {
    this.getDetail();
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 30px;
}
.form {
  margin: 0 auto;
  width: 4.5rem;
}
</style>
