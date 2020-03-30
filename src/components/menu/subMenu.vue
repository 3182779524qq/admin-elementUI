<template>
  <div class="sub_menu">
    <template v-for="item in menuList">
      <template v-if="item.children">
        <el-submenu :index="item.index" :key="item.index" v-if="item.show">
          <span slot="title">{{ item.title }}</span>
          <tree-menu :menuList="item.children"></tree-menu>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index" :key="item.index" v-if="item.show">
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: "treeMenu",
  data() {
    return {
    };
  },
  props: {
    menuList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
  },
  created() {},
  methods: {
  }
};
</script>
<style scoped lang="less">
/deep/ .el-menu {
  border-right: 0;
  background-color: transparent;
}
.sub_menu {
  display: block;
  overflow-y: scroll;
}
.sub_menu::-webkit-scrollbar {
  width: 0;
}
/deep/ .el-submenu__title i {
  color: #fff;
  text-indent: 0;
}
.el-menu-item.is-active {
  background-color: #b86600 !important;
}
.el-menu--inline li {
  /* 二级菜单颜色 */
  background-color: #b87700 !important;
  text-indent: 10px;
}
</style>