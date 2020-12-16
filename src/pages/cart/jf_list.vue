<template>
	<!-- 确认订单 -->
	<view class="cart-list">
		<!-- 添加地址 -->
		<view class="addaddress" @tap="$mUtils.goPage('addressorder')">
			<view class="user-content">
				<view class="icon-img">
					<image src="../../static/imgs/index/ic_address_tag.png" mode=""></image>
				</view>
				<view class="landmark-name">
					<view class="default-phone">
						<image src="../../static/imgs/index/ic_address_def.png" mode=""></image>
						<text class="fn-cl-333 fn-sz-36 fn-sz-400">{{addressInfo.fullname}}</text>
						<text class="fn-cl-999 fn-sz-28 margin-left-10" style="margin-top:7rpx">{{addressInfo.phone}}</text>
					</view>
					<view class="default-address margin-left-10">
						{{addressInfo.province}} {{addressInfo.county}} {{addressInfo.address}}
					</view>
				</view>
			</view>
			<view class="address-trip" v-if="0">请先设置收货地址</view>
			<view class="go-address">
				<image src="../../static/imgs/index/right.png" mode=""></image>
			</view>
		</view>

		<!-- 备注信息 与 商品信息-->
		<view class="goods-message">
			<!-- <view class="goods-shop">
				<image src="item.logo" mode="" style="margin-right:10rpx"></image>
				<text>店铺名</text>
			</view> -->
			<view class="goods-content">
				<view class="goods-img">
					<image :src="xx.spu_img" mode=""></image>
				</view>
				<view class="product-info">
					<text class="fn-bold fn-cl-333 fn-sz-30">{{xx.spu_name}}</text>
					<view class="good-price margin-top-20">
						<text class="fn-sz-30 fn-cl-fa5">{{xx.score_price | bl}}积分</text>
						<view class="number-box">
							<u-number-box v-model="buy_num" @change="valChange(buy_num)" :min="1">
							</u-number-box>
						</view>
					</view>
				</view>
			</view>
			<view class="remark">
				<text class="fn-sz-30">备注信息</text>
				<input type="text" v-model="mark" placeholder="请填写备注信息" />
			</view>
		</view>
		<!-- 商品价格 -->
		<view class="goods-price">
			<view class="price-list">
				<text class="fn-cl-333 fn-sz-30">商品总价</text>
				<text class="fn-cl-333 fn-sz-30"><span class="redd">{{xx.score_price*buy_num |bl}}</span>积分</text>
			</view>
			<view class="price-list">
				<text class="fn-cl-333 fn-sz-30">当前积分</text>
				<text class="fn-cl-333 fn-sz-30"><span class="redd">{{xx.user_score}}</span>积分</text>
			</view>
		</view>
		<!-- 提交订单 -->

		<view class="submit-order">
			<view class="total fn-cl-333 fn-sz-30">
				<text class="fn-cl-333 fn-sz-30">总计</text>
				<text class="fn-cl-fa5 fn-sz-30 margin-left-10 fn-cl-fa5">{{xx.score_price*buy_num | bl}}</text>
				积分
			</view>
			<view class="go-order1" @tap="ljdh(xx)">
				立即兑换
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//购物车点击勾选
				imageGx: {
					xz: require('../../static/imgs/index/ic_all.png'),
					mx: require('../../static/imgs/index/ty.png'),
				},
				isAll: false, //点击勾选是否同意协议图片切换展示
				addressInfo: {},
				mark: '',
				spu_id: '',
				xx: {},
				buy_num: 1,
			}
		},
		onLoad(options) {
			let a = JSON.parse(options.detail)
			this.spu_id = a.spu_id;
			console.log(a)
			this.get_order();
		},
		methods: {
			//立即兑换
			ljdh(xx) {
				this.$api.sureChange({
					spu_id: xx.spu_id,
					buy_num: this.buy_num,
					address_id: this.addressInfo.id,
					comment: this.mark,
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.toast('兑换成功')
						this.$mUtils.timeout(() => {
							 this.$mRouter.back(0);
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			valChange(e) {
				console.log(e)
			},
			get_order() {
				this.$api.changePage({
					spu_id: this.spu_id,
				}).then(res => {
					this.addressInfo = res.data.default_address;
					this.xx = res.data;
					console.log(res)
				})
			}
		},
		filters: {
			bl(value) {
				let realVal = parseFloat(value).toFixed(2)
				return realVal
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F5F5F5;
		height: 100%;
	}

	.cart-list {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		margin-bottom: 80upx;

		.addaddress {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 20upx;
			padding: 40upx 20upx;
			background: #FFFFFF;
			border-radius: 10upx;

			.user-content {
				display: flex;
				// justify-content: center;
				align-items: center;

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
				align-items: center;

				image {
					width: 60upx;
					height: 60upx;
					border-radius: 5rpx;
				}

			}

			.goods-content {
				display: flex;
				// justify-content: space-between;
				margin-top: 20upx;

				.goods-img {
					width: 210upx;

					image {
						border-radius: 10rpx;
						width: 205upx;
						height: 205upx;
						margin: auto;
					}
				}

				.product-info {
					width: 388rpx;
					margin-left: 35rpx;
					display: flex;
					flex-direction: column;

					.good-price {
						display: flex;
						justify-content: space-between;

						.num {
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
							line-height: 40rpx;
						}
					}
				}
			}

			.remark {
				margin-top: 30upx;
				display: flex;
				border-top: 1px solid #CCCCCC;
				padding-top: 30upx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 70rpx;

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

				.redd {
					color: #FA5E0A;
				}
			}
		}

		.transport {
			display: flex;
			justify-content: space-between;
			background: #FFFFFF;
			margin: 20upx;
			padding: 40upx 20upx;
			border-radius: 10upx;

			.transport-name {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #343434;
			}

			.express {
				display: flex;
				justify-content: space-between;

				.select-img {
					display: flex;
					margin-left: 20upx;

					text {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #343434;
						margin-left: 10upx;
					}

					image {
						width: 29upx;
						height: 29upx;
						margin: auto 0upx;
					}
				}
			}
		}

		.submit-order {
			width: 100%;
			height: 98upx;
			display: flex;
			justify-content: space-between;
			background: #FFFFFF;
			position: fixed;
			left: 0;
			bottom: 0;
			align-items: center;

			.total {
				display: flex;
				margin-left: 20upx;
			}

			.go-order {
				margin-left: 30upx;
				width: 254upx;
				height: 97upx;
				background: #FA5E0A;
				color: #FFFFFF;
				text-align: center;
				line-height: 97upx;

			}

			.go-order1 {
				width: 457upx;
				height: 78upx;
				background: #FF7900;
				border-radius: 50upx;
				color: #FFFFFF;
				text-align: center;
				line-height: 78upx;
			}
		}
	}
</style>
