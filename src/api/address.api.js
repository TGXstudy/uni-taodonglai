import http from "@/http/index"

export default {
    /**
     * @description 添加收货地址
     * @param 请求参数
     */
    addAddr: (parmas) => http.post('/api/base/address/addAddr', parmas),
    /**
     * @description 编辑收货地址
     * @param 请求参数
     */
    editAddr: (parmas) => http.post('/api/base/address/editAddr', parmas),
    /**
     * @description 删除收货地址
     * @param 请求参数
     */
    delAddr: (parmas) => http.post('/api/base/address/delAddr', parmas),
    /**
     * @description 收货地址列表
     * @param 请求参数
     */
    getList: (parmas) => http.post('/api/base/address/getList', parmas)
}