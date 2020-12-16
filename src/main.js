import Vue from "vue"
import App from "./App"
import Router from "common/js/router.js"
import RouteConfig from "config/routes.config.js"
import Utils from "common/js/utils.js"
import Store from "./store/index.js"
import API from "api/index.js"
import * as filters from "filters/index.js"
import $mReg from "./common/js/reg.js"
import $AppEntryController from "./AppEntryController.js"
import * as qiniu from "qiniu-js"
import uView from "uview-ui"
import NP from "number-precision"
// eslint-disable-next-line no-undef
const vuexStore = require("@/store/$u.mixin.js")

Vue.mixin(vuexStore)

Vue.use(uView)

Vue.config.productionTip = false

Vue.prototype.$AppEntryController = $AppEntryController
Vue.prototype.$mRouter = Router
Vue.prototype.$mRoutesConfig = RouteConfig
Vue.prototype.$mUtils = Utils
Vue.prototype.$store = Store
Vue.prototype.$api = API
Vue.prototype.$regs = $mReg
Vue.prototype.$qiniu = qiniu
Vue.prototype.$np = NP

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

App.mpType = "app"

Router.beforeEach((navType, to) => {
	// console.log("路由守卫",navType, to,)
	if (to.route === undefined)
		throw "路由钩子函数中没有找到to.route对象，路由信息:" +
			JSON.stringify(to)
	// 过滤需要权限的页面
	if (to.route.requiresAuth) {
		// eslint-disable-next-line no-undef
		if (uni.getStorageSync("lifeData").hasLogin) {
			console.log("已经登录")
			// 已经登录
			// eslint-disable-next-line no-undef
			uni[navType]({
				url: Utils.objParseUrlAndParam(to.route.path, to.query)
			})
		} else {
			// 登录成功后的重定向地址和参数objParseParam
			console.log(to.query)
			let query = {
				redirectUrl: to.route.path,
				query: JSON.stringify(to.query)
			}
			console.log(
				"没有登录,登录成功后的重定向地址和参数",
				RouteConfig.login.path,
				query
			)
			// eslint-disable-next-line no-undef
			uni.navigateTo({
				url: Utils.objParseUrlAndParam(RouteConfig.login.path, query)
			})
		}
	} else {
		// eslint-disable-next-line no-undef
		uni[navType]({
			url: Utils.objParseUrlAndParam(to.route.path, to.query)
		})
	}
})

const app = new Vue({
	Store,
	...App
})

import goPage from "@/common/js/goPage.js"

Vue.use(goPage, app)

app.$mount()
