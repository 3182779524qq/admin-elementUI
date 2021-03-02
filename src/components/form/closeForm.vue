<!-- 
    //element form二次封装组件,高级表单搜索，带删除表单项操作
    author summer
    2021.2.8
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
      class="form_item"
      :style="{ width:filterSearch.width?filterSearch.width:'50%',display:filterSearch.hide?'none':'block'}"
    >
      <el-form-item :ref="filterSearch.ref" :label="filterSearch.label" :prop="filterSearch.prop" :required="filterSearch.required">
        <component :is="'elme-select'" v-model="filterSearch.value" :itemObject="filterSearch" :size="size"></component>
      </el-form-item>
      <!-- <i class="close_btn el-icon-circle-close" @click="delItem(item)"></i> -->
    </div>
    <div
      class="form_item"
      v-for="(item,index) in formData"
      :key="index"
      :style="{ width:item.width?item.width:'50%',display:item.hide?'none':'block'}"
    >
      <el-form-item :ref="item.ref" :label="item.label" :prop="item.prop" :required="item.required">
        <component :is="'elme-'+item.type" v-model="formValue[item.prop]" :itemObject="item" :size="size"></component>
      </el-form-item>
      <i class="close_btn el-icon-circle-close" @click="delItem(index,item)"></i>
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
import elmeInput from './input'
import elmeSelect from './select'
import elmeTextarea from './textarea'
import elmePassword from './password'
import elmeRadio from './radio'
import elmeCascader from './cascader'
import elmeCheckbox from './checkbox'
import elmeDate from './date'
import elmeTime from './time'
import elmeTimeRegion from './timeRegion'
import elmeUpload from './upload'
import elmeRate from './rate'
export default {
  name: "ElmeForm",
  components:{ elmeInput, elmeSelect, elmeTextarea, elmePassword, elmeRadio, elmeCascader, elmeCheckbox, elmeDate, elmeTime, elmeTimeRegion, elmeUpload,elmeRate },
  props: {
    formData: { // 表单配置
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
    formValue: { // 表单的值
      type: Object,
      default: function () {
        return {};
      },
    },
    filterSearch:{// 表单搜索条件过滤框，和普通item类似，多一个value
      type: Object,
      default: function () {
        return null;
      },
    },
    labelCol: { // 文字宽的宽度
      type: String,
      default: '100px',
    },
    labelPosition: {// 表单域标签的位置
      type: String,
      default: 'right',
    },
    size: { // 输入框的大小
      type: String,
      default: "default",
    },
    formRef: { // form表单的ref
      type: String,
      default: "formRef",
    },
    formClass: { // form表单的class
      type: String,
      default: "",
    },
    formButton: {// form表单的按钮配置，如果不需要则传null
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
    return {};
  },
  created() {},
  mounted() {},
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
    .form_item{
      background: #ECF5FF;
      margin-right: 6px;
      height: 40px;
      border-radius: 4px;
      position: relative;
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
</style>
