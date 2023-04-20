<template>
  <div class="maskLayer">
    <div class="mask">
      <div class="head">
        高层次人才个人信息表
        <button @click="close" class="close">关闭</button>
      </div>
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
  </div>
</template>

<script>
//引入修改表单
import Update from "./Unpate.vue";
import Tableinfo from "./Tableinfo.vue";
import { getUrl } from "@/api/request";

export default {
  name: "mask-layer",
  components: {
    Update,
    Tableinfo,
  },
  props: ["personInfo", "urlImg"],

  data() {
    return {
      tabIsShow: true,
      formIsShow: false,
      time: [],
    };
  },
  watch: {
    // time(newtime, old) {
    //   for (var i in newtime) {
    //     console.log(newtime[i]);
    //     this.personInfo.hireDetail[i].starttime = newtime[i][0];
    //     this.personInfo.hireDetail[i].starttime = newtime[i][1];
    //   }
    //   console.log(this.personInfo.hireDetail);
    // },
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
    //获得用户URL
    // getuserUrl(id) {
    //   getUrl(id).then((res) => {
    //     console.log("前置获得url");
    //     console.log(res);
    //   });
    // },
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
    .table {
      height: 4rem;
      overflow: auto;
      padding: 0.1rem;
    }

    .form {
      height: 4rem;
      overflow: auto;
      padding: 0.1rem;
    }
  }
}
</style>
