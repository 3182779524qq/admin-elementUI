<template>
  <el-radio-group
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="itemObject.disabled ? itemObject.disabled : false"
    :style="{ width: itemObject.wrapWidth ? itemObject.wrapWidth : '85%' }"
    @change="isCallback(itemObject.callback)"
  >
    <el-radio
      v-for="(selItem, selIndex) in itemObject.options"
      :label="selItem.value"
      :key="selIndex"
      >{{ selItem.label }}</el-radio>
  </el-radio-group>
</template>
<script>
export default {
  name: "ElmeRadio",
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