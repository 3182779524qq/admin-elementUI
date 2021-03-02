<template>
  <div class="sample_table">
    <div class="search_form">
      <elme-form ref="listForm"
        :formData="searchForm"
        :formValue="searchValue"
        :formButton="formButton"
        size="small" 
        />
    </div>
    <div class="btn_list">
      <el-button type="primary" size="small" @click="showDialog('','add')" icon="el-icon-plus">新增</el-button>
      <el-button type="primary" size="small" @click="uploadFun" icon="el-icon-upload">导入</el-button>
      <a type="primary" size="small" :href="$url.asin_stock" download="asin_stock"> <i class="el-icon-download"></i>下载</a>
      <el-button type="primary" size="small" @click="exportFun" icon="el-icon-s-promotion">导出</el-button>
    </div>
    <elme-table v-loading="tableLoading" :columns="columns" :data="dataList" :pagination="pagination" @changeList="changeList">
      <div class="btn_box" slot="btn" slot-scope="{rowData}">
        <el-button type="primary" size="mini" @click="showDialog(rowData)">编辑</el-button>
      </div>
    </elme-table>
    <elme-dialog :visible.sync="dialogVisible" :title="dialogTitle" @cancel="dialogVisible = false" @confirm="subDialog" :confirmLoading="confirmLoading">
      <elme-form ref="listForm"
        :formData="formData"
        size="small"
        :formValue="formValue"
        :formButton="null"></elme-form>
    </elme-dialog>
  </div>
</template>

<script>
import elmeTable from "@/components/table";
import elmeDialog from "@/components/dialog";
import elmeForm from "@/components/form";

export default {
  name: "sample_table",
  components: {
    elmeForm,
    elmeTable,
    elmeDialog
  },
  data() {
    return {
      searchForm:[
        {
          type: "input",
          label: "姓名",
          width: "20%",
          prop: "name",
        }
      ],
      searchValue:{
        name:'',
      },
      formButton: {
        cancelFun: () => {
          this.pagination.current = 1;
          this.pagination.pageSize = 10;
        }, // 取消的回调
        confirmFun: () => {
          this.pagination.current = 1;
          this.pagination.pageSize = 10;
          this.getList()
        }, //确认的回调
        cancelText: "重置", //取消按钮的文字，默认为取消
        confirmText: "查询",
      },
      columns: [
        {
          name: "姓名", //表头名称
          field: "name", //表头对应字段
        },
        {
          name: "年龄",
          field: "age",
        },
        {
          name: "性别",
          field: "sex",
          customRender:(cell)=>{
            let arr = ['','男','女']
            return arr[cell]
          }
        },
        {
          name: "地址",
          field: "address"
        },
        {
          name: "手机号",
          field: "phone"
        },
        {
          name: "备注",
          field: "remarks"
        },
        {
          name: "操作",
          field: "btn",
          width:'150px',
          scopedSlots:'btn',
        },
      ],
      dataList:[],
      pagination:{
        pageAlign:'right',
        layout:'prev,pager,next,total',
        total: 0,
        current: 1,
        pageSize: 10,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
      },
      dialogVisible:false,
      dialogTitle:'',
      formValue: {
        id:'',
        name: '',
        age: '',
        sex: '',
        address: '',
      },
      formData: [
        {
          type: "input",
          label: "姓名",
          width: "100%",
          prop: "name",
        },{
          type: "input",
          label: "年龄",
          width: "100%",
          prop: "age",
        },
        {
          type: "radio",
          label: "性别",
          width: "100%",
          prop: "sex",
          options:[
            {
              label:'男',
              value:1
            },
            {
              label:'女',
              value:2
            }
          ]
        },
        {
          type: "textarea",
          label: "地址",
          width: "100%",
          prop: "address",
        },
      ],
      confirmLoading:false,
      tableLoading:false,
      rowData:{}
    };
  },
  created(){
    this.getList()
  },
  methods: {
    reFreshed(){
      this.searchValue={
        name:''
      }
      this.dataList = []
      this.pagination.current = 1;
      this.pagination.pageSize = 10;
      this.getList()
    },
    changeList(e){
      this.pagination.current = e.page;
      this.pagination.pageSize = e.size;
      this.getList()
    },
    getList(){
      this.tableLoading = true
      this.$axios.post(this.$url.table,{
        name:this.searchValue.name,
        page:this.pagination.current,
        size:this.pagination.pageSize
      }).then(res=>{
        this.tableLoading = false
        console.log(res)
        if (res.code==20000) {
          this.pagination.total = res.data.total
          this.dataList = res.data.list
        }
      }).catch(()=>{
        this.tableLoading = false
      })
    },
    // 简单的上传
    uploadFun(key){
      let input = document.createElement("input");
      input.type = "file";
      input.click();
      input.onchange = async(e) => {
        // 选择的文件 input.files[0]
      };
    },
    exportFun() {
      this.$axios
        .get(this.$url.URL,{responseType: "blob"})
        .then((res) => {
          const content = res
          const fileNamex =
            "文件名" + new Date().getTime() + ".zip";
          const blob = new Blob([content]);
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileNamex;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileNamex);
          }
        })
        .catch((err) => {
          console.log(err, "==========");
        });
    },
    showDialog(rowData={id:'',name:'',age:'',sex:'',address:''},type='add'){
      this.formValue = {...rowData}
      this.dialogTitle = '新增'
      if (type=='edit') {
        this.dialogTitle = '编辑'
      }
      this.dialogVisible = true
    },
    subDialog(){
      let obj = {...this.formValue}
      this.$message.success('表单提交成功')
      console.log(obj,'============');
      this.dialogVisible = false
    }
  },
  
};
</script>

<style scoped lang="less">
.sample_table {
  min-width: 900px;
  .btn_list{
    padding: 0 0 20px;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    a{
      color: #FFF;
      background-color: #409EFF;
      border-color: #409EFF;
      display: inline-block;
      padding: 8px 15px;
      margin:0 12px;
      border-radius: 3px;
      cursor: pointer;
      &:hover{
        background-color: #66b1ff;
        border-color: #66b1ff;
        transition: all 0.2s;
        text-decoration: none;
      }
    }
  }
}
</style>