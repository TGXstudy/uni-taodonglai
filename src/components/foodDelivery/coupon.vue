<template>
	<view class="container">
		<scroll-view scroll-y style="height: 54vh">
			<view class="coupon-container">
				<view class="coupon" v-for="(item, index) in couponList" :key="index" :class="[!item.coupon_id ? '' : 'accessCoupon']">
					<view class="left-box">
						<text><span>￥</span>{{ item.discount_price }}</text>
						<text class="type">外卖优惠券</text>
					</view>
					<view class="middle-box">
						<text class="title">商家优惠券：{{ item.store_name }}专享，满{{ item.discount_condition }}可用</text>
						<text v-if="item.start_time" class="date">有效期：{{ item.start_time.substring(0, 10).replace(/-/g, ".") }}-{{ item.end_time.substring(6, 10).replace(/-/g, ".") }}</text>
						<text v-else class="date">有效期：无限期</text>
					</view>
					<view class="right-box">
						<view class="get-coupon" @click="getCoupon(item)" v-if="!item.coupon_id">
							<text>领取</text>
						</view>
						<text class="trip" v-else>可用</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "coupon",
		props: {
			shopId: {
				type: Number,
				default: 0,
			},
		},
		mounted() {
			this.getCouponList();
		},
		data() {
			return {
				couponList: [],
			};
		},
		methods: {
			async getCouponList() {
				const { data } = await this.$api.foodCoupon({
					shop_id: this.shopId,
				});
				console.log(data);
				for (const iterator of data) {
					iterator.start_time += "";
					iterator.end_time += "";
					if (iterator.start_time == "0") {
						iterator.start_time = 0;
					}
				}
				this.couponList = data;
			},
			async getCoupon(item) {
				await Promise.all([this.$api.takeCoupon({ coupon_id: item.id }), this.getCouponList()]);
			},
		},
	};
</script>

<style lang="scss">
	.container {
		width: 750rpx;

		.coupon-container {
			margin-top: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 20rpx;

			.coupon {
				margin-bottom: 20rpx;
				background-image: url("../../static/imgs/takeout/nogetcou.png");
				background-repeat: no-repeat;
				background-size: 100% 100%;
				-moz-background-size: 100% 100%;
				width: 697rpx;
				height: 191rpx;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(211, 211, 211, 0.44);
				border-radius: 10rpx;
				display: flex;
				flex-direction: row;
			}

			.accessCoupon {
				background-image: url("../../static/imgs/takeout/coupon.png");
			}

			.left-box {
				width: 195rpx;
				height: 191rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				text {
					// margin-left: 10rpx;
					font-size: 40rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #fa6209;
				}

				span {
					font-size: 36rpx;
				}

				.type {
					// margin-left: 30rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #fa6209;
				}
			}

			.middle-box {
				width: 300rpx;
				height: 191rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: 28rpx;

				.title {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #222222;
					margin-bottom: 8rpx;
				}

				.date {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}

			.right-box {
				height: 191rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: 29rpx;

				.get-coupon {
					width: 128rpx;
					height: 64rpx;
					background-image: url("../../static/imgs/takeout/getCoupon.png");
					background-repeat: no-repeat;
					background-size: 100% 100%;
					-moz-background-size: 100% 100%;
					display: flex;
					justify-content: center;
					align-items: center;

					text {
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #fefffe;
						line-height: 72rpx;
					}
				}

				.trip {
					margin-left: 40rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #fa6209;
					line-height: 72rpx;
				}
			}
		}
	}
</style>
