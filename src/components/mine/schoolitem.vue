<template>
	<view class="school_item" @tap="toxq(item.id)">
		<view class="school_box">
			<view class="left">
				<image :src="item.thumb" mode=""></image>
			</view>
			<view class="right">
				<view class="top">
					{{item.title}}
				</view>
				<view class="bottom">
					<view class="bottom_left">
						浏览数{{item.views}}
					</view>
					<view class="bottom_right">
						{{item.create_time}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			toxq(e) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.customer_detail,
					query: {
						id: e,
						type:'1'
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.school_item {
		width: 100%;

		.school_box {
			margin-top: 20upx;
			width: 100%;
			height: 200upx;
			padding-bottom: 20upx;
			border-bottom: 1px solid #E5E5E5;
			display: flex;
			justify-content: space-between;

			.left {
				image {
					width: 225upx;
					height: 185upx;
					border-radius: 3upx;
				}
			}

			.right {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				flex-grow: 1;
				padding-left: 10px;
				.top {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;

					.bottom_left {}

					.bottom_right {}
				}
			}
		}
	}
</style>
