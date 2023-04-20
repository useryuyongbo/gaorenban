<template>
  <el-dialog
    title="提示"
    :visible.sync="showDialog"
    width="50%"
    @close="handleClose"
  >
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <el-form-item label="id">
        <el-input v-model="formLabelAlign.id"></el-input>
      </el-form-item>
      <el-form-item label="新增描述">
        <el-input v-model="formLabelAlign.itemdescription"></el-input>
      </el-form-item>
      <el-form-item label="新增名称">
        <el-input v-model="formLabelAlign.itemname"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showDialog = false">取 消</el-button>
      <el-button type="primary" @click="additem">确定添加</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addrecorditem } from "@/api/request";
export default {
  // 接受父组件传递的值
  props: {
    AddRecordVisbile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 控制弹出框显示隐藏
      showDialog: false,
      labelPosition: "right",
      formLabelAlign: {
        id: "",
        itemdescription: "",
        itemname: "",
      },
    };
  },
  methods: {
    //添加材料类别
    additem() {
      this.showDialog = false;
      addrecorditem(this.formLabelAlign).then((res) => {
        console.log(res);
      });
    },
    // 弹出框关闭后触发
    handleClose() {
      // 子组件调用父组件方法，并传递参数
      this.$emit("changeShow", "false");
    },
  },
  watch: {
    // 监听 addOrUpdateVisible 改变
    AddRecordVisbile(oldVal, newVal) {
      this.showDialog = this.AddRecordVisbile;
    },
  },
};
</script>

<style lang="less" scoped></style>
