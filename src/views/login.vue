<template>
  <div class="login">
    <div class="loginBox">
      <h3>河南大学人事处高层次人才办公系统</h3>
      <div>
        <div class="bott">
          <div class="left">
            <img src="../assets/imgs/big-1.b6eaa6a5.png" alt="" />
          </div>
          <div class="right">
            <el-form ref="form" :model="form" label-width="0.8rem">
              <el-form-item label-width="0px">
                <el-input
                  placeholder="请输入用户名"
                  prefix-icon="el-icon-user"
                  clearable
                  v-model="form.name"
                >
                </el-input>
              </el-form-item>

              <el-form-item label-width="0px">
                <el-input
                  placeholder="请输入密码"
                  show-password
                  type="password"
                  prefix-icon="el-icon-lock"
                  v-model="form.password"
                >
                </el-input>
              </el-form-item>
            </el-form>
            <div class="goIn" @click="login()">登录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { login } from "@/api/request";
import store from "@/store";

export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
        region: "",
      },
    };
  },
  methods: {
    //登录
    login() {
      let data = {
        pno: this.form.name,
        password: this.form.password,
      };
      login(data).then((res) => {
        console.log(res);
        if (res.code == 200) {
          // this.$store.replaceState(200);
          if (res.message == "success") {
            this.$store.commit("SET_IMPORT", res.data.password);
            this.$store.commit("SET_ID", res.data.id);
            this.$store.commit("SET_NAME", res.data.name);
            console.log(this.$store.state);
            router.push("/home");
            this.$message({
              message: "登陆成功",
              type: "success",
              duration: 1,
            });
            console.log(document.cookie);
          } else {
            this.$message.error(res.message);
          }
        } else if (res.statu == 500) {
          console.log("登陆失败");
        }
      });

      // ;
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: url(../assets/imgs/bg.png) no-repeat center/cover;
  .loginBox {
    width: 5rem;
    height: 3rem;
    padding: 0.3rem;
    border-radius: 0.2rem;
    background: rgba(255, 255, 255, 0.733);
    h3 {
      color: #7093fd;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.3rem;
      text-align: center;
      text-shadow: 0.035rem 0.035rem 0.02rem #fdfdfd;
    }
    .bott {
      margin-top: 0.3rem;
      height: 2rem;
      width: 100%;
      // border: 1px solid #f00;
    }
    .left {
      float: left;
      width: 2rem;
      height: 2rem;
      img {
        width: 100%;
      }
    }
    .right {
      float: right;
      width: 2.5rem;
      height: 2rem;

      // .inp {
      //   margin-bottom: .2rem;
      //   height: auto;

      // }
      .goIn {
        width: 100%;
        color: #fff;
        border-radius: 0.04rem;
        border: 0.01rem solid #dcdfe6;
        box-sizing: border-box;
        background-color: #409eff;
        height: 0.4rem;
        font-size: 0.16rem;
        line-height: 0.4rem;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>
