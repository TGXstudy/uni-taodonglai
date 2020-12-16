import http from "@/http/index"

export default {
    /**
     * @description 修改支付密码
     * @param 请求参数
     */
    set_pay_pwd: (parmas) => http.post('/api/base/user/set_pay_pwd', parmas),
    /**
     * @description 是否设置支付密码
     * @param 请求参数
     */
    havePayPwd: (parmas) => http.post('/api/base/user/havePayPwd', parmas),
    /**
     * @description 忘记密码，修改登录密码
     * @param 请求参数
     */
    forgetPassword: (parmas) => http.post('/api/base/user/forgetPassword', parmas),
    /**
     * @description 修改手机号
     * @param 请求参数
     */
    reset_mobile: (parmas) => http.post('/api/base/user/reset_mobile', parmas)
}