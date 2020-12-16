<template>
	<view class="rzzx">
		<view class="bat">
			<image :src="'/mine/yrz.png' | imgUrl"   mode=""></image>
			<p>已认证</p>
		</view>
		<view class="bottom_nav">
			<view class="banxin">
				<view class="phone">
					<view class="left">
						姓名
					</view>
					<view class="right">
						{{userxx.auth_name}}
					</view>
				</view>
				<view class="phone">
					<view class="left">
						身份证
					</view>
					<view class="right">
						{{userxx.auth_id_num}}
					</view>
				</view>
				<view class="phone">
					<view class="left">
						联系电话
					</view>
					<view class="right">
						{{userxx.mobile}}
					</view>
				</view>
				<view class="phone">
					<view class="left">
						所在区域
					</view>
					<view class="right">
						{{userxx.province}}  {{userxx.city}} {{userxx.county}}
					</view>
				</view>
				<view class="sfz">
					<view class="title">
						身份证照片
					</view>
					<view class="nav">
						<view class="left">
							<image :src="userxx.id_card1" mode=""></image>
						</view>
						<view class="right">
							<image :src="userxx.id_card2" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data(){
			return{
				userxx:{}
			}
		},
		onLoad(){
			this.getxx()
		},
		methods:{
			getxx(){
				this.$api.get_auth().then(res=>{
					this.userxx=res.data
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.rzzx{
	width: 100%;
	height: 100%;
	.bottom_nav{
		width: 100%;
		.banxin{
			width: 95%;
			margin: 0 auto;
			.sfz{
				margin-top: 20upx;
				.title{
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				.nav{
					display: flex;
					justify-content: space-around;
					.left{
						width: 49%;
						image{
							margin-top: 20upx;
							width: 100%;
							height: 240upx;
						}
					}
					.right{
						width: 49%;
						image{
							margin-top: 20upx;
							width: 100%;
							height: 240upx;
						}
					}
					
				}
			}
			.phone {
				input {
					text-align: right;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #CCCCCC;
				}
			
				image {
					width: 20upx;
					height: 20upx;
				}
			
				.djj {
					color: #AAAAAA;
					margin-right: 5px;
				}
				height: 120upx;
				width: 100%;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				display: flex;
				align-items: center;
			
				.left {
			
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
			
					h3 {
						margin-left: 10px;
			
					}
				}
			
				.right {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30upx;
					margin-left: 20upx;
					image {
						margin-left: 5px;
						width: 11px;
						height: 18px;
					}
				}
			}
		}
	}
	.bat{
		width: 100%;
		height: 233upx;
		background: #F6F6F6;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 104upx;
			height: 116upx;
		}
		p{
			margin-top: 20upx;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #01BB70;
		}
	}
}
</style>