<template>
	<view class="xxlb">
		<view class="box" v-for="(item,index) in ggxq_list" :key="index" @tap="tc(item)">
			<view class="top">
				{{item.title}} 
			</view>
			<!-- <view class="nav">
				{{item.content}}
			</view> -->
			<view class="bottom">
				{{item.create_time}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				ggxq_list:[]
			}
		},
		onLoad(){
			this.get_notice()
		},
		methods:{
			//获取到公告列表 没完成暂时
			get_notice() {
				this.$api
					.notice({
						page: 1,
						pageSize: 9999,
					})
					.then((res) => {
						console.log(res)
							this.ggxq_list = res.data;
					});
			},
			tc(item){
				this.$mRouter.push({
				  route: this.$mRoutesConfig.detailsnotice,
				  query:{content:item.content}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.xxlb{
	width: 100%;
	padding: 10px;
	background: #F6F6F6;
	.box{
		width: 100%;
		height: 180upx;
		background: #FFFFFF;
		border-radius: 10upx;
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-bottom: 10px;
		.top{
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}
		.nav{
			
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #666666;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
		.bottom{
			
			font-size: 22upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}
	}
}
</style>