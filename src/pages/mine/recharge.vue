<template>
	<view class="dh">
		<view class="top">
			<view class="top_a">
				<p>充值金额(元）</p>
				<span>
					￥
					<input type="text" v-model="num" placeholder="请输入充值金额" value="" />
				</span>
			</view>
			<view class="nav">
				<view class="title">
					请选择支付方式
				</view>
				<view class="check" @tap="payway = '1'">
					<view class="left">
						<image class="icon-sz-narrow" :src="'/mine/ic_pay_tag_wchat.png' | imgUrl" mode=""></image>
						<span>微信支付</span>
					</view>
					<view class="right">
						<image class="icon-sz-narrow" :src=" (payway == '1' ?'/mine/ic_car_choose_true.png' : '/mine/ic_car_choose_false.png') | imgUrl" mode=""></image>
					</view>
				</view>
			
			<!-- 	<view class="check" @tap="payway = '2'">
					<view class="left">
						<image class="icon-sz-narrow" :src="'/mine/ic_pay_tag_zfb.png' | imgUrl" mode=""></image>
						<span>支付宝</span>
					</view>
					<view class="right">
						<image class="icon-sz-narrow" :src=" (payway == '2' ?'/mine/ic_car_choose_true.png' : '/mine/ic_car_choose_false.png') | imgUrl" mode=""></image>
					</view>
				</view> -->
			</view>
		</view>
		<button class="qr" @click="qr()">确定</button>
	</view>
</template>
<script>
	import $mConfig from "@/config/index.config.js"
	import jwx from "@/common/js/jwx"
	export default {
		data() {
			return {
				payway:'',//支付方式
				num: 0, //数量
				wallet_to_balance: "", //兑换比例
				hd_ye: '', //转换后可获得余额
				wallet: "", //钱包
				sxf:'',//手续费
				recharge_type:'',//充值类型
			}
		},
		async onLoad(options) {
			this.recharge_type=options.recharge_type
		
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
			//全部兑换
			qbdh() {
				this.num = this.wallet;
			},
			qr() {
				let openId = this.openId
				if(this.num<=0){
					this.$mUtils.toast("金额不能为空")
					return
				}
				
				//微信支付
				if (this.payway == '1') {
					//微信小程序
					// #ifdef MP-WEIXIN
					let that = this;
					this.$api.recharge({
						amount:this.num,
						recharge_type:this.recharge_type,
						client:'xcx',
						pay_type:'1',
						openid:openId
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
					// #endif
					//h5 微信
					// #ifdef H5
					this.$api.recharge({
						amount:this.num,
						recharge_type: this.recharge_type,
						client: 'gzh',
						pay_type: this.payway,
						openid: openId
					}).then(res => {
						//console.log($mConfig.qiniuUrl+'#/pages/mine/score/buy_score')
						//window.location.href=res.data.pay_data+$mConfig.baseUrl+'#/pages/mine/score/buy_score';
						if(res.code==1){
							const payInfoH5 = res.data.pay_data
							console.log(payInfoH5)
							this.gzhPay(payInfoH5)
						}else{
							this.$u.toast(res.msg)
						}
					})
					// #endif
				} else if (this.payway == '2') {
					//h5 支付宝
					// #ifdef H5
					this.$api.recharge({
						amount:this.num,
						recharge_type: this.recharge_type,
						client: 'wap',
						pay_type: this.payway,
						// #ifdef H5
						return_url: `http://jbyp.batmp.com/h5/#/pages/mine/recharge`
						// #endif
					}).then(res => {
						console.log(res)
						window.location.href=res.data.pay_data
					})
					// #endif
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
			.nav{
				padding: 20upx;
				width: 95%;
				background-color: #fff;
				margin: 0 auto;
				padding-bottom: 0;
				.title{
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
				}
				.check{
					height: 140upx;
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
					.left{
						height: 100%;
						display: flex;
						align-items: center;
						span{
							margin-left: 30upx;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
						}
						image{
							width: 80upx;
							height: 80upx;
						}
					}
					.right{
						height: 100%;
						display: flex;
						align-items: center;
						image{
							width: 30upx;
							height: 30upx;
						}
					}
				}
			}
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
				span{
					display: inline-block;
					display: flex;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				input{
					text-indent: 10upx;
					font-size: 28upx;
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
				span{
					
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
