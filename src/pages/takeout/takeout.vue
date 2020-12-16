<template>
	<!-- 首页点击推荐外卖 -->
	<view class="takeout">
		<view class="location">
			<image src="../../static/imgs/index/location.png" mode=""></image>
			<text>新中泰国际...</text>
		</view>
		<!-- 筛选 -->
		<view class="screen">
			<text>距离</text>
			<text>评分</text>
			<text>销量</text>
			<text>优惠活动</text>
		</view>
		<!-- 商家信息 -->
		<view class="all-nearby" @tap="$mUtils.goPage('shopgoods')">
			<nearby-list></nearby-list>
		</view>
	</view>
</template>

<script>
	import NearbyList from '@/components/nearby/NearbyList.vue'
	export default {
		components: {
			NearbyList
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
		background: #F5F5F5;
	}

	.takeout {
		width: 100%;

		.location {
			display: flex;
			width: 100%;
			padding: 20upx;
			height: 70upx;
			background: #FF7900;

			image {
				width: 26upx;
				height: 26upx;
				margin: auto 0upx;
			}

			text {
				font-size: 28upx;
				color: #FFFFFF;
				margin-left: 10upx;
			}
		}

		.screen {
			display: flex;
			justify-content: space-between;
			width: 95%;
			margin: 20upx auto;
			background: #FFFFFF;
			padding: 20upx;

			text {
				font-size: 28upx;
			}
		}
		.all-nearby{
			
		}

	}
</style>
