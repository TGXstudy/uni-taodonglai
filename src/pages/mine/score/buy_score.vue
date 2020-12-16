<template>
	<view class="dh">
		<view class="top">
			<view class="top_a">
				<p>购买积分数:</p>
				<input type="text" v-model="num" placeholder="请输入要购买的积分数" value="" />
			</view>
			<view class="top_b">
				金额:<span>￥{{(num*userinfo.score_price).toFixed(2)}}</span>
			</view>
		</view>
		<view class="pay">
			<view class="nav">
				<view class="title">
					请选择支付方式
				</view>
				<view class="check" @tap="payway = '1'">
					<view class="left">
						<image class="icon-sz-narrow" :src="'/mine/ic_pay_tag_wchat.png' | _imgUrl" mode=""></image>
						<span>微信支付</span>
					</view>
					<view class="right">
						<image class="icon-sz-narrow" :src=" (payway == '1' ?'/mine/ic_car_choose_true.png' : '/mine/ic_car_choose_false.png') | _imgUrl"
						 mode=""></image>
					</view>
				</view>
				<!-- #ifdef H5 -->
				<view class="check" @tap="payway = '2'" v-if=" !$mUtils.checkIsWx()">
					<view class="left">
						<image class="icon-sz-narrow" :src="'/mine/ic_pay_tag_zfb.png' | _imgUrl" mode=""></image>
						<span>支付宝支付</span>
					</view>
					<view class="right">
						<image class="icon-sz-narrow" :src="(payway == '2' ?'/mine/ic_car_choose_true.png' : '/mine/ic_car_choose_false.png') | _imgUrl"
						 mode=""></image>
					</view>
				</view>
				<!-- #endif -->
				<view class="check" @tap="payway = '3'">
					<view class="left">
						<image class="icon-sz-narrow" :src="'/mine/ic_pay_tag_yue.png' | _imgUrl" mode=""></image>
						<span>余额支付</span>
					</view>
					<view class="right">
						<image class="icon-sz-narrow" :src="(payway == '3' ?'/mine/ic_car_choose_true.png' : '/mine/ic_car_choose_false.png') | _imgUrl"
						 mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<button class="qr" @click="qr()">去支付</button>
		<pwd-input ref="pwdPopup" @confirm-pay="confirmPay"></pwd-input>
	</view>
</template>
<script>
	import pwdInput from "@/components/PwdInput.vue"
	import $mConfig from "@/config/index.config.js"
	import getUrlParam from "@/common/js/getUrlParam"
	import jwx from "@/common/js/jwx"
	export default {
		components: {
			pwdInput
		},
		data() {
			return {
				payway: '1', //余额3,微信1,支付宝2
				num: '', //数量
				wallet_to_balance: "", //兑换比例
				hd_ye: '', //转换后可获得余额
				wallet: "", //钱包
				userinfo: {}, //用户信息
				sxf: '', //手续费
				hasPwd: false, //是否设置支付密码
			}
		},
		onShow() {
			this.checkPayPwd()
			this.getuser();
		},
		
		methods: {
		
			//获取用户信息
			getuser() {
				this.$api.getuserinfo().then((res) => {
					console.log(res)
					this.userinfo = res.data;
				});
			},
			//判断是否设置支付密码
			checkPayPwd() {
				this.$api.havePayPwd().then(res => {
					console.log("判断是否设置支付密码", res)
					if (res.data.have_pay_password == 1) {
						this.hasPwd = true;
					} else if (res.data.have_pay_password == 0) {
						this.hasPwd = false;
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//输入支付密码
			inputPayPwd() {
				if (this.hasPwd) {
					this.$refs.pwdPopup.open()
				} else {
					this.$mUtils.toast("请设置支付密码")
					this.$mUtils.timeout(() => {
						this.$mUtils.goPage("check_paypwd")
					})
				}
			},
			//支付密码确认
			confirmPay(pwd) {
				console.log("支付密码确认", pwd)
				this.$refs.pwdPopup.close()
				//余额支付，钱包支付 accoutPay 
				this.accoutPay(pwd)
			},
			// 余额支付
			accoutPay(pwd) {
				this.$api.recharge({
					amount: (this.num * this.userinfo.score_price).toFixed(2),
					recharge_type: '2',
					client: 'wap',
					pay_type: this.payway,
					pay_pwd: pwd
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$mRouter.redirectTo({
								route: this.$mRoutesConfig.score
							})
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//公众号支付
			 gzhPay(payRes) {
				if (payRes) {
					jwx.configWeiXin(jweixin => {
						jweixin.chooseWXPay({
							nonceStr: payRes.nonceStr,
							timestamp: payRes.timeStamp,
							package: payRes.package,
							signType: payRes.signType,
							paySign: payRes.paySign,
							success: () => {
								// 支付成功后
								this.$mUtils.toast('支付成功')
								this.$mUtils.timeout(() => {
									this.$mRouter.back(0);
								});
							},
							fail: err => {
								// 支付失败
								console.log(err)
								this.$mUtils.toast('支付失败')
							},
							cancel: err => {
								// 支付取消
								console.log(err)
								this.$mUtils.toast('支付取消')
							}
						});
					});
				} else {
					// 获取签名失败
					this.$u.toast('系统错误')
			
				}
			},
			qr() {
				let openId = this.openId
				//微信支付
				if (this.payway == '1') {
					//微信小程序
					//#ifdef MP-WEIXIN
					let that = this;
					this.$api.recharge({
						amount: (this.num * this.userinfo.score_price).toFixed(2),
						recharge_type: '2',
						client: 'xcx',
						pay_type: '1',
						openid: openId
					}).then(res => {
						console.log(res)
						uni.requestPayment({
							provider: "wxpay",
							timeStamp: res.data.pay_data.timeStamp,
							// String 微信小程序必填 时间戳从1970年1月1日至今的秒数，即当前的时间。 微信小程序
							nonceStr: res.data.pay_data.nonceStr,
							// String 微信小程序必填 随机字符串，长度为32个字符以下。 微信小程序
							package: res.data.pay_data.package,
							// String 微信小程序必填 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。 微信小程序
							signType: res.data.pay_data.signType, // String 微信小程序必填 签名算法，暂支持 MD5。 微信小程序
							paySign: res.data.pay_data.paySign, //
							success(res) {
								console.log("微信小程序支付", res)
								if (res.errMsg === "requestPayment:ok") {
									that.$mUtils.toast("支付成功")
									that.$mRouter.back();
								} else {}
							},
							fail(res) {
								that.$mUtils.toast("支付失败")
								console.log("微信小程序支付 failfailfail", res);
							}
						})
					})
					//#endif
					//h5 微信
					//#ifdef H5
					this.$api.recharge({
						amount: (this.num * this.userinfo.score_price).toFixed(2),
						recharge_type: '2',
						client: 'gzh',
						pay_type: this.payway,
						openid: openId
					}).then(res => {
						//console.log($mConfig.qiniuUrl+'#/pages/mine/score/buy_score')
						//window.location.href = res.data.pay_data + $mConfig.baseUrl + '#/pages/mine/score/buy_score';
						if(res.code==1){
							const payInfoH5 = res.data.pay_data
							console.log(payInfoH5)
							this.gzhPay(payInfoH5)
						}else{
							this.$u.toast(res.msg)
						}
						
					})
					//#endif
				} else if (this.payway == '2') {
					//h5 支付宝
					//#ifdef H5
					this.$api.recharge({
						amount: (this.num * this.userinfo.score_price).toFixed(2),
						recharge_type: '2',
						client: 'wap',
						pay_type: this.payway
					}).then(res => {
						console.log(res)
						window.location.href = res.data.pay_data
					})
					//#endif
				} else if (this.payway == '3') {
					this.inputPayPwd()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dh {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);

		.pay {
			width: 100%;

			.nav {
				padding: 20upx;
				width: 95%;
				background-color: #fff;
				margin: 0 auto;

				.title {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
				}

				.check {
					height: 65px;
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;

					.left {
						height: 100%;
						display: flex;
						align-items: center;

						span {
							margin-left: 30upx;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
						}

						image {
							width: 80upx;
							height: 80upx;
						}
					}

					.right {
						height: 100%;
						display: flex;
						align-items: center;

						image {
							width: 30upx;
							height: 30upx;
						}
					}
				}
			}
		}

		.qr {
			margin-top: 30px;
			width: 95%;
			margin: 0 auto;
			margin-top: 20px;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 44px;
			outline: none;
			color: #fff;
		}

		.top {
			width: 95%;
			background-color: #fff;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding: 10px;
			border-bottom: 1px solid rgba(229, 229, 229, 1);
			margin-top: 10px;
			margin-bottom: 20upx;

			.top_a {
				display: flex;
				flex-direction: column;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				justify-content: space-around;
				padding-bottom: 10px;
				height: 80px;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				input {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
				}
			}

			.top_b {
				width: 100%;
				display: flex;
				align-items: center;
				height: 100upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				span {

					font-size: 38upx;
					font-family: DIN;
					font-weight: 500;
					color: #FF4646;
				}
			}

			.top_c {
				color: rgba(153, 153, 153, 1);
				opacity: 0.99;
			}
		}
	}
</style>
