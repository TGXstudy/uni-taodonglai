<template>
	<view class="dh">
		<view class="top">
			<view class="top_a">
				<p>提现金额(元）</p>
				<span>
					￥
					<input type="text" v-model="num" placeholder="请输入提现金额" value="" />
				</span>
			</view>
			<view class="top_b">
				<span>可提现金额:</span>
				<span class='two'>￥{{xx.balance}}</span>
			</view>
			<view class="nav">
				<view class="title">
					提现方式
				</view>
				<view class="check">
					<view class="left">
						<image class="icon-sz-narrow" :src="'/mine/ic_pay_tag_wchat.png' | imgUrl" mode=""></image>
						<span>微信支付</span>
					</view>
					<view class="right">
						<image class="icon-sz-narrow" :src="'/mine/ic_car_choose_true.png' | imgUrl" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<button class="qr" @click="qr()">确定</button>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				num: '', //数量
				xx: {}, //用户信息
			}
		},
		onShow() {
			this.mx();
		},
		methods: {
			//全部兑换
			qbdh() {
				this.num = this.wallet;
			},
			//积分明细
			mx() {
				this.$api.balanceLog({
					page: this.page,
					pageSize: 10,
				}).then(res => {
					console.log(res)
					this.xx=res.data;
				})
			},
			qr() {
				let openId = this.openId
				this.$api.applyCash({
					amount:this.num,
					openid:openId
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$mRouter.back()	
						})
					} else {
						this.$mUtils.toast(res.msg)					
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dh {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);
		.qr {
			margin-top: 30px;
			width: 95%;
			margin: 0 auto;
			margin-top: 20px;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 44px;
			outline: none;
			color: #fff;
		}
		.top {
			width: 95%;
			background-color: #fff;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding: 10px;
			border-bottom: 1px solid rgba(229, 229, 229, 1);
			margin-top: 10px;
			margin-bottom: 20upx;
			.nav{
				padding: 20upx;
				width: 95%;
				background-color: #fff;
				margin: 0 auto;
				padding-bottom: 0;
				.title{
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
				}
				.check{
					height: 140upx;
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
					.left{
						height: 100%;
						display: flex;
						align-items: center;
						span{
							margin-left: 30upx;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
						}
						image{
							width: 80upx;
							height: 80upx;
						}
					}
					.right{
						height: 100%;
						display: flex;
						align-items: center;
						image{
							width: 30upx;
							height: 30upx;
						}
					}
				}
			}
			.top_a {
				display: flex;
				flex-direction: column;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				justify-content: space-around;
				padding-bottom: 10px;
				height: 80px;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				span{
					display: inline-block;
					display: flex;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				input{
					text-indent: 10upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
				}
			}
			.top_b {
				width: 100%;
				display: flex;
				align-items: center;
				height: 100upx;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				.two{
					font-size: 24upx;
					font-family: DIN;
					font-weight: 500;
					color: #FF4646;
				}
			}
			.top_c {
				color: rgba(153, 153, 153, 1);
				opacity: 0.99;
			}
		}
	}
</style>
