<template>
  <!-- 分页组件（封装）
    --page：父级传递来的 分页对象
    --  page.total:0   总数据
    --  page.current:1  当前页
    --  page.pageSizes:[5,10,20] 一页最大条数
    --  page.pageSizesIndex:0 选择一页最大数下标  
    --  handleSizeChange事件:每页多少条发生改变  => 调用this.$emit('changePage',this.page); 向父组件传值
    --  handleCurrentChange事件:当前页发生改变
   -->
  <div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSizes[page.pageSizesIndex]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>
  </div>
</template>


<script>
    export default {

        props:['page'],

        methods: {
            //每页多少条
            handleSizeChange(pageSizes) {
                // console.log(`每页 ${pageSizes} 条`);
                this.page.pageSizes.filter((item,index)=>{
                  if(item==pageSizes){
                    this.page.pageSizesIndex=index;
                    return index
                  }
                })
                // console.log(this.page);
                //像父组件传值
                this.$emit('changePage',this.page);
                
            },
            //当前页
            handleCurrentChange(currentPage) {
                // console.log(`当前页: ${currentPage}`);
                this.page.current=currentPage;
                // console.log(this.page);
                //像父组件传值
                this.$emit('changePage',this.page);
            }
        },
        data() {
            return {
                currentPage: 1,
            };
        }
    }
</script>

<style lang="scss" scoped>
.block{
    display: flex;
    justify-content: center;
}
</style>