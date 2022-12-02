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

            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item inline label="本科学校" prop="undergraduateSchool" required>
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
                    <el-form-item inline label="本科专业" prop="undergraduateProfessional" required>
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
                    <el-form-item inline label="研究生专业" prop="masterProfession" required>
                        <el-input v-model="personInfo.masterprofession"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label-width="1.1rem" inline label="最后学历学位" prop="finalRecord" required>
                        <el-input v-model="personInfo.finalrecord"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label-width="1.1rem" inline label="最终的专业" prop="finalProfession" required>
                        <el-input v-model="personInfo.finalprofession"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label-width="1.1rem" label="最后研究方向" prop="finalReach" required>
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
                    <el-form-item label="上岗类型" prop="workClass">
                        <el-select v-model="personInfo.workclass" placeholder="请选择上岗类型">
                            <el-option label="引进" value="引进"></el-option>
                            <el-option label="培养" value="培养"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <!-- 聘期时间 -->
            <el-form-item 
                v-for="(item,index) in personInfo.hireDetail" 
                :key="index"
                :label="`第${item.hireStage}聘期`" required >
                <el-date-picker
                    v-model="item.hireDetailTime"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    :start-placeholder="item.hireDetailTime[0]"
                    :end-placeholder="item.hireDetailTime[1]">
                </el-date-picker>
            </el-form-item>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label-width="1.4rem" label="人才类别" prop="talentId">
                        <el-select v-model="personInfo.talentid" placeholder="请选择人才类别">
                            <el-option 
                                v-for="(item) in talentLiat"
                                :key="item.id"
                                :label="item.info" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label-width="1.4rem" label="人才类型" prop="talnetType">
                        <el-select v-model="personInfo.talnetiype" placeholder="人才类型">
                            <el-option label="全职" value="全职"></el-option>
                            <el-option label="柔性" value="柔性"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label-width="1.4rem" label="聘期内经费" prop="hireMoney" required>
                        <el-input v-model="personInfo.hiremoney"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label-width="1.4rem" label="学校提供经费" prop="schoolMoney" required>
                        <el-input v-model="personInfo.schoolmoney"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label-width="1.4rem" label="学校提供安家费" prop="houseMoney" required>
                        <el-input v-model="personInfo.housemoney"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label-width="1.4rem" label="学校提供购房补贴" prop="buyHouseMoney" required>
                        <el-input v-model="personInfo.buyhousemoney"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="考察结果" prop="result">
                <el-input type="textarea" v-model="personInfo.result"></el-input>
            </el-form-item>
            
            <el-form-item> 
                <el-button type="primary" @click="submitForm('personInfo')">立即修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {getTalent,updateDetail} from "@/api/request"

export default {

    //个人详细信息
  props: ['personInfo'],

  data() {
    return {
        //人类类型
        talentLiat:[],

        //表单数据
        // personInfo: {
        //     // userId:"",//用户id
        //     // pno: "",//工号
        //     // name: "",//姓名
        //     // sex: "",//性别
        //     // birthdayDate: "",//出生日期
        //     // national:"",//民族
        //     // birthPlace:"",//出生地

        //     // title:"",//职称职务

        //     // hireDetail:[],

        //     // interNational:"",//国籍
        //     // political:"",//政治面貌
        //     // address:"",//现居地址
        //     // phone:"",//电话号码
        //     // email:"",//邮箱号
        //     // idCard:"",//身份证/签证
        //     // nowUnit:"",//现在单位
        //     // preUnit:"",//导入单位
        //     // undergraduateSchool:"",//本科学校
        //     // undergraduateInTime:"",//本科毕业时间
        //     // undergraduateProfessional:"",//本科专业
        //     // masterSchool:"",//研究生学校
        //     // masterInTime:"",//研究生入学时间
        //     // masterProfession:"",//研究生专业
        //     // finalRecord:"",//最后学历学位
        //     // finalProfession:"",//最终的专业
        //     // finalReach:"",//最后研究方向

        //     // talentId:1,//人才类别Id号
        //     // talentType:"",//人才类型
        //     // archive:"",//档案是否到了
        //     // workGuard:"",//上岗依据
        //     // workClass:"",//上岗类型

        //     // hireStage:"",//聘期时间

        //     // hireMoney:"",//聘期内经费
        //     // schoolMoney:"",//学校提供经费
        //     // houseMoney:"",//学校提供安家费
        //     // buyHouseMoney:"",//学校提供购房补贴
        //     // result: "",//考察结果
        // },
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
    submitForm(formName) {
        // console.log(this.personInfo);
        //     //切换回表格
        //     let bol={
        //         formbol:false,
        //         tabbol:true
        //     }
        //     this.$emit('getBol',bol);

        updateDetail(this.personInfo).then(res=>{
            let bol={
                formbol:false,
                tabbol:true
            }
            this.$emit('getBol',bol);
        })
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
          
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    },
  },

    created(){
        // 获取所有人才类别
        getTalent().then(res=>{
            this.talentLiat=res.data
            // console.log(this.talentLiat);
        })
    },

};
</script>

<style lang="scss" scoped>


</style>