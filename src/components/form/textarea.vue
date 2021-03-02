<template>
  <el-input
    v-bind="$attrs"
    v-on="$listeners"
    type="textarea"
    :placeholder="itemObject.placeholder?itemObject.placeholder:'请输入'+itemObject.label"
    :autosize="{ minRows: itemObject.minRows?itemObject.minRows:3, maxRows: itemObject.maxRows?itemObject.maxRows:5 }"
    :clearable="itemObject.allowClear?itemObject.allowClear:false"
    :disabled="itemObject.disabled?itemObject.disabled:false"
    :maxLength="itemObject.maxLength?itemObject.maxLength:30"
    resize="none"
    :style="{ width:itemObject.wrapWidth?itemObject.wrapWidth:'85%'}"
  ></el-input>
</template>
<script>
export default {
  name: "ElmeTextarea",
  props:{
    itemObject:{
      type:Object,
      default:function(){
        return {}
      }
    }
  }
}
</script>