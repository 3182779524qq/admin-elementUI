<template>
  <el-select
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="itemObject.disabled ? itemObject.disabled : false"
    :placeholder="itemObject.placeholder ? itemObject.placeholder : '请选择' + itemObject.label"
    :allowClear="itemObject.allowClear ? itemObject.allowClear : false"
    @change="isCallback(itemObject.callback)"
    :multiple="itemObject.multiple ? itemObject.multiple : false"
    collapse-tags
    :filterable="itemObject.filterable ? itemObject.filterable : false"
    :style="{ width: itemObject.wrapWidth ? itemObject.wrapWidth : '85%' }"
  >
    <el-option
      v-for="(selItem, selIndex) in itemObject.options"
      :disabled="selItem.disabled?selItem.disabled:false"
      :value="selItem.value"
      :key="selIndex"
      :label="selItem.label"
    ></el-option>
  </el-select>
</template>
<script>
export default {
  name: "ElmeSelect",
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