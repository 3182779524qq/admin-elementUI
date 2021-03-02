# cheergo-erp

## Project setup
```
npm install  //安装项目依赖
```

### Compiles and hot-reloads for development
```
npm run serve  //项目启动命令
```

### Compiles and minifies for production
```
npm run build  //项目打包命令
```

### Lints and fixes files
```
npm run lint
```
### 目录结构

```
public：入口HTML文件
|
src：
|----：assets：
|            css：-------公共css文件
|            images：----项目图片文件存放处
|----：axios：
|            index.js：--axios请求封装
|            url.js：----接口地址文件
|----：components：
|            layout：----页面布局
|            menu：------菜单组件 
|            head：------头部组件
|            topTab:-----选项卡组件
|            table：-----基于element UI二次封装的table组件
|            form：------基于element UI二次封装的弹窗组件
|            dialog：----基于element UI二次封装的弹窗组件
|            ...其余剩余组件
|----：router：
|            index.js：--页面路由文件
|----：store：
|            index.js：--响应式数据仓库，不是vuex
|----：utils：-----------公共方法
|----：views：-----------页面文件夹
|----：APP.vue：---------页面根组件
|----：main.js：---------项目入口js
|----：mock.js：---------接口模拟数据
|
.browserslistrc：--------环境变量配置文件
|
.editorconfig：----------编辑器配置文件
|
.env.development：-------开发环境配置文件
|
.env.production：--------生产环境配置文件
|
.eslintrc.js：-----------eslint配置文件
|
.gitignore：-------------git提交忽略文件
|
babel.config.js：--------babel配置文件
|
package-lock.json：
|
package.json：
|
README.md：
|
vue.config.js：----------vue配置文件

```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 其他
```
超好用的全局代码片段:
{
	"Print to console": {
		"scope": "javascript,typescript,js,vue,html,css",
		"prefix": "ccc",
		"body": [
			"console.log($1,'============');",
		],
		"description": "Log output to console"
	},
	"Print to axios post": {
		"scope": "javascript,typescript,js,vue,html,css",
		"prefix": "$axiosp",
		"body": [
			"this.$$axios.post(this.$$url.url,$2).then(res=>{",
      "  if (res.code==20000) {",
      "    ",
			"  }",
			"}).catch(err=>{",
			"  console.log(err)",
			"})",
		],
		"description": "axios post"
	},
	"Print to axios get": {
		"scope": "javascript,typescript,js,vue,html,css",
		"prefix": "$axiosg",
		"body": [
			"this.$$axios.get(this.$$url.url,$2).then(res=>{",
      "  if (res.code==20000) {",
      "    ",
			"  }",
			"}).catch(err=>{",
			"  console.log(err)",
			"})",
		],
		"description": "axios post"
	},
	"Print to emsg": {
		"scope": "javascript,typescript,js,vue,html,css",
		"prefix": "$emsg",
		"body": [
			"this.$$message.error('$1')",
		],
		"description": "emsg"
	},
	"Print to smsg": {
		"scope": "javascript,typescript,js,vue,html,css",
		"prefix": "$smsg",
		"body": [
			"this.$$message.success('$1')",
		],
		"description": "emsg"
	},
	"Print to axios confirm": {
		"scope": "javascript,typescript,js,vue,html,css",
		"prefix": "$confirm",
		"body": [
			"this.$$confirm('确定要$1吗？','提示', {type: 'warning'}).then(()=>{",
      "  this.$$axios.post(this.$$url.url,$3).then(res=>{",
      "    if (res.code==20000) {",
      "      ",
			"    }",
			"  }).catch(err=>{",
			"    console.log(err)",
			"  })",
			"}).catch(err=>{",
			"  console.log(err)",
			"})",
		],
		"description": "axios post"
	},
}

```
