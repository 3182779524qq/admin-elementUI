<template>
  <div class="table_box">
    <my-table
      :inSerachFilte="serachFilte"
      :flush="fresh"
      :inTableData="tableDataConfig"
      @rowClick="tableClickConfig"
      :inAjax="tableAjaxConfig"
    ></my-table>
  </div>
</template>

<script>
import myTable from "../components/table"

export default {
  name: "tableList",
  components: {
    myTable
  },
  data() {
    return {
      //table组件搜索字段
      serachFilte: {},
      //用于tableData组件刷新，tableData检测到fresh值发生变化就会刷新数据
      fresh: "",
      //弹窗判断是否为编辑
      isEdit: null,
      //新增编辑弹窗配置
      popUpConfig: {
        show: false,
        title: "创建活动",
        width: "910px"
      },
      showPopUp: false,
      //tableData组件参数配置
      tableDataConfig: {
        //表头及字段配置
        tHead: [
          {
            name: "用户ID", //表头名称
            field: "id" //表头对应字段
          },
          {
            name: "用户名称",
            field: "name"
          },
          {
            name: "年龄",
            field: "age"
          },
          {
            name: "性别",
            field: "sex"
          },
          {
            name: "手机号",
            field: "phone"
          },
          {
            name: "用户状态",
            field: "status", //1-启用，0-禁用
            type: "function",
            callback: function(cellVal,rowData){
              let arr=['禁用','启用']
              return arr[cellVal]
            }
          }
        ],
        //自动渲染
        tData: [],
        //自动渲染
        total: 0,
        //配置是否显示多选框
        isMultiple: false,
        //配置是否显示排序
        isRank: false
      },
      //列表自动获取数据ajax配置
      tableAjaxConfig: {
        url: this.$url.table,
        method: "post",
        data: {
          pageNum: 1,
          pageSize: 10
        }
      }
    };
  },
  methods: {
    //tabel点击事件过滤可actionBtns配置的type过滤出table中点击的相应操作按钮
    tableClickConfig(obj) {
      if (obj.type === "edit") {
        // this.addAndEdit("edit", obj.rowData);
      }
      if (obj.type === "del") {
        // this.deleteData(obj.rowData);
      }
      if (obj.type === "release" || obj.type === "recall") {
        // this.statusChange(obj.type, obj.rowData);
      }
    }
  }
};
</script>

<style scoped>
.table_box {
  min-width: 900px;
}
</style>