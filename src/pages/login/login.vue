<template>
	<view class="login">
		<view class="logo">
			<image :src="'/login/logo.png' | imgUrl"></image>
		</view>
		<view class="input">
			<input type="text" v-model="phone" placeholder="请输入手机号" value="" />
		</view>
		<view class="input">
			<input type="password" v-model="pwd" placeholder="请输入6-16位字母或数字密码" value="" />
		</view>
		<button class="btn1" @tap="login()">登录</button>
		<view class="zc">
			<p @tap="$mUtils.goPage('reg',{type:'reg'})">注册</p>
			<span @tap="$mUtils.goPage('reg',{type:'forget'})">忘记密码？</span>
		</view>
		<!-- 微信登录 -->
		<!-- #ifdef MP-WEIXIN -->
		<button class="weixin" open-type="getUserInfo" @getuserinfo="doLogin">
			<p>使用第三方登录</p>
			<image :src="'/login/weixin.png' | imgUrl"></image>
		</button>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				pwd: "",
			};
		},
		methods: {
			doLogin() {
				let self = this;
				uni.getSetting({
					success(res) {
						if (res.authSetting["scope.userInfo"] === undefined) {
							self.wxLogin();
						} else if (res.authSetting["scope.userInfo"] === false) {
							uni.showModal({
								title: "提示",
								content: "申请获得你的公开信息",
								showCancel: false,
								success(res) {
									if (res.confirm) {
										self.openAuthSetting();
									}
								},
							});
						} else if (res.authSetting["scope.userInfo"] === true) {
							self.wxLogin();
						}
					},
				});
			},
			openAuthSetting() {
				let self = this;
				uni.openSetting({
					success(res) {
						console.log("success", res);
						self.doLogin();
					},
					fail(res) {
						console.log("fail", res);
					},
				});
			},
			//微信登录
			wxLogin() {
				let self = this;
				uni.login({
					provider: "weixin",
					success(res) {
						console.log(res, 'wdscdcdcdcdc');
						let code = res.code
						uni.getUserInfo({
							provider: "weixin",
							success(res) {
								console.log("授权userinfo", res)
								let data = {
									code,
									client: 'xcx'
								}
								self.handleLogin(data);
							},
							fail(res) {
								console.log("获取用户信息拒绝fail");
							}
						})
					},
				});
			},
			//授权登录接口
			handleLogin(data) {
				let that = this;
				this.$api.getOpenid(data).then(res => {
					console.log("授权登录接口11", res)
					let session_key = res.data.session_key;
					// eslint-disable-next-line no-undef
					uni.getUserInfo({
						provider: "weixin",
						success(res) {
							//console.log("25252555", res)
							that.$api.getUnionid({
								session_key: session_key,
								encrypted_data: res.encryptedData,
								iv: res.iv,
								client: 'xcx'
							}).then(res => {
								console.log("授权登录接口22", res)
								that.$u.vuex("unionid", res.data.unionId);
								that.$u.vuex("openId", res.data.openId);
								that.$api.wechatLogin({
									unionid: that.unionid
								}).then(res => {
									console.log(res, '123456')
									if (res.code == 3102) {
										that.$mUtils.toast('请先绑定手机号!');
										that.$mUtils.timeout(() => {
											that.$mRouter.push({
												route: that.$mRoutesConfig.bindTel,
											})
										})
									} else if (res.code == 1) {
										that.$u.vuex("TOKEN", res.data.token);
										that.$u.vuex("hasLogin", true);
										that.$mRouter.back()
									}
								})
							})
						},
						fail(res) {
							console.log("获取用户信息拒绝fail");
						}
					})
				})
			},
			//直接登录
			login() {
				const that = this;
				if (!this.phone || !this.pwd) {
					this.$mUtils.toast("用户名或密码为空");
					return
				}
				that.$api
					.login({
						member_mobile: this.phone,
						password: this.pwd,
					})
					.then((res) => {
						console.log(res);
						if (res.code == 1) {
							that.$u.vuex("TOKEN", res.data.token);
							that.$u.vuex("hasLogin", true);
							that.$mUtils.toast("登录成功");
							this.$mUtils.timeout(() => {
								that.$mUtils.goPage("index");
							});
						} else {
							that.$mUtils.toast(res.msg);
						}
					});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.login {
		background-color: #ffffff;
		width: 100%;

		.weixin {
			width: 100%;
			margin-top: 300upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			p {
				font-size: 26upx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #999999;
				margin-bottom: 20upx;
			}

			image {
				width: 100upx;
				height: 100upx;
			}
		}

		.zc {
			width: 558upx;
			margin: 0 auto;
			margin-top: 30upx;
			display: flex;
			justify-content: space-between;

			p {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			span {
				font-size: 26upx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #999999;
			}
		}

		.btn1 {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 558upx;
			height: 78upx;
			background-color: #fa6009;
			border-radius: 38upx;
			font-size: 30upx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #ffffff;
			margin-top: 80upx;
		}

		.input {
			margin: 0 auto;
			margin-top: 30upx;
			width: 558upx;
			height: 78upx;
			background: #f6f6f6;
			border-radius: 38upx;

			input {
				text-indent: 30upx;
				width: 100%;
				height: 100%;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
			}
		}

		.logo {
			width: 100%;
			margin-top: 60upx;
			margin-bottom: 150upx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 236upx;
				height: 58upx;
			}
		}
	}
</style>
