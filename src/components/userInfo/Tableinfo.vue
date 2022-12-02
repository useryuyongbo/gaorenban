<template>
  <!-- 人才个人详细信息表格
        --封装组件
        --与表单组件进行切换
        --personInfo：个人详细信息 父组件传来的
        --提交事件触发this.$emit向父组件（自定义事件getBol）传bol,切换回表单
        --bol.formbl为true
        --bol.tabbol为false 
      -->
  <div class="pertable">
    <table cellspacing="0" class="infoTab">
      <tr>
        <th colspan="7">高层次人才个人信息表</th>
      </tr>
      <tr>
        <td class="one">工号</td>
        <td colspan="2">{{ personInfo.pno }}</td>
        <td class="two">姓名</td>
        <td colspan="3">{{ personInfo.name }}</td>
      </tr>
      <tr>
        <td class="two">性别</td>
        <td colspan="2">{{ personInfo.sex }}</td>
        <td class="two">联系方式</td>
        <td colspan="3">{{ personInfo.phone }}</td>
      </tr>
      <tr>
        <td class="one">出生日期</td>
        <td colspan="2">{{ personInfo.birthdaydate }}</td>
        <td class="two">出生地</td>
        <td colspan="3">{{ personInfo.birthplace }}</td>
      </tr>
      <tr>
        <td class="one">所在单位</td>
        <td colspan="2">{{ personInfo.nowunit }}</td>
        <td class="two">调入前单位</td>
        <td colspan="3">{{ personInfo.preunit }}</td>
      </tr>
      <tr>
        <td class="one">国籍</td>
        <td colspan="2">{{ personInfo.international }}</td>
        <td class="two">政治面貌</td>
        <td colspan="3">{{ personInfo.political }}</td>
      </tr>
      <tr>
        <td class="one">本科学校</td>
        <td>{{ personInfo.undergraduateschool }}</td>
        <td class="two">入学时间</td>
        <td>{{ personInfo.undergraduateintime }}</td>
        <td class="two">所学专业</td>
        <td colspan="2">{{ personInfo.undergraduateprofessional }}</td>
      </tr>
      <tr>
        <td class="one">硕士学校</td>
        <td>{{ personInfo.masterschool }}</td>
        <td class="two">入学时间</td>
        <td>{{ personInfo.masterintime }}</td>
        <td class="two">所学专业</td>
        <td colspan="2">{{ personInfo.masterprofession }}</td>
      </tr>
      <tr>
        <td class="one">最后学历</td>
        <td>{{ personInfo.finalrecord }}</td>
        <td class="two">所学专业</td>
        <td>{{ personInfo.finalprofession }}</td>
        <td class="two">研究方向</td>
        <td colspan="2">{{ personInfo.finalreach }}</td>
      </tr>
      <tr>
        <td class="one">现居地址</td>
        <td colspan="6">{{ personInfo.address }}</td>
      </tr>
      <tr>
        <td class="one">电子邮箱</td>
        <td colspan="6">{{ personInfo.email }}</td>
      </tr>
      <tr>
        <td class="one">人才类型</td>
        <td colspan="3">{{ personInfo.talenttype }}</td>
        <td class="two">档案到否</td>
        <td colspan="2">{{ personInfo.archive }}</td>
      </tr>
      <tr>
        <td class="one">身份证号</td>
        <td colspan="3">{{ personInfo.idcard }}</td>
        <td class="two">职称职务</td>
        <td colspan="2">{{ personInfo.title }}</td>
      </tr>
      <tr>
        <td class="one">人才类别</td>
        <td colspan="6">{{ personInfo.talentDesc }}</td>
      </tr>
      <tr>
        <td class="one">聘期</td>
        <td colspan="6">{{ personInfo.hirestage }}</td>
      </tr>
      <tr>
        <td class="one">聘期起止时间</td>
        <td colspan="6">
          <p v-for="(item, index) in personInfo.hireDetail" :key="index">
            {{ item.hireDetailTime[0] }} —— {{ item.hireDetailTime[1] }}
          </p>
        </td>
      </tr>
      <tr>
        <td class="one">聘期内科研启动经费</td>
        <td colspan="6">{{ personInfo.hiremoney }}</td>
      </tr>
      <tr>
        <td class="one">学校提供科研启动经费</td>
        <td colspan="6">{{ personInfo.schoolmoney }}</td>
      </tr>
      <tr>
        <td class="one">学校提供安家费</td>
        <td colspan="6">{{ personInfo.housemoney }}</td>
      </tr>
      <tr>
        <td class="one">学校提供购房补贴</td>
        <td colspan="6">{{ personInfo.buyhousemoney }}</td>
      </tr>
      <tr>
        <td class="one">上岗依据</td>
        <td colspan="6">{{ personInfo.workguard }}</td>
      </tr>
      <tr>
        <td class="one">上岗类型</td>
        <td colspan="6">{{ personInfo.workclass }}</td>
      </tr>
      <tr>
        <td class="one">考核结果</td>
        <td colspan="6">{{ personInfo.result }}</td>
      </tr>
    </table>
    <div class="update">
      <button class="updateBtn" @click="updateShow">修改信息</button>
      <button @click="print" class="print">打印</button>
    </div>
  </div>
</template>

<script>
export default {
  //个人详细信息
  props: ["personInfo"],
  date() {
    return {};
  },
  methods: {
    //切换修改
    updateShow() {
      let bol = {
        formbol: true,
        tabbol: false,
      };
      this.$emit("getBol", bol);
    },
    // 打印
    print() {
      console.log(this.personInfo);
    },
    //多选框
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.pertable {
  .infoTab {
    font-size: 0.16rem;
    width: 100%;
    color: rgb(88, 88, 88);
    border-right: 0.01rem solid #000;
    border-bottom: 0.01rem solid #000;
    tr th,
    tr td {
      text-align: center;
      border-top: 0.01rem solid #000;
      border-left: 0.01rem solid #000;
      height: 0.4rem;
    }
    .one {
      width: 1.6rem;
      color: #000;
    }
    .two {
      width: 1rem;
      color: #000;
    }
  }
  .update {
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-around;
    .updateBtn {
      width: 1rem;
      height: 0.4rem;
      border: #fff;
      background-color: #fd9162;
      color: #fff;
    }
    .print {
      color: #fd9162;
      width: 1rem;
      height: 0.4rem;
      border: #fff;
      background-color: #fd9162;
      color: #fff;
    }
  }
}
</style>
