<template>
	<view class="jfjl">
		<view class="dd_box" v-for="(item,index) in jl_list" :key="index">
			<view class="box_a">
				<view class="left">
					<p>变更时间：{{item.update_time}}</p>
					<view class="kdd" v-if="item.delivery">
						<p>{{item.delivery.company_name}}</p>
						<p>{{item.delivery.shipping_code}}</p>
					</view>
				</view>
				<view class="right">
					{{item.status=='1'?'待发货':'已发货'}}
				</view>
			</view>
			<view class="boxx" >
				<view class="box_b">
					<view class="left">
						<image :src="item.spu_img" mode=""></image>
					</view>
					<view class="right">
						<h3>{{item.spu_name}}</h3>
						<p>
							<span class="jr">{{item.score_price}} 积分</span>
							<span>×{{item.buy_num}}</span>
						</p>
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
				page:'1',
				jl_list:[],//记录列表
			}
		},
		onLoad(){
			this.jl()
		},
		methods:{
			jl(){
				this.$api.scoreOrder({
					page:this.page,
					page_size:'100'
				}).then(res=>{
					this.jl_list=res.data.data
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.jfjl{
	width: 100%;
	.dd_box {
		width: 95%;
		margin: 0 auto;
		margin-top: 10px;
		background-color: #FFFFFF;
		border-radius: 10px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	
		.box_a {
			display: flex;
			justify-content: space-between;
			width: 100%;
			align-items: center;
			padding-bottom: 10px;
			.sjtp_jt{
				margin-left: 10px;
			}
			.left {
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				font-size: 28upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.sjtp{
					width: 61upx;
					height: 61upx;
					margin-right: 10px;
				}
				p{
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					display: inline-block;
					image{
						width: 12upx;
						height: 22upx;
					}
				}
				view{
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					display: flex;
					flex-direction: column;
				}
			}
	
			.right {
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(250, 92, 9, 1);
				font-size: 30upx;
			}
		}
	
		.boxx {
			display: flex;
			flex-direction: column;
			.box_b {
				display: flex;
				.left {
					image {
						width: 205upx;
						height: 205upx;
					}
				}
				.right {
					width: 100%;
					display: flex;
					flex-direction: column;
					h3 {
						padding: 10px;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}
	
					p {
						padding: 10px;
						width: 98%;
						display: flex;
						justify-content: space-between;
	
						.jr {
							font-size: 30upx !important;
							color: rgba(246, 42, 42, 1) !important;
						}
						span {
							color: rgba(153, 153, 153, 1);
							font-size: 28upx;
						}
					}
				}
			}
		}
	}

}
</style>