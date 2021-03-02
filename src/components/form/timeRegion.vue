<template>
  <el-date-picker
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="itemObject.disabled ? itemObject.disabled : false"
    :style="{ width: itemObject.wrapWidth ? itemObject.wrapWidth : '85%' }"
    @change="isCallback(itemObject.callback)"
    type="daterange"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
  ></el-date-picker>
</template>
<script>
export default {
  name: "ElmeTimeRegion",
  props: {
    itemObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    isCallback(callback) {
      if (callback) {
        callback();
      }
    },
  },
};
</script>