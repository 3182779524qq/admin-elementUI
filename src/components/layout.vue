<template>
  <div class="app_layout">
    <div class="app_head">
      <myhead>
        <div slot="left">我是系统标题</div>
        <div slot="right">我是退出按钮</div>
      </myhead>
    </div>
    <div class="app_aside">
      <mymenu></mymenu>
    </div>
    <div class="content_box" ref="contentBox">
      <div class="content">
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import myhead from "./head.vue";
import mymenu from "./menu";
export default {
  data() {
    return {
      msg: "hello"
    };
  },
  components: {
    myhead,
    mymenu
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.app_head{
  position: absolute;
  left: 0;
  right: 0;
  height: 60px;
  padding: 0 20px;
  background: #fff;
}
.app_aside{
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  width: 200px;
  background: darkgoldenrod;
}
.content_box{
  position: absolute;
  top: 70px;
  left: 210px;
  right: 10px;
  bottom: 10px;
  padding: 10px;
  overflow-y: auto;
  background: #fff;
  border-radius: 4px;
}
</style>