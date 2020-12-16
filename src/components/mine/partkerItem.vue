<template>
	<view class="nav">
		<view class="bottom"  @tap="xq(item.id)">
			<view class="left">
				<image :src="item.goods_img" mode=""></image>
			</view>
			<view class="right">
				<view class="one">{{item.goods_name}}</view>
				<!-- 拼团中 -->
				<view class="two" v-if="item.status=='1'">
					<p>还差<span class="ft_orange">{{item.last_num}}人</span>拼成</p>
					<span class="timer">剩余<count-down class="endTime"  :endTime="item.end_time | fitertime"></count-down></span>
					<button class="btn orange">拼团中</button>
				</view>
				<!-- 竟中 -->
				<view class="two" v-if="item.status=='2'">
					<p>成团时间</p>
					<span class="timer">{{item.update_time}}</span>
					<button class="btn orange">竟中</button>
				</view>
				<!-- 未竟中 -->
				<view class="two" v-if="item.status=='3'">
					<p>成团时间</p>
					<span class="timer">{{item.update_time}}</span>
					<button class="btn white">未竟中</button>
				</view>
				<!-- 未竟中 -->
				<view class="two" v-if="item.status=='4'">
					<p>失败时间</p>
					<span class="timer">{{item.update_time}}</span>
					<button class="btn white">拼团失败</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import countDown from "../../components/goodsdetails/CountDown"
	export default {
		components: {
			countDown
		},
		props: {
			item: {
				type: Object
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			xq(e){
				this.$mRouter.push({
					route: this.$mRoutesConfig.group_detail,
					query:{
						id:e
					}
				})
			}
		},
		filters:{
			fitertime(value){
				var date = new Date(value);
				var time1 = date.getTime();
				return time1
			}
		}
	}
</script>

<style lang="scss" scoped>
.nav{
	.bottom {
		width: 100%;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid rgba(229, 229, 229, 1);
		padding-top: 10px;
		padding-bottom: 20px;
		.left {
			width: 40%;
			image {
				width: 100%;
				height: 100%;
				border-radius: 10upx;
			}
		}
	
		.right {
			width: 55%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.one {
				font-size: 35upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}
	
			.two {
				display: flex;
				flex-direction: column;
				margin-top: 10px;
				display: flex;
				p{
					
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				.btn{
					margin: 0;
					width: 180upx;
					height: 70upx;
					border-radius: 10upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 26upx;
				}
				.white{	
					color: #FFFFFF;
					background: #CCCCCC;
				}
				.orange{
				color: #FFFFFF;	
				background: linear-gradient(-90deg, #F58D0A, #FB5509);
				}
				.timer {
					display: flex;
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-bottom: 20upx;
				}
			}
			
		}
	}
}
</style>