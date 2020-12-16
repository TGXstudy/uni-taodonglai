<template>
	<view class="fx" :style="{'background-image':'url('+$mUtils.imgUrl('/mine/fx_banner.png')+')'}">
		<image class="one" :src="'/mine/fx_banner.png' | imgUrl" mode=""></image>
		<view class="nav">
			<image :src="image" mode=""></image>
			<!-- <p>我的邀请码：1111</p> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				invitation_code:'',//推荐码
				image:''//推荐吗图片
			}
		},
		methods: {
			//获取用户信息
			getUserInfo() {
				this.$api.getuserinfo().then(res => {
					this.image=res.data.qr_code;
				})
			}
		},
		onLoad() {
			this.getUserInfo()
		}
	}
</script>

<style lang="scss" scoped>
	.fx {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		background-repeat: no-repeat;
		background-size: cover;
		.one {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
		.nav {
			width: 85%;
			margin: 0 auto;
			margin-top: 90upx;
			height: 280px;
			background-color: #fff;
			z-index: 99;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			border-radius: 20px;
			padding: 20px;
			image {
				width: 400upx;
				height: 400upx;
			}
		}
	}
</style>
