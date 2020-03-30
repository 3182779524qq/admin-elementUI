<template>
  <div class="side_menu">
    <el-menu
      :default-active="onRoutes"
      text-color="#ffffff"
      active-text-color="#ffffff"
      background-color="#b8860b"
      router
      :default-openeds="opens"
    >
      <mysubmenu :menuList="menuList"></mysubmenu>
    </el-menu>
  </div>
</template>
<script>
import mysubmenu from "./subMenu.vue";

export default {
  name: "treeMenus",
  components: {
    mysubmenu
  },
  data() {
    return {
      collapse: false,
      opens: []
    };
  },
  props: {
    menuList: {
      type: Array,
      default: function() {
        return [
          {
            index: "1",
            title: "表格管理",
            show: true,
            children: [
              {
                icon: "icon-gift-liwu",
                index: "table6",
                show: true,
                title: "表格信息",
                children: [
                  {
                    icon: "icon-gift-liwu",
                    index: "table",
                    show: true,
                    title: "表格信息"
                  }
                ]
              }
            ]
          },
          {
            icon: "icon-gift-liwu",
            index: "table3",
            show: true,
            title: "表格信息",
            children: [
              {
                icon: "icon-gift-liwu",
                index: "table4",
                show: true,
                title: "表格信息"
              }
            ]
          }
        ];
      }
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {},
  methods: {
    openKey(e) {
      console.log(e);
    }
  }
};
</script>
<style scoped lang="less">
/deep/ .el-menu {
  border-right: 0;
  background-color: transparent;
}
.side_menu {
  display: block;
  overflow-y: scroll;
}
.side_menu::-webkit-scrollbar {
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