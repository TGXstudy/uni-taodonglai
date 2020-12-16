/*
 * 路由表对象：
 * 该文件挂载在Vue原型中 $mRoutesConfig
 * 作用：调用$mRouter对象的方法 传入以下对应的路由对象，详细见common目录下的router.js
 * 示例：this.$mRouter.push({route:this.$mRoutesConfig.main,query:{a:1}})
 * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
 *
 * 配置参数项说明：
 * name:可选配置 （路由名称）
 * path:必填配置 （路由地址）
 * requiresAuth:可选配置 （是否权限路由）
 */
export default {
	index: {
		name: "首页",
		path: "/pages/index/index",
		requiresAuth: false
	},
	grabble: {
		name: "搜索",
		path: "/pages/index/grabble",
		requiresAuth: false
	},
	integral: {
		name: "积分商城",
		path: "/pages/integral/integral",
		requiresAuth: false
	},
	integraldetails: {
		name: "积分详情",
		path: "/pages/integral/integraldetails",
		requiresAuth: false
	},
	goodsdetails: {
		name: "商品详情",
		path: "/pages/goodsdetails/goodsdetails",
		requiresAuth: false
	},
	commentList: {
		name: "商品详情--评论页",
		path: "/pages/goodsdetails/commentList",
		requiresAuth: false
	},
	detailsnotice: {
		name: "公告详情",
		path: "/pages/index/detailsnotice",
		requiresAuth: false
	},
	notice_list: {
		name: "最新公告",
		path: "/pages/index/notice_list",
		requiresAuth: false
	},
	systemnotice: {
		name: "系统公告",
		path: "/pages/index/systemnotice",
		requiresAuth: false
	},
	classdetails: {
		name: "分类详情",
		path: "/pages/allcommodity/classdetails",
		requiresAuth: false
	},
	cartlist: {
		name: "积分兑换确认订单",
		path: "/pages/cart/cartlist"
	},
	jf_list: {
		name: "购物车列表",
		path: "/pages/cart/jf_list"
	},
	cart: {
		name: "购物车",
		path: "/pages/cart/cart"
	},
	addressorder: {
		name: "确认地址",
		path: "/pages/cart/addressorder"
	},
	addressorder_takeout: {
		name: "外卖确认地址",
		path: "/pages/cart/addressorder_takeout"
	},
	coupon: {
		name: "选择优惠卷",
		path: "/pages/cart/coupon"
	},
	shopgoods: {
		name: "店铺商品",
		path: "/pages/nearby/shopgoods"
	},
	location: {
		name: "外卖订单",
		path: "/pages/takeout/location"
	},
	groupmore: {
		name: "更多拼团信息",
		path: "/pages/groupbooking/groupmore"
	},
	groupdetails: {
		name: "拼团详情",
		path: "/pages/groupbooking/groupdetails"
	},
	grouprule: {
		name: "拼团规则",
		path: "/pages/groupbooking/grouprule"
	},
	groupbooking: {
		name: "拼团商城",
		path: "/pages/groupbooking/groupbooking"
	},
	seckill: {
		name: "限时秒杀",
		path: "/pages/seckill/seckill"
	},
	autotrophy: {
		name: "自营店铺",
		path: "/pages/autotrophy/autotrophy"
	},
	//登录注册*****************************************************童
	login: {
		name: "登录",
		path: "/pages/login/login",
		requiresAuth: false
	},
	reg: {
		name: "注册",
		path: "/pages/login/reg",
		requiresAuth: false
	},
	bindTel: {
		name: "绑定手机号",
		path: "/pages/login/bindTel",
		requiresAuth: false
	},
	agree_xy: {
		name: "用户协议",
		path: "/pages/login/agree_xy",
		requiresAuth: false
	},
	//个人中心*****************************************************童
	user_rights: {
		name: "我的权益",
		path: "/pages/mine/user_rights",
		requiresAuth: true
	},
	my_footer: {
		name: "我的足迹",
		path: "/pages/mine/my_footer",
		requiresAuth: true
	},
	discount_coupon: {
		name: "优惠券",
		path: "/pages/mine/discount_coupon",
		requiresAuth: true
	},
	discount_coupon_lq: {
		name: "优惠券",
		path: "/pages/mine/discount_coupon_lq",
		requiresAuth: true
	},
	notice: {
		name: "我的消息",
		path: "/pages/mine/notice",
		requiresAuth: true
	},
	notice_detail: {
		name: "我的消息详情",
		path: "/pages/mine/notice_detail",
		requiresAuth: true
	},
	rule: {
		name: "积分规则",
		path: "/pages/integral/rule",
		requiresAuth: true
	},

	code: {
		name: "分享码",
		path: "/pages/mine/code",
		requiresAuth: true
	},
	receipt_code: {
		name: "收款二维码",
		path: "/pages/mine/receipt_code",
		requiresAuth: true
	},
	team_rewards: {
		name: "团队奖励",
		path: "/pages/mine/team_rewards",
		requiresAuth: true
	},
	my_collect: {
		name: "我的收藏",
		path: "/pages/mine/my_collect",
		requiresAuth: true
	},
	address: {
		name: "收货地址",
		path: "/pages/mine/address",
		requiresAuth: true
	},
	add_address: {
		name: "收货地址",
		path: "/pages/mine/add_address",
		requiresAuth: true
	},
	attestation: {
		name: "认证中心",
		path: "/pages/mine/attestation",
		requiresAuth: true
	},
	attestation_center: {
		name: "认证中心",
		path: "/pages/mine/attestation_center",
		requiresAuth: true
	},
	bussines_school: {
		name: "商学院",
		path: "/pages/mine/bussines_school",
		requiresAuth: true
	},
	my_order: {
		name: "购物订单",
		path: "/pages/mine/my_order",
		requiresAuth: true
	},
	takeout: {
		name: "推荐外卖",
		path: "/pages/takeout/takeout",
		requiresAuth: true
	},
	takeout_order: {
		name: "外卖订单",
		path: "/pages/mine/takeout_order",
		requiresAuth: true
	},
	dd_detail: {
		name: "订单详情",
		path: "/pages/mine/dd_detail",
		requiresAuth: true
	},
	takeout_detail: {
		name: "订单详情",
		path: "/pages/mine/takeout_detail",
		requiresAuth: true
	},
	set: {
		name: "设置",
		path: "/pages/set/set",
		requiresAuth: true
	},
	feedback: {
		name: "意见反馈",
		path: "/pages/set/feedback",
		requiresAuth: true
	},
	gy: {
		name: "关于平台",
		path: "/pages/set/gy",
		requiresAuth: true
	},
	info: {
		name: "个人资料",
		path: "/pages/set/info",
		requiresAuth: true
	},
	safe: {
		name: "安全中心",
		path: "/pages/set/safe",
		requiresAuth: true
	},
	check_paypwd: {
		name: "修改支付密码",
		path: "/pages/set/check_paypwd",
		requiresAuth: true
	},
	check_dlpaypwd: {
		name: "修改登录密码",
		path: "/pages/set/check_dlpaypwd",
		requiresAuth: true
	},
	check_phone: {
		name: "修改手机号",
		path: "/pages/set/check_phone",
		requiresAuth: true
	},
	customer: {
		name: "客服中心",
		path: "/pages/mine/customer",
		requiresAuth: true
	},
	customer_child: {
		name: "客服中心",
		path: "/pages/mine/customer_child",
		requiresAuth: true
	},
	customer_detail: {
		name: "常见问题详情",
		path: "/pages/mine/customer_detail",
		requiresAuth: true
	},
	score: {
		name: "我的积分",
		path: "/pages/mine/score/score",
		requiresAuth: true
	},
	score_jl: {
		name: "积分商场兑换记录",
		path: "/pages/mine/score/score_jl",
		requiresAuth: true
	},
	yellow_score: {
		name: "我的黄积分",
		path: "/pages/mine/score/yellow_score",
		requiresAuth: true
	},
	red_score: {
		name: "我的红积分",
		path: "/pages/mine/score/red_score",
		requiresAuth: true
	},
	score_exchange: {
		name: "兑换余额",
		path: "/pages/mine/score/score_exchange",
		requiresAuth: true
	},
	dh_yellow: {
		name: "兑换黄积分",
		path: "/pages/mine/score/dh_yellow",
		requiresAuth: true
	},
	buy_score: {
		name: "购买积分",
		path: "/pages/mine/score/buy_score",
		requiresAuth: true
	},
	buy_vip: {
		name: "贵宾卡使用规则",
		path: "/pages/mine/vip/buy_vip",
		requiresAuth: true
	},
	vip: {
		name: "贵宾卡",
		path: "/pages/mine/vip/vip",
		requiresAuth: true
	},
	pay: {
		name: "支付",
		path: "/pages/mine/pay",
		requiresAuth: true
	},
	deposit: {
		name: "提现",
		path: "/pages/mine/deposit",
		requiresAuth: true
	},
	wallet: {
		name: "我的钱包",
		path: "/pages/mine/wallet/wallet",
		requiresAuth: true
	},
	deposit_jl: {
		name: "提现记录",
		path: "/pages/mine/wallet/deposit_jl",
		requiresAuth: true
	},
	recharge: {
		name: "充值",
		path: "/pages/mine/recharge",
		requiresAuth: true
	},
	apply_agency: {
		name: "申请代理",
		path: "/pages/mine/agency/apply_agency",
		requiresAuth: true
	},
	apply_result: {
		name: "申请代理",
		path: "/pages/mine/agency/apply_result",
		requiresAuth: true
	},
	agency_sy: {
		name: "代理收益",
		path: "/pages/mine/agency/agency_sy",
		requiresAuth: true
	},
	friends: {
		name: "我的好友",
		path: "/pages/mine/friends/friends",
		requiresAuth: true
	},
	friends_mx: {
		name: "消费收益明细",
		path: "/pages/mine/friends/friends_mx",
		requiresAuth: true
	},
	earings_mx: {
		name: "店铺收益明细",
		path: "/pages/mine/friends/earings_mx",
		requiresAuth: true
	},
	open: {
		name: "商家入驻",
		path: "/pages/mine/openstore/open",
		requiresAuth: true
	},
	open_xy: {
		name: "商家入驻协议",
		path: "/pages/mine/openstore/open_xy",
		requiresAuth: true
	},
	open_apply: {
		name: "商家入驻",
		path: "/pages/mine/openstore/open_apply",
		requiresAuth: true
	},
	partker: {
		name: "拼团记录",
		path: "/pages/mine/partker/partker",
		requiresAuth: true
	},
	group_detail: {
		name: "拼团详情",
		path: "/pages/mine/partker/group_detail",
		requiresAuth: true
	},
	mine: {
		name: "我的",
		path: "/pages/mine/mine",
		requiresAuth: true
	},
	xfq: {
		name: "我的消费券",
		path: "/pages/mine/xfq",
		requiresAuth: true
	},
	xfq_dh: {
		name: "兑换余额",
		path: "/pages/mine/xfq_dh",
		requiresAuth: true
	},
	contribution: {
		name: "贡献值",
		path: "/pages/mine/contribution",
		requiresAuth: true
	},
	aipin: {
		name: "爱拼值",
		path: "/pages/mine/aipin",
		requiresAuth: true
	},
	takeout_address: {
		name: "编辑收货地址",
		path: "/pages/takeout/takeout_address",
		requiresAuth: true
	},
	teakeout_add_address: {
		name: "添加收货地址",
		path: "/pages/takeout/teakeout_add_address",
		requiresAuth: true
	},
	selectCoupon: {
		name: "选择优惠券",
		path: "/pages/index/selectCoupon",
		requiresAuth: true
	},
	//外卖*****************************************************
	foodDelivery: {
		name: "外卖--首页",
		path: "/pages/foodDelivery/main",
		requiresAuth: false
	},
	shopDetail: {
		name: "外卖-店铺详情",
		path: "/pages/foodDelivery/shopDetail",
		requiresAuth: false
	},
	foodClass: {
		name: "外卖-店铺分类",
		path: "/pages/foodDelivery/foodClass",
		requiresAuth: false
	},
	confirm: {
		name: "外卖-确认订单",
		path: "/pages/foodDelivery/confirm",
		requiresAuth: true
	},
	foodPay: {
		name: "外卖-订单支付",
		path: "/pages/foodDelivery/foodPay",
		requiresAuth: true
	},
	foodSearch: {
		name: "外卖--搜索",
		path: "/pages/foodDelivery/foodSearch",
		requiresAuth: false
	},
	recommendFood: {
		name: "外卖--推荐外卖",
		path: "/pages/index/recommendFood",
		requiresAuth: false
	},
	isGzh: {
		name: "是否公众号",
		path: "/pages/index/isGzh",
		requiresAuth: false
	}
}
