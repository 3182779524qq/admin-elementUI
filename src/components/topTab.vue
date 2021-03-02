<template>
  <div class="label_component">
    <el-tabs :value="routeActive" type="card" closable @tab-remove="removeTab" @tab-click="onclick">
      <el-tab-pane
        v-for="(item) in labelList"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import bus from "./util";
import { store, mutations } from "@/store/index";
export default {
  name: "ElmeTopTab",
  data() {
    return {
      labelList: [],
      // routeActive:''
    };
  },
  computed: {
    routeActive() {
      return this.$route.name;
    },
  },
  created() {
    // this.routeActive = this.$route.name
    this.labelList = store.topTabList;
    this.dealLabel();
    // 监听关闭当前页面
    this.$bus.$on("closePage", (path) => {
      if (path) {
        this.$router.push($bus);
      }
      let labelList = this.labelList.concat();
      let index = this.labelList.findIndex((item) => {
        return item.name == this.$route.name;
      });
      this.labelList.splice(index, 1);
      mutations.setTopTabList(this.labelList);
      // this.onRemove(index, labelList[index].name);
    });
  },
  methods: {
    removeTab(targetName) {
      let index = this.labelList.findIndex((item) => {
        return item.name == targetName;
      });
      if (this.labelList.length == 1) {
        this.$message.error("最后一个标签不能删除哦");
      } else {
        this.onRemove(index, targetName);
      }
    },
    onclick(routerName) {
      let goPath = this.labelList.find((item) => {
        return routerName.name == item.name;
      });
      this.$router.push(goPath.path);
    },
    dealLabel() {
      let routeIndex = -1;
      let flag = this.labelList.find((item, index) => {
        routeIndex = index;
        return item.name == this.$route.name;
      });
      let obj = {
        path: this.$route.fullPath,
        title: this.$route.meta.title,
        name: this.$route.name,
        closable: true,
      };
      if (!flag) {
        this.labelList.push(obj);
      } else {
        this.labelList.splice(routeIndex, 1, obj);
      }
      mutations.setTopTabList(this.labelList);
    },
    onRemove(index, name) {
      let labelList = this.labelList;
      if (index  > 0) {
        this.$router.push(labelList[index - 1].path);
      }else{
        if (labelList.length > 1) {
          this.$router.push(labelList[index + 1].path);
        }
      }
      labelList.splice(index, 1);
      mutations.setTopTabList(labelList);
    },
  },
  watch: {
    $route: function () {
      // this.routeActive = this.$route.name
      this.dealLabel();
    },
  },
};
</script>

<style lang="less" scoped>
.label_component {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
  
}
</style>