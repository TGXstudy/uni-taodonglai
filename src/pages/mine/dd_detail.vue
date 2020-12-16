<template>
	<view class="dd_detail">
		<view class="top">
			<p v-if="fh.order_state==1">待付款</p>
			<p v-else-if="fh.order_state==2">待发货</p>
			<p v-else-if="fh.order_state==3">待收货</p>
			<p v-else-if="fh.order_state==4">待评价</p>
			<p v-else-if="fh.order_state==5 || fh.order_state==13 || fh.order_state==14 || fh.order_state==15 || fh.order_state==16">已完成</p>
			<p v-else-if="fh.order_state==6">已取消</p>
			<p v-else-if="fh.order_state==7">已删除</p>
			<p v-else-if="fh.order_state==8">退款待审核</p>
			<p v-else-if="fh.order_state==9">退款审核不通过</p>
			<p v-else-if="fh.order_state==10">审核通过</p>
			<p v-else-if="fh.order_state==11">退款成功</p>
			<p v-else-if="fh.order_state==12">拼团中</p>
			<image :src="'/mine/xq_banner.png' | imgUrl"></image>
		</view>
		<!-- 信息 -->
		<view class="detail_b">
			<image class="dw" :src="'/mine/dw.png' | imgUrl"></image>
			<view class="nav">
				<view class="one">
					<h3>{{fh.receiver_info.fullname}}</h3>
					<p>{{fh.receiver_info.phone}}</p>
				</view>
				<view class="two">
					<span>{{fh.receiver_info.province}}</span>
					<span>{{fh.receiver_info.city}}</span>
					<span>{{fh.receiver_info.county}} {{fh.receiver_info.address}}</span>
				</view>
			</view>
			<image class="jt" :src="'/mine/jt.png' | imgUrl" mode=""></image>
		</view>
		<!-- 商品信息 -->
		<view class="box_b" >
			<view class="topb">
				<image :src="fh.logo" mode=""></image>
				<p>{{fh.store_name}}</p>
			</view>
			<view class="topa">
				<view class="left">
					<image :src="fh.spu_img" mode=""></image>
				</view>
				<view class="right">
					<h3>{{fh.spu_name}}</h3>
					<p>
						<span class="jr">￥{{fh.goods_price}}</span>
						<span>×{{fh.buy_num}}</span>
					</p>
				</view>
			</view>
		</view>
		<!-- 价格 -->
		<view class="detail_c">
			<view class="one">
				价格明细
			</view>
			<view class="two">
				<view class="left">
					商品金额
				</view>
				<view class="right">
					¥ {{fh.goods_amount}}
				</view>
			</view>
			<view class="three">
				<view class="left">
					运费
				</view>
				<view class="right">
					¥ {{fh.shipping_fee}}
				</view>
			</view>
			<view class="four">
				<view class="left">
					订单金额
				</view>
				<view class="right">
					¥ {{fh.order_amount}}
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="detail_d">
			<view class="one">
				订单信息
			</view>
			<view class="two">
				<view class="left">
					订单编号
				</view>
				<view class="right">
					{{fh.order_sn}}
				</view>
			</view>
			<view class="two">
				<view class="left">
					订单变更时间
				</view>
				<view class="right">
					{{fh.update_time}}
				</view>
			</view>
		</view>
		<!-- 快递信息 -->
		<view class="detail_d" v-if="fh.delivery_info">
			<view class="one">
				快递信息
			</view>
			<view class="two">
				<view class="left">
					快递公司
				</view>
				<view class="right" >
					{{fh.delivery_info.company_name}}
				</view>
			</view>
			<view class="two">
				<view class="left">
					快递单号
				</view>
				<view class="right" >
					{{fh.delivery_info.shipping_code}}
				</view>
			</view>
		</view>
		
		<!-- 拼团订单 -->
		<view class="detail_g" v-if="fh.order_state==12">
			<view class="one">
				拼团订单
			</view>
			<p>拼团中</p>
		</view>
		<view class="detail_g" v-if="fh.order_state==15">
			<view class="one">
				拼团订单
			</view>
			<p>竞中并选择消费券</p>
		</view>
		<view class="detail_g" v-if="fh.order_state==13">
			<view class="one">
				拼团订单
			</view>
			<p>未竞中款原路返回</p>
		</view>
		<view class="detail_g" v-if="fh.order_state==16">
			<view class="one">
				拼团订单
			</view>
			<p>拼团失败，订单取消</p>
		</view>
		<!-- two -->
		<view class="detail_f" v-if="fh.order_state==5" >
			<view class="one">
				评价内容
			</view>
			<p>{{fh.comment}}</p>
		</view>
		<!-- 退货信息 -->
		<view class="detail_e" v-if="fh.order_state==9 || fh.order_state==10 || fh.order_state==11 || fh.order_state==8">
			<view class="one">
				退货原因
			</view>
			<view class="two">
				<p>{{fh.refund_reason}}</p>
				<view class="img">
					<image  v-for="(item,index) in fh.refund_img" :key="index" :src="item" ></image>
				</view>
			</view>
			<!-- 审核拒绝 -->
			<view class="jj" v-if="fh.order_state==9">
				<view class="one">
					拒绝原因
				</view>
				<p>{{fh.refuse_reason}}</p>
			</view>
		</view>
		<!-- 付款 -->
		<!-- <view class="fkbt" v-if="fh.order_state==1">
			立即付款
		</view> -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				order_id:'',
				order_status:'', //订单状态
				address:{}, //收货地址信息
				sp_list:[], //商品列表
				fh:{}
			}
		},
		onLoad(options) {
			this.order_id = options.order_id;
			console.log(this.order_id);
			this.dd_detail()
		},
		methods: {
			dd_detail() {
				this.$api.orderDetail({
					order_id: this.order_id
				}).then(res => {
					this.order_status = res.data.order_status;
					this.address = res.data.address;
					this.sp_list = res.data.child;
					this.fh = res.data;
				})
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
		.fkbt{
			margin-top: 10px;
			width: 100%;
			height: 98upx;
			background: linear-gradient(-90deg, #F58D0A, #FB5509);
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		.box_b {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			width: 95%;
			margin: 0 auto;
			margin-top: 10px;
			.topb{
				padding: 10px;
				display: flex;
				align-items: center;
				p{
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					margin-left: 10px;
				}
				image{
					width: 60upx;
					height: 60upx;
					border-radius: 10upx;
				}
			}
			.topa{
				display: flex;
				background-color: #fff;
				padding: 10px;
				.left {
					image {
						width: 205upx;
						height: 205upx;
					}
				}
				.right {
					display: flex;
					flex-direction: column;
					width: 100%;
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
		.detail_f {
			width: 95%;
			background-color: #FFFFFF;
			margin: 0 auto;
			border-radius: 10px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-top: 10px;
			.one {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			p {
				margin-top: 10px;
				margin-bottom: 10px;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}
		}
		.detail_g{
			width: 95%;
			background-color: #FFFFFF;
			margin: 0 auto;
			border-radius: 10px;
			padding: 10px;
			display: flex;
			justify-content: space-between;
			margin-top: 10px;
		}
		.detail_e {
			width: 95%;
			background-color: #FFFFFF;
			margin: 0 auto;
			margin-top: 10px;
			margin-bottom: 10px;
			border-radius: 10px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;


			.hh_dsh {
				color: #999999;
			}

			.one {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			.two {
				display: flex;
				flex-direction: column;

				p {
					color: #999999;
					margin-bottom: 10px;
				}

				.img {
					display: flex;
					flex-wrap: wrap;
					margin-right: 10px;

					image {
						width: 205upx;
						height: 205upx;
						margin-right: 5px;
					}
				}
			}

			.jj {
				display: flex;
				flex-direction: column;
				height: 50px;
				justify-content: space-around;
				margin-top: 10px;

				.one {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				p {
					margin-top: 10px;
					margin-bottom: 10px;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}
			}

			.qt {
				display: flex;
				flex-direction: column;
				height: 150px;
				justify-content: space-around;

				.three {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					color: #333333;
				}

				.four {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}

				.five {
					width: 100%;
					display: flex;
					justify-content: space-between;

					.left {
						font-size: 36upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}

					.right {
						font-size: 30upx;
						font-family: DIN;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}
				}

				.six {
					width: 100%;
					display: flex;
					justify-content: space-between;

					.left {
						font-size: 36upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}

					.right {
						font-size: 30upx;
						font-family: DIN;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}
				}
			}

		}

		.detail_d {
			width: 95%;
			background-color: #FFFFFF;
			margin: 0 auto;
			margin-top: 10px;
			height: 150px;
			border-radius: 10px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.one {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}

			.two {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.right {
					font-size: 30upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}
			}


		}

		.detail_c {
			width: 95%;
			background-color: #FFFFFF;
			margin: 0 auto;
			margin-top: 10px;
			height: 200px;
			border-radius: 10px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.one {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}

			.two {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
				.right {
					font-size: 30upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}
			}

			.three {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.right {
					font-size: 30upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}
			}
			.four {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.right {
					font-size: 30upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(243, 38, 45, 1);
				}
			}
		}
		.detail_b {
			width: 95%;
			background-color: #FFFFFF;
			margin: 0 auto;
			margin-top: 10px;
			height: 100px;
			padding: 10px;
			border-radius: 10px;
			justify-content: space-around;
			align-items: center;
			display: flex;
			.dw {
				width: 40px;
				height: 40px;
			}
			.jt {
				width: 12px;
				height: 22px;
			}
			.nav {
				display: flex;
				flex-direction: column;

				.one {
					display: flex;
					align-items: center;

					h3 {
						font-size: 36upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					p {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}
				}
				.two {
					span {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
					}
				}
			}
		}
		.top {
			width: 100%;
			height: 160upx;
			display: flex;
			flex-direction: column;
			position: relative;

			p {
				padding-left: 50upx;
				position: absolute;
				top: 50upx;
				left: 0;
				z-index: 99;
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}
			image {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 160upx;
			}
		}
	}
</style>
