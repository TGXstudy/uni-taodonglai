<template>
	<!-- 拼团分类 -->
	<view class="group-booking">
		<view class="pt_title" @tap='torule()'>
			拼团规则
		</view>
		<!--  商品分类-->
		<view class="classify-content">
			<view scroll-y="true" class="left-cate-box">
				<view class="left-cate-item fn-sz-28"  :class="currt == index ? 'active':''"    :key="index"  v-for="(item,index) in left_list"  @tap="getlist(item.id,index),check(index)">
					<text class="left-cate-name one-line-txt ">{{item.group_name}}</text>
				</view>
			</view>
			<view class="classify-list">
				<view class="classify-all" v-for="(item,index) in sp_list" @tap="tzxq(item.spu_id)" :key="index">
					<view class="classify-img">
						<image :src="item.spu_img" mode=""></image>
					</view>
					<view class="classify-message margin-left-20">
						<view class="fn-sz-30">{{item.spu_name}}</view>
						<view class="classify-score margin-top-20 fn-sz-22">
							已售{{item.sell_num}}
						</view>
						<view class="hotel-price margin-top-20 fn-sz-30 fn-cl-fa5">
							￥{{item.price}}
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				currt:0,
				page:1,
				active: 0,
				left_list:[],
				sp_list:[],//商品列表
				id:'',
			}
		},
		onLoad(){
			this.getpt();
		},
		methods: {
			torule(){
				this.$mRouter.push({
				  route: this.$mRoutesConfig.grouprule,
				});
			},
			//跳转拼团详情
			tzxq(e){
				this.$mRouter.push({
				  route: this.$mRoutesConfig.groupdetails,
				  query: {
				    spu_id: e,
				  },
				});
			},
			//获取拼团
			getpt(){
				this.$api.groupStage().then(res=>{
					this.left_list=res.data;
					//this.getlist();
					this.getlist(res.data[0].id);
					console.log(res)
				})
			},
			getlist(e,index){
				this.$api.goodsList({
					goods_list_type:'5',
					stage_id:e,
					page:this.page,
					page_size:10,
				}).then(res=>{
					this.sp_list=res.data.data,
					console.log(res,'商品信息')
				})
			},
			check(index){
				this.currt=index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
		background: #F5F5F5;
	}

	.group-booking {
		.pt_title{
			width: 100%;
			height: 20px;
			background-color: rgb(248, 115, 10);
			display: flex;
			justify-content: flex-end;
			font-size: 30upx;
			color: #FFFFFF;
			padding-right: 5px;
		}
		width: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		margin-bottom: 150upx;
		.active{
			background: #F6F6F6 !important;
			border-left: 2px solid  #FB5509;
		}
		.group-title {
			font-size: 30upx;
			margin-left: auto;
			margin-top: 10upx;
			padding: 20upx;
		}
		.classify-content {
			display: flex;
			width: 100%;
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-bottom: 40upx;
			min-height: 650px;
			.left-cate-box {
				width: 30%;
				border-radius: 10px;
				background: #FFFFFF;
				.current-cate {
					background-color: #f5f5f5;
				}
				.left-cate-item {
					height: 100upx;
					width: 100%;
					align-items: center;
					font-family: PingFang SC;
					font-weight: 500;
					color: #363135;
					line-height: 48upx;
					background: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
					.left-cate-name {
						flex: 1;
						box-sizing: border-box;
					}
				}
			}
			.classify-list {
				width: 65%;
				display: flex;
				flex-direction: column;
				background: #FFFFFF;
				border-radius: 10px;
				.classify-all {
					display: flex;
					padding: 10upx;
					.classify-img {
						image {
							width: 180upx;
							height: 180upx;
						}
					}
					.classify-message {
						margin-left: 20upx;
					}
					.hotel-price {
						display: flex;
						justify-content: space-between;
					}
				}
			}
		}

		.active {
			background: #CCCCCC;
		}
	}
</style>
