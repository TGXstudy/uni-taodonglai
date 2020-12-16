import http from "@/http/index"

export default {
    /**
     * @description 外卖商品列表
     * @param 请求参数
     */
    takeOutGoodsList: (params) => http.post('/api/base/takeout/goodsList2', params).
    then(res => {
        return res
    }),
    /**
     * @description 外卖店铺详情
     * @param 请求参数
     */
    getShopDeatil: (params) => http.post('/api/base/takeout/shopDetail', params).
    then(res => {
        return res
    }),
    /**
     * @description 外卖订单确认页
     * @param 请求参数
     */
    foodCheckOrder: (params) => http.post('/api/base/takeout/postOrderPage', params).
    then(res => {
        return res
    }),
    /**
     * @description 外卖计算配送费
     * @param 请求参数
     */
    deliveryFee: (params) => http.post('/api/base/takeout/deliveryFee', params).
    then(res => {
        return res
    }),
    /**
     * @description 外卖提交订单
     * @param 请求参数
     */
    foodPostOrder: (params) => http.post('/api/base/takeout/postOrder', params).
    then(res => {
        return res
    }),
    /**
     * @description 外卖支付页
     * @param 请求参数
     */
    foodPayPage: (params) => http.post('/api/base/takeout/payPage', params).
    then(res => {
        return res
    }),
    /**
     * @description 外卖支付
     * @param 请求参数
     */
    foodPay: (params) => http.post('/api/base/takeout/pay', params).
    then(res => {
        return res
    }),
    /**
     * @description 外卖评价列表
     * @param 请求参数
     */
    takeout_evaluation: (params) => http.post('/api/base/takeout/evaluation', params).
    then(res => {
        return res
    }),
    /**
     * @description 外卖优惠券列表
     * @param 请求参数
     */
    foodCoupon: (params) => http.post('/api/base/takeout/coupon', params).
    then(res => {
        return res
    }),
    /**
     * @description 外卖分类图标
     * @param 请求参数
     */
    foodIcons: (params) => http.post('/api/base/goods/industry', params).
    then(res => {
        return res
    }),
    /**
     * @description 外卖取消支付
     * @param 请求参数
     */
    foodCancelPay: (params) => http.post('/api/base/takeout/cancelPay', params).
    then(res => {
        return res
    }),
}