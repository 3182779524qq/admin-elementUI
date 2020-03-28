<template>
  <div class="sidebar">
    <el-menu
      :default-active="onRoutes"
      text-color="#ffffff"
      active-text-color="#ffffff"
      router
    >
      <template v-for="item in menuList">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index" v-if="item.show">
            <template slot="title">
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="(subItem,i) in item.subs">
              <el-menu-item :key="i" :index="subItem.index" v-if="subItem.show">
                <span slot="title">{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index" v-if="item.show">
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "HhhMenu",
  data() {
    return {
      collapse: false
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
            subs: [
              {
                icon: "icon-gift-liwu",
                index: "table",
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
      console.log(this.$route.path.replace("/", ""));
      
      return this.$route.path.replace("/", "");
    }
  },
  created() {},
  methods: {}
};
</script>
<style scoped lang="less">
/deep/ .el-menu{
  border-right: 0;
  background-color: transparent;
}
.sidebar {
  display: block;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
/deep/ .el-submenu__title i{
  color: #fff;
}
.el-menu-item.is-active {
    background-color: #b86600;
  }
.el-menu--inline li {
  /* 二级菜单颜色 */
  background-color: #b87700;
  text-indent: 10px;
}

</style>