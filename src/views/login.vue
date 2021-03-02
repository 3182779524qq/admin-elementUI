<template>
  <div class="login">
    <div class="login_box">
      <h2>用户登录</h2>
      <div class="login_row">
        <el-input placeholder="请输入账号" prefix-icon="el-icon-user" v-model="account"></el-input>
      </div>
      <div class="login_row">
        <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="password" show-password></el-input>
      </div>
      <div class="login_row">
        <el-button type="primary" :loading="loading" @click="loginFun">主要按钮</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      account: "",
      password: "",
      loading: false
    };
  },
  created() {},
  methods: {
    loginFun() {
      this.loading = true
      this.$axios.post(this.$url.login,{
        account:this.account,
        password:this.password
      }).then(res=>{
        console.log(res.data.token)
        sessionStorage.setItem('accessToken', res.data.token)
        this.$router.push("/home");
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/variables.less"; //引用css变量
.login {
  width: 100%;
  height: 100%;
  position: relative;
}
.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 230px;
  border: 1px solid @info;
  border-radius: 4px;
}
h2{
  line-height: 64px;
  text-align: center;
}
.login_row{
  width: 280px;
  margin: 10px auto;
}
/deep/ .el-button {
  width: 100%;
}
</style>
