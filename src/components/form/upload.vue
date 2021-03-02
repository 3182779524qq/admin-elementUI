<template>
  <div class="el_upload" @click="uploadFun(itemObject.customRequest)">
    {{ formValue[item.prop] ? "已上传" : "点击上传" }}
  </div>
</template>
<script>
export default {
  name: "ElmeUpload",
  props: {
    itemObject: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods:{
    // 简单的上传
    uploadFun(callback){
      let input = document.createElement("input");
      input.type = "file";
      input.click();
      input.onchange = (e) => {
        // input.files[0] 是获取到的文件
        // console.log(input.files[0],'==========');
        if (callback) {
          callback(input.files[0])
        }
      };
    },
  }
};
</script>
<style scoped lang="less">
  .form_list {
    display: flex;
    flex-flow: wrap;
  }
  .btn_list {
    flex: 1;
    // justify-content: flex-end;
    display: flex;
    padding-right: 24px;
    height: 40px;
    margin-bottom: 24px;
    align-items: center;
    .reset_btn {
      margin-right: 10px;
    }
  }
  .el_upload{
    width: 150px;
    height: 80px;
    // background: #f5f5f5;
    cursor: pointer;
    border-radius: 5px;
    border: 1px dashed #cfcfcf;
    font-size: 14px;
    color: #409EFF;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>