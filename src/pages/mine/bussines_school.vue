<template>
	<view class="sxy">
		<view class="banxin">
			<view class="top">
				<view class="title" @tap="changeStatus(item)" :class="[ currenStatus == item.cate_id ? 'cur-title':'']" v-for="(item,index) in title_list"
				 :key="index">
					<span>{{item.cate_name}}</span>
				</view>
			</view>
			<schoolitem v-for="(item,idx) in fenlei_list" :key='idx' :item="item" @update="getOrderList"></schoolitem>
		</view>
	</view>
</template>

<script>
	import schoolitem from '@/components/mine/schoolitem.vue';
	export default {
		components: {
			schoolitem
		},
		data() {
			return {
				page: 1,
				currenStatus: 0, //分类
				fenlei_list: [], //分类列表
				title_list: [{
						status: 0,
						ext: '全部'
					},
					{
						status: 1,
						ext: '分类一'
					},
					{
						status: 2,
						ext: '分类二'
					},
					{
						status: 3,
						ext: '分类三'
					}
				]
			}
		},
		onLoad() {
			this.fenlei()
			this.get_fenlei() //分类列表
			
		},
		methods: {
			//获取分类
			fenlei() {
				this.$api.question_school({
					type: '1'
				}).then(res => {
					if (res.code == 1) {
						this.title_list = res.data;
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//获取分类列表
			get_fenlei() {
				this.$api.question_schoolList({
					type: '1',
					cate_id: this.currenStatus,
					page:this.page,
					pageSize:'10'
				}).then(res => {
					console.log(res)
					
					if (res.code == 1) {
						this.fenlei_list = res.data.data;
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			changeStatus(item) {
				this.currenStatus = item.cate_id;
				this.get_fenlei()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sxy {
		width: 100%;
		background: #FFFFFF;
		height: 100%;
		.banxin {
			width: 95%;
			margin: 0 auto;

			.cur-title {
				color: #333333 !important;
				border-bottom: 2px solid #FB5509;
			}

			.top {
				margin-top: 20upx;
				width: 100%;
				display: flex;
				justify-content: space-between;

				.title {
					padding-bottom: 10upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
				}
			}
		}
	}
</style>
