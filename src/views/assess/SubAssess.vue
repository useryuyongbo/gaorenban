<template>
  <!-- 个人申报提交表单 -->
  <div class="sub">
    <div class="form">
      <el-form
        ref="form"
        :model="form"
        label-width="150px"
        class="form"
        width="100%"
      >
        <el-form-item label="申报人">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="form.pno"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.cardId"></el-input>
        </el-form-item>
        <el-form-item
          v-for="item in typeList"
          :key="item.code"
          :label="item.desc"
        >
          <upload :fileClass="item.code" @getList="addFormData"></upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload.vue";
import { uploadFiles, getDeclareFileType } from "@/api/request";

export default {
  components: { Upload },
  data() {
    return {
      form: {
        userName: "",
        pno: "",
        cardId: "",
      },
      //文件列表集合
      declareList: [],
      //文件类型
      typeList: [],
    };
  },
  methods: {
    //获取所有文件类型
    getFileType() {
      getDeclareFileType().then((res) => {
        this.typeList = res.data;
        this.typeList.forEach((item) => {
          this.declareList.push({ classType: item.code, fileList: [] });
        });
      });
    },

    //确认上传
    onSubmit() {
      // 创建新的数据对象
      let formData = new FormData();

      // 将剩余信息放到formData对象中
      formData.append("userId", 1);

      // console.log(this.formData.getAll("fileClass"));
      // console.log(this.formData.getAll("file"));

      //循环文件对象集合
      this.declareList.forEach((fileObj) => {
        fileObj.fileList.forEach((file) => {
          formData.append("file", file.raw);
          formData.append("fileClass", fileObj.classType);
        });
      });

      //循环表单
      for (let key in this.form) {
        // formData.append(key,formItem);
        formData.append(key, this.form[key]);
      }

      // console.log(formData.getAll("fileClass"));
      // console.log(formData.getAll("file"));
      // console.log(formData.getAll("userName"));

      // 文件上传接口
      uploadFiles(formData).then((res) => {
        console.log(res);
      });
    },

    //子组件传给父组件的方法 fileList列表
    //在方法中给formData添加文件，和文件类型[数组]
    addFormData(fileInfo) {
      //循环declareList,如果文件类型一致，则存储对应的文件列表
      this.declareList.forEach((item) => {
        if (item.classType == fileInfo.fileType) {
          item.fileList = fileInfo.fileList;
        }
      });
      // console.log(this.declareList);
    },
  },
  created() {
    //获取文件所有类型
    this.getFileType();
  },
};
</script>

<style lang="scss" scoped>
.sub {
  // width: 4.5rem;
}
.form{
  margin: 0 auto;
  width: 4.5rem;
}
</style>