<template>
	<!-- 优惠卷 -->
	<view class="coupon">
		<view class="coupon-list">
			<view class="coupon-price">
				<text class="fn-cl-fa5 fn-sz-48">￥30</text>
				<text class="fn-cl-fa5 fn-sz-28">优惠券</text>
			</view>
			<view class="coupon-all">
				<text class="fn-sz-36 fn-cl-333 fn-bold">满200可用</text>
				<text class="fn-sz-22 fn-cl-999 margin-top-10">有效期：2020.06.02-06.10</text>
			</view>
			<view class="get">
				领取
			</view>
		</view>
		<view class="coupon-list1">
			<view class="coupon-price1">
				<text class="fn-cl-fa5 fn-sz-48">￥30</text>
				<text class="fn-cl-fa5 fn-sz-28">优惠券</text>
			</view>
			<view class="coupon-all1">
				<text class="fn-sz-36 fn-cl-333 fn-bold">满200可用</text>
				<text class="fn-sz-22 fn-cl-999 margin-top-10">有效期：2020.06.02-06.10</text>
			</view>
			<view class="get-img1">
				<image @tap="doSelectAll" :src="require(isAll ?'@/static/imgs/index/ic_all.png' : '@/static/imgs/index/ty.png')"></image>
			</view>
		</view>
		<view class="confirm">
			确定
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
		background: #F5F5F5;
	}

	.coupon {
		width: 100%;
		display: flex;
		flex-direction: column;
		position: relative;

		.coupon-list {
			display: flex;
			width: 95%;
			margin: 40upx auto;
			background: #FFFFFF;
			padding: 40upx 20upx;

			.coupon-price {
				display: flex;
				flex-direction: column;
				// width: 30%;
				text-align: center;
				margin: auto;
			}

			.coupon-all {
				display: flex;
				flex-direction: column;
				// width: 50%;
			}

			.get {
				width: 128upx;
				height: 64upx;
				border-radius: 50upx;
				background: #FF7900;
				color: #FFFFFF;
				text-align: center;
				line-height: 64upx;
				margin: auto;
				font-size: 30upx;
			}
		}

		.coupon-list1 {
			display: flex;
			width: 95%;
			margin: 40upx auto;
			background: #FFFFFF;
			padding: 40upx 20upx;

			.coupon-price1 {
				display: flex;
				flex-direction: column;
				width: 30%;
				text-align: center;
				// margin: auto;
			}

			.coupon-all1 {
				display: flex;
				flex-direction: column;
				// width: 50%;
			}

			.get-img1 {
				margin-left: auto;
				margin-top: 30upx;

				image {
					width: 36upx;
					height: 36upx;
				}
			}
		}

		.confirm {
			width: 100%;
			height: 98upx;
			background: #FF7900;
			position: fixed;
			bottom: 0;
			text-align: center;
			line-height: 98upx;
			color: #FFFFFF;
		}

	}
</style>
