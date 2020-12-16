<template>
	<view class="jf">
		<view class="top_top">
			<view class="topleft">
				<span>
					可用余额(元）
				</span>
				<p class="jff">￥{{hasscore}}</p>
			</view>
			<view class="topright" @tap="cz()" v-if="userinfo.have_vip_card == '1'">
				充值
			</view>
			<view class="topright" @tap="gm()" v-else-if="userinfo.have_vip_card == '2'">
				购买贵宾卡
			</view>
		</view>
		<view class="bottom">
			<view class="title">
				<view class="left">
					收支明细
				</view>
			</view>
			<view class="box" v-for="(item,index) in jf_mxlist" :key="index">
				<view class="left">
					<view class="box_top">{{item.bill_source}}</view>
					<view class="box_bottom">
						{{item.create_time}}
					</view>
				</view>
				<view class="right" v-if="item.bill_type=='in'">
					+{{item.bill_amt}}
				</view>
				<view class="right" v-if="item.bill_type=='out'">
					-{{item.bill_amt}}
				</view>
			</view>
		</view>
		<!-- <no-more class="width-100-per" :visible="nomore"></no-more>
		<load-more class="width-100-per" :visible="loading"></load-more> -->
	</view>
</template>

<script>
	import getUrlParam from "@/common/js/getUrlParam"
	// import noMore from "@/components/index/NoMore.vue";
	// import loadMore from "@/components/index/LoadMore.vue"
	export default {
		components: {
			// noMore,
			// loadMore
		},
		data() {
			return {
				hasscore:'',//可用余额
				page: 1,
				jf_mxlist: [], //积分明细记录
				nomore: true,
				loading: false,
				userinfo:{},
			}
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.jf_mx();
		},
		async onLoad() {
			 this.getuser();
			 this.jf_mx();
			 await this.getOpenid()
		},
		methods: {
			async getOpenid() {
				if (this.vuex_code && this.vuex_code == getUrlParam.getUrlParam('code')) return
				if (getUrlParam.getUrlParam('code')) {
					const res = await this.$api.getOpenid({
						code: getUrlParam.getUrlParam('code'),
						client: 'gzh'
					})
					this.$u.vuex('openId', res.data.openid)
					console.log(this.openId, '授权成功')
					return
				}
				console.log('还没有进入授权')
			},
			getuser() {
			  this.$api.getuserinfo().then((res) => {
			    console.log(res, '用户信息')
			    this.userinfo = res.data;
			  });
			},
			//购买
			gm(){
				if (!this.openId) {
					let appid = 'wxbff9e2c08f9a7c48';
					let uri = encodeURIComponent(window.location.href); // 这里务必编码
					console.log(window.location.href)
					// let scope = 'snsapi_userinfo'; // 获取用户信息
					let scope = 'snsapi_base'; // 静默授权，仅可获取openid
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=${scope}&state=123#wechat_redirect`;
					return
				}
				  this.$mRouter.push({
				    route: this.$mRoutesConfig.buy_vip,
				  });
			},
			//充值
			cz(){
				this.$mRouter.push({
					route: this.$mRoutesConfig.recharge,
					query:{
						recharge_type:'1'
					}
				})
			},
			jf_sc() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.shopping,
				})
			},
			//积分明细
			jf_mx() {
				this.$api.vipBalanceLog().then(res => {
					console.log(res)
					 this.jf_mxlist=res.data.record.list;
					 this.hasscore=res.data.has_score;
				})
			},
			//获取用户信息
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					this.userinfo = res.data;
				})
			},
			tojl() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.score_jl,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jf {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: rgba(246, 246, 246, 1);

		.top_top {
			width: 100%;
			height: 200px;
			padding: 10px;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.topleft {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FA5C09;

				image {
					width: 50upx;
					height: 50upx;
					margin-right: 20upx;
				}

				span {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}

				.jff {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 60upx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #333333;
					margin-top: 10upx;
				}

				.jl {
					margin-top: 10px;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
			}

			.topright {
				margin-top: 40upx;
				width: 304upx;
				height: 88upx;
				background: linear-gradient(-90deg, #F58D0A, #FB5509);
				border-radius: 37px;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
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
