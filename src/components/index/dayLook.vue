<template>
	<view class="mandatory">
		<view class="mandatory-title">每日必逛</view>
		<view class="mandatory-all">
			<view class="mandatory-list" @tap="faddish(ite)" v-for="(ite, key) in alllist" :key="key">
				<image :src="ite.gc_img" ></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			alllist: {
				type: Array,
			},
		},
		methods: {
			//跳转详情页面
			faddish(item) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.classdetails,
					query: {
						gc_level_1: item.gc_id,
						gc_level_2: '',
					},
				});
			},
		},
	};
</script>

<style lang="scss">
	.mandatory {
		width: 700rpx;
		height: auto;
		margin: 20upx auto;
		padding: 10upx;
		background: #ffffff;
		border-radius: 20upx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.mandatory-title {
			margin-left: 19rpx;
			height: 60upx;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #343434;
			line-height: 72upx;
			align-self: flex-start;
		}

		.mandatory-all {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			margin-top: 10px;
			margin-bottom: 10px;
			.mandatory-list {
				box-sizing: border-box;
				width: auto;
				display: flex;
				image {
					width: 211upx;
					height: 156upx;
				}
			}
		}
	}
</style>
