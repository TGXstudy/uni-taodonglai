<template>
	<view class="container">
		<u-navbar :is-back="false" title="购物车" :background="background" title-color="white">
			<template v-slot:right>
				<view class="nav-right" @click="cleanAll">清空</view>
			</template>
		</u-navbar>
		<view class="main">
			<view class="main-box" v-for="(item, index) of list" :key="index">
				<view class="shop-head">
					<image src="../../static/imgs/index/sel.png" mode="" @click="chooseShop(item)" v-if="item.isChoosed" />
					<image src="../../static/imgs/index/nosel.png" mode="" @click="chooseShop(item)" v-else />
					<text>{{item.store.store_name}}</text>
				</view>
				<u-swipe-action @click="remove(item.list, goods, item)" :options="options" v-for="(goods, idx) in item.list" style="margin-top:67rpx" :index="idx" :key="idx" btn-width="144">
					<view class="goods">
						<view class="goods-letf-img">
							<image src="../../static/imgs/index/sel.png" mode="" v-if="goods.isChoosed" @click="chooseGoods(goods, item)" />
							<image src="../../static/imgs/index/nosel.png" mode="" v-else @click="chooseGoods(goods, item)" />
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
				<text><span>￥</span>{{price}}</text>
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
				haveAllChoosed: false
			}
		},
		async onShow() {
			this.currentGoods = []
			this.haveAllChoosed = false
			await this.getCartList()
			await this.getOpenid()
		},
		methods: {
			async remove(list, goods, allList) {
				await this.delGoods(goods)
				let i = list.indexOf(goods)
				list.splice(i, 1)
				let a = this.currentGoods.indexOf(goods)
				console.log(a)
				if (a !== -1) {
					this.currentGoods.splice(a, 1)
				}
				if (list.length == 0) {
					let b = this.list.indexOf(allList)
					this.list.splice(b, 1)
				}
				if (this.list.length == 0) {
					this.haveAllChoosed = false
				}
				this.$u.toast(`删除成功`)
			},
			async getCartList() {
				const { data } = await this.$api.cartList()
				this.list = data
			},
			/**
			 * @description remove all goods
			 */
			async cleanAll() {
				await this.$api.delCart({
					cart_ids: 'all'
				})
				this.list = []
				this.currentGoods = []
				this.haveAllChoosed = false
			},
			/**
			 * remove one goods
			 */
			async delGoods(item) {
				await this.$api.delCart({
					cart_ids: item.cart_id
				})
				console.log(item)
			},
			/**
			 * @description choose all goods of the shop
			 */
			async chooseShop(item) {
				console.log(item,'shoitem')
				if (typeof item.isChoosed == 'undefined' || !item.isChoosed) {
					for (const iterator of item.list) {
						iterator.isChoosed = true
						this.currentGoods.push(iterator)
					}
					item.isChoosed = true
					for (const iterator of this.list) {
						if (iterator.isChoosed == 'undefined' || !iterator.isChoosed) {
							this.$forceUpdate()
							return
						}
					}
					this.haveAllChoosed = true
					this.$forceUpdate()
					return
				}
				for (const iterator of item.list) {
					iterator.isChoosed = false
					let i = this.currentGoods.indexOf(iterator)
					console.log(i)
					this.currentGoods.splice(i, 1)
				}
				item.isChoosed = false
				this.haveAllChoosed = false
				this.$forceUpdate()
				console.log(item)
			},
			/**
			 * @description choose one goods
			 */
			async chooseGoods(item, shop) {
				console.log(item,'item')
				console.log(shop,'shop')
				// first, judge the property's value is undefined or not, or it's falsely
				if (typeof item.isChoosed == 'undefined' || !item.isChoosed) {
					item.isChoosed = true
					this.currentGoods.push(item)
					console.log(this.currentGoods,'currentGoods')
					for (const iterator of shop.list) {
						if (typeof iterator.isChoosed == 'undefined' || !iterator.isChoosed) {
							this.$forceUpdate()
							return
						}
					}
					shop.isChoosed = true
					for (const iterator of this.list) {
						if (iterator.isChoosed == 'undefined' || !iterator.isChoosed) {
							this.$forceUpdate()
							return
						}
					}
					this.haveAllChoosed = true
					this.$forceUpdate()
					return
				}
				item.isChoosed = false
				let i = this.currentGoods.indexOf(item)
				this.currentGoods.splice(i, 1)
				shop.isChoosed = false
				this.haveAllChoosed = false
				this.$forceUpdate()
			},
			/**
			 * @description choose all goods
			 */
			chooseAll() {
				for (const iterator of this.list) {
					this.chooseShop(iterator)
				}
				console.log(this.currentGoods)
			},
			/**
			 * @description turn to cartlist for confirming goods
			 */
			async toCash() {
				if (this.currentGoods.length == 0) {
					this.$u.toast('请至少选择一件商品')
					return
				}
				if (!this.openId) {
					let appid = 'wxbff9e2c08f9a7c48';
					let uri = encodeURIComponent(window.location.href); // 这里务必编码
					console.log(window.location.href)
					// let scope = 'snsapi_userinfo'; // 获取用户信息
					let scope = 'snsapi_base'; // 静默授权，仅可获取openid
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=${scope}&state=123#wechat_redirect`;
					return
				}
				await this.$api.checkOrder({
					goods: this.currentGoods
				})
				this.$mUtils.goPage('cartlist', {
					goods: JSON.stringify(this.currentGoods)
				})
			},
			/**
			 * @description goods's num change
			 */
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
			async getOpenid() {
				if (this.vuex_code && this.vuex_code == getUrlParam.getUrlParam('code')) return
				if (getUrlParam.getUrlParam('code')) {
					const res = await this.$api.getOpenid({
						code: getUrlParam.getUrlParam('code'),
						client: 'gzh'
					})
					this.$u.vuex('openId', res.data.openid)
					console.log(this.openId, '授权成功')
					return
				}
				console.log('还没有进入授权')
			},
		},
		computed: {
			price() {
				let tp = 0
				for (const iterator of this.currentGoods) {
					let tmp = this.$np.times(Number(iterator.sku_price), Number(iterator.buy_num))
					tp = this.$np.plus(Number(tp), Number(tmp))
				}
				return tp.toFixed(2)
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