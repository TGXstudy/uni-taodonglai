<template>
	<!-- 排序 -->
	<view class="rank">
		<view class="rank-list">
			<text class="all-rank">新品</text>
			<view class="rank-volume">
				<text>价格</text>
				<view class="rank-all">
					<image src="../../static/imgs/index/ic_type_top_false.png" mode=""></image>
					<image src="../../static/imgs/index/ic_type_bom_false.png" mode=""></image>
				</view>
			</view>
			<view class="rank-volume">
				<text>销量</text>
				<view class="rank-all">
					<image src="../../static/imgs/index/ic_type_top_false.png" mode=""></image>
					<image src="../../static/imgs/index/ic_type_bom_false.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.rank {
		width: 100%;
		padding: 0upx 26upx;
		margin: auto;

		.rank-list {
			display: flex;
			justify-content: center;
			box-sizing: border-box;

			.all-rank {
				width: 20%;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 113upx;
			}

			.rank-volume {
				width: 20%;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 113upx;
				// margin-left: 40upx;
				display: flex;

				.rank-all {
					display: flex;
					flex-direction: column;
					margin: auto 10upx;

					image {
						width: 18upx;
						height: 14upx;
						margin: 5upx;
						

					}
				}

			}
		}

	}
</style>
