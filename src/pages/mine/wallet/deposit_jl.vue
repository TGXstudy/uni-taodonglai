<template>
	<view class="txjl">
		<view class="bottom">
			<view class="box" v-for="(item,index) in list" :key="index">
				<view class="left">
					<view class="box_top">{{item.status | statu}}</view>
					<view class="box_bottom">
						{{item.create_time}}
					</view>
				</view>
				<view class="right">
					￥{{item.amount}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				list:[],
				page:1
			}
		},
		onLoad(){
			this.jl()
		},
		methods:{
			jl(){
				this.$api.applyLog({
					page:this.page,
					page_size:100
				}).then(res=>{
					this.list=res.data.data;
					console.log(res)
				})
			}
		},
		filters:{
			statu(value){
				if(value=='1'){
					return '待审核'
				}else if(value=='2'){
					return '审核拒绝'
				}else if(value=='3'){
					return '审核通过，转款成功'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.txjl{
	width: 100%;
	padding: 10upx;
	.bottom {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 10px;
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