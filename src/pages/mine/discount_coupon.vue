<template>
	<view class="yhq">
		<view class="wait" v-for="(item,index) in list" :key="index">
			<view class="wait_left">
				<view class="left_top">
					<span>￥</span>
					<p>{{item.discount_price}}</p>
				</view>
				<view class="left_bottom">
					{{item.type | type}}
				</view>
			</view>
			<view class="wait_right">
				<!-- 已使用 -->
				<image class="used" v-if="item.status==2" :src=" '/mine/used.png' | imgUrl"></image>
				<!-- 已过期 -->
				<image class="used" v-if="item.status==3" :src=" '/mine/updated.png' | imgUrl"></image>
				<view class="right_left">
					<p> {{item.store_name}} , 满{{item.discount_condition}}可用</p>
					<span v-if="item.start_time!==0">有效期:{{item.start_time}}至{{item.end_time}}</span>
				</view>
				<!-- <view class="right_right">
					<button v-if="item.status==1">领取</button>
				</view> -->
			</view>
		</view>
		<button class="qr" @tap="$mUtils.goPage('discount_coupon_lq')">
			领取优惠券
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				list: []
			}
		},
		onShow() {
			this.$api.coupon({
				page:this.page,
				page_size: 100,
				type: '0',
			}).then(res => {
				this.list = res.data.data;
			})
		},
		filters: {
			type(value) {
				if (value == 1) {
					return '电商优惠券'
				} else if (value == 2) {
					return '外卖优惠券'
				} else if (value == 3) {
					return '新人外卖专享'
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.yhq {
		width: 100%;
		margin-bottom: 80px;
		padding: 20upx;
		background: #F6F6F6;
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
		
		.wait {
			width: 100%;
			height: 190upx;
			background: #FFFFFF;
			border-radius: 10upx;
			display: flex;
			margin-bottom: 10px;
			.wait_left {
				width: 30%;
				border-right: 1px dashed #EEEEEE;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.left_top {
					display: flex;
					justify-content: center;
					align-items: center;

					span {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FA5D09;
					}
					p {

						font-size: 56upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FA5D09;
					}
				}
				.left_bottom {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FA5D09;
				}
			}
			.wait_right {
				position: relative;
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 10px;
				flex-grow: 1;
				.used {
					position: absolute;
					top: 0;
					right: 0;
					width: 103upx;
					height: 100upx;
				}
				.right_left {
					p {
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}
					span {
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
					}
				}
				.right_right {
					button {
						width: 128upx;
						height: 64upx;
						border-radius: 30upx;
						color: #FFFFFF;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 30upx;
						background: linear-gradient(-90deg, #F58D0A, #FB5509);
					}
				}
			}
		}
	}
</style>
