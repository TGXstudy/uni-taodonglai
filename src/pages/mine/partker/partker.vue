<template>
	<view class="ptjl">
		<view class="title">
			<view class="box_title" :class="[ currenStatus == item.status ? 'cur-title':'']" @tap="changeStatus(item)" v-for="(item,index) in statusList"
			 :key="index">
				{{item.ext}}
			</view>
		</view>
		<view class="nav">
			<partkerItem v-for="(item,idx) in pt_list" :key='idx' :item="item"></partkerItem>
		</view>
		<no-more class="width-100-per" :visible="nomore"></no-more>
		<load-more class="width-100-per" :visible="loading"></load-more>
	</view>
</template>
<script>
	import countDown from "../../../components/goodsdetails/CountDown"
	import partkerItem from "@/components/mine/partkerItem"
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue";
	export default {
		components: {
			countDown,
			partkerItem,
			noMore,
			loadMore
		},
		onLoad() {
			this.jl()
		},
		data() {
			return {
				nomore: true,
				loading: false,
				page: 1,
				killEndTime: "", //
				currenStatus: 0, //分类
				pt_list: [], //拼团记录
				statusList: [{
						status: 0,
						ext: '全部'
					},
					{
						status: 1,
						ext: '拼团中'
					},
					{
						status: 2,
						ext: '拼团成功'
					},
					{
						status: 3,
						ext: '拼团失败'
					},
				]
			}
		},
		methods: {
			onReachBottom() {
				if (this.nomore) return;
				console.log("上拉加载更多....")
				this.page++;
				this.jl();
			},
			//拼团详情
			jl() {
				this.loading = true;
				this.$api.groupLog({
					state: this.currenStatus,
					page: this.page,
					page_size: 100
				}).then(res => {
					console.log(res)
					this.loading = false
					if (res.code == 1) {
						if (this.page == 1) {
							this.pt_list = res.data.data;
						} else {
							this.pt_list = this.pt_list.concat(res.data.data);
						}
						this.nomore = res.data.last_page <= this.page;
					} else {
						console.log('111', res)
						
					}
				})
			},
			changeStatus(item) {
				this.currenStatus = item.status;
				this.page = 1;
				this.jl()
			},

		}
	}
</script>

<style lang="scss" scoped>
	.ptjl {
		width: 100%;
		height: 100%;
		background: #f6f6f6;

		.ft_orange {
			color: #ff5900;
		}

		.cur-title {
			border-bottom: 5upx solid #ff7200;
		}

		.nav {
			width: 95%;
			margin: 0 auto;
			margin-top: 20upx;
			background-color: #fff;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
		}

		.title {
			background-color: #ffffff;
			height: 80upx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;

			.box_title {
				padding-bottom: 10upx;
			}
		}
	}
</style>
