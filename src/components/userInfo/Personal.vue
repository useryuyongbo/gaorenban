<template>
  <div class="maskLayer">
    <div class="mask">
        <div class="head">
            高层次人才个人信息表
            <button @click="close" class="close">关闭</button>
        </div>
        <!-- 表格展示 -->
        <div class="table" v-show="tabIsShow">
            <tableinfo :personInfo="personInfo" @getBol="changeform"></tableinfo>
        </div>

        <!-- 表单修改用户 -->
        <div class="form" v-show="formIsShow">
            <update :personInfo="personInfo" @getBol="changeform"></update>
        </div>
    
    </div>
  </div>
</template>

<script>
//引入修改表单
import Update from "./Unpate.vue"
import Tableinfo from "./Tableinfo.vue"

export default {
  name: "mask-layer",
  components:{
    Update,Tableinfo
  },
  props: ['personInfo'],

  
  data() {
    return {
        tabIsShow:true,
        formIsShow:false,
    };
  },
  watch: {
    
  },
  created() {
    
    
  },
  methods: {
    //关闭弹窗
    close(){
        // 触发父组件中的dialogVisibleEvent事件，并传递参数
        this.$emit('closeMask', false);
        this.tabIsShow=true;
        this.formIsShow=false;
    },
    //显示修改
    changeform(bol){
        this.tabIsShow=bol.tabbol;
        this.formIsShow=bol.formbol;
    },
   
  },
  computed: {
   
  },
  filters: {
    
  }
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
    box-shadow: .1rem .1rem .05rem rgb(126, 126, 126);
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
    .head{
        position: relative;
        height: .4rem;
        line-height: .4rem;
        background-color:#fd9162;
        font-size: .2rem;
        text-align: center;
        color: #ffffff;
        button{
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            width: .7rem;
            height: .3rem;
            background-color: rgba(255, 255, 255, 0.603);
            border: #fff;
            color: #fff;
        }
        
        .close{
            top: 50%;
            right: .5rem;
        }
    }
    .table{
        height: 4rem;
        overflow: auto;
        padding: .1rem;
    }
   
    .form{
        height: 4rem;
        overflow: auto;
        padding: .1rem;
    }
    

  }
}
</style>