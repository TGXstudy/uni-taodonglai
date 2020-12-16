import http from "@/http/index"

export default {
	/**
	 * @description 获取bannar
	 * @param 请求参数
	 */
	banner: params =>
		http.post("/api/base/common/banner", params).then(res => {
			return res
		}),
	/**
	 * @description 获取到公告列表
	 * @param 请求参数
	 */
	notice: params =>
		http.post("/api/base/common/notice", params).then(res => {
			return res
		}),
	/**
	 * @description 获取商品列表 列表类型：1、首页爆款推荐；2、首页/购物车猜你喜欢；3、店铺商品列表；4、搜索商品列表;； 5、爆款拼团商品列表；6、商品详情页同类推荐；7、秒杀列表
	 * @param 请求参数
	 */
	goodsList: params =>
		http.post("/api/base/goods/goodsList", params).then(res => {
			return res
		}),
	/**
	 * @description 获取首页每日必逛
	 * @param 请求参数
	 */
	category: params =>
		http.post("/api/base/goods/category", params).then(res => {
			return res
		}),
	/**
	 * @description 获取首页积分列表
	 * @param 请求参数
	 */
	scoreGoodsList: params =>
		http.post("/api/base/goods/scoreGoodsList", params).then(res => {
			return res
		}),
	/**
	 * @description 商品详情
	 * @param 请求参数
	 */
	goodsDetail: params =>
		http.post("/api/base/goods/goodsDetail", params).then(res => {
			return res
		}),
	/**
	 * @description 商品收藏
	 * @param 请求参数
	 */
	collectGoods: params =>
		http.post("/api/base/goods/collectGoods", params).then(res => {
			return res
		}),
	/**
	 * @description 附近店铺列表
	 * @param 请求参数
	 */
	getStoreList: params =>
		http.post("/api/base/goods/storeList", params).then(res => {
			return res
		}),
	/**
	 * @description 确认订单页
	 * @param 请求参数
	 */
	checkOrder: params =>
		http.post("/api/base/goods/postOrderPage", params).then(res => {
			return res
		}),
	/**
	 * @description 提交订单
	 * @param 请求参数
	 */
	postOrder: params =>
		http.post("/api/base/goods/postOrder", params).then(res => {
			return res
		}),
	/**
	 * @description 支付页信息
	 * @param 请求参数
	 */
	payPage: params =>
		http.post("/api/base/goods/payPage", params).then(res => {
			return res
		}),
	/**
	 * @description 支付
	 * @param 请求参数
	 */
	pay: params =>
		http.post("/api/base/goods/pay", params).then(res => {
			return res
		}),
	/**
	 * @description 店铺信息
	 * @param 请求参数
	 */
	storeBase: params =>
		http.post("/api/base/goods/storeBase", params).then(res => {
			return res
		}),
	/**
	 * @description 添加购物车
	 * @param 请求参数
	 */
	addCart: params =>
		http.post("/api/base/goods/addCart", params).then(res => {
			return res
		}),
	/**
	 * @description 购物车列表
	 * @param 请求参数
	 */
	cartList: params =>
		http.post("/api/base/goods/cartList", params).then(res => {
			return res
		}),
	/**
	 * @description 修改购物车数量
	 * @param 请求参数
	 */
	changeCart: params =>
		http.post("/api/base/goods/changeCart", params).then(res => {
			return res
		}),
	/**
	 * @description 商品 / 店铺评价列表
	 * @param 请求参数
	 */
	comments: params =>
		http.post("/api/base/goods/evaluation", params).then(res => {
			return res
		}),
	/**
	 * @description 秒杀时间段
	 * @param 请求参数
	 */
	secTimes: params =>
		http.post("/api/base/goods/secTimes", params).then(res => {
			return res
		}),
	/**
	 * @description 团购分区
	 * @param 请求参数
	 */
	groupStage: params =>
		http.post("/api/base/goods/groupStage", params).then(res => {
			return res
		}),
	/**
	 * @description 获取拼团列表
	 * @param 请求参数
	 */
	teamList: params =>
		http.post("/api/base/goods/teamList", params).then(res => {
			return res
		}),
	/**
	 * @description 删除购物车
	 * @param 请求参数
	 */
	delCart: params =>
		http.post("/api/base/goods/delCart", params).then(res => {
			return res
		}),
	/**
	 * @description 积分订单
	 * @param 请求参数
	 */
	changePage: params =>
		http.post("/api/base/goods/changePage", params).then(res => {
			return res
		}),
	/**
	 * @description 积分确认兑换
	 * @param 请求参数
	 */
	sureChange: params =>
		http.post("/api/base/goods/sureChange", params).then(res => {
			return res
		}),
	/**
	 * @description 收藏店铺
	 * @param 请求参数
	 */
	collectShop: params =>
		http.post("/api/base/goods/collectStore", params).then(res => {
			return res
		}),
	/**
	 * @description 领取红包
	 * @param 请求参数
	 */
	getRedPacket: params =>
		http.post("/api/base/goods/takePacket", params).then(res => {
			return res
		}),
	/**
	 * @description 查询支付结果
	 * @param 请求参数
	 */
	checkPay: params =>
		http.post("/api/base/goods/checkPay", params).then(res => {
			return res
		}),
	/**
	 * @description 取消支付
	 * @param 请求参数
	 */
	cancelPay: params =>
		http.post("/api/base/goods/cancelPay", params).then(res => {
			return res
		}),
		/**
		 * @description 订单数量
		 * @param 请求参数
		 */
		orderNum: params =>
			http.post("/api/base/goods/orderNum", params).then(res => {
				return res
			})
}
