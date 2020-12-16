import Vue from 'vue'
import config from "@/config/index.config.js"
import qiniuUploader from "./qiniuUploader";

let vue = new Vue();
export default {

	// imgUrl(url) {
	// 	return config.imgUrl + url;
	// },
	imgUrl(url) {
		return '../../static/imgs' + url;
	},
	/* 
	 * obj 转 params字符串参数  
	 * 例子：{a:1,b:2} => a=1&b=2
	 */
	objParseParam(obj) {
		let paramsStr = "";
		if (obj instanceof Array) return paramsStr;
		if (!(obj instanceof Object)) return paramsStr;
		for (let key in obj) {
			paramsStr += `${key}=${obj[key]}&`;
		}
		return paramsStr.substring(0, paramsStr.length - 1);
	},
	// 七牛上传文件
	uploadFile(file) { //file为上传的文件
		console.log("file为上传的文件", file)
		return new Promise(function(resolve, reject) {
			let that = vue
			that.$api.qiniuToken().then((res) => {
				if (res.code === 1) {
					let token = res.data;
					let key = file.name;
					qiniuUploader.upload(file.path, (res) => {
						// 每个文件上传成功后,处理相关的事情
						// 其中 info 是文件上传成功后，服务端返回的json，形式如
						// {
						//    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
						//    "key": "gogopher.jpg"
						//  }
						// 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
						//  that.setData({
						// 'imageURL': res.imageURL,
						//  });
						console.log(res, "上传文件");
						res.fileName = file.name;
						resolve(res)
					}, (error) => {
						reject(error)
					}, {
						region: 'SCN', //地区代码
						domain: config.qiniuUrl,
						// domain: 'hbgjqn.zhonglizz.cn', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
						key: key, // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
						// 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
						uptoken: token, // 由其他程序生成七牛 uptoken
						// uptokenURL: 'UpTokenURL.com/uptoken', // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
						// uptokenFunc: function() {return '[yourTokenString]';}
					}, () => {
						// console.log('上传进度', res.progress)
						// console.log('已经上传的数据长度', res.totalBytesSent)
						// console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
					});
				} else {
					// eslint-disable-next-line no-undef
					uni.hideLoading();
				}
			}).catch((err) => {
				// eslint-disable-next-line no-undef
				uni.hideLoading();
				throw err
			})
		})
	},
	/* 
	 * obj 转 路由地址带参数
	 * 例子：{a:1,b:2} => /pages/index/index?a=1&b=2
	 */
	objParseUrlAndParam(path, obj) {
		let url = path || "/";
		let paramsStr = "";
		if (obj instanceof Array) return url;
		if (!(obj instanceof Object)) return url;
		paramsStr = this.objParseParam(obj);
		paramsStr && (url += "?");
		url += paramsStr;
		return url;
	},

	/* 
	 * 获取url字符串参数
	 */
	getRequestParameters(locationhref) {
		let href = locationhref || "";
		let theRequest = new Object();
		let str = href.split("?")[1];
		if (str != undefined) {
			let strs = str.split("&");
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},


	/**
	 * 乘法，解决js精度损失问题
	 * @param {*} arg1 
	 * @param {*} arg2 
	 */
	accMul(arg1, arg2) {
		arg1 = arg1 || 0;
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length
		} catch (e) {
			console.log(e)
		}
		try {
			m += s2.split(".")[1].length
		} catch (e) {
			console.log(e)
		}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
	},

	isChecked(list, string) {
		let a = list.filter(item => {
			if (item == string) return item
		})
		console.log(a)
		return a
	},


	// 随机生成n位随机数
	getRandStr(n) {
		let str = ''
		for (let i = 0; i < n; i++) {
			str += Math.floor(Math.random() * 10).toString()
		}
		return str
	},
	// 获取当前时间
	getCurTime() {
		let date = new Date(),
			y = date.getFullYear().toString().substr(2),
			m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString(),
			d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString(),
			h = date.getHours() % 12 < 10 ? '0' + date.getHours() % 12 : (date.getHours() % 12).toString(),
			i = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes().toString(),
			s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds().toString();
		return (y + m + d + h + i + s)
	},
	// 提示组件
	toast(text, duration, success) {
		// eslint-disable-next-line no-undef
		uni.showToast({
			title: text,
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
	},
	//延时器
	timeout(callback, duration = 1000) {
		let tid = setTimeout(function() {
			callback();
			clearTimeout(tid)
		}, duration)
	},
	// upx转px
	px(num) {
		// eslint-disable-next-line no-undef
		return 2 * uni.upx2px(num) + 'px';
	},
	addImgUrl(props) {
		if (props.indexOf('http://') === -1 && props.indexOf('https://') === -1) {
			// eslint-disable-next-line no-undef
			let url = process.env.VUE_APP_PLATFORM == "h5" ? "" : "https://shopbase.wsyjcs.cn";
			return url + props;
		} else {
			return props
		}
	},
	// 处理图片,去掉后缀加密
	handleImg(val) {
		// let str = val.split('?')[0];
		return val;
	},

	formatMsgDate(value1, value2) {
		var now = new Date(value1 * 1000);
		var date = new Date(value2.replace(/-/g, "/"));
		//计算时间间隔，单位为分钟
		var inter = parseInt((now.getTime() - date.getTime()) / 1000 / 60);
		if (inter == 0) {
			return "刚刚";
		}
		//多少分钟前
		else if (inter < 60) {
			return inter.toString() + "分钟前";
		}
		//多少小时前
		else if (inter < 60 * 24) {
			return parseInt(inter / 60).toString() + "小时前";
		} else if (now.getFullYear() == date.getFullYear()) {
			return (date.getMonth() + 1).toString() + "-" +
				date.getDate().toString() + " " +
				date.getHours() + ":" +
				date.getMinutes();
		} else {
			return date.getFullYear().toString().substring(2, 3) + "-" +
				(date.getMonth() + 1).toString() + "-" +
				date.getDate().toString() + " " +
				date.getHours() + ":" +
				date.getMinutes();
		}
	},

	rateInfo(value) {
		switch (value) {
			case 1:
				return '非常差'
			case 2:
				return '差'
			case 3:
				return '一般'
			case 4:
				return '好'
			case 5:
				return '非常好'
		}
	},

	rplaceRichImg(content) {
		let str = content.replace(/<img[^>]*>/gi, function(match) {
			console.log(match, match.indexOf('style'), 'replace')
			if (match.indexOf('style') != -1) {
				// return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="max-width:100%;height:auto;"') // 替换style
				return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="width:100%;height:auto;"') // 替换style
			} else {
				return match.replace(/<img/ig, '<img style="width:100%;height:auto;"')
				// return match.replace(/<img/ig, '<img style="max-width:100%;height:auto;"')
			}

		})
		return str
	},

	stopScroll() {
		// #ifdef MP-WEIXIN
		// #endif
		// #ifdef APP-PLUS || H5
		document.body.style.overflow = 'hidden';
		document.body.style.height = "100%";
		document.addEventListener("touchmove", function(event) {
			event.preventDefault();
		}, false) //禁止页面滑动
		// #endif
	},

	startScroll() {
		// #ifdef MP-WEIXIN
		// #endif
		// #ifdef APP-PLUS || H5
		document.body.removeAttribute('style')
		document.removeEventListener("touchmove", function(event) {
			event.preventDefault();
		}, false)
		// #endif
	},
	checkIsWx() {
		var u = navigator.userAgent.toLowerCase()
		if (u.match(/MicroMessenger/i)) {
			return true
		}
		return false
	},
	async compressImage(src, platform) {
		const imageInfo = await this.getImageInfo(src);
		const orientation = imageInfo.orientation;
		if (!orientation) {
			return src
		}
		console.log(imageInfo, orientation, platform)
		let rotate = 0;
		let quality = 80;
		if (platform === 'ios') {
			rotate = 90;
			quality = 25;
		} else {
			switch (orientation) {
				case 'up': //exif:1 不旋转
					rotate = 180;
					break;
				case 'down': //exif:3 旋转180度
					rotate = 180;
					break;
				case 'right': //exif:6 旋转90度
					rotate = 90;
					break;
				case 'left': //exif:8 旋转270度
					rotate = 270;
					break;
				default:
					rotate = 0;
					break;
			}
		}
		return new Promise(function(resolve, reject) {
			// eslint-disable-next-line no-undef
			uni.compressImage({
				src: src,
				quality: quality,
				rotate: rotate,
				success: res => {
					let tempPath = res.tempFilePath;
					resolve(tempPath)
				},
				fail: (e) => {
					reject(e)
				}
			})

		})
	},
	getImageInfo(path) {
		return new Promise(function(resolve, reject) {
			// #ifdef APP-PLUS
			// eslint-disable-next-line no-undef
			plus.io.getImageInfo({
				src: path,
				success: function(image) {
					resolve(image)
				},
				fail: function(err) {
					console.log("getImageInfoErr: " + JSON.stringify(err));
					reject(err)
				}
			});
			// #endif
			// #ifdef H5 || MP-WEIXIN	
			// eslint-disable-next-line no-undef
			uni.getImageInfo({
				src: path,
				success: function(image) {
					resolve(image)
				},
				fail: function(err) {
					console.log("getImageInfoErr: " + JSON.stringify(err));
					reject(err)
				}
			});
			// #endif
		})
	},
	//富文本编辑
	formatRichText(html) {
		let newContent = html.replace(/<img[^>]*>/gi, function(match) {
			match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
			match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
			match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
			return match;
		});
		newContent = newContent.replace(/style="[^"]+"/gi, function(match) {
			match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi, 'width:100%;');
			return match;
		});
		newContent = newContent.replace(/<br[^>]*\/>/gi, '');
		newContent = newContent.replace(/<img/gi, '<img style="width:100%;height:auto;display:block;margin:10px 0;"');
		return newContent;
	},
}
