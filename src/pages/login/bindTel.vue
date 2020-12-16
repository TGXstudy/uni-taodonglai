<template>
	<view class="login">
		<view class="input">
			<span>手机号</span>
			<input type="text" v-model="phone" placeholder="请输入手机号" value="" />
		</view>
		<view class="input">
			<span>验证码</span>
			<input class="yzminput" v-model="code" type="text" placeholder="请输入验证码" value="" />
			<verify-code class="yzm" :mob="phone" :type="'11'"></verify-code>
		</view>
		<button @tap="sure()">确定</button>
		<view class="xy" @tap="doAgree">
			<image :src="(isAgree ? '/mine/checked.png' : '/mine/unchecked.png') | imgUrl"></image>
			<p> 我已阅读并同意<span>《用户协议》</span></p>
		</view>
	</view>
</template>

<script>
	import verifyCode from "@/components/verifyCode.vue"
	export default {
		components: {
			verifyCode
		},
		data() {
			return {
				isAgree: false,
				phone: '',
				code: '', //验证码
			}
		},
		methods: {
			sure() {
				let unionid = this.unionid
				if (!this.isAgree) {
					this.$mUtils.toast("请先勾选用户协议");
					return;
				}
				this.$api.bindMobile({
					unionid: unionid,
					mobile: this.phone,
					code: this.code
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.toast(res.msg);
						this.$mUtils.timeout(() => {
							this.$mRouter.back();
						})
					} else {
						this.$mUtils.toast(res.msg);
					}
				})
			},
			doAgree() {
				this.isAgree = !this.isAgree;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		background-color: #FFFFFF;
		width: 100%;
		padding-top: 40upx;

		.xy {
			width: 100%;
			display: flex;
			justify-content: center;
			position: fixed;
			bottom: 80upx;

			image {
				width: 30upx;
				height: 30upx;
			}

			p {

				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;

				span {
					color: #FA5E09;
				}
			}
		}

		button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 558upx;
			height: 78upx;
			background-color: #FA6009;
			border-radius: 38upx;
			font-size: 30upx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			margin-top: 80upx;
		}

		.input {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			margin-top: 50upx;
			width: 558upx;
			height: 78upx;
			background: #F6F6F6;
			border-radius: 38upx;
			text-indent: 5upx;

			span {
				display: inline-block;
				width: 80px;
				font-size: 26upx;
				margin-left: 10upx;
				margin-right: 20upx;
			}

			input {
				width: 100%;
				height: 100%;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
			}
		}
	}
</style>
