<template>
  <div class="side_menu">
    <el-menu
      :default-active="onRoutes"
      router
      v-bind="$attrs"
      v-on="$listeners"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#fff"
    >
      <mysubmenu :menuList="menuList"></mysubmenu>
    </el-menu>
  </div>
</template>
<script>
import mysubmenu from "./subMenu.vue";

export default {
  name: "ElmeMenus",
  components: {
    mysubmenu
  },
  data() {
    return {};
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
      return this.$route.name;
    }
  },
  created() {},
  methods: {}
};
</script>
<style scoped lang="less">
.side_menu {
  display: block;
  // overflow-y: scroll;
  /deep/ .el-menu{
    border-right: 0;
    .el-menu-item.is-active{
      background: #263445!important;
    }
  }
}
.side_menu::-webkit-scrollbar {
  width: 0;
}
</style>