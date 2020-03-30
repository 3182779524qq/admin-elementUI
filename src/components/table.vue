<template>
  <div class="cfj_table">
    <el-table
      :border="border"
      :data="tableData.tData"
      :header-cell-style="headercellstyle"
      :row-style="rowstyle"
      :cell-style="cellstyle"
    >
      <!--是否展示多选框-->
      <el-table-column v-if="tableData.isMultiple" type="selection" width="55"></el-table-column>
      <!--是否展示列序号-->
      <el-table-column
        v-if="tableData.isRank"
        type="index"
        align="center"
        width="80"
        label="序号"
        :index="numerical"
      ></el-table-column>
      <template v-for="(tit,index) in tableData.tHead">
        <template>
          <!--function数据兼容处理-->
          <el-table-column
            v-if="tit.type === 'function'"
            :key="index"
            :prop="tit.field"
            :label="tit.name"
            v-show="tit.isHide?false:true"
            :width="tit.width?tit.width:''"
            :align="tit.align?tit.align:'center'"
            :sortable="tit.sortable?'custom':false"
          >
            <div slot-scope="scope">
              <span v-html="tit.callback(scope.row[tit.field],scope.row)"></span>
            </div>
          </el-table-column>
          <!--btnList横向展示操作选项-->
          <el-table-column
            v-else-if="tit.type === 'btnList'"
            :label="tit.name"
            :width="tit.width?tit.width:''"
            :key="tit.index"
          >
            <template slot-scope="scope">
              <template v-for="btn of tit.callback(scope.row[tit.field],scope.row)">
                <el-button
                  :key="btn.index"
                  type="text"
                  :disabled="btn.disabled"
                  @click="allClick(btn.type, scope.row,scope)"
                >
                  <span v-html="btn.label"></span>
                </el-button>
              </template>
            </template>
          </el-table-column>
          <!--selectBtns下拉展示操作选项-->
          <el-table-column
            v-else-if="tit.type === 'selectBtns'"
            :label="tit.name"
            :key="tit.index"
            :width="tit.width?tit.width:''"
          >
            <template slot-scope="scope">
              <el-dropdown placement="bottom" @command="optionHandleClick($event,scope.row,scope)">
                <el-button type="primary">
                  {{tit.name}}
                  <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <template v-for="btn of tit.callback(scope.row[tit.field],scope.row)">
                    <el-dropdown-item :key="btn.index" :command="btn.type" :disabled="btn.disabled">
                      <span v-html="btn.label"></span>
                    </el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <!--默认数据展示没有type时走这个分支-->
          <el-table-column
            v-else
            :key="index"
            :prop="tit.field"
            :label="tit.name"
            v-show="tit.isHide?false:true"
            :width="tit.width?tit.width:''"
            :fixed="tit.fixed?tit.fixed:false"
            :sortable="tit.sortable?true:false"
            :align="tit.align?tit.align:'center'"
          >
            <template slot-scope="scope">
              <span v-html="scope.row[tit.field]?scope.row[tit.field]:tit.noData"></span>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
    <!--分页配置-->
    <div
      v-if="paginationJson.ispagination"
      class="cfj_pagination"
      :style="{textAlign:paginationJson.pageAlign}"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="paginationJson.ispagination && ajax.data ? ajax.data.page:''"
        :page-sizes="paginationJson.pageSize"
        :page-size="paginationJson.ispagination && ajax.data ? ajax.data.size:''"
        :layout="paginationJson.layout"
        :total="tableData.total||0"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "HhhTable",
  data() {
    return {
      ajax: this.inAjax,
      tableData: this.inTableData,
      serachFilte: this.inSerachFilte,
      headercellstyle: {
        background: "#FAFAFA",
        fontSize: "14px",
        color: "#303133",
        height: "50px"
      },
      cellstyle: {
        // background: 'transparent',
        fontSize: "12px"
      },
      rowstyle: {
        // height: '72px'
      }
    };
  },
  props: {
    flush: "", // 检测flush发生变化刷新数据
    border: {
      //边框线
      type: Boolean,
      default: function() {
        return false;
      }
    },
    paginationJson: {
      type: Object,
      default: function() {
        return {
          pageSize: [10, 20, 50, 100],
          pageAlign: "center",
          ispagination: true,
          layout: "total, sizes,jumper, prev, pager, next"
        };
      }
    },
    // 搜索过滤把搜索字段及数据传过来自动搜索过滤
    inSerachFilte: {},
    // AJAX请求配置
    inAjax: {
      type: Object,
      default: function() {
        return {
          url: "",
          method: "post",
          data: {
            page: 1,
            size: 15
          }
        };
      }
    },
    // table表参数配置
    inTableData: {
      type: Object,
      default: function() {
        return {
          // 表头配置
          tHead: [],
          // type为selectBtns为下拉按钮，btnList为平铺按钮=====写在表头配置里，
          // btnList: [
          //   {
          //     type: "info",
          //     label:
          //       "<span style='color: #1881BF;font-size: 12px;text-decoration: underline'>详情</span>"
          //   }
          // ],
          // 表格数据--ajax请求渲染
          tData: [],
          // 分页总条数--ajax请求渲染
          total: 0,
          // 配置是否显示多选框
          isMultiple: false,
          // 配置是否显示排序
          isRank: true
        };
      }
    }
  },
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    numerical(i) {
      if (this.ajax.data && this.ajax.data.page) {
        return (this.ajax.data.page - 1) * this.ajax.data.size + i + 1;
      } else {
        return ++i;
      }
    },
    readCookie(name) {
      let arr = null;
      let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (document.cookie && (arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    },
    getList() {
      let posdata = Object.assign({}, this.ajax.data, this.serachFilte);
      let obj = {};
      if (this.ajax.method == "post") {
        obj = {
          url: this.ajax.url,
          method: this.ajax.method,
          data: posdata,
          headers: JSON.parse(this.readCookie("headers"))
        };
      } else {
        obj = {
          url: this.ajax.url,
          method: this.ajax.method,
          params: posdata,
          headers: JSON.parse(this.readCookie("headers"))
        };
      }
      axios(obj)
        .then(res => {
          let data = res.data;
          if (data.total > 9 && data.page > 1 && data.list.length === 0) {
            --this.ajax.data.page;
            this.getList();
            return;
          }
          if (this.ajax.callback) {
            this.tableData.tData = this.ajax.callback(data);
          } else {
            this.tableData.tData = data.list;
          }
          this.tableData.total = data.total;
        })
        .catch(error => {
          console.log(error);
        });
    },
    allClick(type, row, scope) {
      const outData = {
        type: type,
        rowData: row,
        rowindex: scope.$index
      };
      this.$emit("rowClick", outData);
    },
    handleSizeChange(val) {
      this.ajax.data.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.ajax.data.page = val;
      this.getList();
    },
    // 操作点击
    optionHandleClick(type, row, s) {
      this.allClick(type, row, s);
    }
  },
  watch: {
    flush: {
      handler(newData, oldData) {
        this.getList();
      }
    }
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