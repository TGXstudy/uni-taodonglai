<template>
	<view class="dd_detail">
		<!-- 商品信息 -->
		<view class="box_b">
			<view class="topa">
				<view class="left">
					<image :src="xx.goods_img" mode=""></image>
				</view>
				<view class="right">
					<h3>{{xx.goods_name}}</h3>
					<p>
						<span class="jr">￥{{xx.goods_price}}</span>
						<span>×{{xx.group_num}}</span>
					</p>
				</view>
			</view>
		</view>
		<!-- 拼团信息 -->
		<view class="detail_c">
			<!-- 正在拼团 -->
			<view class="pt" v-if="xx.status=='1'">
				<view class="pt_a">
					正在拼团
				</view>
				<view class="pt_b">
					还差<span>{{xx.last_num}}</span>人拼团成功
				</view>
				<view class="pt_c">
					<p>剩余时间</p>
					<view class="timer">
						<view class="box">
							{{leftTime.hour}}
						</view>
						<view class="dd">
							:
						</view>
						<view class="box">
							{{leftTime.min}}
						</view>
						<view class="dd">
							:
						</view>
						<view class="box">
							{{leftTime.secd}}
						</view>
					</view>
				</view>
				<button class="qr" open-type="share" @click="qr()">邀请好友</button>
			</view>
			<!-- 未竟中 -->
			<view class="pt" v-if="xx.status=='2'&&xx.is_win=='3'">
				<view class="pt_a">
					未竞中
				</view>
				<view class="pt_b">
					恭喜你，拼团成功
				</view>
				<view class="pt_d">
					<p>您获得奖励</p>
					<view class="bottom">
						<view class="box">
							现金{{xx.red_packet}}元
						</view>
					</view>
				</view>
			</view>
			<!-- 竟中 -->
			<view class="pt" v-if="xx.status=='2'&&xx.is_win=='2'">
				<view class="pt_a">
					竞中
				</view>
				<view class="pt_b">
					恭喜你，拼团成功
				</view>
				<view class="pt_d">
					<p>您获得奖励</p>
					<view class="bottom">
						<view class="box">
							现金{{xx.red_packet}}元
						</view>
						<view class="box" v-if="xx.is_win=='2'">
							贡献值{{xx.contribution_value}}
						</view>
						<view class="box" v-if="xx.is_chose=='2'">
							消费券{{xx.goods_price}}
						</view>
						<view class="box" v-if="xx.is_chose=='1'">
							商品
						</view>
					</view>
				</view>
			</view>
			<!-- 拼团失败 -->
			<view class="pt" v-if="xx.status=='3'">
				<view class="pt_a">
					拼团失败
				</view>
				<view class="pt_b">
					不好意思，你的拼团失败了
				</view>
				<view class="pt_e">
					还差{{xx.last_num}}人拼团成功
				</view>
			</view>
		</view>
		<!-- 拼团用户 -->
		<view class="detail_d">
			<view class="time">
				开团时间：{{xx.create_time}}
			</view>
			<view class="time" v-if="xx.status=='2' || xx.status=='3'">
				成团时间：{{xx.update_time}}
			</view>
			<view class="title">
				拼团用户：（{{xx.number}}人）
			</view>
			<view class="ptnav">
				<view class="box" v-for="(ite,idx) in xx.list" :key="idx">
					<image :src="ite.member_avatar" alt="">
						<p>{{ite.member_nickname}}</p>
				</view>
			</view>
		</view>
		<!--竟中选商品-->
		<uni-popup ref="hh" :width="'88%'">
			<view class="jzsp">
				<view class="top">
					恭喜您，拼团成功并竞中 选择你的奖励
				</view>
				<view class="bottom">
					<view class="left" @tap='xfq()'>
						100%消费券
					</view>
					<view class="right" @tap="sp()">
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
			uniPopup,
		},
		data() {
			return {
				leftTime: {
					day: 0,
					hour: 0,
					min: 0,
					secd: 0
				},
				last_time: '', //拼团剩余时间
				id: '',
				tdid: '', //团队id
				xx: {}
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.dd_detail()
		},
		onShareAppMessage(e) {
			console.log("分享", e)
			if (e.from == 'button') {
				let info = this.xx;
				let path = `/pages/groupbooking/groupdetails?spu_id=${info.spu_id}}`
				console.log(path)
				return {
					title: info.spu_name, //	String	是	分享标题	
					path: path, //	String	是	页面 path ，必须是以 / 开头的完整路径。	QQ小程序不支持
					imageUrl: info.thumb,
				}
			}
		},
		onUnload() {
			console.log("onUnload------------")
			clearInterval(this.timeId);
			clearInterval(this.timeer);
		},
		beforeDestroy() {
			console.log('组件销毁');
		clearInterval(this.timeer);
		},
		methods: {
			//分享
			qr() {
				// #ifdef H5
				this.$mUtils.toast('请通过浏览器分享')
				// #endif
			},
			//选择消费券
			xfq() {
				this.$api.choseReward({
					id: this.tdid,
					chose: '2'
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.timeout(() => {
							this.$mRouter.back(0);
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//选择商品
			sp() {
				this.$api.choseReward({
					id: this.tdid,
					chose: '1'
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.timeout(() => {
							this.$mRouter.back(0);
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			dd_detail() {
				this.$api.groupDetail({
					id: this.id
				}).then(res => {
					console.log(res)
					this.xx = res.data;
					this.tdid = res.data.id;
					this.last_time = res.data.last_time;
					this.end_time = res.data.end_time;
					var date = new Date(this.end_time);
					var time1 = date.getTime();
					console.log(time1, 'time1');
					if(this.xx.status == '1'){
						this.initCountDown(time1); //拼团倒计时
					}
					if (this.xx.is_chose == '0' && this.xx.status == '2' && this.xx.is_win == '2') { //拼团竟中选择奖品
						this.$refs.hh.open()
					}
				})
			},
			//倒计时
			initCountDown(endTime) {
				console.log("endTime-----", endTime)
				this.timeId = setInterval(() => {
					var nowTime = new Date();
					var lefttime = endTime - nowTime.getTime(); //距离结束时间的毫秒数
					if (lefttime < 0) {
						clearInterval(this.timeId)
						this.timeer = setInterval(() => {
							this.dd_detail(); //获取拼团详情
						}, 2000)
						return;
					}
					var leftd = Math.floor(((lefttime - 0) / (1000 * 60 * 60 * 24))), //计算天数
						lefth = Math.floor(((lefttime - 0) / (1000 * 60 * 60))), //计算小时数
						leftm = Math.floor(((lefttime - 0) / (1000 * 60)) % 60), //计算分钟数
						lefts = Math.floor(((lefttime - 0) / 1000) % 60); //计算秒数
					// console.log('开始倒计时---------------lefts', lefts,lefttime)
					this.leftTime = {
						day: leftd < 10 ? '0' + leftd : leftd,
						hour: lefth < 10 ? '0' + lefth : lefth,
						min: leftm < 10 ? '0' + leftm : leftm,
						secd: lefts < 10 ? '0' + lefts : lefts
					}
				}, 1000)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.dd_detail {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background: linear-gradient(180deg, rgba(255, 85, 0, 1), rgba(255, 255, 255, 1));

		.jzsp {
			width: 100%;
			height: 350upx;
			background: #FFFFFF;
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
					border: 1px solid #FA6009;
					border-radius: 10upx;
					font-size: 33upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.right {
					width: 220upx;
					height: 80upx;
					background: #FCD9B5;
					border: 1px solid #FA6009;
					border-radius: 10upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FA5C09;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}

		.box_b {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			width: 95%;
			margin: 0 auto;
			margin-top: 30px;
			border-radius: 10px;

			.topa {
				display: flex;
				background-color: #fff;
				padding: 10px;
				border-radius: 10px;
				height: 292upx;

				.left {
					image {
						width: 205upx;
						height: 205upx;
					}
				}

				.right {
					display: flex;
					flex-direction: column;

					h3 {
						padding: 10px;
						font-size: 32upx;
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

		.detail_c {
			width: 95%;
			background-color: #FFFFFF;
			margin: 0 auto;
			margin-top: 10px;
			background: #FFFFFF;
			border: 2px solid #FFFFFF;
			border-radius: 10px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.pt {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.qr {
					margin-top: 30px;
					width: 95%;
					margin: 0 auto;
					margin-top: 20px;
					height: 50px;
					display: flex;
					justify-content: center;
					align-items: center;
					background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
					border: 1px solid rgba(238, 238, 238, 1);
					border-radius: 44px;
					outline: none;
					color: #fff;
				}

				.pt_a {
					font-size: 48upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FF5900;
					margin-bottom: 10px;
				}

				.pt_b {
					span {
						color: #FF5900;
					}

					font-size: 36upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.pt_d {
					width: 100%;
					margin-top: 30px;

					p {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						margin-bottom: 10px;
					}

					.bottom {

						display: flex;

						.box {
							margin-left: 10px;
							display: flex;
							justify-content: center;
							align-items: center;
							width: 199upx;
							height: 81upx;
							background: #FCD9B5;
							border: 1px solid #FA6009;
							border-radius: 10upx;
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FA5E09;
						}
					}

				}

				.pt_e {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-top: 10px;
				}

				.pt_c {
					display: flex;
					width: 175px;
					height: 100upx;
					align-items: center;
					justify-content: space-around;

					.timer {
						width: 200upx;
						display: flex;
						justify-content: space-around;
						align-items: center;

						.box {
							font-size: 25upx;
							font-family: DIN;
							font-weight: 500;
							color: #FFFFFF;
							width: 50upx;
							height: 50upx;
							background: #595D69;
							border-radius: 10upx;
							display: flex;
							justify-content: center;
							align-items: center;
						}

						.dd {
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #595D69;
						}
					}

					p {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}

				}
			}
		}

		.detail_d {
			width: 95%;
			margin: 0 auto;
			margin-top: 10px;
			background: #FFFFFF;
			border-radius: 10px;
			padding: 20upx;

			.time {
				margin-bottom: 10px;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			.title {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.ptnav {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				margin-top: 10px;

				.box {
					margin-right: 5px;
					height: 150upx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;

					p {

						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}

					image {
						width: 100upx;
						height: 100upx;
					}
				}

			}
		}




	}
</style>
