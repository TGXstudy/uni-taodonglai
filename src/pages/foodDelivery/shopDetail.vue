<template>
	<view class="container">
		<view style="position: fixd">
			<view class="header" :style="{backgroundImage:'url(\''+shopInfo.store_photos+'\')'}">
				<view class="black"></view>
				<view class="option">
					<view class="back" @click="backPage">
						<image src="../../static/imgs/takeout/back.png" mode="scaleToFill" />
					</view>
					<view class="collect" @click="collectStore">
						<image src="../../static/imgs/takeout/star.png" mode="scaleToFill" v-if="is_collected" />
						<image src="../../static/imgs/takeout/no-star.png" mode="scaleToFill" v-else />
					</view>
				</view>
				<view class="shop-info">
					<image :src="shopInfo.store_photos" mode="" class="shop-avatar" />
					<text style="margin-left: 47rpx">{{shopInfo.store_name}}</text>
					<view class="shop-data" style="margin-left: 47rpx">
						<view class="data-star">
							<image src="../../static/imgs/takeout/food-star.png" mode="" />
							<text>{{ shopInfo.star }}</text>
						</view>
						<text style="margin-left: 27rpx">月销 {{ shopInfo.order_num }}</text>
					</view>
					<view class="shop-price" style="margin-left: 47rpx">
						<text style="margin-right:30rpx">起送 ￥{{ shopInfo.send_amount }}</text>
						<text>人均 ￥{{ shopInfo.average_amount }}</text>
					</view>
					<view class="shop-address" style="margin-left: 47rpx">
						<view class="address-left">
							<image src="../../static/imgs/takeout/addressflag.png" mode="" />
							<text>{{ shopInfo.address }}</text>
						</view>
						<text>{{ shopInfo.distance }} km</text>
					</view>
				</view>
			</view>
			<view class="opt">
				<u-tabs :list="option" :is-scroll="false" :current="currentTab" @change="change" active-color="#FB5509">
				</u-tabs>
			</view>
		</view>
		<goods-menu :goods-list="goodsList" v-if="currentTab == 0" @chooseGoods="chooseGoods" :shop-id="shopInfo.id"></goods-menu>
		<comments v-if="currentTab == 1" :shop-id="shopInfo.id"></comments>
		<coupon v-if="currentTab == 2" :shop-id="shopInfo.id"></coupon>
		<detail v-if="currentTab == 3" :shop-id="shopInfo.id"></detail>
		<view class="footer-cash">
			<image src="../../static/imgs/takeout/zy.png" mode="" @click="showCart" />
			<view class="footer-price">
				<text>￥{{totalPrice}}</text>
				<view class="price-info">
					<text>菜品金额￥{{price}}</text>
					<text>餐盒费￥{{boxPrice}}</text>
				</view>
			</view>
			<view class="price-cash" @click="toComfirm">
				<text>结算</text>
			</view>
		</view>
		<u-popup v-model="show" mode="bottom" height="40%" negative-top="100">
			<view class="pop-container">
				<view class="pop-head">
					<text>{{shopInfo.store_name}}</text>
					<text @click="removeALlGoods">清空</text>
				</view>
				<scroll-view scroll-y="true" style="height: 350rpx;margin-top:80rpx">
					<view class="pop-main" v-for="(item, index) in currentList" :key="index">
						<view class="main-left">
							<text>{{item.goods_name}}</text>
							<text style="width: 100rpx;color: #FF4646">￥{{item.goods_price}}</text>
						</view>
						<u-number-box v-model="item.num" :min="0" :input-width="60" :input-height="40" style="margin-right:24rpx" @change="numChange(item)">
						</u-number-box>
					</view>
				</scroll-view>
				<view class="pop-footer"></view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import goodsMenu from '../../components/menu'
	import detail from '../../components/foodDelivery/detail'
	import comments from '../../components/foodDelivery/comments'
	import coupon from '../../components/foodDelivery/coupon'
	import getUrlParam from "../../common/js/getUrlParam"
	export default {
		async onLoad(options) {
			this.shopInfo = JSON.parse(options.shopInfo);
			if (!this.shopInfo.id) {
				this.shopInfo.id = this.shopInfo.store_id
			}
			await this.initList();
			await this.collectStore()
			await this.getOpenid()
		},
		components: {
			goodsMenu,
			comments,
			detail,
			coupon
		},
		data() {
			return {
				shopInfo: {},
				option: [{
					id: 1,
					name: "商品",
				},
				{
					id: 2,
					name: "评价",
				},
				{
					id: 3,
					name: "优惠券",
				},
				{
					id: 4,
					name: "详情",
				},
				],
				currentTab: 0,
				goodsList: [],
				goodsInfo: {},
				currentList: [],
				is_collected: 0,
				show: false
			};
		},
		methods: {
			change(index) {
				this.currentTab = index;
			},
			backPage() {
				// eslint-disable-next-line no-undef
				uni.switchTab({
					url: '/pages/foodDelivery/main'
				});
			},
			async initList() {
				const list = await this.getList();
				for (const iterator of list) {
					for (const it of iterator.list) {
						it.num = 0
					}
				}
				this.goodsList = list
			},
			async getList() {
				const { data } = await this.$api.takeOutGoodsList({
					shop_id: this.shopInfo.id
				});
				return data;
			},
			chooseGoods(goods) {
				console.log(goods.num)
				if (goods.num === 0) {
					let index = this.currentList.indexOf(goods)
					this.currentList.splice(index, 1)
					return
				}
				let idx = this.currentList.indexOf(goods)
				//如果idx为-1, ~-1为0, 如果idx不为-1，则~返回当前值的补码，是turely
				if (!~idx) {
					this.currentList.push(goods)
					return
				}
				this.currentList[idx].num = goods.num
			},
			async collectStore() {
				const { data } = await this.$api.collectShop({
					store_id: this.shopInfo.id
				})
				this.is_collected = data.is_collected
			},
			toComfirm() {
				if (this.price == 0.00) {
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
				console.log(this.currentList)
				this.$mUtils.goPage('confirm', {
					goods: JSON.stringify({
						shop_id: this.shopInfo.id,
						goods: this.currentList
					})
				})
			},
			async getOpenid() {
				if (this.vuex_code && this.vuex_code == getUrlParam.getUrlParam('code')) return
				if (getUrlParam.getUrlParam('code')) {
					this.$u.vuex('vuex_code', getUrlParam.getUrlParam('code'))
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
			numChange(item) {
				if (item.num === 0) {
					let index = this.currentList.indexOf(item)
					this.currentList.splice(index, 1)
					return
				}
			},
			showCart() {
				if (this.currentList.length == 0) {
					this.$u.toast('购物车里面什么都没有哦')
					return
				}
				this.show = !this.show
			},
			removeALlGoods() {
				for (const iterator of this.currentList) {
					iterator.num = 0
				}
				this.currentList = []
				this.show = false
				this.$forceUpdate()
			}
		},
		computed: {
			price() {
				let tmpPlus = 0
				if (this.currentList.length === 0) {
					return '0.00'
				}
				for (const iterator of this.currentList) {
					let tmpTimes = this.$np.times(Number(iterator.num), Number(iterator.goods_price))
					tmpPlus = this.$np.plus(Number(tmpPlus), Number(tmpTimes))
				}
				return tmpPlus.toFixed(2)
			},
			totalPrice() {
				let tmp = 0
				tmp = this.$np.plus(Number(this.boxPrice), Number(this.price))
				return tmp.toFixed(2)
			},
			boxPrice() {
				let tmpPlus = 0
				if (this.currentList.length === 0) {
					return '0.00'
				}
				for (const iterator of this.currentList) {
					let tmpTimes = this.$np.times(Number(iterator.num), Number(iterator.box_amount))
					tmpPlus = this.$np.plus(Number(tmpPlus), Number(tmpTimes))
				}
				return tmpPlus.toFixed(2)
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background: #ffffff;
	}

	.container {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.opt {
			align-self: flex-start;
			width: 588rpx;
		}
	}

	.header {
		width: 750rpx;
		height: 454rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.black {
			width: 750rpx;
			height: 278rpx;
			background: #000000;
			opacity: 0.5;
			position: absolute;
			z-index: 0;
		}

		.option {
			margin-top: 68rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			width: 701rpx;

			.back {
				width: 17rpx;
				height: 30rpx;
			}

			.collect {
				width: 35rpx;
				height: 34rpx;
			}
		}

		.shop-info {
			margin-top: 100rpx !important;
			width: 701rpx;
			height: 230rpx;
			background: white;
			margin-top: 51rpx;
			z-index: 1;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;

			text {
				margin-top: 20rpx;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
			}

			.shop-avatar {
				width: 100rpx;
				height: 100rpx;
				position: absolute;
				top: 150rpx;
				left: 600rpx;
				border-radius: 10rpx;
			}

			.shop-data {
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 28rpx;

				.data-star {
					display: flex;
					flex-direction: row;
					align-items: center;
					// transform: translateX(-28rpx);

					image {
						transform: translateY(9rpx);
						margin-right: 5rpx;
						width: 21rpx;
						height: 21rpx;
					}

					text {
						margin-left: 5rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #f96c09;
					}
				}

				text {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
			}

			.shop-price {
				margin-top: 20rpx;

				text {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
			}

			.shop-address {
				margin-top: -10rpx;
				display: flex;
				justify-content: space-between;
				width: 600rpx;

				.address-left {
					display: flex;
					align-items: center;

					text {
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}

					image {
						transform: translateY(10rpx);
						margin-right: 10rpx;
						width: 22rpx;
						height: 26rpx;
					}
				}

				text {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
			}
		}
	}

	.footer-cash {
		z-index: 10080;
		width: 711rpx;
		height: 88rpx;
		background: #434343;
		border-radius: 44rpx;
		position: fixed;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		image {
			width: 88rpx;
			height: 88rpx;
		}

		.footer-price {
			display: flex;
			flex-direction: column;

			text {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #ffffff;
				line-height: 30rpx;
			}

			.price-info {
				display: flex;
				align-items: center;

				text {
					margin: {
						top: 5rpx;
						right: 10rpx;
					}

					font-size: 18rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #cccccc;
					line-height: 30rpx;
				}
			}
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

	.pop-container {
		display: flex;
		flex-direction: column;
		align-items: center;

		.pop-head {
			width: 100%;
			height: 80rpx;
			background: #ff4646;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			top: 0;
			z-index: 1;

			text {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #fefefe;
				line-height: 30rpx;
				margin-left: 24rpx;
				margin-right: 24rpx;
			}
		}

		.pop-main {
			height: 120rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #e6e6e6;

			.main-left {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100%;
				width: 400rpx;

				text {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 30rpx;
					margin-left: 24rpx;
				}
			}
		}

		.pop-footer {
			position: fixed;
			bottom: 0;
			background: white;
			width: 100%;
			height: 90rpx;
		}
	}
</style>