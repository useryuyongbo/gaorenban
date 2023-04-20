<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="showDialog"
      width="50"
      @close="handleClose"
    >
      <!-- 档案文件上传提交表单 -->
      <div class="sub">
        <div class="form">
          <el-form
            ref="form"
            :model="form"
            label-width="150px"
            class="form"
            width="100%"
          >
            <el-form-item label="ID">
              <el-input v-model="form.userId"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input
                v-model="form.name"
                clearable
                @input="handlerPageNo"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-table
                :data="journalTab"
                border
                style="width: 100%"
                height="4rem"
                :row-key="(row) => row.id"
              >
                <el-table-column label="人员" prop="user"> </el-table-column>
                <el-table-column label="选择">
                  <template slot-scope="scope">
                    <!-- {{&nbsp;}} 或者 {{""}}-->
                    <el-radio
                      v-model="currentFactor"
                      :label="scope.row"
                      @input="changeradio(scope.row)"
                      >{{ "" }}</el-radio
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item
              v-for="item in typeList"
              :key="item.id"
              :label="item.itemname"
            >
              <upload :fileClass="item.id" @getList="addFormData"></upload>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">立即上传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Upload from "@/components/Upload.vue";
import {
  uploadFiles,
  getRecorditem,
  uploadrecord,
  checkidandnon,
} from "@/api/request";
export default {
  components: { Upload },
  // 接受父组件传递的值
  props: {
    SubRecordVisbile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentFactor: "0",
      form: {
        userId: "",
        name: "",
      },
      journalTab: [
        // {
        //     "id": 15,
        //      "user": "贺总::8",
        // }
      ],
      //文件列表集合
      declareList: [],
      //文件类型
      typeList: [],
      // 控制弹出框显示隐藏
      showDialog: false,
    };
  },
  methods: {
    //改变单选
    changeradio(data) {
      this.form.userId = data.id;
    },
    //查询
    handlerPageNo() {
      checkidandnon(this.form.name).then((res) => {
        console.log("res");
        var table = [];
        for (var key in res.data) {
          table.push({ id: key, user: res.data[key] });
        }
        this.journalTab = table;
      });
    },
    //获取所有档案类型
    getRecorditemclass() {
      getRecorditem().then((res) => {
        console.log(res);
        this.typeList = res.data;
        this.typeList.forEach((item) => {
          this.declareList.push({ classType: item.id, fileList: [] });
        });
      });
    },

    //确认上传
    onSubmit() {
      this.showDialog = false;
      // 创建新的数据对象
      let formData = new FormData();

      //console.log(this.formData.getAll("fileClass"));
      // console.log(this.formData.getAll("file"));

      //循环文件对象集合
      this.declareList.forEach((fileObj) => {
        fileObj.fileList.forEach((file) => {
          formData.append("files", file.raw);
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
      uploadrecord(formData).then((res) => {
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
    // 弹出框关闭后触发
    handleClose() {
      // 子组件调用父组件方法，并传递参数
      this.$emit("changeShow", "false");
    },
  },
  created() {
    //获取文件所有类型
    this.getRecorditemclass();
  },
  watch: {
    // 监听 addOrUpdateVisible 改变
    SubRecordVisbile(oldVal, newVal) {
      this.showDialog = this.SubRecordVisbile;
    },
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
</style>
