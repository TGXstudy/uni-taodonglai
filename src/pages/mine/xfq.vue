<template>
	<view class="xfq">
		<!-- 顶部 -->
		<view class="top">
			<view class="banxin">
				<view class="top_top">
					<text>可用消费券</text>
					<p><span>￥</span>{{xx.total_coupon}}</p>
				</view>
				<view class="top_bottom">
					<view class="left">
						<p><span>￥</span>{{xx.coupon}}</p>
						<text>可兑换消费券</text>
					</view>
					<view class="left">
						<p><span>￥</span>{{xx.lock_coupon}}</p>
						<text>冻结消费券</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="bottom">
			<view class="title">
				<view class="left">
					收支明细
				</view>
			</view>
			<view class="box"  v-for="(item,index) in list" :key="index">
				<view class="left">
					<view class="box_top">{{item.action | aciton}}</view>
					<view class="box_bottom">
						{{item.create_time}}
					</view>
				</view>
				<view class="right" >
					{{item.type==1?'收入':'支出'}}
					{{item.amount}}
				</view>
				<!-- <view class="right" v-if="item.bill_type=='out'">
					-10
				</view> -->
			</view>
		</view>
		<view class="bottom_bottom">
			<view class="left" @tap="$mUtils.goPage('xfq_dh')">
				兑换为钱包余额
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				xx:{},
				list:[],//列表
			}
		},
		onLoad(){
			this.xfq();
		},
		methods:{
			xfq(){
				this.$api.consumerCoupon({
					page:this.page,
					page_size:10
				}).then(res=>{
					this.xx=res.data;
					this.list=res.data.data;
					console.log(res)
				})
			}
		},
		filters:{
			aciton(value){
				if(value==1){
					return '购买商品'
				}else if(value==2){
					return '商品退款'
				}else if(value==3){
					return '拼中选择消费券'
				}else if(value==4){
					return '拼团失败'
				}else if(value==5){
					return '兑换余额'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.xfq {
		width: 100%;
		height: 100%;
		.bottom_bottom{
			width: 100%;
			position: fixed;
			bottom: 0;
			height: 120upx;
			display: flex;
			justify-content: space-around;
			.left{
				width: 90%;
				height: 88upx;
				background: linear-gradient(-90deg, #F58D0A, #FB5509);
				border: 1px solid #EEEEEE;
				border-radius: 44upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
			.right{
				width: 318upx;
				height: 88upx;
				border: 1px solid #FA5D09;
				border-radius: 44upx;
				background: linear-gradient(-90deg, #F58D0A, #FB5509);
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
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
			margin-bottom: 120upx;
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
		.top {
			width: 100%;
			height: 400upx;
			background: #2A2E49;
			padding-top: 20px;
			.banxin{
				width: 92%;
				height: 100%;
				margin: 0 auto;
				background-color: #DBBE8D;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.top_top{
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					text{
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #504124;
					}
					p{
						font-size: 38upx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #504124;
						span{
							font-size: 26upx;
						}
					}
				}
				.top_bottom{
					width: 100%;
					display: flex;
					justify-content:space-around;
					.left{
						text-align: center;
						p{
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 600;
							color: #504124;
						}
						text{
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #504124;
						}
						
					}
					
				}
			}
		}
	}
</style>
