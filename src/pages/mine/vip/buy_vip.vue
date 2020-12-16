<template>
	<view class="vip">
		<view class="banxin">
			<view class="title">
				<image :src="'/mine/champion.png' | _imgUrl" mode=""></image>
				<view class="left">
					贵宾卡
				</view>
				<view class="right">
					￥{{card_price}}
				</view>
			</view>
			<view class="vip_gz">
				<view class="top">
					购买规则
				</view>
				<view class="nav">
					A购买贵宾卡，购买时可填写一个推荐人B（和之前的推荐人无关，只对贵宾卡生效），A购买支付1.2万，平台每月返回1000到贵宾卡余额里面，连续返36个月（相当于交了1.2万可以拿总共3.6万），B每个月也可以领取到100的贵宾卡余额，也联系返36个月；贵宾卡的余额可购买商品不能提现
				</view>
				<view class="tjr">
					<view class="left">
						推荐人
					</view>
					<view class="right">
						<input v-model="tjr" type="text" placeholder="请输入推荐人手机号或推荐码">
					</view>
				</view>
				<button @tap="qd()">确定</button>
			</view>
		</view>
	</view>
</template>
<script>
	import $mConfig from "@/config/index.config.js"
	import jwx from "@/common/js/jwx"
	export default {
		data() {
			return {
				tjr: '', //推荐人
				card_price: '' //贵宾卡价格
			}
		},
		onLoad() {
			this.pz();
		},
		methods: {
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
			pz() {
				this.$api.siteConf().then(res => {
					this.card_price = res.data.card_price
				})
			},
			qd() {
				let openId = this.openId
				//微信小程序
				//#ifdef MP-WEIXIN
				let that = this;
				this.$api.buyVipCard({
					recommend: this.tjr,
					pay_type: '1',
					client: 'xcx',
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
				this.$api.buyVipCard({
					recommend: this.tjr,
					client: 'gzh',
					pay_type: '1',
					openid: openId

				}).then(res => {
					//console.log($mConfig.qiniuUrl+'#/pages/mine/score/buy_score')
					//window.location.href = res.data.pay_data + $mConfig.baseUrl + '#/pages/mine/score/buy_score';
					if (res.code == 1) {
						const payInfoH5 = res.data.pay_data
						console.log(payInfoH5)
						this.gzhPay(payInfoH5)
					} else {
						this.$u.toast(res.msg)
					}
				})
				//#endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vip {
		width: 100%;
		min-height: 100vh;
		background: linear-gradient(-90deg, #F58D0A, #FB5509);

		.banxin {
			width: 95%;
			margin: 0 auto;
			padding-top: 20upx;

			.vip_gz {
				width: 100%;
				background-color: #FFFFFF;
				margin-top: 40upx;
				border-radius: 10upx;
				padding: 20upx;
				display: flex;
				flex-direction: column;

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

				button {
					width: 100%;
					height: 88upx;
					background: linear-gradient(-90deg, #F58D0A, #FB5509);
					border-radius: 30upx;
					color: #FFFFFF;
					font-size: 30upx;
					margin-top: 105upx;
					margin-bottom: 100upx;
				}

				.top {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					margin-top: 70upx;
				}

				.nav {
					line-height: 48upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
					margin-top: 40upx;
				}

				.tjr {
					width: 100%;
					height: 86upx;
					background: #F6F6F6;
					border-radius: 10upx;
					display: flex;
					margin-top: 80upx;
					margin-bottom: 80upx;

					.left {
						width: 30%;
						height: 86upx;
						background: linear-gradient(-90deg, #F58D0A, #FB5509);
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.right {
						width: 70%;

						input {
							height: 86upx;
							width: 100%;
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 400;
							text-indent: 30upx;
						}
					}
				}
			}

			.title {
				width: 100%;
				height: 200upx;
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					z-index: 999;
					font-size: 48upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #936C32;
					padding-left: 20upx;
				}

				.right {
					z-index: 999;
					font-size: 48upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #936C32;
					padding-right: 20upx;
				}

				image {
					width: 100%;
					height: 200upx;
					position: absolute;
					top: 0;
					left: 0;

				}
			}
		}
	}
</style>
