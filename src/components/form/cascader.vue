<template>
  <el-cascader
    v-bind="$attrs"
    v-on="$listeners"
    :options="itemObject.options"
    :props="itemObject.props ? itemObject.props : {}"
    :disabled="itemObject.disabled ? itemObject.disabled : false"
    :placeholder="itemObject.placeholder ? itemObject.placeholder : '请选择' + itemObject.label"
    :clearable="itemObject.allowClear ? itemObject.allowClear : false"
    :style="{ width: itemObject.wrapWidth ? itemObject.wrapWidth : '85%' }"
    @change="isCallback(itemObject.callback)"
  ></el-cascader>
</template>
<script>
export default {
  name: "ElmeCascader",
  props: {
    itemObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods:{
    isCallback(callback){
      if (callback) {
        callback()
      }
    }
  }
};
</script>