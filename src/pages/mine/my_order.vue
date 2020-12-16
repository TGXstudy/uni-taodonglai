<template>
	<view class="contain">
		<view class="top">
			<view class="title" :class="[ currenStatus == item.status ? 'cur-title':'']" @tap="changeStatus(item)" v-for="(item,index) in statusList" :key="index">
				{{item.ext}}
			</view>
		</view>
		<orderItem v-for="(item,idx) in orderList" :key='idx' :item="item" @update="getOrderList"></orderItem>
		<no-more class="width-100-per" :visible="nomore"></no-more>
		<load-more class="width-100-per" :visible="loading"></load-more>
	</view>
</template>
<script>
	import orderItem from '@/components/mine/orderItem.vue';
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue";
	export default {
		components: {
			orderItem,
			noMore,
			loadMore
		},
		data() {
			return {
				limitNum: 6,
				page: 1,
				nomore: true,
				loading: false,
				uImgList: [], //上传图片列表
				xx_value: 2, //打分
				currenStatus: 0, //分类
				orderList: [], //列表
				statusList: [{
					status: 0,
					ext: '全部'
				},
				{
					status: 1,
					ext: '待付款'
				},
				{
					status: 2,
					ext: '待发货'
				},
				{
					status: 3,
					ext: '待收货'
				},
				{
					status: 4,
					ext: '待评价'
				},
				{
					status: 5,
					ext: '已完成'
				},
				{
					status: 'refund',
					ext: '退货'
				},
				]
			}
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.getOrderList();
		},
		async onLoad(options) {
			this.currenStatus = options.status
			//订单列表
			await this.getOrderList();
			this.$forceUpdate()
		},
		onShow(){
			this.getOrderList();
		},
		methods: {
			//获取订单列表
			getOrderList() {
				this.loading = true;
				this.$api.orderList({
					page: this.page,
					pageSize: 10,
					state: this.currenStatus
				}).then(async res => {
					console.log(res)
					this.loading = false
					if (res.code == 1) {
						if (this.page == 1) {
							this.orderList = res.data.data;
						} else {
							this.orderList = this.orderList.concat(res.data.data);
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
				this.getOrderList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.zhtx-single {
		width: 80px !important;
		height: 80px !important;
	}

	.cur-title {
		border-bottom: 5upx solid #ff7200;
	}

	uni-popup {
		width: 100%;
	}
	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);
		.top {
			background-color: #ffffff;
			.title {
				padding-bottom: 10px;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}
			padding: 10px;
			height: 50px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
