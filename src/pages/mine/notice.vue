<template>
	<view class="notice">
		<view class="box" @tap="todetail(item)" v-for="(item,index) in list" :key="index">
			<view class="left">
				<image class="menu-icon" :src="'/mine/notice.png' | imgUrl" mode=""></image>
			</view>
			<view class="middle">
				<view class="top">
					{{item.create_time}}
				</view>
				<view class="bottom">
					{{item.content}}
				</view>
			</view>
			<view class="right">
				<span v-if="item.status=='no'"></span>
			</view>
		</view>
		<no-more class="width-100-per" :visible="nomore"></no-more>
		<load-more class="width-100-per" :visible="loading"></load-more>
	</view>
</template>

<script>
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue";
	export default {
		components: {
			noMore,
			loadMore
		},
		data() {
			return {
				list: [],
				page: 1,
				nomore: true,
				loading: false,
			}
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.get()
		},
		onShow() {
			this.get()
		},
		methods: {
			get() {
				this.loading = true;
				this.$api.msgList({
					page: this.page,
					page_size: 10,
				}).then(res => {
					this.loading = false
					if (res.code == 1) {
						if (this.page == 1) {
							this.list = res.data.data;
						} else {
							this.list = this.list.concat(res.data.data);
						}
						this.nomore = res.data.last_page <= this.page;
					} else {
						console.log('111', res)
						
					}
				})
			},
			todetail(item) {
				this.$mUtils.goPage('notice_detail', {
					id: item.id,
					content: item.content
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.notice {
		width: 100%;
		height: 100%;
		background: #F6F6F6;

		.box {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 160upx;
			border-bottom: 1px solid rgba(229, 229, 229, 1);
			padding-left: 20upx;
			padding-right: 20upx;
			background-color: #FFFFFF;

			.left {
				image {
					width: 80upx;
					height: 80upx;
				}
			}

			.middle {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding-left: 40upx;
				flex-grow: 1;

				.top {
					margin-bottom: 10px;
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}

				.bottom {
					width: 80%;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
			}

			.right {
				span {
					display: inline-block;
					width: 16upx;
					height: 16upx;
					background: #FA3609;
					border-radius: 50%;
				}
			}
		}

	}
</style>