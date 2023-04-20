<template>
  <div class="maskLayer">
    <div class="mask">
      <div class="head">
        {{ personInfo.name }}的个人待遇
        <button @click="close" class="close">关闭</button>
      </div>
      <div class="head1"></div>
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :label="domain.name1"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true,
            message: '域名不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="domain.value" class="in"></el-input>
          <!-- <el-button @click.prevent="removeDomain(domain)">删除</el-button> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary"> 打印单据 </el-button>
          <el-button type="primary">修改为填写信息</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格展示 -->
      <!-- <div class="table" v-show="tabIsShow">
        <tableinfo :personInfo="personInfo" @getBol="changeform"></tableinfo>
      </div> -->

      <!-- 表单修改用户 -->
      <!-- <div class="form" v-show="formIsShow">
        <update :personInfo="personInfo" @getBol="changeform"></update>
      </div> -->
    </div>
  </div>
</template>

<script>
//引入修改表单
import Update from "./userInfo/Unpate.vue";
import Tableinfo from "./userInfo/Tableinfo.vue";

export default {
  name: "mask-layer",
  components: {
    Update,
    Tableinfo,
  },
  props: ["personInfo"],

  data() {
    return {
      tabIsShow: true,
      formIsShow: false,
      dynamicValidateForm: {
        domains: [
          {
            name1: "安家费",
            value: "13899",
          },
          {
            name1: "起薪",
            value: "1234",
          },
          {
            name1: "停薪",
            value: "567",
          },
        ],
        email: "",
      },
    };
  },
  watch: {},
  created() {},
  methods: {
    //关闭弹窗
    close() {
      // 触发父组件中的dialogVisibleEvent事件，并传递参数
      this.$emit("closeMask", false);
      this.tabIsShow = true;
      this.formIsShow = false;
    },
    //显示修改
    changeform(bol) {
      this.tabIsShow = bol.tabbol;
      this.formIsShow = bol.formbol;
    },
  },
  computed: {},
  filters: {},
};
</script>

<style lang="scss" scoped>
.maskLayer {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: rgba($color: #000000, $alpha: 0.4);
  .mask {
    position: absolute;
    width: 8rem;
    height: 5rem;
    box-shadow: 0.1rem 0.1rem 0.05rem rgb(126, 126, 126);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    .head {
      position: relative;
      height: 0.4rem;
      line-height: 0.4rem;
      background-color: #fd9162;
      font-size: 0.2rem;
      text-align: center;
      color: #ffffff;
      button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 0.7rem;
        height: 0.3rem;
        background-color: rgba(255, 255, 255, 0.603);
        border: #fff;
        color: #fff;
      }

      .close {
        top: 50%;
        right: 0.5rem;
      }
    }
    .head1 {
      height: 0.4rem;
    }
    .table {
      height: 4rem;
      overflow: auto;
      padding: 0.1rem;
    }
    .in {
      width: 3rem;
    }
    .form {
      height: 4rem;
      overflow: auto;
      padding: 0.1rem;
    }
  }
}
</style>
