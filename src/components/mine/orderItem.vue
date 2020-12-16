<template>
	<view class="my_order">
		<view class="dd_box">
			<view class="box_a">
				<view class="left">
					<img class="sjtp" :src="item.logo" alt="">
					<span>{{item.store_name}}
						<image class="sjtp_jt" :src="'/mine/jt.png' | imgUrl" mode=""></image>
					</span>
				</view>
				<view class="right">
					{{item|statuss}}
				</view>
			</view>
			<view class="boxx">
				<view class="box_b">
					<view class="left">
						<image :src="item.spu_img" mode=""></image>
					</view>
					<view class="right">
						<h3>{{item.spu_name}} {{item.sku_name}}</h3>
						<p>
							<span class="jr">￥{{item.goods_price}}</span>
							<span>×{{item.buy_num}}</span>
						</p>
					</view>
				</view>
				<view class="box_c">
					<view class="btn" @tap="dd_xq(item.order_id)">
						查看订单
					</view>
					<view class="btn" @click="th_open" v-if="item.order_state == 3">
						申请退货
					</view>
					<view class="btn qxdd" @tap="showAction('cancel',item.order_id)" v-if="item.order_state == 1">
						取消订单
					</view>
					<view class="btn qxdd" @tap="showAction('delete',item.order_id)" v-if="item.order_state == 5">
						删除订单
					</view>
					<view class="btn ljfk" @click="pj_open(item.order_id)" v-if="item.order_state == 4">
						立即评价
					</view>
					<view class="btn ljfk" @click="sh_open(item.order_id)" v-if="item.order_state == 3">
						确认收货
					</view>
					<view class="btn ljfk" @click="xz_jp(item.order_id)" v-if="item.order_state == 14">
						选择奖品
					</view>
					<view class="btn ljfk" v-if="item.order_state == 1" @click="lj_fk(item.order_id,item.goods_price, item.order_sn)">
						立即付款
					</view>
					<view class="btn btn" @click="ljth_open(item.order_id)" v-if=" item.order_state == 10 && item.is_refund_express==0">
						立即退货
					</view>
				</view>
			</view>
		</view>
		<!-- 立即退货弹窗 -->
		<uni-popup ref="ljth" class="ljth" :width="'90%'">
			<view class="kd_xx">
				<view class="title">
					<p>退货快递信息</p>
					<span>
						<image @click="ljth_close" :src="'mine/close.png' | imgUrl"></image>
					</span>
				</view>
				<view class="srk1">
					<p>快递公司</p>
					<input v-model="kd_gs" type="text" value="" placeholder="请输入快递公司" />
				</view>
				<view class="srk1">
					<p>快递单号</p>
					<input v-model="kd_dh" type="text" value="" placeholder="请输入快递单号" />
				</view>
				<view class="qr_btn">
					<button class="qx" @click="ljth_close()">取消</button>
					<button class="qr" @click="ljth_sure(item.order_id)">确认</button>
				</view>
			</view>
		</uni-popup>
		<!-- 确认收货弹窗 -->
		<uni-popup ref="sh" :width="'90%'">
			<view class="tc_qr">
				<view class="title">
					是否确认收货
				</view>
				<view class="qr_btn">
					<button class="qx" @click="sh_close()">取消</button>
					<button class="qr" @click="sh_qr(item.order_id)">确认</button>
				</view>
			</view>
		</uni-popup>
		<!-- 评价弹窗 -->
		<uni-popup ref="pj" :width="'90%'">
			<view class="pj">
				<view class="title">
					<p>评价</p>
					<span>
						<image @click="pj_close" :src="'mine/close.png' | imgUrl" mode=""></image>
					</span>
				</view>
				<view class="pjxj">
					评价星级
				</view>
				<view class="xx">
					<uni-rate :value="5" :max="5" :size="25" :margin="20" v-model="xx_value" @change="onChange" />
				</view>
				<textarea v-model="pj_nr" value="" placeholder="请输入评价内容..." />
				<view class="qr_btn">
					<button class="qx" @click="pj_close()">取消</button>
					<button class="qr" @click="pj_sure(item)">确认</button>
				</view>
			</view>
		</uni-popup>
		<!-- 申请退货弹窗 -->
		<uni-popup ref="th" :width="'90%'">
			<view class="th">
				<view class="title">
					<p>申请退货</p>
					<span>
						<image @click="th_close" :src="'mine/close.png' | imgUrl" mode=""></image>
					</span>
				</view>
				<textarea v-model="th_nr" value="" placeholder="请输入原因..." />
				<view class="tp_sc">
					<image v-if="imageList==''" @tap="chooseImage" :src=" '/takeout/image.png' | imgUrl" mode=""></image>
					<view class="imglist" v-for="(item,index) in imageList" :key="item">
						<image :src="item" mode=""></image>
						<image @tap="delImage(item,index)" class="close" :src="'/takeout/close.png' | imgUrl" mode=""></image>
					</view>
				</view>
				<view class="qr_btn">
					<button class="qx" @click="th_close()">取消</button>
					<button class="qr" @click="th_sure(item.order_id)">确认</button>
				</view>
			</view>
		</uni-popup>
		<!--竟中选商品-->
		<uni-popup ref="xzjp" :width="'88%'">
			<view class="jzsp">
				<view class="top">
					恭喜您，拼团成功并竞中 选择你的奖励
				</view>
				<view class="bottom">
					<view class="left" @tap='xfq(item.team_id)'>
						100%消费券
					</view>
					<view class="right" @tap="sp(item.team_id)">
						商品
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		props: {
			item: {
				type: Object
			}
		},
		data() {
			return {
				value: '',
				hh_nr: '', //换货内容
				kd_gs: '', //快递公司
				kd_dh: '', //快递单号
				th_nr: '', //退货内容
				pj_nr: '', //评价内容
				compressPath_hh: 'mine/tjtp.png', //上传图片
				imageList: [], //图片
				uImgList_th: [], //上传图片列表退货
				xx_value: 0, //打分
				currenStatus: 0, //分类
				orderId: 0,
				statusList: [
					'待支付', '待发货', '待收货', '待评价', '已完成', '已取消', '拼团中', '已退款', '退货', '换货'
				],
				maxImageAmount: 3
			}
		},
		filters: {
			statuss(value) {
				if (value.order_state == 1) {
					return '待支付'
				} else if (value.order_state == 2) {
					return '待发货'
				} else if (value.order_state == 3) {
					return '待收货'
				} else if (value.order_state == 4) {
					return '待评价'
				} else if (value.order_state == 5) {
					return '已完成'
				} else if (value.order_state == 6) {
					return '已取消'
				} else if (value.order_state == 7) {
					return '已删除'
				} else if (value.order_state == 8) {
					return '退款待审核'
				} else if (value.order_state == 9) {
					return '退款审核不通过'
				} else if (value.order_state == 10 && value.is_refund_express==1) {
					return ' 待退款'
				}
				 else if (value.order_state == 10 && value.is_refund_express==0) {
					return ' 审核通过'
				} else if (value.order_state == 11) {
					return '退款成功'
				} else if (value.order_state == 12) {
					return '拼团中'
				} else if (value.order_state == 13) {
					return '未拼中'
				} else if (value.order_state == 14) {
					return '竞中'
				} else if (value.order_state == 15) {
					return '用户选择消费券'
				} else if (value.order_state == 16) {
					return '拼团失败'
				}
			}
		},
		methods: {
			//選擇圖片
			chooseImage() {
				let _leftCount = this.maxImageAmount - this.imageList.length;
				// eslint-disable-next-line no-undef
				uni.chooseImage({
					count: _leftCount,
					success: (res) => {
						// eslint-disable-next-line no-undef
						uni.showLoading({
							mask: true,
							title: '上传图片...',
						})
						let tempFiles = res.tempFiles.splice(0, _leftCount);
						tempFiles.forEach(item => {
							console.log("itemitemitemitem", item)
							this.$mUtils.uploadFile(item).then(_res => {
								let filePath = _res.fileUrl;
								console.log("fghjkl", filePath)
								this.imageList.push(filePath);
							}).catch(err => {
								if (err.errMsg == "uploadFile:fail timeout") {
									this.$mUtils.toast("上传超时")
								} else {
									this.$mUtils.toast("上传失败，请稍后重试")
								}
							}).finally(() => {
								// eslint-disable-next-line no-undef
								uni.hideLoading();
							})
						})
					},
					fail(res) {
						console.log(res);
					}
				})
			},
			//选择奖品
			xz_jp() {
				this.$refs.xzjp.open()
			},
			//选择消费券
			xfq(e) {
				let that = this;
				this.$api.choseReward({
					id: e,
					chose: '2'
				}).then(res => {

					if (res.code == 1) {
						that.$mUtils.timeout(() => {
							this.$mRouter.back(0);
						})
					} else {
						that.$mUtils.toast(res.msg)
					}
				})
			},
			//选择商品
			sp(e) {
				let that = this;
				this.$api.choseReward({
					id: e,
					chose: '1'
				}).then(res => {
					if (res.code == 1) {
						that.$mUtils.timeout(() => {
							this.$mRouter.back(0);
						})
					} else {
						that.$mUtils.toast(res.msg)
					}
				})
			},
			//删除图片
			delImage(item, idx) {
				this.imageList.splice(idx, 1)
			},
			//立即付款
			lj_fk(a, b, c) {
				console.log(c)
				this.$mRouter.push({
					route: this.$mRoutesConfig.pay,
					query: {
						order_sn: c,
						pay_order_type: '2',
						isFromOrder: 1
					}
				})
			},
			showAction(actType, id) {
				this.orderId = id;
				let tipTxts = {
					cancel: '确认取消?',
					delete: '确认删除?',
				}
				let handler = {
					cancel: this.cancelOrder,
					delete: this.delorder,
				}
				// eslint-disable-next-line no-undef
				uni.showModal({
					title: '',
					content: tipTxts[actType],
					success(res) {
						if (res.confirm) {
							handler[actType]();
						}
					}
				})
			},
			//删除订单
			delorder() {
				this.$api.deleteOrder({
					order_id: this.orderId
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$emit("update")
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//取消订单
			cancelOrder() {
				this.$api.cancelOrder({
					order_id: this.orderId
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$emit("update")
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			// 打分
			onChange(e) {
				this.xx_value = Math.round(e.value);
				console.log(this.xx_value)
			},
			// 确认收货
			sh_open() {
				this.$refs.sh.open()
			},
			sh_qr(e) {
				console.log(e)
				this.$api.confirmOrder({
					order_id: e
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$refs.sh.close()
							this.$emit("update")
						})
					} else {
						this.$mUtils.toast(res.msg)
						this.$refs.sh.close()
					}
				})
			},
			sh_close() {
				this.$refs.sh.close()
			},
			// 评价
			//确定评价
			pj_sure(item) {
				console.log(item)
				if (!this.pj_nr) {
					this.$mUtils.toast('内容不能为空')
					return
				}
				this.$api.evaluateOrder({
					order_id: item.order_id,
					star: this.xx_value,
					content: this.pj_nr
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$refs.pj.close()
							this.$emit("update")
						})
					} else {
						this.$mUtils.toast(res.msg)
						this.$refs.pj.close()
					}
				})
			},
			pj_open() {
				this.$refs.pj.open()
			},
			pj_close() {
				this.$refs.pj.close()
			},
			// 立即退货
			ljth_open(e) {
				console.log(e)
				this.$refs.ljth.open()
			},
			ljth_close() {
				this.$refs.ljth.close()
			},
			//立即退货确认
			ljth_sure(e) {
				this.$api.refundExpress({
					order_id: e,
					express_company: this.kd_gs,
					express_code: this.kd_dh,
				}).then(res => {

					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$refs.ljth.close()
							this.$emit("update")
						})
					} else {
						this.$mUtils.toast(res.msg)
						this.$refs.ljth.close()
					}
				})
			},
			// 退货
			//退货确认
			th_sure(e) {
				this.$api.applyRefund({
					order_id: e,
					refund_reason: this.th_nr,
					refund_img: this.imageList
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$refs.th.close()
							this.$emit("update")
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			th_open() {
				this.$refs.th.open()
			},
			th_close() {
				this.uImgList_th = "";
				this.$refs.th.close()
			},
			dd_xq(e) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.dd_detail,
					query: {
						order_id: e
					}
				})
			},
			changeStatus(item) {
				this.currenStatus = item.status;
			}
		}
	}
</script>

<style lang="scss" scoped>
	textarea {
		width: 95%;
		background: rgba(246, 246, 246, 1);
		border: 1px solid rgba(238, 238, 238, 1);
		border-radius: 5px;
		margin-top: 10px;
		overflow: scroll;
	}
	.tp_sc {
		display: flex;
		margin-top: 10px;
		width: 95%;
		flex-wrap: wrap;

		.imglist {
			position: relative;

			.close {
				position: absolute;
				right: 5px;
				top: 5px;
				width: 30upx;
				height: 30upx;
				z-index: 9999;
			}
		}

		image {
			width: 200upx;
			height: 200upx;
		}
	}

	.zhtx-single {
		width: 80px !important;
		height: 80px !important;
	}

	.kd_xx {
		border-radius: 10px;
		width: 100%;
		margin: 0 auto;
		min-height: 400px;
		background-color: #ffffff;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

		.qr_btn {
			width: 100%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;

			.qx {
				border: 1px solid rgba(220, 220, 220, 1);
			}

			.qr {
				border: none;
				color: #fff;
				background: -o-linear-gradient(left, #ff5500, #ff7200);
				background: linear-gradient(90deg, #ff5500, #ff7200);
			}

			button {
				border-radius: 37px;
				width: 48%;
				height: 40px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.srk1 {
			width: 95%;
			margin: 0 auto;
			height: 88upx;
			background: rgba(246, 246, 246, 1);
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 5px;
			display: flex;
			align-items: center;

			p {
				margin-left: 10px;
				margin-right: 10px;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
		}

		.title {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);

			p {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-left: auto;
			}

			span {
				margin-left: auto;
				display: flex;
				align-self: flex-end;

				image {
					display: flex;
					align-self: flex-end;
					width: 20px;
					height: 20px;
				}
			}
		}
	}

	.th {
		border-radius: 10px;
		width: 606upx;
		margin: 0 auto;
		min-height: 400px;
		background-color: #ffffff;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

		.qr_btn {
			width: 100%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;

			.qx {
				border: 1px solid rgba(220, 220, 220, 1);
			}

			.qr {
				border: none;
				color: #fff;
				background: -o-linear-gradient(left, #ff5500, #ff7200);
				background: linear-gradient(90deg, #ff5500, #ff7200);
			}

			button {
				border-radius: 37px;
				width: 48%;
				height: 45px;
			}
		}

		input {
			width: 100%;
			height: 70px;
			background: rgba(246, 246, 246, 1);
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 5px;
		}

		.title {
			width: 100%;
			display: flex;

			p {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-left: auto;
			}

			span {
				margin-left: auto;
				display: flex;
				align-self: flex-end;

				image {
					display: flex;
					align-self: flex-end;
					width: 20px;
					height: 20px;
				}
			}
		}
	}

	.pj {
		border-radius: 10px;
		margin: 0 auto;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

		.qr_btn {
			width: 100%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			padding: 20px;

			.qx {
				border: 1px solid rgba(220, 220, 220, 1);
			}

			.qr {
				border: none;
				color: #fff;
				background: -o-linear-gradient(left, #ff5500, #ff7200);
				background: linear-gradient(90deg, #ff5500, #ff7200);
			}

			button {
				border-radius: 37px;
				width: 48%;
				height: 45px;
			}
		}

		

		.xx {
			align-self: flex-start;
			margin-left: 10px;
		}

		.pjxj {
			align-self: flex-start;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			padding: 20px;
		}

		.title {
			width: 100%;
			display: flex;
			padding: 20px;

			p {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-left: auto;
			}

			span {
				margin-left: auto;
				display: flex;
				align-self: flex-end;

				image {
					display: flex;
					align-self: flex-end;
					width: 20px;
					height: 20px;
				}
			}
		}
	}

	.tc_qr {
		border-radius: 10px;
		width: 606upx;
		margin: 0 auto;
		height: 150px;
		background-color: #ffffff;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
		}

		.qr_btn {
			width: 100%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;

			.qx {
				border: 1px solid rgba(220, 220, 220, 1);
			}

			.qr {
				border: none;
				color: #fff;
				background: -o-linear-gradient(left, #ff5500, #ff7200);
				background: linear-gradient(90deg, #ff5500, #ff7200);
			}

			button {
				border-radius: 37px;
				width: 48%;
				height: 45px;
			}
		}
	}

	.my_order {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);

		.jzsp {
			width: 100%;
			height: 350upx;
			background: #ffffff;
			border-radius: 10upx;
			padding: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;

			.top {
				width: 63%;
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
				text-align: center;
			}

			.bottom {
				width: 80%;
				display: flex;
				justify-content: space-between;

				.left {
					width: 240upx;
					height: 80upx;
					background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
					border: 1px solid #fa6009;
					border-radius: 10upx;
					font-size: 33upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #ffffff;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.right {
					width: 220upx;
					height: 80upx;
					background: #fcd9b5;
					border: 1px solid #fa6009;
					border-radius: 10upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #fa5c09;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}

		.dd_box {
			width: 95%;
			margin: 0 auto;
			margin-top: 10px;
			background-color: #ffffff;
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
				margin-bottom: 20upx;
				.sjtp_jt {
					margin-left: 10px;
				}

				.left {
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					font-size: 28upx;
					display: flex;
					align-items: center;

					.sjtp {
						width: 61upx;
						height: 61upx;
						margin-right: 10px;
					}

					span {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						display: inline-block;

						image {
							width: 12upx;
							height: 22upx;
						}
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

				.box_c {
					width: 100%;
					display: flex;
					justify-content: flex-end;
					align-items: center;

					.btn {
						width: 23%;
						height: 60upx;
						border: 1px solid rgba(229, 229, 229, 1);
						border-radius: 31px;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						margin-left: 5px;
					}

					.qxdd {
						color: rgba(153, 153, 153, 1);
					}

					.ljfk {
						color: #ffffff;
						background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
					}
				}

				.box_b {
					display: flex;
					margin-bottom: 20px;

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

		.top {
			background-color: #ffffff;

			.title {
				color: #333333;
			}

			width: 100%;
			padding: 10px;
			height: 50px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
