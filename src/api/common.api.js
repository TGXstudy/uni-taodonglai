import http from "@/http/index"

export default {
	/**
	 * @description 获取协议文章
	 * @param 请求参数
	 */
	getArticle: parmas => http.post(`/api/base/common/getArticle`, parmas),
	/**
	 * @description 获取验证码/api/base/common/siteConf
	 */
	sendSms: parmas => http.post(`/api/base/user/sendCode`, parmas),
	/**
	 * @description 七牛
	 * @param 请求参数
	 */
	qiniuToken: parmas => http.post(`/api/base/common/qiniuToken`, parmas),
	/**
	 * @description 站点配置
	 * @param 请求参数
	 */
	siteConf: parmas => http.post(`/api/base/common/siteConf`, parmas),
	/**
	 * @description 微信登录
	 * @param 请求参数
	 */
	wechatLogin: parmas => http.post("/api/base/user/wechatLogin", parmas),
	/**
	 * @description 获取Unionid
	 * @param 请求参数
	 */
	getUnionid: parmas => http.post("/api/base/common/getUnionid", parmas),
	/**
	 * @description 充值
	 * @param 请求参数
	 */
	recharge: parmas => http.post("/api/base/user/recharge", parmas),
	/**
	 * @description 申请开店
	 * @param 请求参数
	 */
	to_be_store: parmas => http.post("/api/base/store/to_be_store", parmas),
	/**
	 * @description 获取OPENID
	 * @param 请求参数
	 */
	getOpenid: parmas => http.post("/api/base/common/getOpenid", parmas),
	/**
	 * @description 获取热门搜索
	 * @param 请求参数
	 */
	getHotSearch: parmas => http.post("/api/base/common/siteConf", parmas)
}
