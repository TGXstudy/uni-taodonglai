<template>
	<view class="sq">
		<view class="nav">
			<h3>
				你的商家入驻申请已提交
			</h3>
			<p>
				正在审核中，请等待
			</p>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sq {
		width: 100%;
		padding: 20upx;
		.nav {
			width: 60%;
			margin: 0 auto;
			margin-top: 200upx;
			text-align: center;
			h3{
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}
			p{
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 300;
				color: #999999;
			}
		}
	}
</style>
