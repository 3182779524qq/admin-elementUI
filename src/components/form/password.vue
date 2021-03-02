<template>
  <el-input
    v-bind="$attrs"
    v-on="$listeners"
    show-password
    :disabled="itemObject.disabled ? itemObject.disabled : false"
    :maxLength="itemObject.maxLength ? itemObject.maxLength : 30"
    :placeholder="itemObject.placeholder ? itemObject.placeholder : '请输入' + itemObject.label"
    :clearable="itemObject.allowClear ? itemObject.allowClear : false"
    :style="{ width: itemObject.wrapWidth ? itemObject.wrapWidth : '85%' }"
  ></el-input>
</template>
<script>
export default {
  name: "ElmePassword",
  props: {
    itemObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
};
</script>