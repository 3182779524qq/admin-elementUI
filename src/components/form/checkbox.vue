<template>
  <el-checkbox-group
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="itemObject.disabled ? itemObject.disabled : false"
    @change="isCallback(itemObject.callback)"
    :style="{ width: itemObject.wrapWidth ? itemObject.wrapWidth : '85%' }"
  >
    <el-checkbox
      v-for="(selItem, selIndex) in itemObject.options"
      :label="selItem.value"
      :key="selIndex"
      >{{ selItem.label }}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
export default {
  name: "ElmeCheckbox",
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