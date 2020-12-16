<template>
	<view class="nearby-list">
		<!-- 商家信息 -->
		<view class="hotel-list" v-for="item in 3" :key="item">
			<view class="hotel-all">
				<view class="hotel-img">
					<image src="../../static/imgs/index/goods2.png" mode=""></image>
				</view>
				<view class="hotel-message">
					<view class="fn-sz-36">三顾茅庐冒菜（环球中心店)</view>
					<view class="hotel-score margin-top-10">
						<view class="score-xinxin fn-cl-fa5">
							<image src="../../static/imgs/index/ic_collect_true.png" mode=""></image>
							4.9
						</view>
						<view class="margin-left-20">月销2310</view>
						<view class="margin-left-80">3.1km</view>
					</view>
					<view class="hotel-score margin-top-10">
						<view>起送￥25</view>
						<view class="margin-left-20">人均￥26</view>
					</view>
					<view class="fn-sz-24 margin-top-10">环球中心1916</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.nearby-list {
		width: 100%;

		.hotel-list {
			width: 95%;
			background: #FFFFFF;
			padding: 20upx 10upx;
			display: flex;
			flex-direction: column;
			margin: 0upx auto 20upx auto;

			.hotel-all {
				display: flex;
				justify-content: space-between;
				margin: 10upx;

				.hotel-img {
					margin: auto;

					image {
						width: 200upx;
						height: 166upx;
					}
				}

				.hotel-message {
					// display: flex;
					// flex-direction: column;
					margin-left: 20upx;

					.hotel-score {
						font-size: 26upx;
						display: flex;

						.score-xinxin {
							image {
								width: 31upx;
								height: 31upx;
							}
						}
					}
				}
			}
		}

	}
</style>
