<template>
	<view class="container">
		<view class="box" v-for="(item,index) in pj_list" :key='index'>
			<view class="top">
				<image :src="item.member_avatar" mode=""></image>
				<view class="username">
					<p>{{item.member_nickname}}</p>
					<span>{{item.create_time}}</span>
				</view>
			</view>
			<view class="bottom">
				<view class="nav">
					{{item.comment}}
				</view>
				<view class="imgs" v-if="item.pic">
					<image v-for="(ite,idx) in item.pic" :key='idx' :src="ite" mode=""></image>
				</view>
				<view class="hf" v-if="item.reply">
					回复：{{item.reply}}
				</view>
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
		name: 'comments',
		data() {
			return {
				pj_list: [], //评价列表
				page: 1,
				nomore: true,
				loading: false,
			}
		},
		props: {
			shopId: {
				type: Number,
				default: ''
			}
		},
		async mounted() {
			await this.getShopDeatil()
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.getOrderList();
		},
		methods: {
			async getShopDeatil() {
				this.loading = true;
				const res = await this.$api.takeout_evaluation({
						shop_id: this.shopId,
						page: this.page,
						page_size: 10
					})
				this.loading = false;
				if (res.code == 1) {
					if (this.page == 1) {
						this.pj_list = res.data.data;
					} else {
						this.pj_list = this.pj_list.concat(res.data.data);
					}
					this.nomore = res.data.last_page <= this.page;
				} else {
					console.log('111', res)
				}
				//this.pj_list=data.data;
				console.log(res, 'dsfvdfvdsdff')
			},
		}
	}
</script>


<style lang="scss">
	.container {
		width: 100%;
		padding: 10upx;
		display: flex;
		flex-direction: column;
		margin-bottom: 50px;

		.box {
			width: 100%;
			margin-bottom: 20px;
			border-bottom: 1px solid #E5E5E5;
			padding-bottom: 10px;
		}

		.top {
			width: 100%;
			height: 50px;
			display: flex;
			align-items: center;

			.username {
				display: flex;
				flex-direction: column;
				height: 100%;
				justify-content: space-around;

				p {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #282828;
				}

				span {
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
				}
			}

			image {
				width: 67upx;
				height: 67upx;
				margin-right: 10px;
			}
		}

		.bottom {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-left: 12%;

			.nav {
				width: 100%;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #282828;
				margin-bottom: 10px;
			}

			.imgs {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				margin-bottom: 10px;

				image {
					width: 200upx;
					height: 200upx;
					border-radius: 10upx;
					margin-right: 5px;
				}

			}

			.hf {
				width: 85%;
				height: 75upx;
				background: #F6F6F6;
				border-radius: 10upx;
				display: flex;
				align-items: center;
				padding-left: 10px;
			}
		}
	}
</style>
