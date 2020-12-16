<template>
	<view class="login">
		<view class="input">
			<span>手机号</span>
			<input type="text" v-model="phone" placeholder="请输入手机号" value="" required />
		</view>
		<view class="input" v-if="type=='reg'">
			<span>验证码</span>
			<input class="yzminput" v-model="yzm" type="text" placeholder="请输入验证码" value="" />
			<verify-code class="yzm" :mob="phone" :type="'2'"></verify-code>
		</view>
		<view class="input" v-if="type=='forget'">
			<span>验证码</span>
			<input class="yzminput" v-model="yzm" type="text" placeholder="请输入验证码" value="" />
			<verify-code class="yzm" :mob="phone" :type="'3'"></verify-code>
		</view>
		<view class="input">
			<span>密码</span>
			<input type="password" v-model="pwd" placeholder="请输入6-16位字母或数字密码" value="" />
		</view>
		<view class="input">
			<span>确认密码</span>
			<input type="password" v-model="qr_pwd" placeholder="请确认密码" value="" />
		</view>
		<view class="input" v-if="type=='reg'">
			<span>推荐人</span>
			<input type="text" v-model="tjr" placeholder="请输入推荐人手机号或推荐码" value="" />
		</view>
		<button v-if="type=='forget'" @tap="reg()" class="yes">确定</button>
		<button v-if="type=='reg'" @tap="reg()" :class="!isAgree ? '' : 'yes'">确定</button>
		<view class="xy" @tap="doAgree" v-if="type=='reg'">
			<image :src="(isAgree ? '/mine/checked.png' : '/mine/unchecked.png') | imgUrl" mode=""></image>
			<p>我已阅读并同意<span @tap.stop="$mUtils.goPage('agree_xy')">《用户协议》</span></p>
		</view>
	</view>
</template>
<script>
	import verifyCode from "@/components/verifyCode.vue";
	export default {
		components: {
			verifyCode,
		},
		data() {
			return {
				type: '',
				isAgree: false,
				phone: "",
				yzm: "", //验证码
				pwd: "", //密码
				qr_pwd: "", //确认密码
				tjr: "", //推荐人
			};
		},
		onLoad(options) {
			this.type = options.type
			this.tjr=options.mobile||''
			console.log(options)
		},
		methods: {
			doAgree() {
				this.isAgree = !this.isAgree;
			},
			reg() {
				let that=this;
				if (this.type == 'reg') {
					let data = {
						mobile: this.phone || "",
						password: this.pwd || "",
						re_password: this.qr_pwd || "",
						code: this.yzm || "",
					};
					for (const key in data) {
						if (data.hasOwnProperty(key)) {
							const element = data[key];
							if (!element) {
								this.$mUtils.toast("请先填写完整");
								return;
							}
						}
					}
					if (!this.isAgree) {
						this.$mUtils.toast("请先勾选用户协议");
						return;
					}
					data.referee = this.tjr;
					this.$api.reg(data).then((res) => {
						if (res.code == 1) {
							that.$mUtils.toast(res.msg);
							that.$mUtils.timeout(() => {
								that.$mUtils.goPage("login");
							});
						} else {
							that.$mUtils.toast(res.msg);
						}

					});
				} else if (this.type == 'forget') {
					let data = {
						member_mobile: this.phone || "",
						password: this.pwd || "",
						re_password: this.qr_pwd || "",
						code: this.yzm || "",
					};
					for (const key in data) {
						if (data.hasOwnProperty(key)) {
							const element = data[key];
							if (!element) {
								this.$mUtils.toast("请先填写完整");
								return;
							}
						}
					}
					data.referee = this.tjr;
					this.$api.forgetPassword(data).then((res) => {
						if (res.code == 1) {
							that.$mUtils.toast(res.msg);
							that.$mUtils.timeout(() => {
								that.$mUtils.goPage("login");
							});
						} else {
							that.$mUtils.toast(res.msg);
						}
					});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.login {
		background-color: #ffffff;
		width: 750rpx;
		padding-top: 40upx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.xy {
			width: 100%;
			display: flex;
			justify-content: center;
			position: fixed;
			bottom: 80upx;

			image {
				margin-right: 20upx;
				width: 30upx;
				height: 30upx;
			}

			p {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;

				span {
					color: #fa5e09;
				}
			}
		}

		.yes {
			background-color: #fa6009 !important;
			color: #ffffff !important;
		}

		.yzminput {
			padding-left: 40rpx;
		}

		button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 558upx;
			height: 78upx;
			background-color: #f6f6f6;
			border-radius: 38upx;
			font-size: 30upx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #000;
			margin-top: 80upx;
		}

		.input {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 50upx;
			width: 558upx;
			height: 78upx;
			background: #f6f6f6;
			border-radius: 38upx;
			padding-left: 20upx;

			span {
				display: inline-block;
				width: 170rpx;
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
