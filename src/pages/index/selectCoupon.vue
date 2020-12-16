<template>
	<view class="container">
		<view class="top">
			<view class="coupon" v-for="(item,index) in list" :key="index" @tap='check(item,index)' v-if="item.coupon_id">
				<view class="left">
					<view class="price"><span>￥</span>{{item.discount_price}}</view>
					<view class="name">优惠券</view>
				</view>
				<view class="middle">
					<view class="limit">{{item.store_name}} , 满{{item.discount_condition}}可用</view>
					<view class="date" v-if="item.start_time!==0">有效期:{{item.start_time}}至{{item.end_time}}</view>
				</view>
				<view class="right">
					<div class="radius">
						<image :src="active == index?'../../static/imgs/index/sel.png':'../../static/imgs/index/nosel.png'" mode="aspectFit" />
					</div>
				</view>
			</view>
		</view>

		<!-- 确定使用 -->
		<button class="qr" @tap='sure()'>
			确定使用
		</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				active: -1,
				checkinfo: {},
				amount: '',
				shop_id: ''
			}
		},
		onLoad(options) {
			if (options.shop_id) {
				this.shop_id = options.shop_id
				this.amount = options.amount
				this.getFoodCoupon()
				return
			}
			this.yhq()
			console.log(options)
			this.amount = options.amount;
		},
		methods: {
			yhq() {
				this.$api.coupon({
					page: this.page,
					page_size: 100,
					type: '1',
				}).then(res => {
					this.list = res.data.data;
				})
			},
			async getFoodCoupon() {
				const { data } = await this.$api.foodCoupon({
					shop_id: this.shop_id
				})
				this.list = data
			},
			check(item, idx) {
				this.active = idx;
				this.checkinfo = item;


			},
			sure() {
				console.log(this.checkinfo)
				let item = this.checkinfo;
				let a = parseFloat(this.amount)
				let b = parseFloat(item.discount_condition)
				if (a < b) {
					this.$mUtils.toast('优惠券条件不满足不可用');
					return
				}
				if (this.list.length == 0) {
					// eslint-disable-next-line no-undef
					uni.navigateBack({
						delta: 1,
					});
					return
				}
				// eslint-disable-next-line no-undef
				const pages = getCurrentPages();
				const prevPage = pages[pages.length - 2];

				//#ifndef H5
				prevPage._data.discount_price = item.discount_price;
				prevPage._data.take_id = item.id;
				//#endif

				//#ifndef MP-WEIXIN
				prevPage.$vm._data.discount_price = item.discount_price;
				prevPage.$vm._data.take_id = item.id;
				//#endif

				// eslint-disable-next-line no-undef
				uni.navigateBack({
					delta: 1,
				});
				console.log(prevPage)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		width: 750rpx;
		height: 100vh;
		background: #f6f6f6;
		flex-direction: column;
		align-items: center;

		.qr {
			margin: 0 auto;
			width: 95%;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 44px;
			outline: none;
			color: #fff;
			position: fixed;
			bottom: 20px;
		}
	}

	.top {
		margin-bottom: 80px;
	}

	.coupon {
		margin: {
			top: 24rpx;
		}

		width: 700rpx;
		height: 191rpx;
		background-image: url("../../static/imgs/index/coupon.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		display: flex;
		align-items: center;
	}

	.left {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 192rpx;
		height: 191rpx;

		.price {
			font-size: 50rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #fa5d09;
			line-height: 72rpx;

			span {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #fa5d09;
				line-height: 36rpx;
			}
		}

		.name {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #fa5d09;
			line-height: 72rpx;
		}
	}

	.middle {
		margin: {
			left: 37rpx;
		}

		.limit {
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 72rpx;
		}

		.date {
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}
	}

	.right {
		margin-right: 10upx;

		.radius {
			width: 30rpx;
			height: 30rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>