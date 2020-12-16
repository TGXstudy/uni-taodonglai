const getUrlParam = name => {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
	let res = window.location.search.substr(1).match(reg)
	if (res != null) return unescape(res[2])
	return null
}

export default {
	getUrlParam
}
