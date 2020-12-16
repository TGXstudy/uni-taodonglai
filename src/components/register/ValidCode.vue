<template>
	<view class="code-wrapper">
		<text class="get-code" :class="canTap ? 'fn-cl-red' : 'fn-cl-999'" @tap="getMobileVerifyCode">{{codeTxt}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			phone: {
				type: String
			},
			type: {
				type: String,
				//注册：register，重置登录密码：forget，支付密码修改：pay，绑定手机号：bond
				default: 'login', 
			},
			roleType:{
				type: String,
				//user 用户 shop 商家
				default: 'user', 
			}
		},
		data() {
			return {
				codeTxt: '获取验证码',
				timeid: null,
				canTap: true,
			}
		},
		methods: {
			getMobileVerifyCode() {

				if (this.canTap) {

					if (!this.phone) {
						this.$mUtils.toast('手机号不能为空');
						return;
					} else if (!this.$regs.isPhone.test(this.phone)) {
						this.$mUtils.toast('请输入正确的手机号');
						return;
					}

					this.canTap = false;
					//发送验证码
					this.sendCode()
				}

			},
			//发送验证码
			sendCode() {
				
				this.$api.sendSms({
					phone:this.phone,
					type:this.type, 
					role_type:this.roleType
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast("发送成功，请注意查收！")
						clearInterval(this.timeid)
						var i = 60;

						this.timeid = setInterval(() => {
							i--;
							this.codeTxt = i + "s后重新发送";
							if (i <= 0) {
								this.canTap = true;
								this.codeTxt = "获取验证码"
								clearInterval(this.timeid)
							}
						}, 1000)
					}else{
						this.$mUtils.toast(res.msg);
						this.canTap=true;
					}

				}, res => {
					this.canTap = true;
					this.$mUtils.toast(res)
				})
			}


		}

	}
</script>

<style scoped lang="scss">
	.code-wrapper{
		width: 250upx;
		align-items: center;
		justify-content: center;
	}
	.get-code {
		
		font-size: 28upx;
		text-decoration: none;

	}
	.fn-cl-red{
		color: #D51518;
	}
	.fn-cl-999{
		color: #999;
	}
</style>
