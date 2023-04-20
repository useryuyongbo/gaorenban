<template>
  <!-- 个人详细信息弹窗 -->
  <div>
    <!-- 表格展示 -->
    <div class="table" v-show="tabIsShow">
      <tableinfo
        :personInfo="personInfo"
        :urlImg="urlImg"
        @getBol="changeform"
      ></tableinfo>
    </div>

    <!-- 表单修改用户 -->
    <div class="form" v-show="formIsShow">
      <update
        :personInfo="personInfo"
        :urlImg="urlImg"
        :time="time"
        @getBol="changeform"
      ></update>
    </div>
  </div>
</template>

<script>
import Tableinfo from "@/components/userInfo/Tableinfo.vue";
import Update from "@/components/userInfo/Unpate.vue";
import { getUserInfo, userDetail, getTalent } from "@/api/request";
import { getUrl } from "@/api/request";

export default {
  props: ["personInfo"],
  data() {
    return {
      personInfo: {},
      tabIsShow: true,
      formIsShow: false,
      time: [],
      urlImg: "",
      userId: this.$store.state.id,
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
  created() {
    //发送请求获取个人详细信息

    userDetail(this.userId).then((res) => {
      this.personInfo = res.data;
      console.log(res.data);
    });
    getUrl(this.userId).then((res) => {
      this.urlImg = res.message;
      console.log(this.urlImg);
    });
  },
  watch: {
    personInfo: {
      handler(newinfo, old) {
        let time1 = [];
        for (var i in newinfo.hireDetail) {
          time1.push([
            newinfo.hireDetail[i].starttime,
            newinfo.hireDetail[i].endtime,
          ]);
        }
        this.time = time1;
      },

      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true,
    },
  },
};
</script>

<style></style>
