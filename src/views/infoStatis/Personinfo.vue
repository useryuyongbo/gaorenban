<template>
  <!-- 个人详细信息弹窗 -->
  <div>
    <!-- 表格展示 -->
    <div class="table" v-show="tabIsShow">
      <tableinfo :personInfo="personInfo" @getBol="changeform"></tableinfo>
    </div>

    <!-- 表单修改用户 -->
    <div class="form" v-show="formIsShow">
      <update :personInfo="personInfo" @getBol="changeform"></update>
    </div>
  </div>
</template>

<script>
import Tableinfo from "@/components/userInfo/Tableinfo.vue";
import Update from "@/components/userInfo/Unpate.vue";
import {getUserInfo,userDetail,getTalent} from "@/api/request"

export default {
  props:['personInfo'],
  data() {
    return {
      personInfo: {},
      tabIsShow: true,
      formIsShow: false,
    };
  },
  components: { Tableinfo, Update },
  methods: {
    //显示修改
    changeform(bol) {
      this.tabIsShow = bol.tabbol;
      this.formIsShow = bol.formbol;
    },
  },
  created(){
    //发送请求获取个人详细信息
      userDetail(1).then(res=>{
          this.personInfo=res.data;
          console.log(res.data);
      })
  }
};
</script>

<style>
</style>