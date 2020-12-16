<template>
	<view class="jf">


		<view class="top_top">
			<view class="topleft">
				<span>
				贡献值
				</span>
				<p class="jff">{{userinfo.contribution_value}}</p>
				<!-- <p class="jl" @tap="tojl()">兑换记录 ></p> -->
			</view>
		</view>
		<view class="bottom">
			<view class="title">
				<view class="left">
					贡献值明细
				</view>

			</view>
			<view class="box" v-for="(item,index) in jf_mxlist" :key="index">
				<view class="left">
					<view class="box_top">{{item.bill_source}}</view>
					<view class="box_bottom">
						{{item.create_time}}
					</view>
				</view>
				<view class="right" >
					+{{item.bill_amt}}
				</view>
				
			</view>
		</view>
		<no-more class="width-100-per" :visible="nomore"></no-more>
		<load-more class="width-100-per" :visible="loading"></load-more>

	</view>
</template>

<script>
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue"
	export default {
		components: {
			noMore,
			loadMore
		},
		data() {
			return {
				page: 1,
				userinfo: {}, //用户信息
				jf_mxlist: [], //积分明细记录
				nomore: true,
				loading: false,
			}
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.jf_mx();
		},
		onLoad() {

			this.getUserInfo()
			this.jf_mx();
		},
		methods: {
			jf_sc() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.shopping,
				})
			},

			//积分明细
		jf_mx(){
			this.loading = true;
			this.$api.myContribution({
				page: this.page,
				pageSize: 10,
			}).then(res=>{
				console.log(res)
				this.loading = false
				if (res.code == 1) {
					if (this.page == 1) {
					this.jf_mxlist=res.data.record.list
					} else {
						this.jf_mxlist = this.jf_mxlist.concat(res.data.record.list);
					}
					this.nomore = res.data.record.total_page <= this.page;
				
				} else {
					console.log("获取拼团商品", res)
				}
			})
		},

			//获取用户信息
			getUserInfo() {
				this.$api.getuserinfo().then(res => {
					this.userinfo = res.data;
				})
			},
			tojl() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.score_jl,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jf {
		display: flex;
		flex-direction: column;
		width: 100%;

		background: rgba(246, 246, 246, 1);

		.top_top {
			width: 100%;
			height: 150px;
			padding: 10px;
			background: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;

			.topleft {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				image{
					width: 50upx;
					height: 50upx;
					margin-right: 20upx;
				}
				span {
				display: flex;
				justify-content: center;
				align-items: center;
				}

				.jff {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 10px;
					font-size: 60upx;
					font-family: DIN;
					font-weight: 500;
					color: #333333;
				}

				.jl {
					margin-top: 10px;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
			}

			.topright {
				width: 190upx;
				height: 73upx;
				background: rgba(255, 255, 255, 1);
				border-radius: 37px;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(250, 93, 9, 1);
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.bottom {
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin-top: 10px;
			padding: 10px;
			padding-top: 20px;

			.title {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					margin-bottom: 10px;
				}

				.right {
					width: 176upx;
					height: 66upx;
					background: #ff5900;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28upx;
					color: #fff;
					border-radius: 36upx;
				}
			}

			.box {
				width: 100%;
				height: 50px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20px;

				.left {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 50px;

					.box_top {
						color: rgba(51, 51, 51, 1);
						font-size: 34upx;
					}

					.box_bottom {
						color: rgba(153, 153, 153, 1);
						font-size: 30upx;
					}
				}

				.right {
					font-size: 34upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(250, 96, 9, 1);
				}
			}
		}
	}
</style>
