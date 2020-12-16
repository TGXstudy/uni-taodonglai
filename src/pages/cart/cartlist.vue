<template>
	<!-- 确认订单 -->
	<view class="cart-list">
		<!-- 添加地址 -->
		<view class="addaddress" @tap="$mUtils.goPage('addressorder')">
			<view class="user-content" v-if="addressInfo.id">
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
						{{addressInfo.province}} {{addressInfo.city}} {{addressInfo.county}} {{addressInfo.selected_area}}   {{addressInfo.address}} 
					</view>
				</view>
			</view>
			<view class="address-trip" v-else>请先设置收货地址</view>
			<view class="go-address">
				<image src="../../static/imgs/index/right.png" mode=""></image>
			</view>
		</view>
		<!-- 备注信息 与 商品信息-->
		<view class="goods-message" v-for="(item, index) in goodsArray" :key="index">
			<view class="goods-shop">
				<image :src="item.logo" mode="" style="margin-right:10rpx"></image>
				<text>{{item.store_name}}</text>
			</view>
			<view class="goods-content">
				<view class="goods-img">
					<image :src="item.spu_img" mode=""></image>
				</view>
				<view class="product-info">
					<text class="fn-bold fn-cl-333 fn-sz-30">{{item.spu_name}}</text>
					<text class="fn-cl-999 fn-sz-22 margin-top-20">规格：{{item.sku_name}}</text>
					<view class="good-price margin-top-20">
						<text class="fn-sz-30 fn-cl-fa5"> ￥{{item.sku_price}}</text>
						<text class="num">x{{item.buy_num}}</text>
					</view>
				</view>
			</view>
			<view class="remark">
				<text class="fn-sz-30" style="margin-left:20rpx">备注信息</text>
				<input type="text" v-model="mark" placeholder="请填写备注信息" />
			</view>
		</view>
		<!-- 商品价格 -->
		<view class="goods-price">
			<view class="price-list">
				<text class="fn-cl-333 fn-sz-30">商品总价</text>
				<text class="fn-cl-333 fn-sz-30">￥{{goodsInfo.goods_amount}}</text>
			</view>
			<view class="price-list">
				<text class="fn-cl-333 fn-sz-30">运费</text>
				<text class="fn-cl-333 fn-sz-30">￥{{goodsInfo.shipping_fee}}</text>
			</view>
			<view class="price-list">
				<text class="fn-cl-333 fn-sz-30">应付金额</text>
				<text class="fn-cl-fa5 fn-sz-30">￥{{goodsInfo.order_amount}}</text>
			</view>
		</view>
		<!-- 运输方式 -->
		<view class="transport">
			<view class="transport-name">
				运输方式
			</view>
			<view class="express">
				<view class="select-img">
					<image @tap="doSelectAll" :src="require('@/static/imgs/index/ic_all.png')"></image>
					<text>快递物流</text>
				</view>
			</view>
		</view>
		<!-- 提交订单 -->
		<view class="submit-order">
			<view class="total">
				<text class="fn-cl-333 fn-sz-30">总计</text>
				<text class="fn-cl-fa5 fn-sz-30 margin-left-10">{{goodsInfo.order_amount}}</text>
			</view>
			<view class="go-order" @tap="submitOrder">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAll: true, //点击勾选是否同意协议图片切换展示
				goodsList: [],
				goodsInfo: {},
				goodsArray: [],
				addressInfo: {},
				mark: ''
			}
		},
		onLoad(options) {
			console.log(JSON.parse(options.goods))
			this.goodsList = JSON.parse(options.goods)
		},
		async onReady() {
			await this.checkOrder()
		},
		methods: {
			//购物车选择当前商品与否
			doSelectAll() {
				this.isAll = !this.isAll
			},
			async checkOrder() {
				const res = await this.$api.checkOrder({
					goods: this.goodsList
				})
				console.log(res)
				this.goodsInfo = res.data
				for (const iterator of this.goodsInfo.list) {
					this.goodsArray = [...this.goodsArray, ...iterator.goods]
				}
				this.addressInfo = this.goodsInfo.default_address
				console.log(this.goodsInfo)
			},
			async submitOrder() {
				if (!this.addressInfo.id) {
					this.$mUtils.toast('请先设置收货地址');
					return
				}
				for (const iterator of this.goodsList) {
					iterator.comment = this.mark
				}
				const res = await this.$api.postOrder({
					address_id: this.addressInfo.id,
					goods: this.goodsList
				})
				console.log(res)
				this.$mUtils.goPage('pay', {
					p_order_sn: res.data.p_order_sn
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f5f5f5;
		height: 100%;
	}

	.cart-list {
		width: 100%;
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
			background: #ffffff;
			width: 710rpx;
			margin-left: 20rpx;
			border-radius: 10upx;

			.goods-shop {
				margin-left: 20rpx;
				margin-top: 20rpx;
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
				height: 210upx;
				.goods-img {
					width: 210upx;
					text-align: center;
					image {
						border-radius: 5rpx;
						width: 160upx;
						height: 160upx;
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
				width: 710rpx;
				height: 113rpx;
				margin-top: 50upx;
				display: flex;
				align-items: center;
				border-top: 1px solid #e5e5e5;
				margin-right: 50rpx;
				input {
					margin-left: 20upx;
					margin: auto 0upx auto 30upx;
					font-size: 30upx;
				}
			}
		}

		.goods-price {
			display: flex;
			flex-direction: column;
			margin: 20upx;
			padding: 30upx 20upx;
			background: #ffffff;
			border-radius: 10upx;

			.price-list {
				display: flex;
				justify-content: space-between;
				margin-bottom: 40upx;
			}
		}

		.transport {
			display: flex;
			justify-content: space-between;
			background: #ffffff;
			width: 710rpx;
			height: 140rpx;
			border-radius: 10upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 20rpx;
			margin-bottom: 50rpx;
			.transport-name {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #343434;
				margin-left: 20rpx;
			}

			.express {
				margin-right: 20rpx;
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
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 98upx;
			display: flex;
			justify-content: space-between;
			background: #ffffff;
			align-items: center;

			.total {
				display: flex;
				margin-left: 20upx;
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
		}
	}
</style>