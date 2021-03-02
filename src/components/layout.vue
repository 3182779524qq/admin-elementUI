<template>
  <div class="app_layout">
    <div class="app_head">
      <myhead>
        <div slot="left" class="system_logo">
          LOGO
          <!-- <img src="../assets/images/logo.png" alt="" srcset=""> -->
        </div>
        <div class="head_content">
          <div class="fold" @click="toggleCollapsed">
            <i class="el-icon-s-operation"></i>
          </div>
          <div class="fold fresh_btn" @click="reload">
            <i class="el-icon-refresh"></i>
          </div>
        </div>
        <div slot="right" class="right_btn">
          <el-dropdown>
            <span class="btn">
              <span class="avator_icon"><i class="el-icon-user"></i></span>{{userInfo.user}}<i class="el-icon-arrow-down el-icon--right"></i>
              <!-- <img :src="avatar" class="avator" alt="" srcset=""> -->
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="loginOut">退出登录</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </myhead>
    </div>
    <div class="app_aside" :style="{ width: collapsed ? '64px' : '200px' }">
      <mymenu :menuList="menuList" :collapse="collapsed"></mymenu>
    </div>
    <!-- <div class="top_tab" :style="{ left: collapsed ? '74px' : '210px' }">
      <topTab />
    </div> -->
    <div class="content_box" ref="contentBox" :style="{ left: collapsed ? '74px' : '210px' }">

      <div class="content">
        <keep-alive :include="keepArr">
          <router-view ref="routeView"></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import myhead from "./head.vue";
import mymenu from "./menu";
import topTab from "./topTab.vue";
import { store,mutations } from "@/store/index";
import elmeDialog from "@/components/dialog";
import elmeForm from "@/components/form";
export default {
  name:'ElmeLayout',
  data() {
    return {
      userInfo:{
        user:'admin'
      },
      // avatar:require('../assets/images/avatar.gif'),
      isRouterAlive:true,
      confirmLoading:false,
      dialogVisible:false,
      menuList:[
          {
            index: "sample",
            title: "示例",
            icon: "el-icon-menu",
            show: true,
            children: [
              {
                icon: "el-icon-c-scale-to-original",
                index: "table",
                title: "表格示例",
              },
              {
                icon: "el-icon-document",
                index: "form",
                title: "表单信息",
              }
            ]
          },
          // {
          //   icon: "el-icon-menu",
          //   index: "table3",
          //   title: "表格信息",
          // }
        ]
    };
  },
  computed: {
    keepArr(){
      return store.topTabList.map(item=>item.name)
    },
    collapsed() {
      return store.collapsed;
    },
  },
  components: {
    myhead,
    mymenu,
    topTab,
    elmeDialog,
    elmeForm
  },
  created() {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    if (userInfo) {
      this.userInfo = userInfo
      if (userInfo.faces) {
        this.avatar = userInfo.faces
      }
    }else{
      // this.$router.push('/') //如果没有获取到用户信息退出到登录
      // this.$message.error('获取用户信息失败，请重新登录')
    }
  },
  methods: {
    reload () {
      // 注：每一个页面要有一个reFreshed方法，在这个方法里设置该页面要初始化的数据，否则点击刷新将报错
      this.$refs.routeView.reFreshed()
    },
    toggleCollapsed() {
      mutations.setCollapsed();
    },
    loginOut(){
      sessionStorage.removeItem('userInfo')
      sessionStorage.removeItem('accessToken')
      mutations.setTopTabList([])
      this.$router.push('/')
    }
  },
};
</script>
<style lang="less" scoped>
.app_head{
  position: absolute;
  left: 0;
  right: 0;
  height: 50px;
  // padding: 0 20px;
  background: #fff;
  .system_logo{
    width: 200px;
    height: 49px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 150px;
      height: auto;
      margin: 0 auto;
    }
  }
  .head_content{
    flex: 1;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 16px;
    .fold{
      height: 26px;
      width: 32px;
      background: #409EFF;
      border-radius: 3px;
      color: #fff;
      text-align: center;
      line-height: 26px;
      font-size: 16px;
      cursor: pointer;
      &:hover{
        background-color: #66b1ff;
        border-color: #66b1ff;
        transition: all 0.2s;
      }
    }
    .fresh_btn{
      margin-left: 20px;
    }
  }
  .right_btn{
    margin-right: 20px;
    height: 50px;
    display: flex;
    align-items: center;
    .btn{
      display: flex;
      align-items: center;
      .avator_icon{
        display: block;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        border: 1px solid #66b1ff;
        font-size: 20px;
        // color: #66b1ff;
        background: #66b1ff;
        color: #fff;
        line-height: 28px;
        text-align: center;
        margin-right: 8px;
      }
      img{
        margin-right: 8px;
        width: 45px;
        border-radius: 50%;
      }
    }
  }
}
.app_aside{
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  width: 200px;
  background: #304156;
  overflow-y: auto;
  scrollbar-width: none;
  transition: all 0.3s;
  &::-ms-scrollbar{
    display: none;
  }
  &::-webkit-scrollbar{
    display: none;
  }
}
.top_tab{
  background: #fff;
  position: absolute;
  top: 50px;
  height: 30px;
  left: 210px;
  right: 10px;
  transition: all 0.3s;
  /deep/.el-tabs__item{
    height: 30px;
    line-height: 30px;
    font-size: 10px;
  }
}
.content_box{
  transition: all 0.3s;
  position: absolute;
  top: 60px;
  left: 210px;
  right: 10px;
  bottom: 10px;
  padding: 10px;
  overflow-y: auto;
  background: #fff;
  border-radius: 4px;
  .content{
    height: 100%;
  }
}
</style>
<style>
.app_aside .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow{
  display: none;
}
.app_aside .el-menu--collapse .el-submenu__title span{
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>