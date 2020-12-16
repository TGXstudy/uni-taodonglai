<template>
	<!-- 秒杀 -->
	<view class="seckill">
		<view class="seckillTop">
			<!-- 秒杀轮播 -->
			<view class="seckllBanner">
				<swiper class="swiper" indicator-color="#ccc" indicator-active-color="#fff" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in lblist" :key="index">
						<image class="bannerimg" @tap="tzxq(item)" :src="item.banner_img"></image>
					</swiper-item>
				</swiper>
			</view>
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
				<view class="buy-list">
					<view class="buy-icons">
						<view class="buy-all" v-for="(item,index) in buylist" :key="index" :class="[ currt== index ? 'active':'']" @tap="check(item.sec_start_time,index)">
							<text class="time">
								{{ item.time }}
							</text>
							<view class="title">
								{{ item.can_buy | can }}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="seckill-buy">
			<BuyGoods v-for="(sk,inx) in seckilllist" :key="inx" :item="sk"></BuyGoods>
		</view>
	</view>
</template>

<script>
	import BuyGoods from "@/components/index/BuyGoods.vue";
	export default {
		components: {
			BuyGoods,
		},
		data() {
			return {
				//bannar数据
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				showBottomVisible: false,
				currt: 0,
				buylist: [],
				page: 1,
				//轮播
				scrollTop: 0,
				old: {
					scrollTop: 0,
				},
				seckilllist: [], //秒杀列表数据
				sec_start_time: '',
				lblist: [],
			};
		},
		onLoad() {
			this.qg_time();
			this.get_bannar();
		},
		methods: {
			tzxq(item) {
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
			//banner
			get_bannar() {
				this.$api.banner({
					position_id: '2'
				}).then(res => {
					this.lblist = res.data;
				})
			},
			//切换时间段
			check(e, index) {
				this.sec_start_time = e;
				this.currt = index;
				this.get_seckill(); //抢购商品列表
			},
			scroll: function (e) {
				console.log(e);
				this.old.scrollTop = e.detail.scrollTop;
			},
			//秒杀时间段
			qg_time() {
				this.$api.secTimes().then(res => {
					this.buylist = res.data;
					this.sec_start_time = res.data[0].sec_start_time;
					this.get_seckill(); //抢购商品列表
				})
			},
			//秒杀列表
			get_seckill() {
				this.$api
					.goodsList({
						goods_list_type: "7",
						page: this.page,
						page_size: 10,
						sec_start_time: this.sec_start_time,
					})
					.then((res) => {
						console.log(res)
						if (res.code == 1) {
							this.seckilllist = res.data.data;
						} else {
							this.seckilllist = this.seckilllist.concat(res.data.data);
						}
					});
			},
		},
		filters: {
			can(e) {
				if (e == '1') {
					return '正在疯抢'
				} else if (e == '0') {
					return '即将开始'
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.seckill {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		.seckllBanner {
			height: 470rpx;
			/deep/.swiper {
				// width: 700rpx;
				height: 470rpx;
				border-radius: 33px;
				margin: auto;
			}
		}
		.active {
			.time {
				color: #ffffff !important;
				opacity: 1 !important;
			}
			.title {
				color: #ffffff !important;
				opacity: 1 !important;
			}
		}
		.seckillTop {
			// width: 100%;
			flex-direction: column;
			background-color: #f77e0a;
			//秒杀时间
			.scroll-view_H {
				width: 100%;
				white-space: nowrap;
				.buy-list {
					width: 100%;
					height: 160upx;
					.buy-icons {
						margin: auto;
						.buy-all {
							margin: 30upx 25upx;
							display: inline-block;
							text-align: center;
							.time {
								font-size: 48upx;
								font-family: PingFang SC;
								font-weight: 600;
								color: #ffffff;
								opacity: 0.57;
							}
							.title {
								font-size: 24upx;
								font-family: PingFang SC;
								font-weight: 600;
								color: #ffffff;
								opacity: 0.57;
							}
						}
						.buy-title_act {
							font-size: 48upx;
							font-family: PingFang SC;
							font-weight: 600;
							color: #ffffff;
							justify-content: center;
							align-items: center;
						}
						.buy-title {
							font-size: 48upx;
							font-family: PingFang SC;
							font-weight: 600;
							color: #ffffff;
							justify-content: center;
							align-items: center;
							opacity: 0.57;
						}
						.boder {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #ffffff;
							opacity: 0.57;
							text-align: center;
						}
					}
				}
			}
		}
	}

	.seckill-buy {
		background: #f6f6f6;
	}
</style>
