<template>
	<view class="grzl">
		<view class="two">
			<view class="tx">
				<p>原手机号</p>
				<p>{{phone}}</p>
			</view>
			
			<view class="name">
				<view class="left">
					验证码<input v-model="old_code"  placeholder="请输入验证码"  type="text" value="" />
				</view>
				<view class="right">
					<verify-code class="yzm" :mob="phone" :type="'6'"></verify-code>
				</view>
			</view>
		</view>
		
		<view class="one">
			<view class="tx">
				新手机号
				<input type="text" v-model="new_phone" placeholder="请输入手机号" value="" />
			</view>
			
			<view class="name">
				<view class="left">
					验证码<input  v-model="new_code" placeholder="请输入验证码"  type="text" value="" />
				</view>
				<view class="right">
					<verify-code class="yzm" :mob="new_phone" :type="'6'"></verify-code>
				</view>
			</view>
		</view>
		
		<button class="qr" @click="qr()">确定保存</button>
	</view>
</template>

<script>
		import verifyCode from "@/components/verifyCode.vue"
	export default {
		components:{verifyCode},
		data() {
			return {
			phone:'',//原手机号
			old_code:'',//原手机验证码
			new_phone:'',//新手机号
			new_code:''//新手机验证码
			}
		},
		onLoad(){
			
			//获取用户信息
			this.getUserInfo()
		},
		methods: {
			//获取用户信息
			getUserInfo() {
				this.$api.getuserinfo().then(res => {
					this.phone = res.data.member_mobile;
				})
			},
			//旧手机验证码
			get_old(){
				this.$api.sendSms({
					phone:this.phone,
					type:'unbind'
				}).then(res=>{
					if(res.code==1){
						this.$mUtils.toast(res.msg)
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//新手机验证码
			get_new(){
				this.$api.sendSms({
					phone:this.new_phone,
					type:'bond'
				}).then(res=>{
					if(res.code==1){
						this.$mUtils.toast(res.msg)
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			},
			qr(){
				this.$api.reset_mobile({
					mobile:this.phone,
					code:this.old_code,
					new_mobile:this.new_phone,
					new_code:this.new_code,
				}).then(res=>{
					if(res.code==1){
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$mRouter.back();
						})
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.grzl{
		width: 100%;
		display: flex;
		flex-direction: column;
		background:rgba(246,246,246,1);
	.qr {
		margin: 0 auto;
		margin-top: 30px;
		width: 95%;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
		border: 1px solid rgba(238, 238, 238, 1);
		border-radius: 44px;
		outline: none;
		color: #fff;
	}
		.one{
			background-color: #fff;
			width: 100%;
			display: flex;
			flex-direction: column;
			.tx{
				width: 100%;
				padding: 10px;
				height: 50px;
				display: flex;
				align-items: center;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				border-bottom: 1px solid rgba(229,229,229,1);
				input{
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					margin-left: 10px;
					text-align: left;
				}
				.left{
					
				}
				.right{
					
					
				}
			}
			.name{
				width: 100%;
				padding: 10px;
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				.left{
					display: flex;
					input{
						margin-left: 20px;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
						
					}
				}
				.right{
				
					button{
						width: 110px;
						height: 40px;
						line-height: 30px;
						border:1px solid rgba(250,96,9,1);
						border-radius:33px;
						color: rgba(250,96,9,1);
						display:flex;
						justify-content: center;
						align-items: center;
						outline: none;
						font-size: 28upx;
					}
				}
			}
		}
		.two{
			margin-bottom: 20px;
			background-color: #fff;
			width: 100%;
			display: flex;
			flex-direction: column;
			.tx{
				width: 100%;
				padding: 10px;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid rgba(229,229,229,1);
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				input{
					margin-left: 10px;
					text-align: left;
				}
				.left{
					
				}
				.right{
					
					
				}
			}
			.name{
				width: 100%;
				padding: 10px;
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				.left{
					display: flex;
					input{
						margin-left: 20px;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
					}
				}
				.right{
				
					button{
						width: 110px;
						height: 40px;
						line-height: 30px;
						border:1px solid rgba(250,96,9,1);
						border-radius:33px;
						color: rgba(250,96,9,1);
						display:flex;
						justify-content: center;
						align-items: center;
						outline: none;
						font-size: 28upx;
					}
				}
			}
		}
		
	}
</style>
