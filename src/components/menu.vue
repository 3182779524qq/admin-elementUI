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
            index: "demo",
            show: true,
            title: "采购商",
            subs: [
              {
                icon: "icon-gift-liwu",
                index: "entryAudit",
                show: true,
                title: "入驻审核"
              },
              {
                icon: "icon-gift-liwu",
                index: "buyerManagement",
                show: true,
                title: "采购商信息"
              }
            ]
          },
          {
            index: "demoForm",
            show: true,
            title: "商品管理",
            subs: [
              {
                icon: "icon-gift-liwu",
                index: "classify",
                show: true,
                title: "分类管理"
              },
              {
                icon: "icon-gift-liwu",
                index: "goodList",
                show: true,
                title: "商品信息"
              }
            ]
          },
          {
            index: "1",
            title: "订单管理",
            show: true,
            subs: [
              {
                icon: "icon-gift-liwu",
                index: "orderList",
                show: true,
                title: "订单信息"
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
.el-menu--inline li {
  /* 二级菜单颜色 */
  // background-color: #001932 !important;
  text-indent: 10px;
}
// .el-menu-item {
//   height: 50px;
//   line-height: 50px;
// }
</style>