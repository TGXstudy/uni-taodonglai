<template>
	<view class="dd_detail">
		<view class="top">
			{{fh.status | statuss}}
		</view>
		<!-- 板块一 -->
		<view class="one">
			<view class="title">
				{{fh.store_name}}
			</view>
			<view class="content">
				<!-- 商品盒子 -->
				<view class="content_one" v-for="(ite,idx) in fh.goods_list" :key="idx">
					<view class="left">
						<image :src="ite.goods_img" mode=""></image>
						<view class="nav">
							<p>{{ite.goods_name}}</p>
							<span>x{{ite.num}}</span>
						</view>
					</view>
					<view class="right">
						￥{{ite.goods_price}}
					</view>
				</view>
				<view class="content_two">
					<p>菜品</p>
					<span>￥{{fh.goods_price}}</span>
				</view>
				<view class="content_two">
					<p>餐盒费</p>
					<span>￥{{fh.box_amount}}</span>
				</view>
				<view class="content_two">
					<p>配送费</p>
					<span>￥{{fh.delivery_fee}}</span>
				</view>
				<view class="orange">
					<p>优惠券</p>
					<span>-￥{{fh.discount_amount}}</span>
				</view>
				<view class="content_three">
					<span>已优惠￥{{fh.discount_amount}}</span>
					<p>合计￥{{fh.order_amount}}</p>
				</view>
			</view>
		</view>
		<!-- 板块2 -->
		<view class="two">
			<view class="title">
				配送信息
			</view>
			<view class="nav">
				<view class="left">
					配送地址
				</view>
				<view class="right">
					<p>{{fh.address.fullname}} {{fh.address.phone}}</p>
					<p>{{fh.address.address}}</p>
				</view>
			</view>
			<view class="nav" v-if="fh.status=='4' || fh.status=='6'">
				<view class="left">
					配送员
				</view>
				<view class="right">
					<p>{{fh.rider_name}} {{fh.rider_mobile}}</p>
				</view>
			</view>
		</view>
		<!-- 板块3 -->
		<view class="two">
			<view class="title">
				订单信息
			</view>
			<view class="nav">
				<view class="left">
					订单编号
				</view>
				<view class="right">
					<p>{{fh.order_sn}}</p>
				</view>
			</view>
			<view class="nav">
				<view class="left">
					订单时间
				</view>
				<view class="right">
					<p>{{fh.update_time}}</p>
				</view>
			</view>
			<view class="nav">
				<view class="left">
					备注
				</view>
				<view class="right">
					<p>{{fh.comment}}</p>
				</view>
			</view>
		</view>
		<!-- 板块四 -->
		<view class="two" v-if="fh.status=='6'">
			<view class="title">
				评价商家
			</view>
			<view class="nav1">
				{{fh.evaluation.comment}}
				<image v-for="(item,index) in fh.evaluation.pic" :key="index" :src="item" mode=""></image>
			</view>
			<view class="qt">
				<view class="left">
					评价商家
				</view>
				<view class="right">
					<uni-rate :value="fh.evaluation.shop_star" :readonly="true"/>
				</view>
			</view>
			<view class="qt">
				<view class="left">
					评价配送员
				</view>
				<view class="right">
					<uni-rate :value="fh.evaluation.rider_star" :readonly="true"/>
				</view>
			</view>
			
			<view class="nav">
				<view class="left">
					商家回复
				</view>
				<view class="right">
					<p>{{fh.evaluation.reply}}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				order_status: '', //订单状态
				address: {}, //收货地址信息
				sp_list: [], //商品列表
				fh: {}
			}
		},
		onLoad(options) {
			this.id = options.id;
			console.log(this.id);
			this.dd_detail()
		},
		methods: {
			dd_detail() {
				this.$api.take_orderDetail({
					id: this.id
				}).then(res => {
					// this.order_status = res.data.order_status;
					// this.address = res.data.address;
					// this.sp_list = res.data.child;
					 this.fh = res.data;
				})
			}
		},
		filters:{
			statuss(value){
				if (value == 1) {
					return '待付款'
				}
				else if (value== 2) {
					return '待备餐'
				}
				else if (value== 3) {
					return '待配送'
				}
				else if (value == 4) {
					return '配送中'
				}
				else if (value == 5) {
					return '待评价'
				}
				else if (value== 6) {
					return '已完成'
				}
				else if (value == 7) {
					return '已取消'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dd_detail {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: rgba(246, 246, 246, 1);
		padding: 10px;
		.nav1{
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			image {
				width: 200upx;
				height: 200upx;
				border-radius: 10upx;
				flex-wrap: wrap;
			}
		}
		.top {
			margin-top: 20upx;
			margin-bottom: 20upx;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}
		.one {
			width: 100%;
			background: #FFFFFF;
			box-shadow: 0px 2px 5px 0px rgba(239, 239, 239, 0.47);
			border-radius: 5px;
			padding: 10px;
			padding-bottom: 20px;
			.title {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				border-bottom: 1px solid #E5E5E5;
				padding-bottom: 10px;
			}
			.content {
				width: 100%;
				display: flex;
				flex-direction: column;
				.orange {
					width: 100%;
					display: flex;
					justify-content: space-between;
					padding-bottom: 10px;
					color: #FA5D09;
					border-bottom: 1px solid #E5E5E5;

					p {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
					}

					span {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
					}
				}

				.content_three {
					display: flex;
					align-items: center;
					width: 100%;
					display: flex;
					justify-content: flex-end;
					margin-top: 10px;

					span {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
						margin-right: 10px;
					}

					p {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}
				}

				.content_two {
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-bottom: 10px;

					p {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}

					span {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
				}

				.content_one {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 150upx;

					.left {
						display: flex;
						align-items: center;

						image {
							width: 120upx;
							height: 120upx;
							border-radius: 5upx;
						}

						.nav {
							margin-left: 20upx;

							p {
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #333333;
							}

							span {
								font-size: 22upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #999999;
							}
						}
					}

					.right {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}
				}
			}
		}
		.two {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			background: #FFFFFF;
			box-shadow: 0px 2upx 5upx 0px rgba(239, 239, 239, 0.47);
			border-radius: 5upx;
			margin-top: 10px;
			padding: 10px;

			.title {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				margin-top: 10px;
				margin-bottom: 10px;
			}

			.qt {
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-top: 10px;
				margin-bottom: 10px;
				font-size: 28upx;
			}
			
			.nav {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				margin-top: 10px;
				margin-bottom: 10px;
				font-size: 28upx;
				justify-content: space-between;
				image {
					width: 200upx;
					height: 200upx;
					border-radius: 10upx;
				}

				.left {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}

				.right {
					display: flex;
					flex-direction: column;

					p {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
				}
			}
		}

	}
</style>
