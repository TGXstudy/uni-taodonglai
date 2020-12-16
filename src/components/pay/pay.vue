<template>
	<view class="pay">
		<view class="nav">
			<view class="title">
				请选择支付方式
			</view>
			<view class="check" @tap="payway = '1'">
				<view class="left">
					<image class="icon-sz-narrow" :src="'/mine/ic_pay_tag_wchat.png' | _imgUrl" mode=""></image>
					<span>微信支付</span>
				</view>
				<view class="right">
					<image class="icon-sz-narrow" :src=" (payway == '1' ?'/mine/ic_car_choose_true.png' : '/mine/ic_car_choose_false.png') | _imgUrl"
					 mode=""></image>
				</view>
			</view>
			<!-- #ifdef H5 -->
			<view class="check" @tap="payway = '2'" v-if=" !$mUtils.checkIsWx()">
				<view class="left">
					<image class="icon-sz-narrow" :src="'/mine/ic_pay_tag_zfb.png' | _imgUrl" mode=""></image>
					<span>支付宝支付</span>
				</view>
				<view class="right">
					<image class="icon-sz-narrow" :src="(payway == '2' ?'/mine/ic_car_choose_true.png' : '/mine/ic_car_choose_false.png') | _imgUrl"
					 mode=""></image>
				</view>
			</view>
			<!-- #endif -->
			<view class="check"  @tap="payway = '3'">
				<view class="left">
					<image class="icon-sz-narrow" :src="'/mine/ic_pay_tag_yue.png' | _imgUrl" mode=""></image>
					<span>余额支付</span>
				</view>
				<view class="right">
					<image class="icon-sz-narrow" :src="(payway == '3' ?'/mine/ic_car_choose_true.png' : '/mine/ic_car_choose_false.png') | _imgUrl"
					 mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			isyu:{
				type:String,
			}
		},
		data(){
			return{
				payway: '1', //余额3,微信1,支付宝2
			}
		},
		
	}
</script>

<style lang="scss" scoped>
		.pay {
			width: 100%;

			.nav {
				padding: 20upx;
				width: 95%;
				background-color: #fff;
				margin: 0 auto;

				.title {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
				}

				.check {
					height: 65px;
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;

					.left {
						height: 100%;
						display: flex;
						align-items: center;

						span {
							margin-left: 30upx;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
						}

						image {
							width: 80upx;
							height: 80upx;
						}
					}

					.right {
						height: 100%;
						display: flex;
						align-items: center;

						image {
							width: 30upx;
							height: 30upx;
						}
					}
				}
			}
		}
</style>