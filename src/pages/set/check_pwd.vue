<template>
	<view class="grzl">
		<view class="one">
			<view class="tx">
				<p>18828488284</p>
			</view>
			
			<view class="name">
				<view class="left">
					验证码<input  placeholder="请输入验证码"  type="text" value="" />
				</view>
				<view class="right">
					<button class="yzm">获取验证码</button>
				</view>
			</view>
		</view>
		
		<view class="two">
			<view class="tx">
				<view class="left">
					设置密码
				</view>
				<view class="right">
					<input password placeholder="请输入6-16位数字或字母密码" type="number" value="" />
				</view>
			</view>
			<view class="tx">
				<view class="left">
					确认密码
				</view>
				<view class="right">
					<input   password placeholder="请输入6位数字或字母密码" type="number" value="" />
				</view>
			</view>
			
		</view>
		<button class="qr" @click="qr()">确定保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
	
			}
		},
		methods: {
			qr(){
				
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
				justify-content: space-between;
				border-bottom: 1px solid rgba(229,229,229,1);
				.left{
					
				}
				.right{
					image{
						width: 50px;
						height: 50px;
					}
				}
			}
			.name{
				width: 100%;
				padding: 10px;
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left{
					input{
						margin-left: 20px;
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
			margin-top: 20px;
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
				.left{
					
				}
				.right{
					width: 70%;
					input {
						width: 100%;
						text-align: left;
					}
				}
			}
			.name{
				width: 100%;
				padding: 10px;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left{
					
				}
				.right{
					input {
						text-align: right;
					}
				}
			}
		}
		
	}
</style>
