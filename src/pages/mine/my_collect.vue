<template>
	<view class="my_collect">
		<view class="tab">
			<span @click="tabClick(0)" :class="[ tabCurrentIndex == 0 ? 'active':'']">商品</span>
			<span @click="tabClick(1)" :class="[ tabCurrentIndex == 1 ? 'active':'']">商家</span>
		</view>
		<!-- 商品 -->
		<view class="nav" v-if="tabCurrentIndex === 0">
			<slide-delete class="bottom" v-for="(item,index) in sp_list" :key="index" @deleteItem="deleteItem2(item.spu_id)">
				<view class="left" @tap.stop='spdetail(item.spu_id)'>
					<image :src="item.spu_img" mode=""></image>
				</view>
				<view class="right" @tap.stop='spdetail(item.spu_id)'>
					<view class="one">{{item.spu_name}}</view>
					<view class="two">
						<p class='time'>¥{{item.sku_price}}</p>
					</view>
				</view>
			</slide-delete>
		</view>
		<!-- 商家 -->
		<view class="nav" v-if="tabCurrentIndex === 1">
			<slide-delete class="bottom" v-for="(item,index) in dp_list" :key="index" @deleteItem="deleteItem(item.store_id)">
				<view class="left" @tap.stop='dpdetail(item)'>
					<image :src="item.logo" mode=""></image>
				</view>
				<view class="right" @tap.stop='dpdetail(item)'>
					<view class="one">{{item.store_name}}</view>
					<view class="two">
						<p class="pf">{{item.star}}</p>
						<p>
							<uni-rate :value="item.star" :readonly="true" :size="20" />
						</p>
					</view>
					<view class="three">
						收藏{{item.collect_num}} 订单{{item.order_num}}
					</view>
				</view>
			</slide-delete>
		</view>
	</view>
</template>

<script>
	import slideDelete from '@/components/SlideDelete/SlideDelete.vue'
	export default {
		components: {
			slideDelete
		},
		data() {
			return {
				tabCurrentIndex: 0,
				sp_list: [], //
				dp_list: [],
			}
		},
		onLoad() {
			this.store() //收藏的商品
			this.dp() //收藏的店铺
		},
		methods: {
			deleteItem(item) {
				console.log(item)
				this.$api.collectShop({
					store_id: item,
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.store() //收藏的商品
							this.dp() //收藏的店铺
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			deleteItem2(item) {
				this.$api.collectGoods({
					spu_id: item,
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.store() //收藏的商品
							this.dp() //收藏的店铺
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			store() {
				this.$api.my_collect_goods().then(res => {
					console.log(res, '商品')
					if (res.code == 1) {
						this.sp_list = res.data.data;
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			dp() {
				this.$api.collectStore().then(res => {
					if (res.code == 1) {
						this.dp_list = res.data.data;
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			spdetail(item) {
				console.log(111)
				this.$mRouter.push({
					route: this.$mRoutesConfig.goodsdetails,
					query: { spu_id: item }
				});
			},
			//店铺详情
			async dpdetail(item) {
				//线上店铺
				if (item.type == '1') {
					this.$mRouter.push({
						route: this.$mRoutesConfig.autotrophy,
						query: { store_id: item.store_id }
					});
				}
				else if (item.type == '2') {
					const res = await this.$api.storeBase({
						store_id: item.store_id,
						longitude: '0',
						latitude: '0'
					})
					this.$mUtils.goPage('shopDetail', {
						shopInfo: JSON.stringify(res.data)
					})
				}
			},
			tabClick(index) {
				this.tabCurrentIndex = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my_collect {
		width: 100%;
		height: 100%;
		background: #f6f6f6;

		.nav {
			width: 95%;
			margin: 0 auto;
			margin-top: 20upx;
			background-color: #fff;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
			.bottom {
				width: 100%;
				margin-top: 20px;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				.left {
					width: 40%;
					display: flex;
					justify-content: center;
					align-items: flex-start;
					image {
						width: 205upx;
						height: 205upx;
						border-radius: 10upx;
					}
				}
				.right {
					width: 55%;
					display: flex;
					flex-direction: column;
					.one {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.two {
						display: flex;
						flex-direction: column;
						margin-top: 10px;
						display: flex;

						.pf {
							font-size: 25upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
						}

						.person {
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(51, 51, 51, 1);

							span {
								color: #ff5900;
							}
						}
						.time {
							margin-top: 5px;
							font-size: 38upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #f3262d;
						}
					}
					.three {
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						margin-top: 20upx;
					}
				}
			}
		}

		.active {
			border-bottom: 2px solid #ffffff;
		}

		.tab {
			width: 100%;
			height: 100upx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			background-color: rgba(251, 85, 9, 1);

			span {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #ffffff;
				padding-bottom: 20upx;
			}
		}
	}
</style>
