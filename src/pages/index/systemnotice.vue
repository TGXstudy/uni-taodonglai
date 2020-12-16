<template>
	<!-- 系统公告 -->
	<view class="system-notice">
		<view class="notice-list" v-for="item in 3" :key="item" @tap="$mUtils.goPage('detailsnotice')">
			<text class="fn-cl-333 fn-sz-40 margin-bottom-30 fn-sz-400">618商品钜惠，更多优惠福利等你来领取</text>
			<text class="fn-sz-28 fn-cl-65 margin-bottom-30">618商品钜惠，更多优惠福利等你来领取618商品钜惠，更多优惠福利等你来领取618商品钜惠，....</text>
			<text class="fn-sz-28 fn-cl-65">2020-06-04</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	page {
		background: #F5F5F5;
	}

	.system-notice {
		width: 100%;
		height: 100%;
		padding: 30upx;
		display: flex;
		flex-direction: column;


		.notice-list {
			// width: 90%;
			// height: 265;
			background: #FFFFFF;
			border-radius: 10upx;
			display: flex;
			flex-direction: column;
			padding: 10upx 20upx;
			margin-top: 30upx;

			text {
				margin-top: 20upx;
			}
		}
	}
</style>
