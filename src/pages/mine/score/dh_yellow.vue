<template>
	<view class="dh">
		<view class="top">
			<view class="top_a">
				<p>兑换数量</p>
				<input type="text" v-model="num" placeholder="请输入要转换的积分数" value="" />
			</view>
			<view class="top_b">
				<view class="one">
					<view class="left">
						<p>可兑换积分数:</p>
						<p class="sl">{{userinfo.score}}</p>
					</view>
					<view class="right">
						<p @tap="qbdh()">全部兑换</p>
					</view>
				</view>
				<view class="two">
					可获得黄积分
				</view>
				<view class="three">
					{{(num*this.userinfo.score_to_yellow).toFixed(2)}}
				</view>
			</view>
		</view>
		<button class="qr" @click="qr()">确认兑换</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: '', //数量
				wallet_to_balance: "", //兑换比例
				hd_ye: '', //转换后可获得余额
				score: "", //钱包
				userinfo: {}, //用户信息
				sxf:'',//手续费
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			//全部兑换
			qbdh() {
				this.num = this.userinfo.score;
			},
			//获取用户信息
			getUserInfo() {
				this.$api.getuserinfo().then(res => {
					this.userinfo=res.data
				})
			},
			qr() {
				let a=parseFloat(this.num)
				this.$api.score_to_yellow({
					score:a
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
			height: 270px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding: 10px;
			border-bottom: 1px solid rgba(229, 229, 229, 1);
			margin-top: 10px;

			.top_a {
				display: flex;
				flex-direction: column;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				justify-content: space-around;
				padding-bottom: 10px;
				height: 80px;
				font-size: 31upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}

			.top_b {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				height: 120px;
				border-bottom: 1px solid rgba(229, 229, 229, 1);

				.one {
					display: flex;
					justify-content: space-between;
					font-size: 28upx;
					.left {
						.sl {
							color: rgba(250, 94, 9, 1);
						}
					}
					.right {
						p {
							font-size: 30upx;
							color: rgba(250, 94, 9, 1);
						}
					}
				}

				.two {
					font-size: 30upx;
				}

				.three {}
			}

			.top_c {
				color: rgba(153, 153, 153, 1);
				opacity: 0.99;
			}
		}
	}
</style>
