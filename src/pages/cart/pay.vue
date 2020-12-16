<template>
	<!-- 支付 -->
	<view class="pay">
		<view class="pay-price">
			<text class="fn-cl-999 fn-sz-24">支付金额</text>
			<text class="fn-cl-333 fn-sz-60 margin-top-20">￥199.90</text>
		</view>
		<view class="preferential" @tap="$mUtils.goPage('coupon')">
			<text class="fn-sz-28 fn-cl-333">优惠券</text>
			<view class="preferential-price">
				<text class="fn-sz-30 fn-cl-fa5">-¥15.00</text>
				<image src="../../static/imgs/index/right.png" mode=""></image>
			</view>
		</view>
		<!-- 支付方式 -->
		<view class="pay-mode">
			<text class="fn-sz-30 fn-cl-333 margin-bottom-30">请选择支付方式</text>
			<view class="mode-all">
				<view class="mode-icon">
					<image src="../../static/imgs/index/ic_wx2.png" mode=""></image>
					<text>微信支付</text>
				</view>
				<image @tap="doSelectAll" :src="require(isAll ?'@/static/imgs/index/ic_all.png' : '@/static/imgs/index/ty.png')"></image>
			</view>
			<view class="mode-all">
				<view class="mode-icon">
					<image src="../../static/imgs/index/ic_pay_tag_zfb.png" mode=""></image>
					<text> 支付宝支付</text>
				</view>
				<image @tap="doSelectAll" :src="require(isAll ?'@/static/imgs/index/ic_all.png' : '@/static/imgs/index/ty.png')"></image>
			</view>
			<view class="mode-all">
				<view class="mode-icon">
					<image src="../../static/imgs/index/ic_pay_tag_yue.png" mode=""></image>
					<text> 余额支付</text>
				</view>
				<image @tap="doSelectAll" :src="require(isAll ?'@/static/imgs/index/ic_all.png' : '@/static/imgs/index/ty.png')"></image>
			</view>
			<view class="mode-all">
				<view class="mode-icon">
					<image src="../../static/imgs/index/ic_pay_tag_vip.png" mode=""></image>
					<text>贵宾卡</text>
				</view>
				<image @tap="doSelectAll" :src="require(isAll ?'@/static/imgs/index/ic_all.png' : '@/static/imgs/index/ty.png')"></image>
			</view>
		</view>
		<!-- 确定支付 -->
		<view class="go-pay">
			去支付
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				//购物车点击勾选
				imageGx: {
					xz: require('../../static/imgs/index/ic_all.png'),
					mx: require('../../static/imgs/index/ty.png'),
				},
				isAll: false, //点击勾选是否同意协议图片切换展示
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			//购物车选择当前商品与否
			doSelectAll() {
				this.isAll = !this.isAll
			},

		}
	}

</script>

<style lang="scss" scoped>
	page {
		background: #f5f5f5;
		height: 100%;
	}

	.pay {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		margin-bottom: 180upx;
		.pay-price {
			width: 90%;
			margin: 20upx auto;
			padding: 40upx 20upx;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.preferential {
			display: flex;
			justify-content: space-between;
			width: 90%;
			margin: 40upx auto;
			background: #FFFFFF;
			padding: 40upx 20upx;

			.preferential-price {
				display: flex;

				image {
					width: 12upx;
					height: 22upx;
					margin: auto 20upx;

				}
			}
		}

		.pay-mode {
			width: 90%;
			margin: auto;
			padding: 40upx 20upx;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;

			.mode-all {
				display: flex;
				justify-content: space-between;
				margin-top: 60upx;

				.mode-icon {
					display: flex;

					image {
						width: 75upx;
						height: 75upx;
					}

					text {
						font-size: 28upx;
						line-height: 60upx;
						margin-left: 10upx;
					}
				}

				image {
					width: 30upx;
					height: 30upx;
				}
			}
		}

		.go-pay {
			width: 100%;
			height: 97upx;
			background: #FF7900;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			line-height: 97upx;
			position: fixed;
			bottom: 0;
		}
	}
</style>
