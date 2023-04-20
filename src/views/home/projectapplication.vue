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
        <el-form-item label="comment">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="form.pno"></el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input v-model="form.cardId"></el-input>
        </el-form-item>
        <el-form-item label="项目类别">
          <el-input v-model="form.projectname"></el-input>
        </el-form-item>
<!--        <el-form-item label="项目文件">-->
<!--          <el-input v-model="form.projectfile"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="上传项目文件">
          <div class="uploadBtn">
            <el-upload
                class="uploadCom"
                ref="upload"
                :limit="10"
                accept=".jpg,.gif,.png,.jpeg,.txt,.pdf,.doc,.docx,.xls,.xlsx"
                name="files"
                :multiple="true"
                action="#"
                :on-change="handleFileChange"
                :before-remove="handleFileRemove"
                :auto-upload="false"
                :file-list="form.fileList"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </div>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">立即申请</el-button>
        </el-form-item>

        <!-- <el-form-item
          v-for="item in typeList"
          :key="item.code"
          :label="item.desc"
        >
          <upload :fileClass="item.code" @getList="addFormData"></upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item> -->
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
        projectname: "",
        projectfile:"",
        fileInfo:{
          fileType:'',
          fileList:[]
        }
      },
      //文件列表集合
      declareList: [],
      //文件类型
      typeList: [],
    };
  },
  methods: {


    handleFileChange(file, fileList) {
      // console.log(file);
      // console.log(fileList);

      //给file添加字段fileClass文件类型
      file.fileClass=this.fileClass

      // 子组件的itemfileList
      this.form.fileInfo.fileList = fileList;
      this.form.fileInfo.fileType = this.fileClass;

      // console.log(this.fileInfo);

      // //讲文件列表传给父组件
      this.$emit("getList", this.form.fileInfo);
    },
    // 删除之前钩子
    handleFileRemove(file, fileList) {
      // console.log(file);
      // console.log(fileList);

      // console.log('删除之前钩子handleFileRemove');

      //给file添加字段fileClass文件类型
      file.fileClass=this.fileClass

      // 子组件的itemfileList
      this.form.fileInfo.fileList = fileList;
      this.form.fileInfo.fileType = this.fileClass;

      console.log(this.form.fileInfo);

      // //讲文件列表传给父组件
      this.$emit("getList", this.form.fileInfo);
    },





    //获取所有文件类型
    getFileType() {
      getDeclareFileType().then((res) => {
        console.log(res);
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
.form {
  margin: 0 auto;
  width: 4.5rem;
}
:deep(.uploadCom){
  position: relative;
  width: 3rem;
  height: auto;
}
:deep(.el-upload){
  position: absolute;
  right: 0;
}
:deep(.el-upload-list){
  // position: absolute;
  left: 0;
  width: 2rem;
  overflow: hidden;
}

</style>
