<template>
	<view class="wait">
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
			<view class="right_left">
				<p> {{item.store_name}} , 满{{item.discount_condition}}可用</p>
				<span v-if="item.start_time!==0">有效期:{{item.start_time}}至{{item.end_time}}</span>
			</view>
			<view class="right_right">
				<button @tap="lq(item.id)">领取</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object
			}
		},
		data() {
			return {

			}
		},
		methods: {
			lq(item) {
				this.$api.takeCoupon({
					coupon_id: item
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$emit("lq",res.code)
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
					console.log(res)
				})
			}
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
			width: 70%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding-right: 5px;
			.used {
				position: absolute;
				top: 0;
				right: 0;
				width: 103upx;
				height: 100upx;
			}
			.right_left {
				padding-left: 5px;
				p {
					padding-left: 5px;
					width: 90%;
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
</style>
