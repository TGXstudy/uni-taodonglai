<template>
	<view class="container">
		<view class="amount">
			<view class="amount-title">支付金额</view>
			<view class="amount-price"><span>￥</span>{{ amount }}</view>
		</view>
		<view class="coupon">
			<view class="coupon-left">优惠券</view>
			<view class="coupon-right" @click="selCoupon">
				<view v-if="!discount_price">请选择优惠券</view>
				<text class="" v-if="discount_price">
					{{discount_price?`-￥${discount_price}`:`未使用优惠券`}}
				</text>
				<view class="arrow">
					<image src="../../static/imgs/index/pay-arrow.png" mode="aspectFit" />
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="pay-title">请选择支付方式</view>
			<view v-for="(item, index) in payMethods" :key="index">
				<view class="wx" v-if="item.payWay !== 4 || isVip">
					<view class="icon">
						<image :src="item.icon" mode="aspectFit" />
						<text>{{item.pay}}</text>
					</view>
					<view class="radius" @click="selectPay(item)">
						<image :src="item.isSelected?'../../static/imgs/index/sel.png':'../../static/imgs/index/nosel.png'" mode="aspectFit" />
					</view>
				</view>
			</view>
		</view>
		<view class="footer" @click="doSubmit">
			<text>去支付</text>
		</view>
		<pwd-input ref="pwd" @confirm-pay="confirmPay"></pwd-input>
		<u-modal v-model="show" :content="content" @confirm="confirm" :async-close="true" :show-cancel-button="false"></u-modal>
	</view>
</template>

<script>
	import pwdInput from "@/components/PwdInput.vue";
	import jwx from "../../common/js/jwx"
	import getUrlParam from "../../common/js/getUrlParam"
	export default {
		created() {
			// eslint-disable-next-line no-undef
			let platform = uni.getSystemInfoSync().platform;
			let params = getUrlParam.getUrlParam(window.location.href);
			if (!params.refresh && platform === 'ios') {
				window.location.href = window.location.href + '&refresh=true';
			}
		},
		async onLoad(options) {
			console.log(jwx)
			console.log(options)
			const data = await this.payPageInfo(options)
			this.amount = data.order_amount
			if (this.USERINFO.have_vip_card == 2) {
				this.isVip = false
			} else {
				this.isVip = true
			}
		},
		components: {
			pwdInput
		},
		data() {
			return {
				payMethods: [{
					pay: '微信支付',
					icon: '../../static/imgs/index/ic_wx2.png',
					payWay: 1,
					isSelected: false
				},
				// {
				// 	pay: '支付宝支付',
				// 	icon: '../../static/imgs/index/ic_pay_tag_zfb.png',
				// 	payWay: 2,
				// 	isSelected: false
				// }, 
				{
					pay: '余额支付',
					icon: '../../static/imgs/index/ic_pay_tag_yue.png',
					payWay: 3,
					isSelected: false
				},
				{
					pay: '贵宾卡',
					icon: '../../static/imgs/index/ic_pay_tag_vip.png',
					payWay: 4,
					isSelected: false
				},
				{
					pay: '消费券',
					icon: '../../static/imgs/index/xiaofeiquan.png',
					payWay: 5,
					isSelected: false
				}
				],
				currentPay: '',
				amount: '',
				p_order_sn: '',
				isVip: false,
				discount_price: '', //优惠券
				take_id: '',
				show: false,
				content: '请确认支付是否完成',
				isFromOrder: '',
				pay_order_type: '',
				orderMethods: ''
			}
		},
		methods: {
			async payPageInfo(options) {
				console.log(options)
				if (options.isFromOrder == 1) {
					this.pay_order_type = options.pay_order_type
					this.orderMethods = 'order_sn'
					this.p_order_sn = options.order_sn
					const { data } = await this.$api.payPage({
						pay_order_type: this.pay_order_type,
						[this.orderMethods]: this.p_order_sn
					})
					return data
				}
				this.pay_order_type = 1
				this.orderMethods = 'p_order_sn'
				this.p_order_sn = options.p_order_sn
				const { data } = await this.$api.payPage({
					pay_order_type: this.pay_order_type,
					[this.orderMethods]: this.p_order_sn
				})
				return data
			},
			selectPay(item) {
				console.log(item)
				if (!item.isSelected) {
					for (const iterator of this.payMethods) {
						iterator.isSelected = false
					}
					item.isSelected = true
					this.currentPay = item.payWay
					return
				}
				item.isSelected = false
			},
			async doSubmit() {
				switch (this.currentPay) {
					case 1:
						await this.wxPay()
						break;
					case 2:
						await this.aliH5Pay()
						break
					default:
						this.$refs.pwd.open();
						break;
				}
			},
			//ovxuF6MLkzHnz3VL2kMykgqsOJkA
			async pay(client, pay_pwd = '') {
				const { data } = await this.$api.pay({
					pay_order_type: this.pay_order_type,
					[this.orderMethods]: this.p_order_sn,
					pay_type: this.currentPay,
					client: client,
					take_id: this.take_id,
					pay_pwd: pay_pwd,
					openid: this.openId
					// #ifdef H5
					// return_url: `http://jbyp.batmp.com/h5/#/pages/mine/my_order?isReturn=1&order_sn=${this.p_order_sn}&pay_type=${this.currentPay}&orderMethods=${this.orderMethods}&pay_order_type=${this.pay_order_type}`,
					// quit_url: `http://jbyp.batmp.com/h5/#/pages/mine/my_order?isReturn=1&order_sn=${this.p_order_sn}&pay_type=${this.currentPay}&orderMethods=${this.orderMethods}&pay_order_type=${this.pay_order_type}`
					// #endif
				})
				console.log(data)
				return data
			},
			async wxPay() {
				const that = this
				// #ifdef MP-WEIXIN
				const { data } = await this.pay('xcx')
				const payInfo = data.pay_data
				// eslint-disable-next-line no-undef
				uni.requestPayment({
					provider: "wxpay",
					timeStamp: payInfo.timeStamp,
					// String 微信小程序必填 时间戳从1970年1月1日至今的秒数，即当前的时间。 微信小程序
					nonceStr: payInfo.nonceStr,
					// String 微信小程序必填 随机字符串，长度为32个字符以下。 微信小程序
					package: payInfo.package,
					// String 微信小程序必填 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。 微信小程序
					signType: payInfo.signType, // String 微信小程序必填 签名算法，暂支持 MD5。 微信小程序
					paySign: payInfo.paySign, //
					success(res) {
						console.log("微信小程序支付", res)
						if (res.errMsg === "requestPayment:ok") {
							that.$mUtils.toast("支付成功")
							that.$mRouter.back();
							return
						}
					},
					fail(res) {
						that.$mUtils.toast("支付失败")
						console.log("微信小程序支付 failfailfail", res);
					}
				})
				// #endif

				// #ifdef H5
				const dataH5 = await this.pay('gzh')
				const payInfoH5 = dataH5.pay_data
				console.log(payInfoH5)
				await this.gzhPay(payInfoH5)
				// window.location.href = payInfoH5;
				// this.show = true
				// #endif
			},
			async gzhPay(payRes) {
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
								this.$u.toast('支付成功')
								this.$mUtils.goPage('my_order')
							},
							fail: err => {
								// 支付失败
								console.log(err)
								this.$u.toast('支付失败')
								this.cancelPay()
								this.$mUtils.goPage('my_order')
							},
							cancel: err => {
								// 支付取消
								console.log(err)
								this.$u.toast('支付取消')
								this.cancelPay()
								this.$mUtils.goPage('my_order')
							}
						});
					});
				} else {
					// 获取签名失败
					this.$u.toast('系统错误')

				}
			},
			async cancelPay() {
				await this.$api.cancelPay({
					pay_order_type: this.pay_order_type,
					[this.orderMethods]: this.p_order_sn
				})
			},
			async aliH5Pay() {
				const data = await this.pay('wap')
				const payInfo = data.pay_data
				console.log(payInfo)
				window.location.href = payInfo
				this.show = true
			},
			selCoupon() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.selectCoupon,
					query: { amount: this.amount }
				});
				// this.$mUtils.goPage('selectCoupon')
			},
			async confirmPay(payPassword) {
				console.log(payPassword)
				// #ifdef MP-WEIXIN
				await this.pay('xcx', payPassword)
				// const payInfo = data.pay_data
				// console.log(payInfo)
				this.$refs.pwd.close();
				// #endif
				// #ifdef H5
				const res = await this.pay('wap', payPassword)
				if (res.is_pay == 1) {
					this.$mUtils.toast('支付成功');
					this.$mUtils.timeout(() => {
						this.$mRouter.push({
							route: this.$mRoutesConfig.my_order,
						});
					});
				} else {
					this.$mUtils.toast('支付失败');
				}
				// const payInfo = data.pay_data
				// console.log(payInfo)
				this.$refs.pwd.close();
				// #endif
			},
			async confirm() {
				const res = await this.$api.checkPay({
					order_sn: this.p_order_sn,
					pay_type: this.currentPay
				})
				console.log(res)
				if (res.code == '1352') {
					await this.$api.cancelPay({
						pay_order_type: this.pay_order_type,
						[this.orderMethods]: this.p_order_sn
					})
					this.show = false
					this.$mUtils.toast("支付失败")
					return
				}
				console.log('123')
				this.$mUtils.toast("支付成功")
				this.$mUtils.timeout(() => {
					this.$mRouter.push({
						route: this.$mRoutesConfig.my_order,
					});
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 750rpx;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #f6f6f6;

		.amount {
			margin: {
				top: 22rpx;
			}

			width: 701rpx;
			height: 260rpx;
			background: #ffffff;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.amount-title {
				margin: {
					top: 63rpx;
				}

				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}

			.amount-price {
				font-size: 48rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
				line-height: 100rpx;

				span {
					font-size: 30rpx;
				}
			}
		}

		.coupon {
			margin: {
				top: 21rpx;
			}

			width: 701rpx;
			height: 93rpx;
			background: #ffffff;
			border-radius: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.coupon-left {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				margin-left: 33rpx;
			}

			.coupon-right {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-right: 33rpx;

				text {
					font-size: 24rpx;
					font-family: DIN;
					font-weight: 500;
					color: #ff4646;
					line-height: 70rpx;

					margin: {
						right: 13rpx;
					}
				}

				.arrow {
					width: 12rpx;
					height: 22rpx;

					margin: {
						top: -10rpx;
					}

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.pay {
			margin: {
				top: 22rpx;
				bottom: 100upx;
			}

			padding: {
				bottom: 30rpx;
			}

			width: 701rpx;
			// height: 525rpx;
			background: #ffffff;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.pay-title {
				margin: {
					top: 44rpx;
				}

				width: 640rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.wx {
				margin: {
					top: 44rpx;
				}
				width: 640rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.icon {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 260rpx;
					height: 75rpx;

					image {
						width: 75rpx;
						height: 100%;
					}

					text {
						width: 158rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 48rpx;
					}
				}

				.radius {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 97rpx;
		background-image: url("../../static/imgs/index/bottomBtn.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		text {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;
		}
	}
</style>