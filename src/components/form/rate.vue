<template>
  <el-rate 
    v-bind="$attrs"
    v-on="$listeners"
    :colors="itemObject.colors?itemObject.colors:['#F7BA2A', '#F7BA2A', '#F7BA2A']"
    :show-text="itemObject.showText?itemObject.showText:false"
    :show-score="itemObject.showScore?itemObject.showScore:false"
    :disabled="itemObject.disabled?itemObject.disabled:false"
    ></el-rate>
</template>
<script>
export default {
  name: "ElmeRate",
  props: {
    itemObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
  }
};
</script>