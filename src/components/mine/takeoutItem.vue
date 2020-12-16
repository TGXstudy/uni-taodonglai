<template>
	<view class="my_order">
		<view class="dd_box">
			<view class="box_a">
				<view class="left">
					<span>订单编号：{{item.order_sn}}</span>
				</view>
				<view class="right">
					{{item.status | statuss}}
				</view>
			</view>
			<view class="boxx" >
				<view class="box_b">
					<view class="left">
						<image :src="item.store_photos" mode=""></image>
					</view>
					<view class="right">
						<h3>{{item.store_name}}</h3>
						<p>
							<span class="jr">共计￥{{item.order_amount}}</span>
						</p>
					</view>
				</view>
				<view class="box_c">
					<view class="btn" @tap="dd_xq(item.id)">
						查看订单
					</view>
					<view class="btn" v-if="item.status=='4'" @tap="tel_phone(item.rider_mobile)" >
						联系配送员
					</view>
					<view class="btn qxdd" v-if="item.status=='1'" @tap="showAction('cancel',item.id)" >
						取消订单
					</view>
					<view class="btn qxdd" @tap="showAction('delete',item.id)" v-if="item.status=='6'">
						删除订单
					</view>
					<view class="btn ljfk" @click="pj_open()" v-if="item.status=='5'">
						立即评价
					</view>
					<view class="btn ljfk"  v-if="item.status=='1'" @click="lj_fk(item.id,item.order_amount,item.order_sn)">
						立即付款
					</view>
				</view>
			</view>
		</view>
		<!-- 评价弹窗 -->
		<uni-popup ref="pj" :width="'90%'">
			<view class="pj">
				<view class="title">
					<p>商家评价</p>
					<span>
						<image @click="pj_close" :src="'/mine/close.png' | imgUrl" mode=""></image>
					</span>
				</view>
				<input v-model="pj_nr" type="text" value="" placeholder="请输入评价内容..." />
				<!-- 图片上传 -->
				<view class="tpsc">
					<image v-if="imageList==''" @tap="chooseImage" :src=" '/takeout/image.png' | imgUrl" mode=""></image>
					<view class="imglist" v-for="(item,index) in imageList" :key="item">
						<image  :src="item" mode=""></image>
						<image @tap="delImage(item,index)" class="close" :src="'/takeout/close.png' | imgUrl" mode=""></image>
					</view>
				</view>
				<view class="pjxj">
					给商家打分
				</view>
				<view class="xx">
					<uni-rate :value="5" :max="5" :size="25" :margin="20" v-model="value" @change="onChange" />
				</view>
				<view class="pjxj">
					配送员打分
				</view>
				<view class="xx">
					<uni-rate :value="5" :max="5" :size="25" :margin="20" v-model="value2" @change="onChange2" />
				</view>
				<view class="qr_btn">
					<button class="qx" @click="pj_close()">取消</button>
					<button class="qr" @click="pj_sure(item.id)">确认</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uploadImg from "@/components/UploadImg.vue"
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			uploadImg
		},
		props: {
			item: {
				type: Object
			}
		},
		data() {
			return {
				value:'',
				value2:'',
				pj_nr: '', //评价内容
				imageList:[], //图片
				maxImageAmount:3, //最大上傳圖片張數
				xx_value:0, //打分
				currenStatus: 0, //分类
				orderId: 0,
				statusList: [],
				imgNum:0,
				imgNum2:0
			}
		},
		filters: {
			statuss(value) {
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
		},
		methods: {
			//联系骑手
			tel_phone(e){
				uni.makePhoneCall({
				    phoneNumber:e, //仅为示例
				});
			},
			//立即付款
			lj_fk(a, b,c) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.pay,
					query: {
						orderId: a,
						totalPrice: b,
						p_order_sn: c
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
			//删除图片
			delImage(item,idx){
				this.imageList.splice(idx,1)
			},
			//選擇圖片
			chooseImage(){
				let _leftCount= this.maxImageAmount - this.imageList.length;
				uni.chooseImage({
					count:_leftCount,
					success:(res)=> {
						uni.showLoading({
						    mask: true,
						    title: '上传图片...',
						})
						let tempFiles=res.tempFiles.splice(0,_leftCount);
						tempFiles.forEach((item,index)=> {
							console.log("itemitemitemitem",item)
							this.$mUtils.uploadFile(item).then(_res=> {
								let filePath =  _res.fileUrl;
								console.log("fghjkl",filePath)
								this.imageList.push(filePath);
							}).catch(err=> {
								if(err.errMsg == "uploadFile:fail timeout") {
									this.$mUtils.toast("上传超时")
								}else {
									this.$mUtils.toast("上传失败，请稍后重试")
								}
							}).finally(()=> {
								uni.hideLoading();
							})
						})
					},
					fail(res) {
						console.log(res);
					}
				})
			},
			//删除订单
			delorder() {
				this.$api.take_delOrder({
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
				this.$api.take_cancelOrder({
					order_id: this.orderId
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$emit("update")
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			// 打分
			onChange(e) {
				this.xx_value = Math.round(e.value);
				console.log(this.xx_value);
			},
			onChange2(e) {
				this.xx_value2 = Math.round(e.value);
				console.log(this.xx_value2);
			},
			// 评价
			//确定评价
			pj_sure(item) {
				console.log(item)
				this.$api.evaluate({
					order_id:item,
					comment:this.pj_nr, //评价内容
					rider_star:this.value2,
					shop_star: this.value,
					pic:this.imageList,
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.$refs.pj.close()
							// this.$emit("update")
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
			pj_close(e) {
				this.$refs.pj.close()
			},
			dd_xq(e) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.takeout_detail,
					query: {
						id: e
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
	.tp_sc {
		image {
			width: 60px !important;
			height: 60px !important;
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
		background-color: #FFFFFF;
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

			input {}
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
		background-color: #FFFFFF;
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
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		.tpsc{
			display: flex;
			margin-top: 10px;
			width: 95%;
			flex-wrap: wrap;
			.imglist{
				position: relative;
				.close{
					position: absolute;
					right: 5px;
					top: 5px;
					width: 30upx;
					height: 30upx;
					z-index: 9999;
				}
			}
			image{
				width: 200upx;
				height: 200upx;
			}
		}
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
		input {
			width: 95%;
			height: 70px;
			background: rgba(246, 246, 246, 1);
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 5px;
			margin-top: 10px;
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
		background-color: #FFFFFF;
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
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);
		.dd_box {
			width: 95%;
			margin: 0 auto;
			margin-top: 10px;
			background-color: #FFFFFF;
			border-radius: 10px;
			height: 230px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.box_a {
				display: flex;
				justify-content: space-between;
				width: 100%;
				.sjtp_jt{
					margin-left: 10px;
				}
				.left {
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					font-size: 28upx;
					display: flex;
					align-items: center;
					width: 60%;
					.sjtp{
						width: 61upx;
						height: 61upx;
						margin-right: 10px;
					}
					span{
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
						color: #FFFFFF;
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
			background-color: #FFFFFF;

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
