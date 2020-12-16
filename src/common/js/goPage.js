import $mRoutesConfig from "@/config/routes.config.js"

const tabs = ["mine", "index", "classify", "nearby", "cart"]

const install = (Vue, vm) => {
	/**
	 * @description 页面跳转
	 * @param {*} routeName 页面名称
	 * @param {*} query 携带参数
	 */
	const goPage = (routeName, query = {}) => {
		if (tabs.includes(routeName)) {
			vm.$mRouter.switchTab({
				route: $mRoutesConfig[routeName],
				query
			})
			return
		}
		vm.$mRouter.push({
			route: $mRoutesConfig[routeName],
			query
		})
	}
	vm.$mUtils.goPage = goPage
}

export default {
	install
}
