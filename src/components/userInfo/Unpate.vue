<template>
  <!-- 人才个人详细信息表单
        --封装组件
        --与表格组件进行切换
        --personInfo：个人详细信息 父组件传来的
        --提交事件触发this.$emit向父组件（自定义事件getBol）传bol,切换回表格
        --bol.formbl为false 
        --bol.tabbol为true
      -->
  <div class="updateForm">
    <!-- :rules="rules" -->
    <el-form
      :model="personInfo"
      ref="personInfo"
      label-width="1rem"
      class="demo-personInfo"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="上传照片" prop="pic" required>
            <el-upload
              class="avatar-uploader"
              action="/api/file/uploadImageByuserId"
              :data="{ userId: personInfo.userid }"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="urlImg" :src="urlImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name" required>
            <el-input v-model="personInfo.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工号" prop="pno" required>
            <el-input v-model="personInfo.pno"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="出生日期" required>
            <el-form-item prop="birthdayDate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="personInfo.birthdaydate"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex" required>
            <el-input v-model="personInfo.sex"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="民族" prop="national" required>
            <el-input v-model="personInfo.national"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生地" prop="birthPlace" required>
            <el-input v-model="personInfo.birthplace"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="国籍" prop="interNational" required>
            <el-input v-model="personInfo.international"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="政治面貌" prop="political" required>
            <el-input v-model="personInfo.political"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="现居地址" prop="address" required>
            <el-input v-model="personInfo.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话号码" prop="phone" required>
            <el-input v-model="personInfo.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="邮箱号" prop="email" required>
            <el-input v-model="personInfo.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item inline label="身份证/签证" prop="idCard" required>
            <el-input v-model="personInfo.idcard"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item inline label="现在单位" prop="nowUnit" required>
            <el-input v-model="personInfo.nowunit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item inline label="导入单位" prop="preUnit" required>
            <el-input v-model="personInfo.preunit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="职称" prop="title" required>
            <el-input v-model="personInfo.title"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="职务" prop="" required>
            <el-input v-model="personInfo.title"></el-input>
          </el-form-item>
        </el-col> -->
      </el-row>

      <el-row :gutter="0">
        <el-col :span="8">
          <el-form-item
            inline
            label="本科学校"
            prop="undergraduateSchool"
            required
          >
            <el-input v-model="personInfo.undergraduateschool"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="1.5rem" label="本科毕业时间" required>
            <el-form-item prop="undergraduateInTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="personInfo.undergraduateintime"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            inline
            label="本科专业"
            prop="undergraduateProfessional"
            required
          >
            <el-input v-model="personInfo.undergraduateprofessional"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="0">
        <el-col :span="8">
          <el-form-item inline label="研究生学校" prop="masterSchool" required>
            <el-input v-model="personInfo.masterschool"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="1.5rem" label="研究生入学时间" required>
            <el-form-item prop="masterInTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="personInfo.masterintime"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            inline
            label="研究生专业"
            prop="masterProfession"
            required
          >
            <el-input v-model="personInfo.masterprofession"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="0">
        <el-col :span="8">
          <el-form-item
            label-width="1.1rem"
            inline
            label="最后学历学位"
            prop="finalRecord"
            required
          >
            <el-input v-model="personInfo.finalrecord"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label-width="1.1rem"
            inline
            label="最终的专业"
            prop="finalProfession"
            required
          >
            <el-input v-model="personInfo.finalprofession"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label-width="1.1rem"
            label="最后研究方向"
            prop="finalReach"
            required
          >
            <el-input v-model="personInfo.finalreach"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="档案到否" prop="archive">
            <el-select v-model="personInfo.archive" placeholder="是">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item inline label="上岗依据" prop="workGuard" required>
            <el-input v-model="personInfo.workguard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上岗类型" prop="workclass">
            <el-select
              v-model="personInfo.workclass"
              placeholder="请选择上岗类型"
            >
              <el-option label="引进" value="引进"></el-option>
              <el-option label="培养" value="培养"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-form-item
          label-width="1.4rem"
          label="hireid"
          prop="hireid"
          required
        >
          <el-input v-model="personInfo.hireid"></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="talentid" prop="talentid">
            <el-input v-model="personInfo.talentid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item inline label="人才类型" prop="talenttype" required>
            <el-input v-model="personInfo.talenttype"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上岗类型" prop="workclass">
            <el-select
              v-model="personInfo.workclass"
              placeholder="请选择上岗类型"
            >
              <el-option label="引进" value="引进"></el-option>
              <el-option label="培养" value="培养"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-form-item
          label-width="1.4rem"
          label="comment"
          prop="comment"
          required
        >
          <el-input v-model="personInfo.comment"></el-input>
        </el-form-item>
      </el-row>

      <!-- 聘期时间 -->
      <el-form-item
        v-for="(item, index) in personInfo.hireDetail"
        :key="index"
        :label="`第${index + 1}聘期`"
        required
      >
        <el-date-picker
          v-model="time[index]"
          type="daterange"
          value-format="yyyy-MM-dd"
          :start-placeholder="item.starttime"
          :end-placeholder="item.endtime"
          @change="GetTime"
        >
        </el-date-picker>

        <el-button type="danger" @click="deleteHire(item.id)"
          >删除此聘期</el-button
        >

        <span class="span1"> </span>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label-width="1.4rem"
              label="聘期内经费"
              prop="hireMoney"
              required
            >
              <el-input v-model="item.hiremoney"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label-width="1.4rem"
              label="学校提供经费"
              prop="schoolMoney"
              required
            >
              <el-input v-model="item.schoolmoney"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label-width="1.4rem"
              label="buyhousemoney"
              prop="buyhousemoney"
              required
            >
              <el-input v-model="item.buyhousemoney"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label-width="1.4rem"
              label="housemoney"
              prop="housemoney"
              required
            >
              <el-input v-model="item.housemoney"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label-width="1.4rem"
              label="中期考核结果"
              prop="midResult"
              required
            >
              <el-input v-model="item.midResult"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label-width="1.4rem"
              label="届满考核结果"
              prop="finalResult"
              required
            >
              <el-input v-model="item.finalResult"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label-width="1.4rem"
              label="ifDuty"
              prop="ifDuty"
              required
            >
              <el-input v-model="item.ifDuty"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label-width="1.4rem"
              label="talentid"
              prop="talentid"
              required
            >
              <el-input v-model="item.talentid"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item
            label-width="1.4rem"
            label="hirestage"
            prop="hirestage"
            required
          >
            <el-input v-model="item.hirestage"></el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item
            label-width="1.4rem"
            label="comment"
            prop="comment"
            required
          >
            <el-input v-model="item.comment"></el-input>
          </el-form-item>
        </el-row>
      </el-form-item>
      <!-- <el-row class="border">
        <div style="border: solid 1px black">
          <el-form-item class="formitem1" style="border-radius: 2px">
            <p style="font-size: 20px">添加新聘期</p>
            <el-date-picker
              type="daterange"
              value-format="yyyy-MM-dd"
              v-model="value2"
            >
            </el-date-picker>
            <el-form-item
              label-width="1.4rem"
              label="buyhousemoney"
              prop="buyhousemoney"
              required
            >
              <el-input v-model="this.addHirelist.buyhousemoney"></el-input>
            </el-form-item>
            <el-form-item
              label-width="1.4rem"
              label="finalResult"
              prop="finalResult"
              required
            >
              <el-input v-model="addHirelist.finalResult"></el-input>
            </el-form-item>
            <el-form-item
              label-width="1.4rem"
              label="hiremoney"
              prop="hiremoney"
              required
            >
              <el-input v-model="addHirelist.hiremoney"></el-input>
            </el-form-item>
            <el-form-item
              label-width="1.4rem"
              label="hirestage"
              prop="hirestage"
              required
            >
              <el-input v-model="addHirelist.hirestage"></el-input>
            </el-form-item>
            <el-form-item
              label-width="1.4rem"
              label="housemoney"
              prop="housemoney"
              required
            >
              <el-input v-model="addHirelist.housemoney"></el-input>
            </el-form-item>
            <el-form-item label-width="1.4rem" label="id" prop="id" required>
              <el-input v-model="addHirelist.id"></el-input>
            </el-form-item>
            <el-form-item
              label-width="1.4rem"
              label="ifDuty"
              prop="ifDuty"
              required
            >
              <el-input v-model="addHirelist.ifDuty"></el-input>
            </el-form-item>
            <el-form-item
              label-width="1.4rem"
              label="midResult"
              prop="midResult"
              required
            >
              <el-input v-model="addHirelist.midResult"></el-input>
            </el-form-item>
            <el-form-item
              label-width="1.4rem"
              label="schoolmoney"
              prop="schoolmoney"
              required
            >
              <el-input v-model="addHirelist.schoolmoney"></el-input>
            </el-form-item>
            <el-form-item
              label-width="1.4rem"
              label="talentid"
              prop="talentid"
              required
            >
              <el-input v-model="addHirelist.talentid"></el-input>
            </el-form-item>
            <el-form-item
              label-width="1.4rem"
              label="userid"
              prop="userid"
              required
            >
              <el-input v-model="addHirelist.userid"></el-input>
            </el-form-item>

            <el-button type="primary" @click="addHire()">添加新聘期</el-button>
          </el-form-item>
        </div>
      </el-row> -->

      <!-- <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label-width="1.4rem" label="人才类别" prop="talentId">
            <el-select
              v-model="personInfo.talentid"
              placeholder="请选择人才类别"
            >
              <el-option
                v-for="item in talentLiat"
                :key="item.id"
                :label="item.info"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="1.4rem" label="在岗类型" prop="talnetType">
            <el-select v-model="personInfo.talnetiype" placeholder="在岗类型">
              <el-option label="全职" value="全职"></el-option>
              <el-option label="柔性" value="柔性"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="1.4rem" label="培养方式" prop="trainType">
        <el-select v-model="personInfo.talnetiype" placeholder="培养方式">
          <el-option label="引进" value="引进"></el-option>
          <el-option label="培养" value="培养"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="1.4rem" label="上岗类型" prop="shangangType">
        <el-select v-model="personInfo.talnetiype" placeholder="上岗类型">
          <el-option label="类型1" value="类型1"></el-option>
          <el-option label="类型2" value="类型2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="1.4rem" label="引育方式" prop="yinyvType">
        <el-select v-model="personInfo.talnetiype" placeholder="引育类型">
          <el-option label="类型1" value="类型1"></el-option>
          <el-option label="类型2" value="类型2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="1.4rem" label="在岗状态" prop="yinyvType">
        <el-select v-model="personInfo.talnetiype" placeholder="在岗状态">
          <el-option label="在岗" value="在岗"></el-option>
          <el-option label="离职" value="离职"></el-option>
          <el-option label="未到岗" value="未到岗"></el-option>
          <el-option label="调离" value="调离"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="引育日期">
        <div class="block">
          <el-date-picker
            v-model="yinyvvalue1"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="到岗日期（起薪日期）">
        <div class="block">
          <el-date-picker
            v-model="yinyvvalue1"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item
        label-width="1.4rem"
        label="comment"
        prop="comment"
        required
      >
        <el-input v-model="personInfo.comment"></el-input>
      </el-form-item>
      <el-form-item
        label-width="1.4rem"
        label="earnedTitle"
        prop="earnedTitle"
        required
      >
        <el-input v-model="personInfo.earnedTitle"></el-input>
      </el-form-item>
      <el-form-item label-width="1.4rem" label="hireid" prop="hireid" required>
        <el-input v-model="personInfo.hireid"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label-width="1.4rem"
            label="聘期内经费"
            prop="hireMoney"
            required
          >
            <el-input v-model="personInfo.hiremoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label-width="1.4rem"
            label="学校提供经费"
            prop="schoolMoney"
            required
          >
            <el-input v-model="personInfo.schoolmoney"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label-width="1.4rem"
            label="学校提供安家费"
            prop="houseMoney"
            required
          >
            <el-input v-model="personInfo.housemoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label-width="1.4rem"
            label="学校提供购房补贴"
            prop="buyHouseMoney"
            required
          >
            <el-input v-model="personInfo.buyhousemoney"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="考察结果" prop="result">
        <el-input type="textarea" v-model="personInfo.result"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('personInfo')"
          >立即修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getTalent,
  updateDetail,
  deleteHire,
  userDetail,
  addHire,
  hireupdateHire,
} from "@/api/request";
import { Upload } from "element-ui";

export default {
  //个人详细信息
  props: ["personInfo", "urlImg", "time"],

  data() {
    return {
      //时间日期绑定
      // time: [],
      //新增聘期时间
      value2: "",
      //人类类型
      talentLiat: [],

      yinyvvalue1: "",
      //聘期数据
      addHirelist: {
        buyhousemoney: "",
        comment: "",
        endtime: "",
        finalResult: "",
        hiremoney: "",
        hirestage: "",
        housemoney: "",
        id: "",
        ifDuty: "",
        midResult: "",
        schoolmoney: "",
        starttime: "",
        talentid: "",
        userid: personInfo.userid,
      },
      //表单数据
      personInfo: {
        // userId:"",//用户id                     userid
        // pno: "",//工号                          pno
        // name: "",//姓名                          name
        // sex: "",//性别                           sex
        // birthdayDate: "",//出生日期              birthdaydate
        // national:"",//民族                       national
        // birthPlace:"",//出生地                   birthplace
        // title:"",//职称职务                      title
        // hireDetail:[],
        // interNational:"",//国籍                  international
        // political:"",//政治面貌                   political
        // address:"",//现居地址                      address
        // phone:"",//电话号码                        phone
        // email:"",//邮箱号                          email
        // idCard:"",//身份证/签证                    idcard
        // nowUnit:"",//现在单位                      nowunit
        // preUnit:"",//导入单位                       preunit
        // undergraduateSchool:"",//本科学校          undergraduateschool
        // undergraduateInTime:"",//本科毕业时间      undergraduateintime
        // undergraduateProfessional:"",//本科专业    undergraduateprofessional
        // masterSchool:"",//研究生学校               masterschool
        // masterInTime:"",//研究生入学时间           masterintime
        // masterProfession:"",//研究生专业           masterprofession
        // finalRecord:"",//最后学历学位              finalrecord
        // finalProfession:"",//最终的专业            finalprofession
        // finalReach:"",//最后研究方向               finalreach
        // talentId:1,//人才类别Id号                  talentid
        // talentType:"",//人才类型                   talenttype
        // archive:"",//档案是否到了                  archive
        // workGuard:"",//上岗依据                    workguard
        // workClass:"",//上岗类型                    workclass
        // hireStage:"",//聘期时间
        // hireMoney:"",//聘期内经费
        // schoolMoney:"",//学校提供经费
        // houseMoney:"",//学校提供安家费
        // buyHouseMoney:"",//学校提供购房补贴
        // result: "",//考察结果
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  methods: {
    //改变时间
    GetTime() {
      console.log("asdfadsffd");
      console.log(this.time);
    },
    //增加聘期
    addHire(data) {
      (this.addHirelist.starttime = this.value2[0]),
        (this.addHirelist.endtime = this.value2[1]),
        addHire(this.addHirelist).then((res) => {
          console.log(res);
        });
      userDetail(this.personInfo.userid).then((res) => {
        this.personInfo = res.data;
      });
    },
    //删除聘期

    deleteHire(data) {
      deleteHire(data).then((res) => {
        console.log(res);
        this.$message(res);
      });
      userDetail(this.personInfo.userid).then((res) => {
        this.personInfo = res.data;
      });
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      this.urlImg = URL.createObjectURL(file.raw);
      if (res.code == 200 && res.message == this.urlImg) {
        this.$alert("上传成功", {
          confirmButtonText: "确定",
          // callback: action => {
          //   this.$message({
          //     type: 'info',
          //     message: `action: ${ action }`
          //   });
          // }
        });
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //提交修改
    submitForm(formName) {
      // console.log(this.personInfo);
      //     //切换回表格
      //     let bol={
      //         formbol:false,
      //         tabbol:true
      //     }
      //     this.$emit('getBol',bol);
      for (var i in this.personInfo.hireDetail) {
        this.personInfo.hireDetail[i].starttime = this.time[i][0];
        this.personInfo.hireDetail[i].endtime = this.time[i][1];
      }
      var infotable = this.personInfo;
      for (var item of infotable.hireDetail) {
        hireupdateHire(item).then((res) => {});
      }
      this.$delete(infotable, "hireDetail");
      updateDetail(infotable).then((res) => {
        let bol = {
          formbol: false,
          tabbol: true,
        };
        this.$emit("getBol", bol);
      });
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {

      //     } else {
      //       console.log("error submit!!");
      //       return false;
      //     }
      //   });
    },
  },
  // watch: {
  //   time(newtime, old) {
  //     for (var i in newtime) {
  //       console.log(newtime[i]);
  //       this.personInfo.hireDetail[i].starttime = newtime[i][0];
  //       this.personInfo.hireDetail[i].starttime = newtime[i][1];
  //     }
  //     console.log(this.personInfo.hireDetail);
  //   },
  //   personInfo: {
  //     handler(newinfo, old) {
  //       let time1 = [];
  //       for (var i in newinfo.hireDetail) {
  //         time1.push([
  //           newinfo.hireDetail[i].starttime,
  //           newinfo.hireDetail[i].endtime,
  //         ]);
  //       }
  //       this.time = time1;
  //     },

  //     // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
  //     immediate: true,
  //   },
  // },
  created() {
    // 获取所有人才类别
    getTalent().then((res) => {
      this.talentLiat = res.data;
      //console.log(this.talentLiat);
    });
    console.log("update数据");
    console.log(this.personInfo);
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.border {
  border-radius: 2px;
  border-block-color: red;
  border-width: 2rem;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.span1 {
  height: 178px;
  width: 178px;
}
.formitem1 {
  border-radius: 2px;
}
</style>
