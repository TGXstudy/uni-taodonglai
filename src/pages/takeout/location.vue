<template>
	<!-- 收货地址 -->
	<view class="location">
		<!-- 添加地址 -->
		<view class="addaddress" @tap="$mUtils.goPage('addressorder')">
			<view class="user-content">
				<view class="icon-img">
					<image src="../../static/imgs/index/ic_address_tag.png" mode=""></image>
				</view>
				<view class="landmark-name">
					<view class="default-phone">
						<image src="../../static/imgs/index/ic_address_def.png" mode=""></image>
						<text class="fn-cl-333 fn-sz-36 fn-sz-400">李立三</text>
						<text class="fn-cl-999 fn-sz-28 margin-left-10">188888888</text>
					</view>
					<view class="default-address margin-left-10">
						重庆市 沙坪坝区 船业街道33号付23
					</view>
				</view>
			</view>
			<view class="go-address">
				<image src="../../static/imgs/index/right.png" mode=""></image>
			</view>
		</view>

		<!-- 备注信息 与 商品信息-->
		<view class="goods-message">
			<view class="goods-shop">
				<image src="../../static/imgs/takeout/g.png" mode=""></image>
				<text class="fn-cl-333 fn-sz-30">甜品慕斯蛋糕</text>
			</view>
			<view class="goods-content">
				<view class="goods-img">
					<image src="../../static/imgs/index/goods2.png" mode=""></image>
				</view>

				<view class="product-info">
					<text class="fn-bold fn-cl-333 fn-sz-30">韵诗双萃精华黄金双瓶抗初 老熬夜修护</text>
					<text class="fn-cl-999 fn-sz-22 margin-top-20">×2</text>
					<view class="good-price margin-top-20 fn-sz-36">
						￥29.90
					</view>
				</view>
			</view>
			<view class="remark">
				<text class="fn-sz-30">备注信息</text>
				<input type="text" value="请填写备注信息" />
			</view>
		</view>
		<!-- 商品价格 -->
		<view class="goods-price">
			<view class="price-list">
				<text class="fn-cl-fa5 fn-sz-30">商品总价</text>
				<text class="fn-cl-333 fn-sz-30">￥158.00</text>
			</view>
			<view class="price-list">
				<text class="fn-cl-333 fn-sz-30">餐盒费</text>
				<text class="fn-cl-333 fn-sz-30">￥12.00</text>
			</view>
			<view class="price-list">
				<text class="fn-cl-333 fn-sz-30">配送费</text>
				<text class="fn-sz-30">￥158.00</text>
			</view>
		</view>
		<!-- 提交订单 -->
		<view class="accounts-content">
			<view class="accounts-img">
				<view class="fn-cl-fa5 fn-sz-28">
					总计:
				</view>
				<view class="fn-sz-36 fn-cl-fff">￥176</view>
			</view>
			<view class="go-pay" @tap="$mUtils.goPage('pay')">
				提交订单
			</view>
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
		height: 100%;
	}

	.location {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		margin-bottom: 80upx;

		.addaddress {
			display: flex;
			justify-content: space-between;
			margin: 20upx;
			padding: 40upx 20upx;
			background: #FFFFFF;
			border-radius: 10upx;

			.user-content {
				display: flex;

				.icon-img {
					width: 70upx;
					height: 70upx;

					image {
						width: 64upx;
						height: 64upx;
					}
				}

				.landmark-name {
					display: flex;
					flex-direction: column;

					.default-phone {
						display: flex;

						image {
							width: 52upx;
							height: 33upx;
							margin: auto 10upx;
						}
					}

					.default-address {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
					}
				}
			}

			.go-address {
				image {
					width: 12upx;
					height: 22upx;
				}
			}

		}

		.goods-message {
			display: flex;
			flex-direction: column;
			background: #FFFFFF;
			margin: 20upx;
			padding: 30upx 20upx;
			border-radius: 10upx;

			.goods-shop {
				display: flex;
				image {
					width: 60upx;
					height: 60upx;
				}
				text{
					margin: auto 20upx;
				}

			}

			.goods-content {
				display: flex;
				justify-content: space-between;
				margin-top: 20upx;

				.goods-img {
					width: 210upx;

					image {
						width: 205upx;
						height: 205upx;
						margin: auto;
					}
				}

				.product-info {
					display: flex;
					flex-direction: column;

					.good-price {
						display: flex;
						justify-content: space-between;
					}
				}
			}

			.remark {
				margin-top: 30upx;
				display: flex;
				border-top: 1px solid #CCCCCC;
				padding-top: 30upx;

				input {
					margin-left: 20upx;
					margin: auto 0upx auto 30upx;
					color: #CCCCCC;
					font-size: 30upx;
				}
			}
		}

		.goods-price {
			display: flex;
			flex-direction: column;
			margin: 20upx;
			padding: 30upx 20upx;
			background: #FFFFFF;
			border-radius: 10upx;

			.price-list {
				display: flex;
				justify-content: space-between;
				margin-bottom: 40upx;
			}
		}

		.accounts-content {
			display: flex;
			justify-content: space-between;
			width: 95%;
			height: 88upx;
			margin: auto;
			background: #434343;
			border-radius: 40upx;
			position: fixed;
			bottom: 0;
			left: 20upx;

			.accounts-img {
				display: flex;
				view{
					margin: auto 20upx;
				}
			}

			.go-pay {
				width: 218upx;
				height: 88upx;
				background: #FF7900;
				border-radius: 60upx 40upx 40upx 0upx;
				color: #FFFFFF;
				text-align: center;
				line-height: 88upx;

			}
		}

	}
</style>
