<template>
	<!-- 拼团按钮 -->
	<view class="shopcart">
		<view class="go-buy" v-if="item.spu_type == 2">
			<view class="iconlist">
				<view class="icons-merchant">
					<image src="../../static/imgs/index/message.png" mode=""></image>
					<text>联系商家</text>
				</view>
				<view class="icons-merchant" @tap="doCollect">
					<image :src="require(isCollect ?'@/static/imgs/index/ic_collect_true.png':'@/static/imgs/index/favor.png' )" mode=""></image>
					<text>收藏</text>
				</view>
			</view>
			<view class="go-promptly" @click="showBottomVisible = true">
				立即购买
			</view>
		</view>

		<!-- 普通商品按钮-->
		<view class="go-buy" v-if="item.spu_type != 2">
			<view class="iconlist">
				<view class="icons-merchant">
					<image src="../../static/imgs/index/message.png" mode=""></image>
					<text>联系商家</text>
				</view>
				<view class="icons-merchant">
					<image src="../../static/imgs/index/favor.png" mode=""></image>
					<text>收藏</text>
				</view>
				<view class="icons-merchant">
					<image src="../../static/imgs/index/cart.png" mode=""></image>
					<text>购物车</text>
				</view>
			</view>

			<view class="buy-group">
				<view class="original-price" @click="showBottomVisible = true">
					<text>加入购物车</text>
				</view>
				<view class="group-price" @click="showBottomVisible = true">
					<text>立即购买</text>
				</view>
			</view>
		</view>

		<!-- 立即兑换按钮 -->
		<view class="integral" v-if="item.type == 1">
			<view class="all-number fn-cl-999 fn-sz-30">
				所需积分<text class="fn-sz-28 fn-cl-fa5">34000</text>积分
			</view>
			<view class="conversion" @tap="$mUtils.goPage('cartlist')">立即兑换</view>
		</view>
		<!-- 秒杀按钮 -->
		<view class="go-buy1" v-if="item.spu_type == 3">
			<view class="iconlist">
				<view class="icons-merchant">
					<image src="../../static/imgs/index/message.png" mode=""></image>
					<text>联系商家</text>
				</view>
			</view>
			<view class="go-promptly" @click="showBottomVisible = true">
				立即购买
			</view>
		</view>
		<s-popup custom-class="bottom-popup" position="bottom" v-model="showBottomVisible">
			<view class="buy-goods">
				<view class="buy-list">
					<view class="buy-img">
						<image src="../../static/imgs/index/goods2.png" mode=""></image>
					</view>
					<view class="product-name">
						<text class="title">电视</text>
						<text class="price">¥{{item[0].sku_price}}</text>
						<view class="work-off">
							<text class="tricky">请确定 规格 数量</text>
						</view>
					</view>
				</view>

				<view class="specification">
					<text>规格</text>
					<view class="witness">
						<view class="witness-list">
							<view class="witness-all">
								<view class="witness-log" v-for="(i, index) in item" :key="index">
									<view class="witness-title" @click="all_goods(i)" :class="active == i ?'active' : ''">
										{{i.sku_name}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="number">
					<text>数量: {{item[0].sku_stock}}</text>
					<view class="count-num">
						<count></count>
					</view>
				</view>
				<!-- @tap="$mUtils.goPage('cartlist') -->
				<view class="confirm">
					<text>确定</text>
				</view>
			</view>

		</s-popup>

		<s-popup custom-class="center-popup" position="center" :beforeHide="beforeHide"></s-popup>

	</view>
</template>

<script>
	import sPopup from '@/components/s-ui/s-popup';
	import count from '@/components/count/count.vue';
	export default {
		components: {
			sPopup,
			count
		},
		props: {
			isGroup: {
				type: Boolean,
				default: true
			},
			goods: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				active: -1,
				isShow: true,
				//蒙城
				showBottomVisible: false,
				isCollect: false, //收藏与取消收藏
			}
		},
		mounted() {
			this.$nextTick(() => {
				console.log(this.goods, '------------') 
			})
		},
		methods: {
			//加入购物车
			doPurchase(type) {
				this.$emit("doPurchase", type)
			},
			//点击去购物车
			goCart() {
				this.$mRouter.switchTab({
					route: this.$mRoutesConfig.cart
				})
			},
			//收藏
			doCollect() {
				console.log(this.isCollect)
				this.isCollect = !this.isCollect
				this.$api.collectGoods({
					spu_id: this.spu_id
				}).then(res => {
					console.log("收藏", res)
					if (res.code == 200) {
			
						this.isCollect = !this.isCollect
						this.$mUtils.toast(this.isCollect ? '收藏成功' : '取消收藏')
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//蒙城
			beforeHide() {
				return new Promise((resolve, reject) => {
					uni.showModal({
						title: '提示',
						content: '确认关闭弹框吗',
						success: res => {
							if (res.cancel) {
								reject();
							} else {
								resolve();
							}
						}
					});
				});
			},
			//商品切换类型
			all_goods(item) {
				this.active = item
			},
		}
	}
</script>

<style lang="scss" scoped>
	.shopcart {
		display: flex;
		width: 100%;
		// height: 100upx;
		flex-direction: column;
		padding: 0upx 30upx;
		margin: auto;

		.go-buy {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20upx;

			.iconlist {
				display: flex;

				.icons-merchant {
					display: flex;
					flex-direction: column;
					margin-left: 20upx;

					image {
						width: 50upx;
						height: 50upx;
						margin: auto;
					}

					text {

						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
					}
				}


			}

			.go-promptly {
				width: 380upx;
				height: 78upx;
				background-color: #f7780a !important;
				border-radius: 50upx;
				text-align: center;
				line-height: 78upx;
				color: #FFFFFF;
			}
		}

		.buy-group {
			display: flex;
			width: 380upx;
			height: 78upx;


			.original-price {
				display: flex;
				flex-direction: column;
				background: #ff9f16;
				width: 191upx;
				height: 78upx;
				border-radius: 50upx 0upx 0upx 50upx;
				line-height: 78upx;

				text {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					align-items: center;
				}


			}

			.group-price {
				display: flex;
				flex-direction: column;
				background: #fa3609;
				width: 191upx;
				height: 78upx;
				border-radius: 0upx 50upx 50upx 0upx;
				line-height: 78upx;

				text {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					align-items: center;
				}
			}
		}

		.integral {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.all-number {
				margin-bottom: 20upx;

			}

			.conversion {
				width: 90%;
				border-radius: 40upx;
				height: 78upx;
				text-align: center;
				line-height: 78upx;
				color: #FFFFFF;
				background: #f7780a;
				margin: auto;
			}
		}

		.go-buy1 {
			display: flex;
			margin-bottom: 20upx;

			.iconlist {
				display: flex;

				.icons-merchant {
					display: flex;
					flex-direction: column;
					margin-left: 20upx;

					image {
						width: 50upx;
						height: 50upx;
						margin: auto;
					}

					text {

						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
					}
				}


			}

			.go-promptly {
				width: 550upx;
				height: 78upx;
				background-color: #f7780a !important;
				border-radius: 50upx;
				margin-left: 20upx;
				text-align: center;
				line-height: 78upx;
				color: #FFFFFF;
			}
		}

		.bottom-popup {

			// display: flex;
			// flex-direction: column;
			.s-popup-wrapper {
				// height: 400upx;

			}

			/* #ifdef H5 */
			/deep/ .s-popup-wrapper {
				height: 600upx;
				border-radius: 20upx 20upx 0upx 0upx;
			}
			/*  #endif  */
			.buy-goods {
				width: 100%;
				background: #FFFFFF;
				box-sizing: border-box;
				position: relative;
				z-index: 4;
				padding: 20upx;

				.buy-list {
					background: #FFFFFF;
					border-radius: 10upx;
					display: flex;
					// justify-content: space-between;
					box-sizing: border-box;

					.buy-img {
						width: 226upx;
						height: 226upx;

						image {
							width: 223upx;
							height: 223upx;
							border-radius: 10upx;
							margin: auto;
						}
					}


					.product-name {
						display: flex;
						flex-direction: column;
						margin-left: 20upx;

						.title {
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
							line-height: 36upx;
							font-weight: bold;
						}

						.price {
							font-size: 28upx;
							font-family: DIN;
							font-weight: 500;
							color: #FF4646;
							line-height: 70upx;
						}

						.work-off {
							display: flex;
							justify-content: space-between;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 60upx;
							color: #999999;

							.tricky {
								color: #999999;
								font-size: 30upx;
							}
						}
					}
				}

				.specification {
					display: flex;
					flex-direction: column;

					text {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 70upx;
					}

					.witness {
						width: 100%;
						box-sizing: border-box;

						.witness-list {
							// height: 400rpx;
							border-radius: 10upx;
							padding: 10upx;

							.witness-all {
								display: flex;
								flex-wrap: wrap;
								flex: 1;

								.witness-log {
									text-align: center;
									background: #FFFFFF;
									display: flex;

								}

								.witness-title {
									width: 213upx;
									height: 62upx;
									background: #F5F5F5;
									border-radius: 31upx;
									font-size: 24upx;
									font-family: Microsoft YaHei;
									font-weight: 400;
									color: #333333;
									justify-content: center;
									line-height: 62upx;
									margin-left: 10upx;
									margin-bottom: 20upx;
								}
							}
						}

					}

				}

				.number {
					display: flex;
					justify-content: space-between;
					padding: 0upx 20upx;
					margin-bottom: 60upx;
					z-index: 5;

					text {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 70upx;
					}

					.count-num {
						z-index: 2;
					}
				}

				.confirm {
					width: 100%;
					background: #FFFFFF;
					padding: 20upx 30upx;
					z-index: 10;

					text {
						background: #F95F09;
						width: 90%;
						height: 78upx;
						position: fixed;
						bottom: 0;
						border-radius: 40upx;
						color: #FFFFFF;
						text-align: center;
						line-height: 78upx;

					}
				}
			}

			.center-popup {
				.s-popup-wrapper {
					width: 500upx;
					height: 600upx;
				}

				/* #ifdef H5 */
				/deep/ .s-popup-wrapper {
					width: 500upx;
					height: 500upx;
				}

				/*  #endif  */
			}
		}

		.active {

			background: #E56D00 !important;
			color: #FFFFFF !important;
		}
	}
</style>
