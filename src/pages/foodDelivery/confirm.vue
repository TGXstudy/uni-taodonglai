<template>
	<!-- 确认订单 -->
	<view class="cart-list">
		<u-navbar :is-back="true" title="确认订单" :background="background" back-icon-color="#FFFFFF" title-color="#FFFFFF" :border-bottom="false"></u-navbar>
		<!-- 添加地址 -->
		<view class="main">
			<view class="addaddress" @tap="$mUtils.goPage('addressorder_takeout')">
				<view class="user-content" v-if="addressInfo">
					<view class="landmark-name">
						<view class="default-address">
							{{addressInfo.province}}{{addressInfo.county}}{{addressInfo.address}}
						</view>
						<view class="default-phone">
							<text style="margin-left:31rpx">{{addressInfo.fullname}}</text>
							<text style="margin-left:24rpx">{{addressInfo.phone}}</text>
						</view>
					</view>
				</view>
				<view class="address-trip" v-else>请先设置收货地址</view>
				<view class="go-address">
					<image src="../../static/imgs/index/right.png" mode=""></image>
				</view>
			</view>

			<!-- 备注信息 与 商品信息-->
			<view class="goods-message">
				<view class="goods-shop">
					<image :src="storeInfo.logo" mode="" style="margin-right:10rpx"></image>
					<text>{{storeInfo.store_name}}</text>
				</view>
				<view class="goods-content" v-for="(item, index) in goodsArray" :key="index">
					<view class="goods-img">
						<image :src="item.goods_img" mode=""></image>
					</view>
					<view class="product-info">
						<view class="goods-info">
							<text class="goods_name">{{item.goods_name}}</text>
							<text class="num">x{{item.num}}</text>
						</view>
						<text class="goods_price"><span>￥</span>{{item.goods_price}}</text>
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
					<text class="fn-cl-333 fn-sz-30">￥{{goodsInfo.goods_price}}</text>
				</view>
				<view class="price-list">
					<text class="fn-cl-333 fn-sz-30">餐盒费</text>
					<text class="fn-cl-333 fn-sz-30">￥{{goodsInfo.box_amount}}</text>
				</view>
				<view class="price-list">
					<text class="fn-cl-333 fn-sz-30">配送费</text>
					<text class="fn-cl-fa5 fn-sz-30">￥{{goodsInfo.delivery_fee}}</text>
				</view>
			</view>
			<!-- 提交订单 -->
			<view class="submit-order">
				<view class="total">
					<text class="fn-cl-333 fn-sz-30" style="color:#FA5E09">总计</text>
					<text class="fn-cl-fa5 fn-sz-30 margin-left-10 footer-price" style="color:#FFFFFF"><span>￥</span>{{goodsInfo.order_amount}}</text>
				</view>
				<view class="price-cash" @tap="submitOrder">
					<text>结算</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAll: false, //点击勾选是否同意协议图片切换展示
				goodsList: [],
				goodsInfo: {},
				goodsArray: [],
				addressInfo: {},
				mark: '',
				shop_id: '',
				address_id: '',
				delivery_fee: 0,
				newlist: [],
				background: {
					backgroundImage: "linear-gradient(-90deg, #FB5509, #F58D0A)"
				},
				storeInfo: {}
			}
		},
		onLoad(options) {
			this.goodsList = JSON.parse(options.goods).goods
			this.shop_id = JSON.parse(options.goods).shop_id
		},
		async onReady() {
			await this.checkOrder()
			await this.getDeliveryFee()
		},
		methods: {
			//购物车选择当前商品与否
			doSelectAll() {
				this.isAll = !this.isAll
			},
			async checkOrder() {
				const res = await this.$api.foodCheckOrder({
					shop_id: this.shop_id,
					goods: this.goodsList
				})
				this.goodsInfo = res.data
				this.goodsArray = this.goodsInfo.list
				this.addressInfo = this.goodsInfo.address
				this.storeInfo = this.goodsInfo.store
			},
			async getDeliveryFee() {
				const {
					data
				} = await this.$api.deliveryFee({
					start_lon: '104.10194',
					start_lat: '30.65984',
					end_lon: '104.10194',
					end_lat: '30.65984'
				})
				console.log(data)
				this.delivery_fee = data.delivery_fee
			},
			async submitOrder() {
				let newArr = []
				for (const iterator of this.goodsList) {
					iterator.comment = '备注'
					newArr.push({
						id: iterator.id,
						num: iterator.num
					})
				}
				if (!this.addressInfo.id) {
					this.$mUtils.toast('请先设置收货地址');
					return
				}
				const res = await this.$api.foodPostOrder({
					address_id: this.addressInfo.id,
					goods: newArr,
					shop_id: this.shop_id,
					comment: '备注'
				})
				console.log(res)
				this.$mUtils.goPage('foodPay', {
					order_id: res.data.order_id,
					shop_id: this.shop_id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #eeeeee;
	}
	.cart-list {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.headBg {
			position: absolute;
			z-index: -1;
			width: 750rpx;
			height: 740rpx;
		}
		.main {
			width: 750rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-repeat: no-repeat;
			background-size: 100% 40%;
			-moz-background-size: 100% 100%;
			background-image: url("../../static/imgs/takeout/comfirmBg.png");

			.addaddress {
				margin-top: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 701rpx;
				height: 174rpx;
				background: #ffffff;
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
							align-items: center;

							text {
								font-size: 26rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #666666;
							}
						}

						.default-address {
							margin-left: 31rpx;
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
						}
					}
				}

				.go-address {
					margin-right: 51rpx;
					image {
						width: 12upx;
						height: 22upx;
					}
				}
			}

			.goods-message {
				margin-top: 26rpx;
				display: flex;
				flex-direction: column;
				background: #ffffff;
				width: 701rpx;
				border-radius: 10upx;

				.goods-shop {
					display: flex;
					align-items: center;
					margin: {
						left: 31rpx;
						top: 53rpx;
					}
					image {
						width: 34rpx;
						height: 34upx;
						border-radius: 5rpx;
					}
				}

				.goods-content {
					display: flex;
					// justify-content: space-around;
					margin-top: 40rpx;
					margin-bottom: 121rpx;
					.goods-img {
						margin-left: 31rpx;
						image {
							border-radius: 10rpx;
							width: 150rpx;
							height: 150rpx;
						}
					}

					.product-info {
						width: 388rpx;
						margin-left: 35rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.goods-info {
							display: flex;
							flex-direction: column;
							.goods_name {
								font-size: 32rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;
								line-height: 36rpx;
							}
							.num {
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #999999;
								line-height: 40rpx;
							}
						}
						.goods_price {
							font-size: 36rpx;
							font-family: DIN;
							font-weight: 500;
							color: #333333;
							line-height: 70rpx;

							span {
								font-size: 30rpx;
								font-family: DIN;
								font-weight: 500;
								color: #333333;
								line-height: 70rpx;
							}
						}
					}
				}

				.remark {
					height: 113rpx;
					display: flex;
					border-top: 1px dashed #cccccc;
					align-items: center;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 70rpx;
					text {
						margin-left: 20rpx;
					}
					input {
						margin-left: 20upx;
						margin: auto 0upx auto 30upx;
						color: #cccccc;
						font-size: 30upx;
					}
				}
			}

			.goods-price {
				width: 701rpx;
				height: 284rpx;
				margin-top: 22rpx;
				display: flex;
				flex-direction: column;
				margin: 20upx;
				padding: 30upx 20upx;
				background: #ffffff;
				border-radius: 10upx;
				margin-bottom: 179rpx;

				.price-list {
					display: flex;
					justify-content: space-between;
					margin-bottom: 40upx;
				}
			}

			.submit-order {
				width: 711rpx;
				height: 88rpx;
				background: #434343 !important;
				border-radius: 44px;
				display: flex;
				justify-content: space-between;
				background: #ffffff;
				position: fixed;
				left: 20rpx;
				bottom: 23rpx;
				align-items: center;

				.total {
					display: flex;
					align-items: center;
					margin-left: 20upx;

					.footer-price {
						margin-left: 14rpx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #ffffff;
						line-height: 30rpx;

						span {
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #ffffff;
							line-height: 30rpx;
						}
					}
				}

				.go-order {
					margin-left: 30upx;
					width: 254upx;
					height: 97upx;
					background: #fa5e0a;
					color: #ffffff;
					text-align: center;
					line-height: 97upx;
				}

				.go-order1 {
					width: 457upx;
					height: 78upx;
					background: #ff7900;
					border-radius: 50upx;
					color: #ffffff;
					text-align: center;
					line-height: 78upx;
				}

				.price-cash {
					background-image: url("../../static/imgs/takeout/cash.png");
					width: 218rpx;
					height: 88rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-repeat: no-repeat;
					background-size: 100% 100%;
					-moz-background-size: 100% 100%;

					text {
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #fefefe;
						line-height: 30rpx;
					}
				}
			}
		}
	}
</style>