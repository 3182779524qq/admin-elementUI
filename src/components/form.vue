<!--
2.22修改，新增评分，
-->
<template>
  <el-form
    :ref="formRef"
    :label-position="labelPosition"
    :model="formValue"
    :label-width="labelCol"
    v-bind="$attrs"
    v-on="$listeners"
    :class="formClass?'form_list '+formClass:'form_list'"
  > 
    <div
      v-if="filterSearch"
      class="form_item_close"
      :style="{ width:filterSearch.width?filterSearch.width:'50%',display:filterSearch.hide?'none':'block'}"
    >
      <el-form-item :ref="filterSearch.ref" :label="filterSearch.label" :prop="filterSearch.prop" :required="filterSearch.required">
        <!-- <component :is="'elme-select'" v-model="filterSearch.value" :itemObject="filterSearch" :size="size"></component> -->
        <el-select
            v-model="filterSearch.value"
            :size="size"
            :disabled="filterSearch.disabled?filterSearch.disabled:false"
            :placeholder="filterSearch.placeholder?filterSearch.placeholder:'请选择'+filterSearch.label"
            :allowClear="filterSearch.allowClear?filterSearch.allowClear:false"
            @change="isCallback(filterSearch.callback)"
            :multiple="filterSearch.multiple?filterSearch.multiple:false"
            collapse-tags
            :filterable="filterSearch.filterable?filterSearch.filterable:false"
            :style="{ width:filterSearch.wrapWidth?filterSearch.wrapWidth:'85%'}"
          >
            <el-option
              v-for="(selItem,selIndex) in filterSearch.options"
              :value="selItem.value"
              :key="selIndex"
              :label="selItem.label"
            ></el-option>
          </el-select>
      </el-form-item>
      <!-- <i class="close_btn el-icon-circle-close" @click="delItem(item)"></i> -->
    </div>
    <div
      :class="filterSearch?'form_item form_item_close':'form_item'"
      v-for="(item,index) in formData"
      :key="index"
      :style="{ width:item.width?item.width:'50%',display:item.hide?'none':'block'}"
    >
      <el-form-item
        :ref="item.ref" :label="item.label" :prop="item.prop" :required="item.required"
      >
        <!-- 普通输入框 -->
        <template v-if="item.type=='input'">
          <el-input
            v-model="formValue[item.prop]"
            :size="size"
            :disabled="item.disabled?item.disabled:false"
            :maxLength="item.maxLength?item.maxLength:30"
            :placeholder="item.placeholder?item.placeholder:'请输入'+item.label"
            :clearable="item.allowClear?item.allowClear:false"
            :style="{ width:item.wrapWidth?item.wrapWidth:'85%'}"
            @change="isCallback(item.callback)"
          >
            <template slot="append" v-if="item.append">{{item.append}}</template>
          </el-input>
        </template>
        <!-- 文本域 -->
        <template v-else-if="item.type=='textarea'">
          <el-input
            type="textarea"
            v-model="formValue[item.prop]"
            :size="size"
            :placeholder="item.placeholder?item.placeholder:'请输入'+item.label"
            :autosize="{ minRows: item.minRows?item.minRows:3, maxRows: item.maxRows?item.maxRows:5 }"
            :clearable="item.allowClear?item.allowClear:false"
            :disabled="item.disabled?item.disabled:false"
            :maxLength="item.maxLength?item.maxLength:30"
            resize="none"
            :style="{ width:item.wrapWidth?item.wrapWidth:'85%'}"
          ></el-input>
        </template>
        <!-- 密码输入框 -->
        <template v-else-if="item.type=='password'">
          <el-input
            v-model="formValue[item.prop]"
            show-password
            :size="size"
            :disabled="item.disabled?item.disabled:false"
            :maxLength="item.maxLength?item.maxLength:30"
            :placeholder="item.placeholder?item.placeholder:'请输入'+item.label"
            :clearable="item.allowClear?item.allowClear:false"
            :style="{ width:item.wrapWidth?item.wrapWidth:'85%'}"
          ></el-input>
        </template>
        <!-- 下拉选择框 -->
        <template v-else-if="item.type=='select'">
          <el-select
            v-model="formValue[item.prop]"
            :size="size"
            :disabled="item.disabled?item.disabled:false"
            :placeholder="item.placeholder?item.placeholder:'请选择'+item.label"
            :allowClear="item.allowClear?item.allowClear:false"
            @change="isCallback(item.callback)"
            :multiple="item.multiple?item.multiple:false"
            collapse-tags
            :filterable="item.filterable?item.filterable:false"
            :style="{ width:item.wrapWidth?item.wrapWidth:'85%'}"
          >
            <el-option
              v-for="(selItem,selIndex) in item.options"
              :disabled="selItem.disabled?selItem.disabled:false"
              :value="selItem.value"
              :key="selIndex"
              :label="selItem.label"
            ></el-option>
          </el-select>
        </template>
        <!-- 时间选择器 -->
        <template v-else-if="item.type=='time'">
          <el-time-picker
            v-model="formValue[item.prop]"
            :disabled="item.disabled?item.disabled:false"
            :placeholder="item.placeholder?item.placeholder:'请选择'+item.label"
            :size="size"
            :style="{ width:item.wrapWidth?item.wrapWidth:'85%'}"
            @change="isCallback(item.callback)"
          ></el-time-picker>
            <!-- :value-format="item.valueFormat?item.valueFormat:'YYYY-MM-DD HH:mm:ss'" -->
        </template>
        <!-- 日,月选择器 -->
        <template v-else-if="item.type=='date'">
          <el-date-picker
            v-model="formValue[item.prop]"
            :type="item.picker?item.picker:'date'"
            :disabled="item.disabled?item.disabled:false"
            :placeholder="item.placeholder?item.placeholder:'请选择'+item.label"
            :size="size"
            :style="{ width:item.wrapWidth?item.wrapWidth:'85%'}"
            @change="isCallback(item.callback)"
            :picker-options="item.pickerOptions?item.pickerOptions:{}"
          ></el-date-picker>
            <!-- :value-format="item.valueFormat?item.valueFormat:'YYYY-MM-DD HH:mm:ss'" -->
        </template>
        <!-- 时间范围选择器 -->
        <template v-else-if="item.type=='timeRegion'">
          <el-date-picker
            v-model="formValue[item.prop]"
            :disabled="item.disabled?item.disabled:false"
            :size="size"
            :style="{ width:item.wrapWidth?item.wrapWidth:'85%'}"
            @change="isCallback(item.callback)"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :picker-options="item.pickerOptions?item.pickerOptions:{}"
          ></el-date-picker>
            <!-- :value-format="item.valueFormat?item.valueFormat:'YYYY-MM-DD HH:mm:ss'" -->
        </template>
        <!-- 多选框 -->
        <template v-else-if="item.type=='checkbox'">
          <el-checkbox-group
            v-model="formValue[item.prop]"
            :disabled="item.disabled?item.disabled:false"
            @change="isCallback(item.callback)"
            :style="{ width:item.wrapWidth?item.wrapWidth:'85%'}"
          >
            <el-checkbox
              v-for="(selItem,selIndex) in item.options"
              :label="selItem.value"
              :key="selIndex"
            >{{selItem.label}}</el-checkbox>
          </el-checkbox-group>
        </template>
        <!-- 单选框 -->
        <template v-else-if="item.type=='radio'">
          <el-radio-group
            v-model="formValue[item.prop]"
            :disabled="item.disabled?item.disabled:false"
            :style="{ width:item.wrapWidth?item.wrapWidth:'85%'}"
            @change="isCallback(item.callback)"
          >
            <el-radio
              v-for="(selItem,selIndex) in item.options"
              :label="selItem.value"
              :disabled="selItem.disabled?selItem.disabled:false"
              :key="selIndex"
            >{{selItem.label}}</el-radio>
          </el-radio-group>
        </template>
        <!-- 级联选择器 -->
        <template v-else-if="item.type=='cascader'">
          <el-cascader
            :options="item.options"
            v-model="formValue[item.prop]"
            :size="size"
            :props="item.props?item.props:{}"
            :disabled="item.disabled?item.disabled:false"
            :placeholder="item.placeholder?item.placeholder:'请选择'+item.label"
            :clearable="item.allowClear?item.allowClear:false"
            :style="{ width:item.wrapWidth?item.wrapWidth:'85%'}"
            @change="isCallback(item.callback)"
          ></el-cascader>
        </template>
        <!-- 文件上传 -->
        <template v-else-if="item.type==='upload'">
          <div class="el_upload" @click="uploadFun(item.customRequest)">
            {{formValue[item.prop]?'已上传':'点击上传'}}
          </div>
        </template>
        <!-- 评分 -->
        <template v-else-if="item.type==='rate'">
          <div class="rate_box">
            <el-rate v-model="formValue[item.prop]"
            :colors="item.colors?item.colors:['#F7BA2A', '#F7BA2A', '#F7BA2A']"
            :show-text="item.showText?item.showText:false"
            :show-score="item.showScore?item.showScore:false"
            :disabled="item.disabled?item.disabled:false"
            ></el-rate>
          </div>
        </template>
      </el-form-item>
      <i v-if="filterSearch" class="close_btn el-icon-circle-close" @click="delItem(index,item)"></i>
    </div>
    <slot></slot>
    <div :class="formButton.btnClass?formButton.btnClass+' btn_list':'btn_list'" v-if="formButton">
      <el-button
        v-if="formButton.showCancel===false?false:true"
        :class="formButton.cancelCalss?'reset_btn '+formButton.cancelCalss:'reset_btn'"
        :size="size"
        @click="cancelFun"
      >{{formButton.cancelText?formButton.cancelText:'取消'}}</el-button>
      <el-button
        type="primary"
        :class="formButton.confirmCalss"
        :size="size"
        @click="confirmFun"
      >{{formButton.confirmText?formButton.confirmText:'确认'}}</el-button>
    </div>
  </el-form>
</template>
<script>
// import citycode from "./cityCode";
export default {
  name: "ElmeForm",
  props: {
    // 表单配置
    formData: {
      type: Array,
      default: function () {
        return [
          {
            type: "input", //表单项类型，必填。目前支持:input,textarea,password,select,time,timeRegion,checkbox,radio,cascader,upload
            label: "输入框提示", //输入框的label，必填
            prop: "id", //表单项的字段名称，必填
            ref: "ref", //每一项的ref
            width: "50%", //一行的占比，默认一行两个
            hide: false, //是否隐藏这一项，默认显示
            disabled: false, //是否禁用，默认false
            maxLength: 30, //最大长度	，默认30
            placeholder: "请输入XXX", //输入提示
            allowClear: false, //可以点击清除图标删除内容
            minRows: 3, //textarea的最小行数，默认为3
            maxRows: 3, //textarea的最大行数，默认为5
            callback: function () {}, //输入框值改变时触发的回调，
            options: [], //select,checkbox,radio,的选择器里面{label:'选项一',value:'1'}的结构，
            multiple: false, //select :是否多选
            filterable: false, //select :是否可搜索
            valueFormat: "YYYY-MM-DD HH:mm:ss", //日期时间选择器的值格式化
          },
        ];
      },
    },
    // 表单的值
    formValue: {
      type: Object,
      default: function () {
        return {};
      },
    },
    // 表单搜索条件过滤框，和普通item类似，多一个value
    filterSearch:{
      type: Object,
      default: function () {
        return null;
      },
    },
    // 文字宽的宽度
    labelCol: {
      type: String,
      default: '100px',
    },
    // 表单域标签的位置
    labelPosition: {
      type: String,
      default: 'right',
    },
    // 输入框的大小
    size: {
      type: String,
      default: "default",
    },
    // form表单的ref
    formRef: {
      type: String,
      default: "formRef",
    },
    // form表单的class
    formClass: {
      type: String,
      default: "",
    },
    // form表单的按钮配置，如果不需要则传null
    formButton: {
      type: Object,
      default: function () {
        return {
          cancelFun: () => {}, // 取消的回调
          confirmFun: () => {}, //确认的回调
          cancelCalss: "", //取消按钮的class
          confirmCalss: "", //确认按钮的class
          cancelText: "", //取消按钮的文字，默认为取消
          confirmText: "", //确认按钮的文字，默认为确认
          isRule: false, //是否需要表单校验，如果为true，则confirmFun会接收一个Boolean类型的参数，true为校验通过，false为不通过
        };
      },
    },
  },
  data() {
    return {
      
    };
  },
  created() {
  },
  mounted() {
    
  },
  methods: {
    // 表单校验通过时为true
    validateForm() {
      let flag = false;
      this.$refs[this.formRef].validate((valid) => {
        if (valid) {
          flag = true;
        }
      });
      return flag;
    },
    // 重置表单
    resetForm() {
      for (let key in this.formValue) {
        this.formValue[key] = undefined;
      }
    },
    // 取消按钮
    cancelFun() {
      this.resetForm();
      this.formButton.cancelFun();
    },
    // 确认按钮
    confirmFun() {
      if (this.formButton.isRule) {
        this.formButton.confirmFun(this.validateForm());
      } else {
        this.formButton.confirmFun();
      }
    },
    // 简单的上传
    uploadFun(callback){
      let input = document.createElement("input");
      input.type = "file";
      input.click();
      input.onchange = (e) => {
        // input.files[0] 是获取到的文件
        // console.log(input.files[0],'==========');
        if (callback) {
          callback(input.files[0])
        }
      };
    },
    isCallback(callback){
      if (callback) {
        callback()
      }
    },
    delItem(index,item){
      this.$emit('delItem',{index,item})
    }
  }
};
</script>

<style scoped lang="less">
  .form_list {
    display: flex;
    flex-flow: wrap;
    .form_item_close{
      background: #ECF5FF;
      margin-right: 6px;
      height: 40px;
      border-radius: 4px;
      position: relative;
      margin-bottom: 10px;
      .close_btn{
        position: absolute;
        top: 12px;
        right: 10px;
        font-size: 16px;
        color: #409EFF;
        cursor: pointer;
      }
    }
  }
  .btn_list {
    flex: 1;
    // justify-content: flex-end;
    display: flex;
    padding-right: 24px;
    height: 40px;
    margin-bottom: 24px;
    align-items: center;
    .reset_btn {
      margin-right: 10px;
    }
  }
  .el_upload{
    width: 150px;
    height: 80px;
    // background: #f5f5f5;
    cursor: pointer;
    border-radius: 5px;
    border: 1px dashed #cfcfcf;
    font-size: 14px;
    color: #409EFF;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .rate_box{
    padding: 10px 0;
    width: 100%;
  }
</style>
