<template>
  <el-input 
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="itemObject.disabled?itemObject.disabled:false"
    :maxLength="itemObject.maxLength?itemObject.maxLength:30"
    :placeholder="itemObject.placeholder?itemObject.placeholder:'请输入'+itemObject.label"
    :clearable="itemObject.allowClear?itemObject.allowClear:false"
    :style="{ width:itemObject.wrapWidth?itemObject.wrapWidth:'85%'}"
  >
    <template slot="append" v-if="itemObject.append">{{itemObject.append}}</template>
  </el-input>
</template>
<script>
export default {
  name: "ElmeInput",
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