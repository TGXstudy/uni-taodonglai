<template>
	<!-- 商品列表 -->
	<view class="productDetails fn-sz-30">
		<view class="witness-list" @tap="faddish(item)">
			<view class="witness-all">
				<view class="witness-log">
					<image :src="item.spu_img" mode="scaleToFill"></image>
					<view class="witness-title">
						{{ item.spu_name }}
					</view>
					<view class="priceList" v-if="item.spu_type != 2 || 3">
						<text>￥{{ item.price }}</text>
						<view class="del-line fn-cl-aaa fn-sz-20">
							已售{{ item.sell_num }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isGroup: {
				type: Boolean,
				default: true,
			},
			item: {
				type: Object,
				default: function () {
					return {};
				},
			},
		},
		methods: {
			//跳转详情页面
			faddish(item) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.goodsdetails,
					query: {
						spu_id: item.spu_id, //商品类型
						spu_type: item.spu_type, //s商品值
						// gc_level_1:item.gc_level_1
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.productDetails {
		width: 50%;
		flex-direction: column;

		// margin: 10upx;
		.witness-list {
			// height: 400rpx;
			border-radius: 10upx;
			display: flex;
			// padding: 10upx;

			.witness-all {
				display: flex;
				flex-wrap: wrap;
				flex: 1;

				.witness-log {
					width: 338upx;
					// height: 493upx;
					display: flex;
					flex-direction: column;
					display: block;
					background: #ffffff;
					border-radius: 10upx;
					margin: 20upx 10upx 0upx;

					image {
						width: 338upx;
						height: 300upx;
						border-top-left-radius: 10rpx;
						border-top-right-radius: 10rpx;
					}

					.witness-title {
						font-size: 30px;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 36px;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 36upx;
						// margin-top: 15upx;
						padding: 20upx;
					}

					.priceList {
						margin-left: 20rpx;
						display: flex;
						justify-content: space-between;
						width: 280rpx;
						align-items: center;
						text {
							color: #fb5509;
						}

						.del-line {
							font-size: 20upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #aaaaaa;
							line-height: 70upx;
						}
					}
				}
			}
		}
	}
</style>
