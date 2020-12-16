<template>
	<view class="container">
		<view class="Info-list" v-for="(item, index) in list" :key="index">
			<view class="user-estimate">
				<view class="user-list">
					<view class="name-estimate">
						<image :src="item.member_avatar" mode="aspectFit"></image>
						<view class="tiem-estimate">
							<text class="fn-sz-30 fn-cl-333">{{item.member_nickname}}</text>
							<text class="fn-sz-22 fn-cl-999 margin-top-10">{{item.create_time}}</text>
						</view>
					</view>
					<view class="estimate-grade">
						<text>{{~~item.star}}</text>
						<view class="start-container">
							<image src="../../static/imgs/index/comment_star.png" mode="aspectFit" v-for="(i,index) in ~~item.star" :key="index"></image>
						</view>
					</view>
				</view>
				<view class="evaluate-content">
					{{item.content}}
				</view>
				<view class="evaluate-reply" v-if="item.reply">
					<text>{{item.reply}}</text>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" class="loading" />
	</view>
</template>

<script>
	export default {
		async onLoad(options) {
			this.spu_id = options.spu_id
			await this.getCommentList()
		},
		data() {
			return {
				spu_id: '',
				last_page: '',
				current_page: '',
				list: [],
				status: 'loadmore',
			}
		},
		async onReachBottom() {
			if (this.current_page >= this.last_page) return;
			this.status = 'loading';
			this.current_page = ++this.current_page;
			await this.getCommentList(this.current_page)
		},
		methods: {
			async getCommentList(current_page = 1) {
				const { data } = await this.$api.comments({
					spu_id: this.spu_id,
					page: current_page,
					page_size: '10'
				})
				this.last_page = data.last_page
				this.current_page = data.current_page
				this.list = [...this.list, ...data.data]
				if (this.current_page >= this.last_page) {
					this.status = 'nomore'
				} else {
					this.status = 'loading'
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.loading {
		padding: {
			top: 20rpx;
			bottom: 20rpx;
		}
	}

	.Info-list {
		width: 702rpx;
		display: flex;
		flex-direction: column;
		margin-top: 20upx;

		.user-estimate {
			display: flex;
			flex-direction: column;

			.user-list {
				display: flex;
				justify-content: space-between;

				.name-estimate {
					display: flex;

					image {
						width: 82upx;
						height: 82upx;
						border-radius: 50%;
						margin: 0upx 10upx;
					}

					.tiem-estimate {
						display: flex;
						flex-direction: column;
					}
				}

				.estimate-grade {
					width: 160rpx;
					display: flex;
					align-items: center;
					font-size: 24upx;
					margin-top: 0rpx;
					justify-content: flex-start;

					text {
						margin-right: 10rpx;
					}
					.start-container {
						display: flex;
						image {
							width: 24upx;
							height: 24upx;
							margin: auto;
						}
					}
				}
			}

			.evaluate-content {
				margin-top: 20upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #343434;
				line-height: 70upx;
			}

			.evaluate-reply {
				width: 649upx;
				background: #f6f6f6;
				border-radius: 5upx;
				padding: 25upx;

				text {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #343434;
				}
			}
		}
	}
</style>