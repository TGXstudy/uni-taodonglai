import http from "@/http/index"
export default {
    /**
     * @description 判断用户是否认证
     * @param 请求参数
     */
    check_auth: (parmas) => http.post(`/api/base/id_auth/check_auth`, parmas),
    /**
     * @description 提交认证
     * @param 请求参数
     */
    auth: (parmas) => http.post(`/api/base/id_auth/auth`, parmas),
    /**
     * @description 用户信息
     * @param 请求参数
     */
    get_auth: (parmas) => http.post(`/api/base/id_auth/get_auth`, parmas),
    /**
     * @description 用户信息
     * @param 请求参数
     */
    getuserinfo: (parmas) => http.post(`/api/base/personal/my_info`, parmas),
    /**
     * @description 编辑个人信息
     * @param 请求参数
     */
    edit_info: (parmas) => http.post(`/api/base/personal/edit_info`, parmas),
    /**
     * @description 注册
     * @param 请求参数
     */
    reg: (parmas) => http.post(`/api/base/user/register`, parmas),
    /**
     * @description 登陆
     * @param 请求参数
     */
    login: (parmas) => http.post('/api/base/user/login', parmas),
    /**
     * @description 签到
     * @param 请求参数
     */
    sign: (parmas) => http.post('/api/base/sign/sign', parmas),
    /**
     * @description 商学院,问题
     * @param 请求参数
     */
    question_school: (parmas) => http.post('/api/base/information/cate', parmas),
    /**
     * @description 商学院,问题列表
     * @param 请求参数
     */
    question_schoolList: (parmas) => http.post('/api/base/information/lists', parmas),
    /**
     * @description 商学院,问题列表详情
     * @param 请求参数
     */
    question_schooldetail: (parmas) => http.post('/api/base/information/detail', parmas),
    /**
     * @description 我的足迹
     * @param 请求参数
     */
    footprint: (parmas) => http.post('/api/base/personal/footprint', parmas),
    /**
     * @description 我的足迹删除
     * @param 请求参数
     */
    delFoot: (parmas) => http.post('/api/base/personal/delFoot', parmas),
    /**
     * @description 优惠券
     * @param 请求参数
     */
    coupon: (parmas) => http.post('/api/base/user/coupon', parmas),
    /**
     * @description 用户领取优惠券
     * @param 请求参数
     */
    takeCoupon: async (parmas) => http.post('/api/base/user/takeCoupon', parmas).then(res => {
		return res
	}),
    /**
     * @description 可领取优惠券列表
     * @param 请求参数
     */
    takeCouponList: (parmas) => http.post('/api/base/user/takeCouponList', parmas),
    /**
     * @description 系统消息列表
     * @param 请求参数
     */
    msgList: (parmas) => http.post('/api/base/user/msgList', parmas),
    /**
     * @description 团队奖励列表
     * @param 请求参数
     */
    groupReward: (parmas) => http.post('/api/base/user/groupReward', parmas),
    /**
     * @description 我的收藏的商品
     * @param 请求参数
     */
    my_collect_goods: (parmas) => http.post('/api/base/personal/my_collect_goods', parmas),
    /**
     * @description 我的收藏的店铺
     * @param 请求参数
     */
    collectStore: (parmas) => http.post('/api/base/personal/collectStore', parmas),
    /**
     * @description 意见反馈
     * @param 请求参数
     */
    service_back: (parmas) => http.post('/api/base/personal/service_back', parmas),
    /**
     * @description 申请区域代理
     * @param 请求参数
     */
    applyAgent: (parmas) => http.post('/api/base/user/applyAgent', parmas),
     /**
     * @description 区域代理奖励列表
     * @param 请求参数
     */
    agentReward: (parmas) => http.post('/api/base/user/agentReward', parmas),
	/**
	 * @description 订单列表
	 * @param 请求参数
	 */
	orderList: (parmas) => http.post('/api/base/goods/orderList', parmas),
	/**
	 * @description 订单详情
	 * @param 请求参数
	 */
	cancelOrder: (parmas) => http.post('/api/base/goods/cancelOrder', parmas),
	/**
	 * @description 取消订单
	 * @param 请求参数
	 */
	orderDetail: (parmas) => http.post('/api/base/goods/orderDetail', parmas),
	/**
	 * @description 绑定手机号
	 * @param 请求参数
	 */
	bindMobile: (parmas) => http.post('/api/base/user/bindMobile', parmas),
	/**
	 * @description 购买贵宾卡
	 * @param 请求参数
	 */
	buyVipCard: (parmas) => http.post('/api/base/user/buyVipCard', parmas),
	/**
	 * @description 贵宾卡明细
	 * @param 请求参数
	 */
	vipBalanceLog: (parmas) => http.post('/api/base/user/vipBalanceLog', parmas),
	/**
	 * @description 行业分类列表
	 * @param 请求参数
	 */
	industry: (parmas) => http.post('/api/base/goods/industry', parmas),
	/**
	 * @description 拼团记录
	 * @param 请求参数
	 */
	groupLog: (parmas) => http.post('/api/base/user/groupLog', parmas),
	/**
	 * @description 拼团详情
	 * @param 请求参数
	 */
	groupDetail: (parmas) => http.post('/api/base/user/groupDetail', parmas),
	/**
	 * @description 积分订单列表
	 * @param 请求参数
	 */
	scoreOrder: (parmas) => http.post('/api/base/goods/scoreOrder', parmas),
	/**
	 * @description 拼中用户选择奖励
	 * @param 请求参数
	 */
	choseReward: (parmas) => http.post('/api/base/user/choseReward', parmas),
	/**
	 * @description 红积分记录
	 * @param 请求参数
	 */
	red_record: (parmas) => http.post('/api/base/score/red_record', parmas),
	/**
	 * @description 提现申请
	 * @param 请求参数
	 */
	applyCash: (parmas) => http.post('/api/base/user/applyCash', parmas),
	/**
	 * @description 提现记录
	 * @param 请求参数
	 */
	applyLog: (parmas) => http.post('/api/base/user/applyLog', parmas),
	/**
	 * @description 余额收支明细
	 * @param 请求参数
	 */
	balanceLog: (parmas) => http.post('/api/base/user/balanceLog', parmas),
	/**
	 * @description 爱拼值
	 * @param 请求参数
	 */
	myLoveValue: (parmas) => http.post('/api/base/user/myLoveValue', parmas),
	/**
	 * @description 我的消费券
	 * @param 请求参数
	 */
	consumerCoupon: (parmas) => http.post('/api/base/user/consumerCoupon', parmas),
	/**
	 * @description 外卖订单列表
	 * @param 请求参数
	 */
	take_orderList: (parmas) => http.post('/api/base/takeout/orderList', parmas),
	/**
	 * @description 外卖订单详情
	 * @param 请求参数
	 */
	take_orderDetail: (parmas) => http.post('/api/base/takeout/orderDetail', parmas),
	/**
	 * @description 删除外卖订单
	 * @param 请求参数
	 */
	take_delOrder: (parmas) => http.post('/api/base/takeout/delOrder', parmas),
	/**
	 * @description 评价订单
	 * @param 请求参数
	 */
	evaluate: (parmas) => http.post('/api/base/takeout/evaluate', parmas),
	/**
	 * @description 外卖取消订单
	 * @param 请求参数
	 */
	take_cancelOrder: (parmas) => http.post('/api/base/takeout/cancelOrder', parmas),
	/**
	 * @description 订单申请退款
	 * @param 请求参数
	 */
	applyRefund: (parmas) => http.post('/api/base/goods/applyRefund', parmas),
	/**
	 * @description 删除订单
	 * @param 请求参数
	 */
	deleteOrder: (parmas) => http.post('/api/base/goods/deleteOrder', parmas),
	/**
	 * @description 评价订单
	 * @param 请求参数
	 */
	evaluateOrder: (parmas) => http.post('/api/base/goods/evaluateOrder', parmas),
	/**
	 * @description 订单确认收货
	 * @param 请求参数
	 */
	confirmOrder: (parmas) => http.post('/api/base/goods/confirmOrder', parmas),
	/**
	 * @description 订单退货填写
	 * @param 请求参数
	 */
	refundExpress: (parmas) => http.post('/api/base/goods/refundExpress', parmas),
	/**
	 * @description 消息已读
	 * @param 请求参数
	 */
	readMsg: (parmas) => http.post('/api/base/user/readMsg', parmas),
}