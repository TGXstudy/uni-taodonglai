import $mUtils from "@/common/js/utils.js"
import $store from "@/store/index.js"
import $mConfig from "@/config/index.config.js"

// import sha1 from "js-sha1"

const http = {}
http.post = (url, params = {}, hideLoading = false) => {
	// eslint-disable-next-line no-undef
	let userAgent = process.env.VUE_APP_PLATFORM,
		dataObj = params || {}
	// let appId = "market"
	// let	projectName = "market"
	// let	randStr = $mUtils.getRandStr(5)
	// let	timestamp = $mUtils.getCurTime()
	// let	signature = sha1(sha1(timestamp + randStr) + appId)
	// let	obj = {
	// 		header: {
	// 			signature: signature,
	// 			timestamp: timestamp,
	// 			nonce: randStr,
	// 			project: projectName,
	// 			user_agent: userAgent,
	// 			token: ""
	// 		},
	// 		data: dataObj
	// 	}

	let opt = {
		url: $mConfig.baseUrl + url,
		data: dataObj,
		method: "POST",
		header: {
			"Device-Type": "web",
			"X-Requested-With": "XMLHttpRequest",
			"Content-Type": "application/json; charset=UTF-8",
			Authorization: $store.state.TOKEN
		},
		dataType: "json"
	}
	console.log({
		设备代理: userAgent,
		请求地址: opt.url,
		请求头: opt.header,
		请求参数: dataObj,
		// eslint-disable-next-line no-undef
		环境: process.env
	})

	//接口请求
	if (!hideLoading) {
		// eslint-disable-next-line no-undef
		uni.showLoading({
			mask: true,
			title: "请稍候..."
		})
	}
	return new Promise((reslove, reject) => {
		// eslint-disable-next-line no-undef
		uni.request(opt)
			.then(res => {
				// eslint-disable-next-line no-undef
				!hideLoading && uni.hideLoading()
				let response = res[1].data
				//根据响应code,做处理
				if (response.code !== 1) {
					//token失效，刷新token
					switch (response.code) {
						case 1124:
							$mUtils.goPage("index")
							break
						case 10001:
							$mUtils.toast("登录失效，请重新登录")
							$mUtils.goPage("login")
							break
						case 3102:
							reslove(response)
							break
						case "1352":
							reslove(response)
							break
						case 0:
							reslove(response)
							break
						default:
							$mUtils.toast(response.msg)
							break
					}
				} else {
					reslove(response)
				}
			})
			.catch(err => {
				if (!hideLoading) {
					$mUtils.toast("网络不给力，请稍后再试~")
					//uni.hideLoading()
				}
				reject(err)
			})
	})
}
http.upload = (url, filePath, filename, hideLoading) => {
	//接口请求
	if (!hideLoading) {
		// eslint-disable-next-line no-undef
		uni.showLoading({
			mask: true,
			title: "请稍候..."
		})
	}
	return new Promise((reslove, reject) => {
		// eslint-disable-next-line no-undef
		uni.uploadFile({
			url: $mConfig.baseUrl + url, //仅为示例，非真实的接口地址
			filePath: filePath,
			name: filename,
			header: {
				Authorization: $store.state.TOKEN
			},
			success: function(res) {
				// eslint-disable-next-line no-undef
				!hideLoading && uni.hideLoading()
				reslove(res)
			},
			fail: function(error) {
				reject(error)
			}
		})
	}).catch(err => {
		if (!hideLoading) {
			$mUtils.toast("网络不给力，请稍后再试~")
			// eslint-disable-next-line no-undef
			uni.hideLoading()
		}
		throw err
	})
}

export default http
