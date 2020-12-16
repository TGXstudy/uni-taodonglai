<template>
	<!-- 商品详情页面 -->
	<view class="goodsdetails">
		<view class="goodsdetails-seckill">
			<image src="../../static/imgs/index/ic_app.png" mode=""></image>
			<!-- <view class="goodsdetails-Img">
				<image src="../../static/imgs/index/ic_left.png" mode=""></image>
				<image src="../../static/imgs/index/ic_goods_detail_share.png" mode=""></image>
			</view> -->
			<view class="packet">
				<view class="packet-lf">
					<image src="../../static/imgs/index/round_redpacket_fill.png" mode=""></image>
					<view class="packet-name">点击领取商品红包</view>
				</view>
				<view class="packet-rt">
					<view class="title">
						立即领取
					</view>
				</view>
			</view>
		</view>
		<!-- 商品名字 -->
		<view class="goods-title">
			<view class="goods-name">巴拉巴拉婴儿衣服新生儿连体衣宝宝夏装爬爬服哈衣周岁衣服纯棉</view>
			<view class="goods-price">
				<view class="price">
					￥399.90-499.9
				</view>
				<text>已售234</text>
				<text>四川成都</text>
			</view>
		</view>
		<!-- 快递服务 -->
		<view class="express">
			<view class="freight-free">
				<text class="fn-cl-999 fn-sz-28">快递</text>
				<text class="fn-cl-333 fn-sz-28">免运费</text>
			</view>
			<view class="express-service">
				<text class="fn-cl-999 fn-sz-28">服务</text>
				<view class="guarantee">
					<text class="fn-cl-333 fn-sz-28 margin-right-20">7天包退、材质保证险、正品保障</text>
					<image src="../../static/imgs/index/right .png" mode=""></image>
				</view>
			</view>
			<view class="express-service">
				<text class="fn-cl-999 fn-sz-28">规格</text>
				<view class="guarantee">
					<text class="fn-cl-333 fn-sz-28 margin-right-20">20包小包特惠</text>
					<image src="../../static/imgs/index/right .png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 进店逛逛 -->
		<view class="Into-shop">
			<view class="Into-picture">
				<image src="../../static/imgs/index/goods2.png" mode=""></image>
				<view class="Info-title">
					<view class="Info-autotrophy">
						<image src="../../static/imgs/index/ziying.png" mode=""></image>
						<text class="fn-sz-30 fn-cl-333">巴拉巴拉童装店</text>
					</view>
					<view class="Info-autotrophy">
						<text class="fn-sz-18">4.6</text>
						<image src="../../static/imgs/index/ic_collect_true.png" mode=""></image>
					</view>
					<view class="Info-autotrophy">
						<text class="fn-sz-22 fn-cl-999">收藏3525</text>
						<text class="fn-sz-22 fn-cl-999 margin-left-40">订单364</text>
					</view>
				</view>
			</view>
			<view class="go-store">
				进店逛逛
			</view>
		</view>
		<!-- 拼团 -->
		<view class="group-booking">
			<view class="participate-in">
				<view class="fn-cl-fa5 fn-sz-30 fn-sz-400">
					25人在拼团，可直接参与
				</view>
				<view class="examine-group">
					<text class="fn-cl-fa5 fn-sz-24 margin-right-10">查看更多</text>
					<image src="../../static/imgs/index/right .png" mode=""></image>
				</view>
			</view>
			<view class="participate-info" v-for="item in 2" :key="item">
				<view class="participate-name">
					<image src="../../static/imgs/index/icon_own_select.png" mode=""></image>
					<text class="fn-sz-28 fn-cl-333">我是卡卡</text>
				</view>
				<view class="go-group">
					<view class="participate-tiem">
						<view class="fn-sz-22 fn-cl-333">还差 <text class="fn-sz-28 fn-cl-fa5">1</text>人拼团</view>
						<text class="fn-sz-22 fn-cl-999">剩余05:34:43</text>
					</view>
					<view class="go-bill">
						去拼单
					</view>
				</view>
			</view>

		</view>
		<!-- 用户评价 -->
		<view class="good-estimate">
			<view class="Info-estimate fn-sz-30 fn-cl-333">
				<text>用户评价(9)</text>
				<view class="look-more">
					<text>查看更多</text>
					<image src="../../static/imgs/index/right .png" mode=""></image>
				</view>
			</view>
			<view class="Info-list">
				<view class="user-estimate">
					<view class="user-list">
						<view class="name-estimate">
							<image src="../../static/imgs/index/icon_own_select.png" mode=""></image>
							<view class="tiem-estimate">
								<text class="fn-sz-30 fn-cl-333">布鲁布鲁</text>
								<text class="fn-sz-22 fn-cl-999 margin-top-10">2020-04-30 19:48</text>
							</view>
						</view>
						<view class="estimate-grade">
							<text>4.6</text>
							<image src="../../static/imgs/index/ic_collect_true.png" mode=""></image>
						</view>
					</view>
					<view class="evaluate-content">
						衣服很漂亮，质量也不错，值得推荐
					</view>
					<view class="evaluate-reply">
						<text>商家回复:谢谢评价</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="goods-particulars">
			<text class="title-particulars">商品详情</text>
			<view class="goods-print">

			</view>
		</view>
		<!-- 同类推荐 -->
		<view class="recommend">
			<image src="../../static/imgs/index/ic_goods_detail_tj.png" mode=""></image>
			<like-goods></like-goods>
		</view>
		<view class="goods-cart">
			<button-all></button-all>
		</view>
	</view>
</template>

<script>
	import LikeGoods from "@/components/index/LikeGoods.vue"
	import ButtonAll from "@/components/index/ButtonAll.vue"
	export default {
		components: {
			LikeGoods,
			ButtonAll
		},
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.goodsdetails {
		width: 100%;
		// height: 100%;
		display: flex;
		flex-direction: column;

		background: #f6f6f6;
		position: relative;

		.goodsdetails-seckill {
			justify-content: space-between;
			// height: 500upx;
			position: relative;

			image {
				height: 500upx;
			}

			.goodsdetails-Img {
				display: flex;
				justify-content: space-between;
				padding: 30upx;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;

				image {
					width: 64upx;
					height: 64upx;
				}
			}

			.packet {
				width: 100%;
				display: flex;
				justify-content: space-between;
				height: 98upx;
				background: #f6800a;

				.packet-lf {
					display: flex;
					padding: 10upx 20upx;
					height: 98upx;

					image {
						width: 78upx;
						height: 78upx;
					}

					.packet-name {
						height: 50upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #ffffff;
						margin: auto 20upx;
					}
				}

				.packet-rt {
					width: 172upx;
					height: 63upx;
					border: 2upx solid #ffffff;
					border-radius: 32upx;
					margin: auto 20upx;

					.title {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #ffffff;
						text-align: center;
						line-height: 60upx;
					}
				}
			}
		}

		.goods-title {
			display: flex;
			flex-direction: column;
			padding: 20upx;

			.goods-name {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.goods-price {
				display: flex;
				// justify-content: space-around;

				.price {
					width: 60%;
					font-size: 32upx;
					font-family: DIN;
					// font-weight: 500;
					color: #ff4646;
					line-height: 70upx;
					font-weight: bold;
				}

				text {
					width: 20%;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 70upx;
				}
			}
		}

		.express {
			width: 95%;
			margin: 0upx auto;
			background: #ffffff;
			border-radius: 10upx;
			display: flex;
			flex-direction: column;
			padding: 20upx;

			.freight-free {
				display: flex;
				justify-content: space-between;
			}

			.express-service {
				display: flex;
				justify-content: space-between;
				// height: 80upx;
				margin-top: 50upx;

				.guarantee {
					display: flex;

					image {
						width: 25upx;
						height: 25upx;
						justify-content: center;
						margin: auto;
						padding-top: 6upx;
					}
				}
			}
		}

		.Into-shop {
			display: flex;
			justify-content: space-between;
			padding: 30upx;
			background: #ffffff;
			width: 95%;
			margin: 30upx auto;

			.Into-picture {
				display: flex;

				image {
					width: 124upx;
					height: 124upx;
				}

				.Info-title {
					display: flex;
					flex-direction: column;
					margin-left: 20upx;

					.Info-autotrophy {
						display: flex;

						image {
							width: 48upx;
							height: 28upx;
							// margin-left: 10upx;
							margin: auto 10upx;
						}
					}
				}
			}

			.go-store {
				width: 163upx;
				height: 62upx;
				border: 2upx solid #f6830a;
				border-radius: 31upx;
				margin: auto 0upx;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #fa600a;
				text-align: center;
				line-height: 62upx;
			}
		}

		.group-booking {
			display: flex;
			flex-direction: column;
			padding: 30upx;
			background: #ffffff;
			width: 95%;
			margin: 30upx auto;

			.participate-in {
				display: flex;
				justify-content: space-between;
				margin: auto 0upx;

				.examine-group {
					display: flex;

					image {
						width: 12upx;
						height: 24upx;
						margin: auto;
						padding-bottom: 6upx;
					}
				}
			}

			.participate-info {
				display: flex;
				justify-content: space-between;
				margin: 30upx 0upx;

				.participate-name {
					display: flex;

					image {
						width: 82upx;
						height: 82upx;
						border-radius: 50%;
						margin: auto;
					}

					text {
						margin: auto 10upx;
					}
				}

				.go-group {
					display: flex;

					.participate-tiem {
						display: flex;
						flex-direction: column;
					}

					.go-bill {
						width: 163upx;
						height: 62upx;
						border: 2upx solid #f6830a;
						border-radius: 31upx;
						margin: auto 0upx auto 20upx;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #fa600a;
						text-align: center;
						line-height: 62upx;
					}
				}
			}
		}

		.good-estimate {
			background: #ffffff;
			width: 95%;
			margin: 30upx auto;
			padding: 30upx;
			display: flex;
			flex-direction: column;

			.Info-estimate {
				display: flex;
				justify-content: space-between;

				.look-more {
					display: flex;

					image {
						width: 12upx;
						height: 22upx;
						margin: auto 10upx;
					}
				}
			}

			.Info-list {
				display: flex;
				flex-direction: column;
				margin-top: 20upx;

				.user-estimate {
					display: flex;
					flex-direction: column;

					.user-list {
						display: flex;
						justify-content: space-between;

						.name-estimate {
							display: flex;

							image {
								width: 82upx;
								height: 82upx;
								border-radius: 50%;
								margin: 0upx 10upx;
							}

							.tiem-estimate {
								display: flex;
								flex-direction: column;
							}
						}

						.estimate-grade {
							display: flex;
							margin: auto 0upx;
							font-size: 32upx;
							padding: 0upx 20upx;

							text {
								margin: 0upx 10upx;
							}

							image {
								width: 32upx;
								height: 32upx;
								margin: auto;
							}
						}
					}

					.evaluate-content {
						margin-top: 20upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #343434;
						line-height: 70upx;
					}

					.evaluate-reply {
						width: 649upx;
						background: #f6f6f6;
						border-radius: 3upx;
						padding: 10upx;

						text {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #343434;
						}
					}
				}
			}
		}

		.goods-particulars {
			display: flex;
			flex-direction: column;
			margin-top: 20upx;

			.title-particulars {
				text-align: center;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #343434;
				// line-height: 70upx;
			}

			.goods-print {
			}
		}

		.recommend {
			margin-bottom: 400upx;
			margin-top: 40upx;
			image {
				width: 221upx;
				height: 26upx;
				display: block;
				margin: auto;
			}
		}

		.goods-cart {
			// margin-top: 30upx;
			width: 100%;
			// height: 100upx;
			background-color: #ffffff;
			padding: 10upx 0upx;
			position: fixed;
			bottom: 0;
		}
	}
</style>
