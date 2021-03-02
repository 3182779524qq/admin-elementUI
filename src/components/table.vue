<template>
  <div class="cfj_table">
    <el-table
      v-bind="$attrs"
      v-on="$listeners"
      :header-cell-style="headerCellStyle"
    >
      <template v-for="(tit,index) in columns">
        <el-table-column
          :key="index"
          :prop="tit.field"
          :label="tit.name"
          :type="tit.type"
          v-show="tit.isHide?false:true"
          :width="tit.width?tit.width:''"
          :fixed="tit.fixed?tit.fixed:false"
          :sortable="tit.sortable?tit.sortable:false"
          :align="tit.align?tit.align:'center'"
        >
          <span slot-scope="scope">
            <div v-if="tit.scopedSlots">
              <slot :name="tit.scopedSlots" :rowData='scope.row' :rowIndex="scope.$index"></slot>
            </div>
            <div v-else-if="tit.customRender" v-html="tit.customRender(scope.row[tit.field],scope.row)"></div>
            <span v-else>{{scope.row[tit.field]}}</span>
          </span>
        </el-table-column>
      </template>
    </el-table>
    <!--分页配置-->
    <div
      v-if="pagination"
      class="cfj_pagination"
      :style="{textAlign:pagination.pageAlign}"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="pagination.current"
        :page-sizes="pagination.pageSizeOptions"
        :page-size="pagination.pageSize"
        :layout="pagination.layout"
        :total="pagination.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "ElmeTable",
  data() {
    return {
      
    };
  },
  props: {
    headerCellStyle:{
      type:Object,
      default:function(){
        return {
          background:'#f7f7f7'
        }
      }
    },
    columns:{
      type:Array,
      default:function(){
        return []
      }
    },
    pagination:{
      type:Object,
      default:function(){
        return {
          pageAlign:'right',
          layout:'prev,pager,next,jumper,total',
          total: 0,
          current: 1,
          pageSize: 10,
          pageSizeOptions: ["10", "20", "30", "40", "50"],
        }
      }
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    handleSizeChange(e){
      console.log(e)
      this.$emit('changeList',{page:this.pagination.current,size:e})
    },
    handleCurrentChange(e){
      console.log(e)
      this.$emit('changeList',{page:e,size:this.pagination.pageSize})
    },
  }
};
</script>
<style scoped>
.cfj_table {
  width: 100%;
  height: 100%;
}
.cfj_pagination {
  padding-top: 15px;
}
</style>