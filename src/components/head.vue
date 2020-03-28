<template>
  <div class="header">
    <div class="system">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          :to="{ name:item.name }"
          v-for="(item,index) in routeArr"
          :key="index"
        >{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header_right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "HhhHead",
  data() {
    return {
      routeArr: []
    };
  },
  computed: {},
  created() {
    this.routeArr = this.$route.meta.breadArr;
  },
  methods: {},
  watch: {
    $route: {
      handler(newData, oldData) {
        this.routeArr = newData.meta.breadArr;
      },
      deep: true
    }
  },
  mounted() {}
};
</script>

<style scoped>
.header {
  box-sizing: border-box;
  height: 60px;
  font-size: 22px;
  color: #999;
  overflow: hidden;
  line-height: 60px;
}
.system {
  float: left;
  font-size: 16px;
  margin-top: 20px;
  margin-left: 20px;
}
.header_right {
  float: right;
  padding-right: 50px;
  font-size: 12px;
  color: black;
  font-family: "Microsoft YaHei";
}
</style>