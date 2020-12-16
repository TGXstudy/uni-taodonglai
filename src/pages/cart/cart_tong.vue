<template>
	<view class="container">
		<u-navbar :is-back="false" title="购物车" :background="background" title-color="white">
			<template v-slot:right>
				<view class="nav-right" @click="cleanAll">清空</view>
			</template>
		</u-navbar>
		<view class="main">
			<view class="main-box" v-for="(item, index) in list" :key="index">
				<view class="shop-head">
					<image class="icon-sz-30" @tap="chooseShop(item)" :src="(item.dpchosed ? '/index/sel.png' :  '/index/nosel.png')| imgUrl"></image>
					<text>{{item.store.store_name}}</text>
				</view>
				<u-swipe-action @click="remove(item.list, goods, item)" :options="options" v-for="(goods, idx) in item.list" style="margin-top:67rpx"
				 :index="idx" :key="idx" btn-width="144">
					<view class="goods">
						<view class="goods-letf-img">
							<image class="icon-sz-30" @tap="chooseGoods(goods,item)" :src="(goods.spchosed ? '/index/sel.png' :  '/index/nosel.png')| imgUrl"></image>
						</view>
						<view class="goods-img">
							<image :src="goods.spu_img" mode="" />
						</view>
						<view class="goos-info">
							<view class="goods-title">{{goods.spu_name}}</view>
							<view class="goods-scale">规格：{{goods.sku_name}}</view>
							<view class="goods-footer">
								<text><span>￥</span>{{goods.sku_price}}</text>
								<view class="number-box">
									<u-number-box v-model="goods.buy_num" @change="valChange(goods)" :min="1">
									</u-number-box>
								</view>
							</view>
						</view>
					</view>
				</u-swipe-action>
			</view>
		</view>
		<view class="footer">
			<view class="footer-choose">
				<image src="../../static/imgs/index/sel.png" mode="" v-if="haveAllChoosed" @click="chooseAll" />
				<image src="../../static/imgs/index/nosel.png" mode="" v-else @click="chooseAll" />
				<text>全选</text>
			</view>
			<view class="footer-main">
				<text class="footer-title">总计</text>
				<text><span>￥</span>{{this.sum}}</text>
			</view>
			<view class="footer-cash" @click="toCash">
				<text>结算</text>
			</view>
		</view>
	</view>
</template>

<script>
	import getUrlParam from "../../common/js/getUrlParam"
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(-90deg, #F58D0A, #FB5509)'
				},
				list: [],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#FA3609'
					}
				}],
				currentGoods: [],
				haveAllChoosed: false,
				sum: 0
			}
		},
		async onLoad() {
			this.currentGoods = []
			this.haveAllChoosed = false
			await this.getCartList()
		},
		watch: {
			list(val) {
				this.myValue = val
				console.log(val, 'watch')
			}
		},
		methods: {
			checkgoods() {
				this.sum = 0;
				this.currentGoods = []
				for (const value of this.list) {
					for (const val of value.list) {
						if (val.spchosed == true) {
							this.sum += val.buy_num * val.sku_price
							this.currentGoods.push(val)
						}
					}
				}
				console.log(this.sum)
				console.log(this.currentGoods, '商品')
			},
			async getCartList() {
				const {
					data
				} = await this.$api.cartList()
				this.list = data
				for (const value of this.list) {
					value.dpchosed = false
					for (const child of value.list) {
						child.spchosed = false
					}
				}

				console.log(this.list)
			},

			async chooseShop(item) {
				item.dpchosed = !item.dpchosed
				for (const value of item.list) {
					value.spchosed = item.dpchosed
				}
				this.haveAllChoosed = this.list.every(itm => itm.dpchosed)
				this.checkgoods()
				this.$forceUpdate()
				//console.log(item)
			},
			/**
			 * @description choose one goods
			 */
			async chooseGoods(goods, shop) {
				goods.spchosed = !goods.spchosed
				shop.dpchosed = shop.list.every(itm => itm.spchosed)
				this.checkgoods()
				this.$forceUpdate()
				//console.log(shop)
			},
			/**
			 * @description choose all goods
			 */
			chooseAll() {
				this.haveAllChoosed = !this.haveAllChoosed
				for (const value of this.list) {
					value.dpchosed = this.haveAllChoosed
					for (const val of value.list) {
						val.spchosed = this.haveAllChoosed
					}
				}
				this.checkgoods()
				this.$forceUpdate()
				console.log(this.list)
			},

			valChange(goods) {
				if (goods.isChoosed) {
					let index = 0
					for (const iterator of this.currentGoods) {
						if (iterator.sku_id == goods.sku_id) {
							index = this.currentGoods.indexOf(iterator)
						}
					}
					this.currentGoods[index].buy_num = goods.buy_num
				}
			},
		},
		computed: {
			price() {
				let sum = 0

			}
		}
	}
</script>

<style lang="scss">
	.nav-right {
		margin-right: 29rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #ffffff;
		line-height: 36rpx;
	}

	.container {
		width: 750rpx;
		background: #f6f6f6;
	}

	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;
		background: #f6f6f6;
		margin-bottom: 220rpx;
		// mint-height: 100vh;
		min-height: 100vh;

		.main-box {
			margin-top: 21rpx;
			width: 701rpx;
			padding-bottom: 47rpx;
			background: #ffffff;
			border-radius: 10rpx;

			.shop-head {
				margin: {
					left: 31rpx;
					top: 30rpx;
					bottom: 62rpx;
				}

				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				height: 20rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 19rpx;
					margin-top: 6rpx;
				}

				text {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
				}
			}
		}
	}

	.goods {
		display: flex;
		flex-direction: row;
		align-items: center;

		.goods-letf-img {
			width: 80rpx;
			display: flex;

			image {
				margin-left: 30rpx;
				width: 30rpx;
				height: 30rpx;
			}
		}

		.goods-img {
			// margin-left: 20rpx;
			width: 205rpx;
			height: 205rpx;
			border: 1rpx solid black;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.goos-info {
			display: flex;
			flex-direction: column;
			width: 375rpx;
			height: 205rpx;
			justify-content: space-between;
			margin-left: 35rpx;

			.goods-title {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 36rpx;
			}

			.goods-scale {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 70rpx;
			}

			.goods-footer {
				display: flex;
				flex-direction: row;
				height: 54rpx;
				width: 383rpx;
				align-items: center;

				text {
					font-size: 30rpx;
					font-family: DIN;
					font-weight: 500;
					color: #ff4646;
					line-height: 70rpx;

					span {
						font-size: 24rpx;
					}
				}

				.number-box {
					margin-left: 35rpx;
				}
			}
		}
	}

	.footer {
		width: 749rpx;
		height: 98rpx;
		background: #ffffff;
		position: fixed;
		bottom: 100rpx;
		z-index: 999;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.footer-choose {
			display: flex;
			align-items: center;
			margin-left: 26rpx;

			image {
				width: 30rpx;
				height: 30rpx;
			}

			text {
				margin-left: 19rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}
		}

		.footer-main {
			display: flex;
			align-items: center;

			.footer-title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			text {
				margin-left: 5rpx;
				font-size: 30rpx;
				font-family: DIN;
				font-weight: 500;
				color: #ff4646;
				line-height: 70rpx;

				span {
					font-size: 24rpx;
				}
			}
		}

		.footer-cash {
			width: 254rpx;
			height: 97rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-image: url("../../static/imgs/index/cash.png");
			background-repeat: no-repeat;
			background-size: 100% 100%;
			-moz-background-size: 100% 100%;

			text {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #ffffff;
			}
		}
	}
</style>
