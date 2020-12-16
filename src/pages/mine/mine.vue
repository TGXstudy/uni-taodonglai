<template>
	<view class="container">
		<view class="top-wrapper">
			<view class="one_box">
				<image @tap="$mUtils.goPage('set')" class="status-icon" :src=" '/mine/setup.png' | imgUrl"></image>
			</view>
			<view class="breif-box">
				<image class="avatar-img" @tap="gr()" v-if="avatar==''" :src=" '/mine/userinfo.png' | imgUrl" mode=""></image>
				<image v-else class="avatar-img" @tap="gr()" :src="avatar" mode=""></image>
				<view class="breif-txt">
					<view @tap='rzzx()' class="fn-sz-36 yhmm fn-cl-fff fn-bold">
				<!-- 	{{userinfo.auth_name==''?userinfo.auth_name:userinfo.member_nickname}} -->
					{{in_auth=='1'&&userinfo.status=='1'? userinfo.auth_name: userinfo.member_nickname}}
						<image class="yhm_img"  :src=" '/mine/rzbz.png' | imgUrl">
						<span  class="fn-sz-22 fn-cl-fff">{{in_auth | rzzt(userinfo.status)}}</span>
					</view>
					<image class="level-img" v-if="userinfo.level==1" :src="'/mine/dj1.png' | imgUrl"></image>
					<image class="level-img" v-else-if="userinfo.level==2" :src="'/mine/dj_tz.png' | imgUrl"></image>
					<image class="level-img" v-else-if="userinfo.level==3" :src="'/mine/dj2.png' | imgUrl"></image>
					<image class="level-img" v-else-if="userinfo.level==4" :src="'/mine/dj3.png' | imgUrl"></image>
					<text class="fn-sz-22 fn-cl-fff" v-if="userinfo.upper_mobile">推荐人{{userinfo.upper_mobile}}</text>
					<text class="fn-sz-22 fn-cl-fff">推荐码 {{userinfo.invitation_code}}</text>
				</view>
				<text class="fn-sz-28 qd fn-cl-fff" @click="pj_open()">签到</text>
			</view>
			<view class="census-box">
				<view class="census-item">
					<text class="fn-sz-36 fn-cl-fff">{{userinfo.send_contribution_value}}</text>
					<text class="fn-sz-24 fn-cl-fff">总共享值</text>
				</view>
				<view class="census-item">
					<text class="fn-sz-36 fn-cl-fff">{{userinfo.total_love_value}}</text>
					<text class="fn-sz-24 fn-cl-fff">总爱拼值</text>
				</view>
			</view>
			<view class="census-box">
				<view class="census-item">
					<text class="fn-sz-36 fn-cl-fff">{{(userinfo.yellow_to_red*100).toFixed(2)}}%</text>
					<text class="fn-sz-24 fn-cl-fff">分红比列</text>
				</view>
				<view class="census-item">
					<text class="fn-sz-36 fn-cl-fff">{{userinfo.total_red_score}}</text>
					<text class="fn-sz-24 fn-cl-fff">总红积分</text>
				</view>
			</view>
		</view>
		<view class="sjmb">
			<view class="sj_nav">
				<view class="sj_bottom">
					<view class="sjbox" @tap="$mUtils.goPage('contribution')">
						<span>{{userinfo.contribution_value}}</span>
						<p>贡献值</p>
					</view>
					<view class="sjbox" @tap="$mUtils.goPage('aipin')">
						<span>{{userinfo.love_value}}</span>
						<p>爱拼值</p>
					</view>
				</view>
				<view class="sj_bottom">
					<view class="sjbox" @tap="$mUtils.goPage('score')">
						<span>{{userinfo.score}}</span>
						<p>积分</p>
					</view>
					<view class="sjbox2" @tap="$mUtils.goPage('yellow_score')">
						<span>{{userinfo.yellow_score}}</span>
						<p>黄积分</p>
					</view>
					<view class="sjbox" @tap="$mUtils.goPage('red_score')">
						<span>{{userinfo.red_score}}</span>
						<p>红积分</p>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品订单 -->
		<view class="order-box">
			<view class="flex-row-between line-height-100">
				<text class="fn-sz-30 fn-cl-333 fn-bold">购物订单 </text>
				<view class="flex-1" @tap="todd(0)">
					<text class="ckwdd">查看我的订单 </text>
					<image class="icon-sz-narrow" :src="'/mine/jt.png' | imgUrl" mode=""></image>
				</view>
			</view>
			<view class="status-box">
				<view class="status-item" @tap="todd(1)">
					<image class="status-icon" :src="'/mine/dfk.png' | imgUrl" mode=""></image>
					<text class="fn-sz-24 fn-cl-aaa">待付款</text>
					<span v-if='numberlist.un_pay_num !==0'>{{numberlist.un_pay_num | Number}}</span>
				</view>
				<view class="status-item" @tap="todd(2)">
					<image class="status-icon" :src="'/mine/dfh.png' | imgUrl" mode=""></image>
					<text class="fn-sz-24 fn-cl-aaa">待发货</text>
					<span v-if='numberlist.un_delivery_num !==0'>{{numberlist.un_delivery_num | Number}}</span>
				</view>
				<view class="status-item" @tap="todd(3)">
					<image class="status-icon" :src=" '/mine/dshh.png' | imgUrl"></image>
					<!-- <image class="status-icon" :src="'mine/dsh.png' | imgUrl" mode=""></image> -->
					<text class="fn-sz-24 fn-cl-aaa">待收货</text>
					<span v-if='numberlist.un_receive_num !==0'>{{numberlist.un_receive_num | Number}}</span>
				</view>
				<view class="status-item" @tap="todd(4)">
					<image class="status-icon" :src="'/mine/dpj.png' | imgUrl" mode=""></image>
					<text class="fn-sz-24 fn-cl-aaa">待评价</text>
					<span v-if='numberlist.un_evaluate_num !==0'>{{numberlist.un_evaluate_num | Number}}</span>
				</view>
				<view class="status-item" @tap="todd(5)">
					<image class="status-icon" :src="'/mine/dsh2.png' | imgUrl" mode=""></image>
					<text class="fn-sz-24 fn-cl-aaa">售后</text>
					<span v-if='numberlist.refund_num !==0'>{{numberlist.refund_num | Number}}</span>
				</view>
			</view>
		</view>
		<!-- 外卖订单 -->
		<view class="order-box">
			<view class="flex-row-between line-height-100">
				<text class="fn-sz-30 fn-cl-333 fn-bold">外卖订单</text>
				<view class="flex-1" @tap="todd2(0)">
					<text class="ckwdd">查看我的订单 </text>
					<image class="icon-sz-narrow" :src="'/mine/jt.png' | imgUrl" mode=""></image>
				</view>
			</view>
			<view class="status-box">
				<view class="status-item" @tap="todd2(1)">
					<image class="status-icon" :src="'/mine/wm_dfk.png' | imgUrl" mode=""></image>
					<text class="fn-sz-24 fn-cl-aaa">待付款</text>
					<span v-if='numberlist.t_un_pay_num !==0'>{{numberlist.t_un_pay_num | Number}}</span>
				</view>
				<view class="status-item" @tap="todd2(2)">
					<image class="status-icon" :src="'/mine/wm_dbc.png' | imgUrl" mode=""></image>
					<text class="fn-sz-24 fn-cl-aaa">待备餐</text>
					<span v-if='numberlist.t_un_prepare_num !==0'>{{numberlist.t_un_prepare_num | Number}}</span>
				</view>
				<view class="status-item" @tap="todd2(3)">
					<image class="status-icon" :src=" '/mine/wm_dps.png' | imgUrl"></image>
					<!-- <image class="status-icon" :src="'mine/dsh.png' | imgUrl" mode=""></image> -->
					<text class="fn-sz-24 fn-cl-aaa">待配送</text>
					<span v-if='numberlist.t_un_delivery_num !==0'>{{numberlist.t_un_delivery_num | Number}}</span>
				</view>
				<view class="status-item" @tap="todd2(4)">
					<image class="status-icon" :src="'/mine/wm_psz.png' | imgUrl" mode=""></image>
					<text class="fn-sz-24 fn-cl-aaa">配送中</text>
					<span v-if='numberlist.t_un_receive_num !==0'>{{numberlist.t_un_receive_num | Number}}</span>
				</view>
				<view class="status-item" @tap="todd2(5)">
					<image class="status-icon" :src="'/mine/wm_dpj.png' | imgUrl" mode=""></image>
					<text class="fn-sz-24 fn-cl-aaa">待评价</text>
					<span v-if='numberlist.t_un_evaluate_num !==0'>{{numberlist.t_un_evaluate_num | Number}}</span>
				</view>
			</view>
		</view>
		<view class="menus-wrapper">
			<view class="menu-item " @tap="$mUtils.goPage('wallet')">
				<image class="menu-icon" :src="'/mine/money_bag_fill.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">我的钱包</text>
			</view>
			<view class="menu-item " @tap="sqkd()">
				<image class="menu-icon" :src="'/mine/round_shop_fill.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">我要开店</text>
			</view>
			<view class="menu-item" @tap="$mUtils.goPage('user_rights')">
				<image class="menu-icon" :src="'/mine/round_crown_fill.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">用户权益</text>
			</view>
			<view class="menu-item " @tap="$mUtils.goPage('my_footer')">
				<image class="menu-icon" :src="'/mine/footer.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">我的足迹</text>
			</view>
			<view class="menu-item " @tap="$mUtils.goPage('my_collect')">
				<image class="menu-icon" :src="'/mine/round_favor_fill.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">我的收藏</text>
			</view>
			<view class="menu-item" @tap="$mUtils.goPage('address')">
				<image class="menu-icon" :src="'/mine/round_location_fill.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">收货地址</text>
			</view>
			<view class="menu-item" @tap="$mUtils.goPage('takeout_address')">
				<image class="menu-icon" :src="'/mine/wm_address.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">外卖地址</text>
			</view>
			<view class="menu-item " @tap="$mUtils.goPage('code')">
				<image class="menu-icon" :src="'/mine/ic_fxm.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">分享码</text>
			</view>
			<view class="menu-item" @tap="$mUtils.goPage('friends')">
				<image class="menu-icon" :src="'/mine/round_friend_fill.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">我的好友</text>
			</view>
			<view class="menu-item " @tap="$mUtils.goPage('bussines_school')">
				<image class="menu-icon" :src="'/mine/sxy.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">商学院</text>
			</view>
			<view class="menu-item " @tap="$mUtils.goPage('customer')">
				<image class="menu-icon" :src="'/mine/community_fill.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">客服中心</text>
			</view>
			<view class="menu-item " @tap="qydl()">
				<image class="menu-icon" :src="'/mine/group_fill_light.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">区域代理</text>
			</view>
			<view class="menu-item " @tap="$mUtils.goPage('partker')">
				<image class="menu-icon" :src="'/mine/pin.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">拼团记录</text>
			</view>
			<view class="menu-item " @tap="rzzx()">
				<image class="menu-icon" :src="'/mine/rzzx.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">认证中心</text>
			</view>
			<view class="menu-item " @tap="$mUtils.goPage('team_rewards')">
				<image class="menu-icon" :src="'/mine/round_redpacket_fill.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">团队奖励</text>
			</view>
			<view class="menu-item " @tap="$mUtils.goPage('xfq')">
				<image class="menu-icon" :src="'/mine/ticket_fill.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">消费券</text>
			</view>
			<view class="menu-item " @tap="$mUtils.goPage('discount_coupon')">
				<image class="menu-icon" :src="'/mine/yhq.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">优惠券</text>
			</view>
			<view class="menu-item " @tap="vip()">
				<image class="menu-icon" :src="'/mine/vip.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">贵宾卡</text>
			</view>
			<view class="menu-item " @tap="$mUtils.goPage('notice')">
				<image class="menu-icon" :src="'/mine/notice_fill.png' | imgUrl" mode=""></image>
				<text class="fn-cl-aaa fn-sz-24">我的消息</text>
			</view>
			<view class="menu-item"></view>
		</view>
		<!-- 签到 -->
		<uni-popup ref="qd" :width="'90%'">
			<view class="qd">
				<view class="one">
					今日已签到
				</view>
				<view class="two">
					当前积分：{{signdata.now}}
				</view>
				<view class="three">
					<span class="left">+{{signdata.add}}</span>
					<span class="right">积分</span>
				</view>
				<button @tap="qd_qd()">确定</button>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				in_auth: 0, //是否提交审核
				avatar: "", //用户头像
				signdata: {}, //签到信息
				userinfo: {}, //用户信息
				noagree: 'noagree',
				noagree2: 'noagree2',
				numberlist: {}, //订单数量
			};
		},
		onShow() {
			this.getuser();
			//this.ischeck_auth();
			this.ddnumber() //订单数量
		},
		onLoad() {

		},
		filters: {
			Number(value) {
				if (value == 0) {
					return ''
				} else if (value > 99) {
					return 99
				} else {
					return value
				}
			},
			rzzt(aa,bb){
				if(aa=='1'){
					if(bb=='0'){
						return '认证中'
					}else if(bb=='1'){
						return '已认证'
					}else{
						return '立即认证'
					}
				}else{
					return '立即认证'
				}
			}
		},
		methods: {
			ddnumber() {
				this.$api.orderNum().then(res => {
					this.numberlist = res.data;
					console.log(res, 'sdsd')
				})
			},
			gr() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.info,
				})
			},
			//判断是否认证
			rzzx() {
				if(this.in_auth=='1'){
					if (this.userinfo.status == 0) {
						this.$mUtils.toast('正在审核中')
					} else if (this.userinfo.status == 1) {
						this.$mRouter.push({
							route: this.$mRoutesConfig.attestation_center,
						});
					} else {
						this.$mRouter.push({
							route: this.$mRoutesConfig.attestation,
							query: {
								noagree: this.noagree
							}
						});
					}
				}else{
					this.$mRouter.push({
						route: this.$mRoutesConfig.attestation,
						query: {
							noagree2: this.noagree2
						}
					});
				}
				
			},
			//获取用户信息
			getuser() {
				this.$api.getuserinfo().then((res) => {
					console.log(res, '用户信息')
					this.userinfo = res.data;
					this.avatar = res.data.member_avatar;
					this.in_auth = res.data.in_auth;
					this.$u.vuex('USERINFO', this.userinfo)
				});
			},
			//签到
			pj_open() {
				this.$api.sign().then((res) => {
					if (res.code == 1) {
						this.signdata = res.data;
						this.$refs.qd.open();
					} else {
						this.$mUtils.toast(res.msg);
					}
				});
			},
			qd_qd() {
				this.$refs.qd.close();
				this.$mUtils.timeout(() => {
					this.$mRouter.back(0);
				});
			},
			//区域代理
			qydl() {
				//未申请
				if (this.userinfo.agent_status == 0) {
					this.$mRouter.push({
						route: this.$mRoutesConfig.apply_agency,
					});
				} else if (this.userinfo.agent_status == 1) {
					this.$mRouter.push({
						route: this.$mRoutesConfig.apply_result,
					});
				} else if (this.userinfo.agent_status == 2) {
					this.$mRouter.push({
						route: this.$mRoutesConfig.agency_sy,
					});
				} else if (this.userinfo.agent_status == 3) {
					this.$mRouter.push({
						route: this.$mRoutesConfig.apply_result,
					});
				}

			},
			//订单
			todd(e) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.my_order,
					query: {
						status: e,
					},
				});
			},
			//外卖订单
			todd2(e) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.takeout_order,
					query: {
						status: e,
					},
				});
			},
			//vip
			vip() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.vip,
				});
				//未审核
				// if (this.userinfo.have_vip_card == 1) {
				//   this.$mRouter.push({
				//     route: this.$mRoutesConfig.vip,
				//   });
				// } else if (this.userinfo.have_vip_card == 2) {
				//   this.$mRouter.push({
				//     route: this.$mRoutesConfig.buy_vip,
				//   });
				// }
			},
			//申请开店
			sqkd() {
				if (this.userinfo.store_status == 0) {
					this.$mRouter.push({
						route: this.$mRoutesConfig.open_apply,
					});
				} else if (this.userinfo.store_status == 1) {
					this.$mUtils.toast('您已经申请过了');
				} else {
					this.$mRouter.push({
						route: this.$mRoutesConfig.open,
					});
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #f6f6f6;

		.qd {
			width: 100%;
			height: 437upx;
			background: #ffffff;
			border-radius: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.one {
				font-size: 40upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-top: 30upx;
			}

			.two {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				margin-top: 10upx;
			}

			.three {
				margin-top: 20upx;

				.left {
					font-size: 72upx;
					font-family: DIN;
					font-weight: 500;
					color: #ff4646;
				}

				.right {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #ff4646;
				}
			}

			button {
				margin-top: 30upx;
				width: 406upx;
				height: 78upx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #ffffff;
				background: linear-gradient(-90deg, #f58d0a, #fb5509);
				border-radius: 30upx;
			}
		}

		.ckwdd {
			margin-right: 5upx;
			font-size: 12px;
			color: #999999;
		}

		.one_box {
			height: 90upx;
			width: 100%;
			display: flex;
			justify-content: flex-end;

			.status-icon {
				margin-right: 20upx;
				width: 48upx;
				height: 48upx;
				margin-top: 20upx;
			}
		}

		.top-wrapper {
			width: 100%;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			background-color: #f8730a;

			.breif-box {
				.qd {
					width: 102upx;
					height: 50upx;
					background: #ffffff;
					border-radius: 25upx 0upx 0upx 25upx;
					color: #f96809;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				width: 98%;
				margin: 0 auto;
				box-sizing: border-box;

				display: flex;

				.avatar-img {
					width: 120upx;
					height: 120upx;
					border-radius: 50%;
					background-color: #f6f6f6;
					margin-right: 20upx;
				}

				.breif-txt {
					flex: 1;
					display: flex;
					flex-direction: column;

					.yhmm {
						display: flex;
						align-items: center;

						.yhm_img {
							margin-left: 10px;
							width: 31upx !important;
							height: 31upx !important;
						}
					}

					.level-img {
						width: 125upx;
						height: 32upx;
					}
				}
			}

			.census-box {
				width: 100%;
				margin: 40upx auto;
				margin-top: 20upx;
				margin-bottom: 30px;
				display: flex;
				justify-content: space-around;

				.census-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
			}
		}

		.sjmb {
			width: 100%;
			background-color: #fff;

			.sj_nav {
				position: relative;
				background-color: #fff;
				width: 95%;
				margin: 0 auto;

				border-radius: 10px;
				margin-top: -20px;
				padding: 10px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				box-shadow: #eee 2upx 2upx;

				.sj_top {
					width: 100%;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
				}

				.sj_bottom {
					width: 90%;
					margin: 0 auto;
					margin-top: 30upx;
					display: flex;
					justify-content: space-around;
					align-items: center;

					.sjbox {
						width: 32%;
						text-align: center;

						span {
							font-size: 36upx;
							font-family: DIN;
							font-weight: 500;
							color: #333333;
						}

						p {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
						}
					}

					.sjbox2 {
						text-align: center;
						width: 32%;
						border-left: 1px solid rgba(229, 229, 229, 1);
						border-right: 1px solid rgba(229, 229, 229, 1);

						span {
							font-size: 36upx;
							font-family: DIN;
							font-weight: 500;
							color: #333333;
						}

						p {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
						}
					}
				}
			}
		}

		.order-box {
			width: 100%;
			height: 135px;
			background-color: #fff;
			margin: 0 auto;
			border-radius: 10upx;
			display: flex;
			flex-direction: column;

			.flex-row-between {
				display: flex;
				width: 95%;
				margin: 0 auto;
			}

			.line-height-100 {
				line-height: 100upx;
			}

			.flex-1 {
				flex: 1;
				flex-shrink: 1;
				display: flex;
				justify-content: flex-end;
				align-items: center;
			}

			.icon-sz-narrow {
				width: 12upx;
				height: 22upx;
			}

			.status-box {
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex: 1;
				flex-shrink: 1;

				.status-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					position: relative;

					span {
						position: absolute;
						right: -2upx;
						top: 0;
						width: 24upx;
						height: 24upx;
						background: #FFFFFF;
						border: 2upx solid #FA6109;
						border-radius: 50%;
						font-size: 18upx;
						color: #F96609;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.status-icon {
						width: 50upx;
						height: 50upx;
						margin-bottom: 20upx;
					}
				}
			}
		}

		.menus-wrapper {
			background-color: #fff;
			padding: 30upx 0;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-top: 20upx;
			margin-bottom: 30px;

			.menu-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 180upx;
				margin-bottom: 40upx;

				.menu-icon {
					width: 70upx;
					height: 70upx;
					margin-bottom: 20upx;
				}
			}
		}
	}
</style>
