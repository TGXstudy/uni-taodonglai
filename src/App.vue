<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			// #ifdef H5
			this.isGzh()
			// #endif
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
		methods: {
			// isGzh() {
			// 	let ua = navigator.userAgent.toLowerCase();
			// 	let isWeixin = ua.indexOf('micromessenger') != -1;
			// 	if (isWeixin) {
			// 		return true;
			// 	} else {
			// 		// eslint-disable-next-line no-undef
			// 		uni.navigateTo({
			// 			url: '/pages/index/isGzh'
			// 		});
			// 		return false;
			// 	}
			// }
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import "./common/css/common.css";
	@import "./common/css/base.scss";
</style>
