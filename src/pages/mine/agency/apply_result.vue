<template>
	<view class="sqjg">
		<view class="nav" v-if="userinfo.agent_status=='3'">
			<p> 你的代理申请未通过</p>
			<p class="two">你可以<span @tap="$mUtils.goPage('apply_agency')">重新申请</span></p>
		</view>
		<view class="nav" v-if="userinfo.agent_status=='1'">
			<p> 你的代理申请待审核</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			userinfo: {} //用户信息
			}
		},
		onLoad(){
			this.getuser()
		},
		methods:{
			//获取用户信息
			getuser() {
				this.$api.getuserinfo().then(res => {
					console.log(res)
					this.userinfo = res.data;
				})
			},
		}

	}
</script>

<style lang="scss" scoped>
	.sqjg {
		width: 100%;
		padding: 20upx;
		background: #FFFFFF;
		.nav{
			width: 60%;
			margin: 0 auto;
			text-align: center;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 150upx;
			.two{
				font-size: 30upx;
				margin-top: 20upx;
			}
			span{
				color: #FA5D09;
			}
		}
	}
</style>
