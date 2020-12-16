<template>
	<view class="container">
		<u-navbar :is-back="false" title="" :background="background" title-color="white" :border-bottom="false">
			<view class="slot-wrap" @click="choosePoi">
				<image src="../../static/imgs/takeout/poi.png" mode="" class="poi" />
				<text>{{ headPoi }}</text>
				<image src="../../static/imgs/takeout/right-arrow.png" mode="" class="arrow" />
			</view>
		</u-navbar>
		<view class="header">
			<view class="search" @click="toFoodSearch">
				<u-search placeholder="输入店铺名" :show-action="false"></u-search>
			</view>
			<view class="header-img">
				<u-swiper :list="imageList" name="banner_img" height="300" @click="toLink"></u-swiper>
			</view>
			<view class="header-item">
				<view class="item-box" v-for="(item, index) in iconList" :key="index" @click="toFoodClass(item)">
					<image :src="item.img" mode="aspectFit" />
					<text>{{ item.name }}</text>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="options">
				<text class="select">筛选</text>
				<text v-for="(item, index) in opt" :key="index" @click="filterShopList(index)" :class="[currentOpt == item.id ? 'activeColor' : '']">{{ item.name }}</text>
			</view>
			<shop-item :shop-list="shopList"></shop-item>
		</view>
	</view>
</template>

<script>
	import shopItem from "../../components/foodDelivery/shopItem";
	export default {
		components: {
			shopItem,
		},
		async onShow() {
			this.initPoi();
			await this.getIcons();
			await this.getBanner();
			await this.getShopList();
		},
		data() {
			return {
				background: {
					backgroundImage: "linear-gradient(-90deg, #FB5509, #F58D0A)",
				},
				imageList: [],
				longitude: "104.06282",
				latitude: "30.57842",
				shopList: [],
				iconList: [],
				opt: [{
					name: "距离",
					id: 1,
				},
				{
					name: "评分",
					id: 2,
				},
				{
					name: "销售",
					id: 3,
				},
				{
					name: "优惠活动",
					id: 4,
				},
				],
				currentOpt: 1,
				headPoi: "",
			};
		},
		methods: {
			choosePoi() {
				const that = this;
				// eslint-disable-next-line no-undef
				uni.chooseLocation({
					success: function (res) {
						console.log("位置名称：" + res.name);
						that.headPoi = res.name;
						console.log("详细地址：" + res.address);
						console.log("纬度：" + res.latitude);
						that.latitude = res.latitude;
						console.log("经度：" + res.longitude);
						that.longitude = res.longitude;
						that.$u.vuex("vuex_headPoi", that.headPoi);
					},
				});
			},
			initPoi() {
				if (this.vuex_headPoi) {
					this.headPoi = this.vuex_headPoi;
					return;
				}
				this.choosePoi();
			},
			async getBanner() {
				const {
					data
				} = await this.$api.banner({
					position_id: "4",
				});
				this.imageList = data;
				console.log(data, 'dfcdfdf')
			},
			//轮播跳转
			toLink(index) {
				let item = this.imageList[index]
				console.log(item)
				if (item.link_type == 2) {
					this.$mRouter.push({
						route: this.$mRoutesConfig.goodsdetails,
						query: {
							spu_id: item.link_params
						}
					});
				} else if (item.link_type == 3) {
					this.$mRouter.push({
						route: this.$mRoutesConfig.autotrophy,
						query: {
							store_id: item.link_params
						}
					});
				} else if (item.link_type == 4) {
					this.$mRouter.push({
						route: this.$mRoutesConfig.customer_detail,
						query: {
							id: item.link_params,
							type: '1'
						}
					});
				} else {
					console.log('什么都meiy')
				}

			},
			async getShopList(order = 1) {
				const { data } = await this.$api.getStoreList({
					longitude: this.longitude,
					latitude: this.latitude,
					order,
				});
				this.shopList = data;
			},
			async getIcons() {
				const { data } = await this.$api.foodIcons();
				this.iconList = data;
			},
			filterShopList(index) {
				this.getShopList(index + 1);
				this.currentOpt = this.opt[index].id;
			},
			toFoodClass(item) {
				this.$mUtils.goPage("foodClass", {
					name: item.name,
					industry_id: item.id,
					longitude: this.longitude,
					latitude: this.latitude,
					headPoi: this.headPoi,
				});
			},
			toFoodSearch() {
				this.$mUtils.goPage('foodSearch', {
					longitude: this.longitude,
					latitude: this.latitude
				})
			},
		},
	};
</script>

<style lang="scss">
	page {
		background: #f6f6f6;
		overflow-x: hidden;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;

		text {
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #ffffff;

			margin: {
				left: 12rpx;
				right: 12rpx;
			}
		}

		.poi {
			width: 30rpx;
			height: 32rpx;
		}

		.arrow {
			width: 10rpx;
			height: 19rpx;
		}
	}

	.container {
		width: 750rpx;
		background: #f6f6f6;
		display: flex;
		flex-direction: column;
		// align-items: center;

		.header {
			align-self: center;
			width: 750rpx;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			-moz-background-size: 100% 100%;
			background-image: url("../../static/imgs/takeout/bg2.png");
			display: flex;
			flex-direction: column;
			align-items: center;

			.search {
				margin-top: 43rpx;
				width: 701rpx;
			}

			.header-img {
				margin-top: 18rpx;
				width: 701rpx;
				height: 300rpx;
			}

			.header-item {
				width: 701rpx;
				margin-top: 22rpx;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				background: #ffffff;
				border-radius: 10rpx;

				.item-box {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 140rpx;

					margin: {
						top: 13rpx;
						bottom: 35rpx;
					}

					image {
						width: 80rpx;
						height: 80rpx;
						margin-bottom: 4rpx;
					}

					text {
						display: flex;
						justify-content: center;
						width: 140rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
				}
			}
		}

		.main {
			margin-top: 33rpx;
			display: flex;
			flex-direction: column;
			width: 701rpx;
			padding-bottom: 100rpx;
			align-self: center;

			.options {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 519rpx;
				margin-bottom: 34rpx;

				.select {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.activeColor {
					color: #ff4646;
				}

				text {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
				}
			}
		}
	}
</style>