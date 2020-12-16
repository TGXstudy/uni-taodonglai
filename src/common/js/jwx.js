/* eslint-disable no-undef */
const jweixin = require("jweixin-module")

import http from "@/http/index"

async function getSignature(params) {
	const res = await http.post("/api/base/common/getSignature", params)
	return res
}

// eslint-disable-next-line no-unused-vars
async function configWeiXin(callback) {
	// eslint-disable-next-line no-unused-vars
	const { data } = await getSignature({
		url: window.location.href
	})
	if (data) {
		let apiList = [
			// 可能需要用到的能力
			"onMenuShareAppMessage",
			"onMenuShareTimeline",
			"hideOptionMenu",
			"showOptionMenu",
			"chooseWXPay"
		]

		let info = {
			debug: false, // 调试，发布的时候改为false
			appId: data.appId,
			nonceStr: data.nonceStr,
			timestamp: data.timestamp,
			signature: data.signature,
			jsApiList: apiList
		}
		jweixin.config(info)
		jweixin.error(err => {
			console.log("config fail:", err)
		})

		// eslint-disable-next-line no-unused-vars
		jweixin.ready(res => {
			if (callback) callback(jweixin) // 配置成功
		})
	} else {
		console.log("配置失败")
	}
}

export default {
	configWeiXin
}
