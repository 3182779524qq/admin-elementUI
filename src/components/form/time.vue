<template>
  <el-time-picker
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="itemObject.disabled?itemObject.disabled:false"
    :placeholder="itemObject.placeholder?itemObject.placeholder:'请选择'+itemObject.label"
    :style="{ width:itemObject.wrapWidth?itemObject.wrapWidth:'85%'}"
    @change="isCallback(itemObject.callback)"
  ></el-time-picker>
</template>
<script>
export default {
  name: "ElmeTime",
  props:{
    itemObject:{
      type:Object,
      default:function(){
        return {}
      }
    }
  },
  methods:{
    isCallback(callback){
      if (callback) {
        callback()
      }
    }
  }
}
</script>