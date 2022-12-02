<template>
<!-- 表格下载 -->
  <div class="block">
    <download-excel :data="DetailsForm" :fields="json_fields" :name="excelName">
      <el-button type="primary" plain class="down">下载表格</el-button>
    </download-excel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //报表名称必须加后缀
      excelName: "潜客跟进数据报表.xls", //表格的名字
      //导出的列的key和名称表头的设置
      json_fields: {
        排查日期: "date",
        整改隐患内容: "details",
        整改措施: "measure",
        整改时限: "timeLimit",
        应急措施和预案: "plan",
        整改责任人: "personInCharge",
        填表人: "preparer",
        整改资金: "fund",
        整改完成情况: "complete",
        备注: "remark",
      },
      DetailsForm: [
        {
          date: "2022-3-10",
          details: "卸油区过路灯损坏",
          measure: "更换灯泡",
          timeLimit: "2022-3-21",
          plan: "先使用充电灯代替,贴好安全提醒告示",
          personInCharge: "王xx",
          preparer: "王xx",
          fund: "20元",
          complete: "已完成整改",
          remark: "重新更换了灯泡",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style>
</style>