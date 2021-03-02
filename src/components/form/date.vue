<template>
  <el-date-picker
    v-bind="$attrs"
    v-on="$listeners"
    :type="itemObject.picker ? itemObject.picker : 'date'"
    :disabled="itemObject.disabled ? itemObject.disabled : false"
    :placeholder="itemObject.placeholder ? itemObject.placeholder : '请选择' + itemObject.label"
    :style="{ width: itemObject.wrapWidth ? itemObject.wrapWidth : '85%' }"
    @change="isCallback(itemObject.callback)"
  ></el-date-picker>
</template>
<script>
export default {
  name: "ElmeDate",
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