<template>
	<!-- 首页 -->
	<view class="index">
		<view class="header">
			<view class="header-center" @tap="$mUtils.goPage('grabble')">
				<view class="lf">
					<image src="../../static/imgs/index/search.png" mode=""></image>
					<input class="search" placeholder="搜索商品" />
				</view>
				<view class="rt">搜索</view>
			</view>
		</view>
		<!-- 轮播 -->
		<view class="bannar">
			<swiper class="swiper" indicator-color="#ccc" indicator-active-color="#fff" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in lblist" :key="index">
					<image class="bannerimg" @tap="tzxq(item)" :src="item.banner_img"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="main" style="background-image: url('../../static/imgs/index/home_bg.png');">
			<!-- nav一级导航 -->
			<view class="macroplate">
				<view class="icons_list">
					<view class="icons_all">
						<view @tap="navto(ite)" class="all_img" v-for="(ite,index) in iconslist" :key="index">
							<image :src="ite.gc_img" mode="aspectFit"></image>
							<view class="icons_tiele">
								{{ite.gc_name}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 公告 -->
			<notice :list="ggxq_list"></notice>
			<!-- 爆款推荐 -->
			<view class="faddish" v-if="hotlist.length !== 0">
				<view class="faddish-title">
					<image src="../../static/imgs/index/fanli_fill.png" mode="aspectFit"></image>
					<text class="fn-sz-36 fn-bold"> 爆款推荐 </text>
				</view>
				<view class="list-wrapper">
					<goods-all v-for="(pro,idx) in hotlist" :key="idx" :item="pro"></goods-all>
				</view>
			</view>
			<!-- 每日必逛 -->
			<day-look :alllist="alllist" v-if="alllist.length !== 0"></day-look>
			<!-- 喜欢 -->
			<view class="like-goods">
				<view class="like-title">猜你喜欢</view>
				<view class="go-like">
					<like-goods v-for="(lk,inx) in likelist" :key="inx" :item="lk"></like-goods>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import GoodsAll from "@/components/index/GoodsAll.vue";
	import LikeGoods from "@/components/index/LikeGoods.vue";
	import dayLook from "@/components/index/dayLook.vue";
	import notice from "@/components/index/notice.vue"
	export default {
		components: {
			GoodsAll,
			LikeGoods,
			dayLook,
			notice
		},
		data() {
			return {
				//bannar数据
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				showBottomVisible: false,
				//导航
				iconslist: [],
				//banner首页轮播
				banner_list: [],
				notice_list: [], //公告列表
				hotlist: [], //爆款推荐
				daylist: [], //每日必逛
				likelist: [], //猜你喜欢
				fllist: [], //首页分类列表
				ggxq_list: [], //公告列表
				alllist: [],
				lblist: [], //轮播列表
			};
		},
		onLoad() {
			this.get_bannar();
			this.get_notice();
			this.get_category();
			this.get_like();
			this.get_list();
			this.getHotList();
			this.tubiao();
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
			//导航跳转
			navto(ite) {
				console.log(ite)
				if (ite.gc_name == '自营专区') {
					this.$mRouter.push({
						route: this.$mRoutesConfig.autotrophy,
					});
				} else if (ite.gc_name == '爆款拼团') {
					this.$mRouter.push({
						route: this.$mRoutesConfig.groupbooking,
					});
				} else if (ite.gc_name == '积分商城') {
					this.$mRouter.push({
						route: this.$mRoutesConfig.integral,
					});
				} else if (ite.gc_name == '限时秒杀') {
					this.$mRouter.push({
						route: this.$mRoutesConfig.seckill,
					});
				} else if (ite.gc_name == '推荐外卖') {
					this.$mRouter.push({
						route: this.$mRoutesConfig.recommendFood,
					});
				} else {
					this.$mRouter.push({
						route: this.$mRoutesConfig.classdetails,
						query: {
							gc_level_1: ite.gc_id,
							gc_level_2: '',
							isshow: 'yes'
						}
					});
				}
			},
			//获取图标
			tubiao() {
				this.$api.category({
					type: 1
				}).then(res => {
					this.iconslist = res.data;
					console.log(res, 'dsdfsdsfafasfasf')
				})
			},
			//获取首页banner
			//banner
			get_bannar() {
				this.$api.banner({
					position_id: '1'
				}).then(res => {
					this.lblist = res.data;
				})
			},
			//获取到公告列表 没完成暂时
			get_notice() {
				this.$api
					.notice({
						page: 1,
						pageSize: 9999,
					})
					.then((res) => {
						if (res.code == 1) {
							this.ggxq_list = res.data;
						}
					});
			},
			/**
			 * @description 获取爆款推荐
			 */
			async getHotList() {
				const res = await this.$api.goodsList({
					goods_list_type: "1"
				});
				this.hotlist = res.data.data;
			},
			//获取首页每日必逛
			get_category() {
				this.$api
					.category({
						type: "2",
					})
					.then((res) => {
						console.log(res, '每日')
						if (res.code == 1) {
							this.alllist = res.data;
							this.daylist = res.data.data;
						}
					});
			},
			//获取首页分类列表
			get_list() {
				this.$api
					.category({
						type: "1",
					})
					.then((res) => {
						if (res.code == 1) {
							this.fllist = res.data;
						}
					});
			},
			//获取首页猜你喜欢
			get_like() {
				this.$api
					.goodsList({
						goods_list_type: "2"
					})
					.then((res) => {
						if (res.code == 1) {
							this.likelist = res.data.data;
						} else {
							this.likelist = this.likelist.concat(res.data.data);
						}
					});
			},
		},
	};
</script>

<style scoped lang="scss">
	.main {
		// background-image: url("../../static/imgs/home_bg.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
	}

	.index {
		width: 750rpx;
		height: 100%;
		background: #f5f5f5;
		overflow-x: hidden;

		.bannar {
			width: 100%;
			height: 380rpx;
			justify-content: center;

			/deep/.swiper {
				// width: 700rpx;
				height: 380rpx;
				border-radius: 33px;
				margin: auto;
				box-shadow: 1px 1px 10px 1px #eee;
			}
		}

		.header {
			top: 0rpx;
			z-index: 1;
			position: sticky;
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 750rpx;
			height: 100rpx;
			background-color: #fff1f0;

			.header-lf {
				display: flex;
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #343434;
				justify-content: center;

				image {
					width: 19upx;
					height: 10upx;
					margin: auto 20upx;
					line-height: 10upx;
				}
			}

			.header-center {
				width: 702rpx;
				display: flex;
				height: 66upx;
				background: #ffffff;
				border: 1upx solid #f96c0a;
				border-radius: 33upx;
				position: relative;

				.lf {
					margin-left: 15upx;
					display: flex;

					image {
						width: 25upx;
						height: 25upx;
						margin: auto;
					}

					.search {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #aaaaaa;
						margin: auto;
						padding-left: 10rpx;
					}
				}

				.rt {
					position: absolute;
					top: 0;
					right: 0;
					width: 131upx;
					height: 67upx;
					background-color: #fa6109;
					border-radius: 30upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #ffffff;
					text-align: center;
					line-height: 60upx;
				}
			}

			.header-scan {
				width: 60rpx;
				height: 60rpx;

				image {
					width: 60rpx;
					height: 60rpx;
				}
			}
		}

		//nav导航
		.macroplate {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 21rpx;

			margin: {
				bottom: 15rpx;
				top: 15rpx;
			}

			.icons_list {
				width: 700rpx;
				height: 380rpx;
				background: #ffffff;
				border-radius: 20rpx;
				// margin: auto;
				// padding: 10rpx;

				.icons_all {
					display: flex;
					flex-wrap: wrap;
				}

				.all_img {
					// flex: 20%;
					display: flex;
					padding: 10upx;
					flex-direction: column;

					image {
						width: 100rpx;
						height: 123rpx;
						margin: auto;
					}
				}

				.icons_tiele {
					width: 120upx;
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #333333;
					text-align: center;
				}
			}
		}

		// 最新公告
		.notice {
			width: 700rpx;
			height: 100rpx;
			margin: auto;
			// padding: 10rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20rpx;
			display: flex;
			align-items: center;

			image {
				width: 141upx;
				height: 28upx;
				margin-left: 24rpx;
			}

			.notice-list {
				flex: 1;
				height: 100%;
				flex-shrink: 1;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #343434;
				line-height: 90rpx;
				margin-left: 30rpx;
			}
		}

		.faddish {
			width: 700rpx;
			display: flex;
			flex-direction: column;
			background: #ffffff;
			margin: 15rpx auto;
			border-radius: 20upx;

			.faddish-title {
				width: 100%;
				margin-left: 30rpx;
				display: flex;
				padding-top: 30upx;
				box-sizing: border-box;

				image {
					width: 30rpx;
					height: 37rpx;
					margin-right: 10rpx;
					margin-top: 10rpx;
				}
			}

			.list-wrapper {
				// padding: 0 20upx;
				box-sizing: border-box;
				width: 100%;
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				flex: 1;
			}
		}

		.like-goods {
			margin-bottom: 30rpx;

			.like-title {
				width: 100%;
				height: 60upx;
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 72upx;
				padding-left: 30upx;
			}

			.go-like {
				padding: 0 20upx;
				box-sizing: border-box;
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				flex: 1;
			}
		}
	}
</style>
