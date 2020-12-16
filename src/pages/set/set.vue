<template>
	<view class="sz">
		<view class="sz_a">
			<view class="box" @tap="gr()">
				<view class="left">
					个人资料
				</view>
				<view class="right">
					<image :src="'/mine/jt.png' | imgUrl" mode=""></image>
				</view>
			</view>
			<view class="box" @tap="aq()">
				<view class="left">
					安全中心
				</view>
				<view class="right">
					<image :src="'/mine/jt.png' | imgUrl" mode=""></image>
				</view>
			</view>
		</view>
		<view class="sz_a">
			<view class="box" @tap="gy()">
				<view class="left">
					关于平台
				</view>
				<view class="right">
					<image :src="'/mine/jt.png' | imgUrl" mode=""></image>
				</view>
			</view>
			<view class="box" @tap="fk()">
				<view class="left">
					意见反馈
				</view>
				<view class="right">
					<image :src="'/mine/jt.png' | imgUrl" mode=""></image>
				</view>
			</view>
		</view>
	<!-- 	<button class="qh">
			<span>清除缓存</span>
			<span>1.9M</span>
		</button> -->
		<view class="tcdl" @tap="showAction()">
			退出登录
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			//退出账号
			showAction(type) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否退出登录?',
					success: function(res) {
						if (res.confirm) {
							try {
								uni.clearStorageSync();
							} catch (e) {
								console.log('错误')
							}
							that.$mUtils.toast('已退出登录');
							that.$mUtils.timeout(() => {
								that.$mRouter.push({
									route: that.$mRoutesConfig.open_apply,
								});
							});
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//切换账号
			qh() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.check_acount,
				})
			},
			fk() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.feedback,
				})
			},
			gr() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.info,
				})
			},
			aq() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.safe,
				})
			},
			gy() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.gy,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sz {
		width: 100%;
		height: 100%;
		background: rgba(246, 246, 246, 1);
		display: flex;
		flex-direction: column;

		.tcdl {
			width: 100%;
			display: flex;
			justify-content: center;
			font-size: 30upx;
			font-family: DIN;
			font-weight: 500;
			color: #FF4646;
			line-height: 70px;
			margin-top: 10px;
		}

		.qh {
			width: 100%;
			height: 60px;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border: none;
			outline: none;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;

			image {
				width: 8px;
				height: 18px;
			}
		}

		.sz_a {
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin-bottom: 20px;

			.box {
				width: 100%;
				height: 80rpx;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px;

				.left {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.right {
					image {
						width: 8px;
						height: 18px;
					}
				}
			}
		}
	}
</style>
