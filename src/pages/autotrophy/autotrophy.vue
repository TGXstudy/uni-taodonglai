<template>
	<!-- 自营区域 -->
	<view class="autotrophy">
		<view class="header">
			<view class="header-box">
				<view class="title-Img">
					<image :src="dpxx.logo" mode=""></image>
				</view>
				<view class="title-name">
					<view class="title-top">
						<view class="title-lf" v-if="dpxx.store_id=='0'">
							自营
						</view>
						<view class="title-rt">
							{{dpxx.store_name}}
						</view>
					</view>
					<view class="grade">
						<text class="size" style="margin-left:2rpx;margin-right:8rpx">{{~~dpxx.star}}</text>
						<image src="../../static/imgs/index/comment_star.png" mode="aspectFit" v-for="(item, index) in ~~dpxx.star" :key="index" style="margin-top:3rpx;margin-right:-15rpx"></image>
					</view>
					<view class="order">
						<text>收藏{{dpxx.collect_num}}</text>
						<text>订单{{dpxx.order_num}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cart-goods">
			<scroll-view scroll-x="true" style="width: 100%;overflow:hidden;white-space:nowrap;">
				<view class="scroll-view_H">
					<view @tap="childall()" :class="[ currt== '-1' ? 'active':'']">全部</view>
					<view @tap="child(item.gc_id,index)" :class="[ currt== index ? 'active':'']" v-for="(item,index) in fl_list" :key="index">{{item.gc_name}}</view>
				</view>
			</scroll-view>
		</view>
		<view class="goods-list">
			<like-goods v-for="(zy,inx) in zylist" :key="inx" :item="zy"></like-goods>
		</view>
		<view class="lxsj" v-if="store_id!==0">
			<view class="one" @tap="tel_phone()">
				<u-icon name="../../static/imgs/index/message.png" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">联系商家</view>
			</view>
			<view class="two" @click="iscollect">
				<u-icon :name="is_collected == 1?'../../static/imgs/index/haveCollected.png':'../../static/imgs/index/favor.png'" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">{{is_collected == 1?'已收藏':'收藏'}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import LikeGoods from '@/components/index/LikeGoods.vue'
	export default {
		components: {
			LikeGoods
		},
		data() {
			return {
				//自营商品
				zylist: [],
				store_id: '0', //店铺id
				longitude: '', //经度
				latitude: '', //维度
				dpxx: {},
				page: 1,
				fl_list: [], //分类列表
				gc_level_1: '',
				currt: '-1',
				title: '',
				service_mobile: '',
				is_collected: ''
			}
		},
		onLoad(options) {
			// uni.setNavigationBarTitle({
			// 	title: options.store_name
			// })
			console.log(options, 'sdsdsds')
			this.store_id = options.store_id;
			this.longitude = options.longitude || '0';
			this.latitude = options.latitude || '0';
			this.service_mobile = options.service_mobile;
			this.is_collected = options.is_collect;
			if (this.store_id == '' || this.store_id == undefined) {
				this.store_id = 0;
			}
			this.get_zygoods()
			this.dp()
			this.dpzl()
		},
		methods: {
			tel_phone() {
				console.log(1111)
				// eslint-disable-next-line no-undef
				uni.makePhoneCall({
					phoneNumber: this.service_mobile, //仅为示例
				});
			},
			child(e, index) {
				this.gc_level_1 = e;
				this.currt = index;
				this.get_zygoods()
			},
			childall() {
				this.gc_level_1 = '';
				this.currt = '-1';
				this.get_zygoods()
			},
			//店铺种类
			dpzl() {
				this.$api.category({
					type: '3',
					store_id: this.store_id
				}).then(res => {
					this.fl_list = res.data;
					console.log(res, '店铺分类')
				})
			},
			//店铺
			dp() {
				this.$api.storeBase({
					store_id: this.store_id,
					longitude: this.longitude,
					latitude: this.latitude
				}).then(res => {
					this.dpxx = res.data
					this.store_id = res.data.store_id;
					this.is_collected = res.data.is_collected;
					// eslint-disable-next-line no-undef
					uni.setNavigationBarTitle({
						title: res.data.store_name
					})
					console.log(res, 'sdsdsd')
				})
			},
			get_zygoods() {
				this.$api.goodsList({
					goods_list_type: "3",
					store_id: this.store_id,
					page: this.page,
					page_size: 10,
					gc_level_1: this.gc_level_1
				}).then(res => {
					if (res.code == 1) {
						this.zylist = res.data.data
					} else {
						this.zylist = this.zylist.concat(res.data.data);
					}
				})
			},
			iscollect() {
				if (this.store_id == 0) {
					return
				}
				this.$api.collectShop({
					store_id: this.store_id
				}).then(res => {
					this.is_collected = res.data.is_collected
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f5f5f5;
	}

	.autotrophy {
		width: 100%;
		background: #fffbf9;
		margin-bottom: 200upx;

		.lxsj {
			width: 100%;
			height: 60px;
			background-color: #ffffff;
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: space-around;
			align-items: center;

			view {
				display: flex;
				flex-direction: column;
				height: 100%;
				justify-content: space-around;
				align-items: center;
			}

			image {
				width: 80upx;
				height: 80upx;
			}
		}

		.active {
			border-bottom: 2px solid #fb5509;
		}

		.cart-goods {
			display: flex;
			padding: 10px;

			.scroll-view_H {
				.membershipLevel_item {
					margin-right: 30upx;
				}

				width: 200%;
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
			}

			view {
				margin-right: 20upx;
			}
		}

		.header {
			background: #f77e0a !important;
			height: 265upx;
			padding: 40upx 0upx;

			.header-box {
				margin: auto;
				height: 180upx;
				padding: 20upx;
				background: #ffffff;
				border-radius: 10upx;
				display: flex;
				width: 90%;

				.title-Img {
					width: 124upx;
					height: 124upx;
					border-radius: 10upx;

					image {
						width: 124upx;
						height: 124upx;
						border-radius: 10upx;
					}
				}

				.title-name {
					display: flex;
					flex-direction: column;
					margin-left: 20upx;

					.title-top {
						display: flex;
						align-items: center;

						.title-lf {
							margin-right: 10rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							width: 60upx;
							height: 35upx;
							background: linear-gradient(-90deg, #f58d0a, #fb5509);
							border-radius: 10upx;
							font-size: 18upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #ffffff;
						}

						.title-rt {
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
							// margin-left: 10upx;
						}
					}

					.grade {
						display: flex;
						align-items: center;

						size: {
							font-size: 24px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
						}

						image {
							margin-top: 6rpx;
							margin-left: 2rpx;
							margin-right: 5rpx;
							width: 48upx;
							height: 28upx;
						}
					}

					.order {
						text {
							font-size: 22upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
							margin-top: 10upx;
							margin-right: 10rpx;
						}
					}
				}
			}
		}

		.goods-list {
			padding: 0 20upx;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			flex: 1;
		}
	}
</style>
