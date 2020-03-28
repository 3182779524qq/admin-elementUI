<template>
  <div class="header">
    <div class="header_left">
      <slot name="left"></slot>
    </div>
    <!-- <div class="system">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          :to="{ name:item.name }"
          v-for="(item,index) in routeArr"
          :key="index"
        >{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  color: #999;
  font-size: 22px;
}
</style>