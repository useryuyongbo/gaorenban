<template>
<!-- 文件上传组件
  --fileClass：是父组件传递过来的文件类型
              需要给file添加一个字段fileClass
  --@getList 将文件与文件类型 合成的 文件列表返回给父组件

   -->
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
      :file-list="fileInfo.fileList"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  props:['fileClass'],
  data() {
    return {
      fileInfo:{
        fileType:'',
        fileList:[]
      }
    };
  },
  methods: {
    // 上传发生变化钩子
    handleFileChange(file, fileList) {
      // console.log(file);
      // console.log(fileList);

      //给file添加字段fileClass文件类型
      file.fileClass=this.fileClass

      // 子组件的itemfileList
      this.fileInfo.fileList = fileList;
      this.fileInfo.fileType = this.fileClass;

      // console.log(this.fileInfo);

      // //讲文件列表传给父组件
      this.$emit("getList", this.fileInfo);
    },
    // 删除之前钩子
    handleFileRemove(file, fileList) {
      // console.log(file);
      // console.log(fileList);

      // console.log('删除之前钩子handleFileRemove');

      //给file添加字段fileClass文件类型
      file.fileClass=this.fileClass

      // 子组件的itemfileList
      this.fileInfo.fileList = fileList;
      this.fileInfo.fileType = this.fileClass;

      console.log(this.fileInfo);

      // //讲文件列表传给父组件
      this.$emit("getList", this.fileInfo);
    },
  },
};
</script>

<style lang="scss" scoped>
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