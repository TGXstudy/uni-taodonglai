import http from "@/http/index"

export default {
    /**
     * @description 积分记录
     * @param 请求参数
     */
    record: (parmas) => http.post('/api/base/score/record', parmas),
    /**
     * @description 黄积分记录
     * @param 请求参数
     */
    yellow_record: (parmas) => http.post('/api/base/score/yellow_record', parmas),
    /**
     * @description 红积分记录
     * @param 请求参数
     */
    red_record: (parmas) => http.post('/api/base/score/red_record', parmas),
    /**
     * @description 红积分兑换余额
     * @param 请求参数
     */
    red_to_balance: (parmas) => http.post('/api/base/score/red_to_balance', parmas),
    /**
     * @description 兑换黄积分
     * @param 请求参数
     */
    score_to_yellow: (parmas) => http.post('/api/base/score/score_to_yellow', parmas),
    /**
     * @description 用户充值
     * @param 请求参数
     */
    recharge: (parmas) => http.post('/api/base/user/recharge', parmas),
    /**
     * @description 购买贵宾卡
     * @param 请求参数
     */
    buyVipCard: (parmas) => http.post('/api/base/user/buyVipCard', parmas),
    /**
     * @description 我的好友列表
     * @param 请求参数
     */
    myFriend: (parmas) => http.post('/api/base/user/myFriend', parmas),
    /**
     * @description 好友消费/店铺收益明细
     * @param 请求参数
     */
    friendDetail: (parmas) => http.post('/api/base/user/friendDetail', parmas),
    /**
     * @description 订单列表
     * @param 请求参数
     */
    orderList: (parmas) => http.post('/api/base/goods/orderList', parmas),
	/**
	 * @description 贡献值
	 * @param 请求参数
	 */
	myContribution: (parmas) => http.post('/api/base/user/myContribution', parmas)
}