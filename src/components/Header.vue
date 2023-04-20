<template>
  <div class="nav">
    <div class="top">
      <h5 class="title">高层次人才办公系统</h5>

      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link demo-type">
          <el-avatar size="large"> {{ this.$store.state.name1 }} </el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="undatePasw">修改密码</el-dropdown-item>

          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="1rem"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.newpass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { exit } from "@/api/request";
import router from "@/router";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //显示表单
      dialogFormVisible: false,
      //表单
      ruleForm: {
        newpass: "",
        checkPass: "",
        age: "",
      },
      //规则
      rules: {
        newpass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    //判断下拉列表选项
    handleCommand(commandKind) {
      //如果是修改密码
      if (commandKind == "undatePasw") {
        this.dialogFormVisible = true;
      } else if (commandKind == "exit") {
        exit().then((res) => {
          // console.log("tuichu");
          router.push("/login");
        });
      }
      // console.log(commandKind);
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 0.2rem;
}
.title {
  height: 0.6rem;
  width: 2.5rem;
  font-size: 0.2rem;
  line-height: 0.6rem;
  color: #fff;
  font-weight: 600;
  background-color: rgb(64, 158, 255);
}
.demo-type {
  color: #333;
}

.el-dropdown {
  width: 0.8rem;
}
.el-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
