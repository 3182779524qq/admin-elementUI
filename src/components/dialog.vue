<template>
  <div>
    <el-dialog
      :width="width"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot></slot>
      <span v-if="footer" slot="footer" class="dialog_footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" :loading="confirmLoading">{{confirmText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "ElmeDialog",
  props: {
    width:{
      type:String,
      default:function(){
        return '520px'
      }
    },
    confirmLoading:{
      type:Boolean,
      default:function(){
        return false
      }
    },
    footer:{
      type:Boolean,
      default:true
    },
    confirmText:{
      type:String,
      default:'确 定'
    }
  },
  data() {
    return {};
  },
  methods: {
    cancel(){
      this.$emit('cancel')
    },
    confirm(){
      this.$emit('confirm')
    },
  }
};
</script>
<style lang="less" scoped>
/deep/.el-dialog__body{
  padding: 10px 20px 0;
}
</style>