<template>
	<!-- 外卖商品详情 -->
	<view class="shopgoods">
		<view class="shopgoods-bgimg">
			<image src="" mode=""></image>
		</view>
		<view class="postion-img">
			<image src="../../static/imgs/index/goods2.png" mode=""></image>
		</view>
		<!-- 商家信息 -->
		<view class="hotel-list">
			<view class="hotel-all">
				<view class="hotel-message">
					<view class="fn-sz-36">三顾茅庐冒菜（环球中心店)</view>
					<view class="hotel-score margin-top-10">
						<view class="score-xinxin fn-cl-fa5">
							<image src="../../static/imgs/index/ic_collect_true.png" mode=""></image>
							4.9
						</view>
						<view class="margin-left-20">月销2310</view>
						<view class="margin-left-80">3.1km</view>
					</view>
					<view class="hotel-score margin-top-10">
						<view>起送￥25</view>
						<view class="margin-left-20">人均￥26</view>
					</view>
					<view class="fn-sz-24 margin-top-10 site-content">
						<view class="site-img">
							<image src="../../static/imgs/index/location.png" mode=""></image>
							<text>环球中心购物中心一楼12-11</text>
						</view>
						<text class="margin-left-80">3.1km</text>

					</view>
				</view>
			</view>
		</view>
		<!-- 筛选 -->
		<view class="hotel-title">
			<view v-for="(ite,inx) in selectlist" :key="inx" class="hotel-all" :class="['primary',cutForm == ite.type ? 'highlight' : '']"
			 @tap="changeForm(ite.type)">
				{{ite.title}}
			</view>
		</view>
		<!--  商品分类-->
		<view class="classify-content">
			<scroll-view scroll-y="true" class="left-cate-box">
				<view class="left-cate-item" v-for="(item,index) in 7" :key="index" 
				@click="all_goods(index)" :class="active == index ?'' : 'active'">
					<text class="left-cate-name fn-sz-28">食品生鲜</text>
				</view>
			</scroll-view>
			<view class="classify-list">
				<view class="classify-all" v-for="itex in 4" :key="itex">
					<view class="classify-img">
						<image src="../../static/imgs/index/goods2.png" mode=""></image>
					</view>
					<view class="classify-message margin-left-20">
						<view class="fn-sz-30 fn-bold">全家福冒菜两人餐</view>
						<view class="classify-score margin-top-20 fn-sz-22">
							销量142
						</view>
						<view class="hotel-price margin-top-20">
							<view class="margin-top-30 fn-sz-30 fn-cl-fa5">¥ 18.00</view>
							<view class="margin-left-40">
								<count></count>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>

		<!-- 结算 -->
		<view class="accounts-content">
			<view class="accounts-img">
				<image src="../../static/imgs/takeout/zy.png" mode=""></image>
				<view class="accounts-price">
					<view class="fn-sz-36 fn-cl-fff">￥176</view>
					<view class="accounts-cuisine">
						<view class="fn-sz-22 fn-cl-999">菜品金额￥154</view>
						<view class="fn-sz-22 fn-cl-999">餐盒费￥2</view>
					</view>
				</view>
			</view>
			<view class="go-pay" @tap="$mUtils.goPage('location')">
				结算
			</view>
		</view>
	</view>
</template>

<script>
	import count from "@/components/count/count.vue"
	export default {
		components: {
			count,
		},
		data() {
			return {
				active: 0,
				selectlist: [{
					title: "商品",
					type: "1"
				}, {
					title: "评价",
					type: "2"
				}, {
					title: "优惠券",
					type: "3"
				}, {
					title: "详情",
					type: "4"
				}],
				cutForm: 1, //评价+优惠卷得切换类型
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			//商品切换类型
			all_goods(index) {
				this.active = index
			},
			//切换评价 优惠卷类型
			changeForm(type) {
				this.cutForm = type;

				// this.getGroupList()
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
		// background: #F5F5F5;
	}

	.shopgoods {
		width: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		margin-bottom: 150upx;

		.shopgoods-bgimg {
			height: 200upx;
			background: #333333;
			position: relative;
			z-index: 2;
		}

		.postion-img {
			position: absolute;
			top: 118upx;
			right: 60upx;
			z-index: 20;

			image {
				width: 100upx;
				height: 100upx;
			}
		}

		.hotel-list {
			width: 95%;
			background: #FFFFFF;
			padding: 20upx 10upx;
			display: flex;
			flex-direction: column;
			margin: 0upx auto 20upx auto;
			position: absolute;
			z-index: 18;
			top: 170upx;
			left: 19upx;
			border-radius: 30upx;
			box-shadow: 0upx 0upx 21upx 0upx rgba(211, 211, 211, 0.43);

			.hotel-all {
				display: flex;
				justify-content: space-between;
				margin: 10upx;

				.hotel-message {
					// display: flex;
					// flex-direction: column;
					margin-left: 20upx;

					.hotel-score {
						font-size: 26upx;
						display: flex;

						.score-xinxin {
							image {
								width: 31upx;
								height: 31upx;
							}
						}
					}

					.site-content {
						display: flex;
						justify-content: space-between;

						.site-img {
							image {
								width: 24upx;
								height: 26upx;
								margin: auto 5upx;
							}
						}

					}
				}


			}
		}

		.hotel-title {
			width: 100%;
			margin-top: 240upx;
			display: flex;

			.hotel-all {
				width: 100upx;
				height: 50upx;
				text-align: center;
				align-items: center;
				margin-left: 40upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.primary {
				margin-left: 40upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.highlight {
				background: #A7A7A7;
				color: #FFFFFF;
			}
		}

		.classify-content {
			display: flex;
			width: 100%;
			margin-top: 30upx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-bottom: 40upx;

			// .left-cate-box {
			// 	width: 23%;
			// 	// height: 1061upx;
			// 	background: #F5F5F5;

			// 	.current-cate {
			// 		background-color: #fff;
			// 	}

			// 	.left-cate-item {
			// 		height: 120upx;
			// 		width: 100%;
			// 		align-items: center;
			// 		padding: 20upx;
			// 		font-family: PingFang SC;
			// 		font-weight: 500;
			// 		color: #363135;
			// 		line-height: 48upx;

			// 		.left-cate-name {
			// 			flex: 1;
			// 			// padding: 0 10upx;
			// 			box-sizing: border-box;
			// 		}
			// 	}
			// }

			.left-cate-box {
				width: 23%;
				height: 1061upx;
				// height: calc(100vh - var(--window-top));
				background: #FFFFFF;

				.current-cate {
					background-color: #fff;
				}

				.left-cate-item {
					height: 120upx;
					width: 100%;
					align-items: center;
					padding: 20upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #363135;
					line-height: 48upx;

					.left-cate-name {
						flex: 1;
						// padding: 0 10upx;
						box-sizing: border-box;
					}
				}
			}

			.classify-list {
				width: 73%;
				display: flex;
				flex-direction: column;
				background: #FFFFFF;

				.classify-all {
					display: flex;
					border-bottom: 1upx solid #CCCCCC;
					margin-top: 30upx;

					.classify-img {
						image {
							width: 180upx;
							height: 180upx;
						}
					}

					.classify-message {
						margin-left: 20upx;
					}

					.hotel-price {
						display: flex;
						justify-content: space-between;
					}
				}
			}
		}

		.accounts-content {
			display: flex;
			justify-content: space-between;
			width: 95%;
			height: 88upx;
			margin: auto;
			background: #434343;
			border-radius: 40upx;
			position: fixed;
			bottom: 0;
			left: 20upx;

			.accounts-img {
				display: flex;

				image {
					width: 88upx;
					height: 88upx;
				}

				.accounts-price {
					display: flex;
					flex-direction: column;
					margin-left: 20upx;

					.accounts-cuisine {
						display: flex;
					}
				}
			}

			.go-pay {
				width: 218upx;
				height: 88upx;
				background: #FF7900;
				border-radius: 60upx 40upx 40upx 0upx;
				color: #FFFFFF;
				text-align: center;
				line-height: 88upx;

			}
		}

		.active {
			background: #CCCCCC;
		}
	}
</style>
