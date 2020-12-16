<template>
	<view class="jf">
		<view class="pt_title" @tap='torule()'>
			提现记录
		</view>
		<view class="top_top">
			<view class="topleft">
				<span>
					可用余额(元）
				</span>
				<p class="jff">￥{{parseFloat(tottal_price).toFixed(2)}}</p>
			</view>
			<view class="topbottom">
				<view class="left">
					<p>￥{{(parseFloat(xx.balance).toFixed(2))}}</p>
					<span>可提现余额</span>
				</view>
				<view class="right">
					<p>￥{{((parseFloat(xx.lock_balance).toFixed(2)))}}</p>
					<span>锁定余额</span>
				</view>
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
		<view class="bottom_bottom">
			<view class="left" @tap="tx()">
				提现
			</view>
			<view class="right" @tap="cz()">
				充值
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
				page: 1,
				xx: {}, //用户信息
				jf_mxlist: [], //积分明细记录
				nomore: true,
				loading: false,
				tottal_price:'',//总余额
			}
		},
		onReachBottom() {
			if (this.nomore) return;
			console.log("上拉加载更多....")
			this.page++;
			this.mx();
		},
		onShow() {
			this.mx();
		},
		async onLoad(){
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
			//提现记录
			torule(){
				this.$mRouter.push({
					route: this.$mRoutesConfig.deposit_jl,
				})
			},
			//充值
			cz(){
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
					route: this.$mRoutesConfig.recharge,
					query:{
						recharge_type:'3'
					}
				})
			},
			//提现
			tx(){
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
						route: this.$mRoutesConfig.deposit,
					})
				
			},
			jf_sc() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.shopping,
				})
			},

			//积分明细
			mx() {
				this.loading = true;
				this.$api.balanceLog({
					page: this.page,
					pageSize: 10,
				}).then(res => {
					console.log(res)
					this.loading = false;
					this.xx=res.data;
					this.tottal_price=parseFloat(this.xx.balance)+parseFloat(this.xx.lock_balance)
					if (res.code == 1) {
						if (this.page == 1) {
							this.jf_mxlist = res.data.record.list
						} else {
							this.jf_mxlist = this.jf_mxlist.concat(res.data.record.list);
						}
						this.nomore = res.data.record.total_page <= this.page;

					} else {
						console.log("获取拼团商品", res)
					}
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
		background-color: #FFFFFF;
		.pt_title{
			width: 100%;
			height: 20px;
			background-color: rgb(248, 115, 10);
			display: flex;
			justify-content: flex-end;
			font-size: 30upx;
			color: #FFFFFF;
			padding-right: 5px;
		}
		.bottom_bottom{
			width: 100%;
			position: fixed;
			bottom: 0;
			height: 120upx;
			display: flex;
			justify-content: space-around;
			background-color: #fff;
			.left{
				width: 318upx;
				height: 88upx;
				border: 1px solid #FA5D09;
				border-radius: 44upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FA5D09;
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
		.top_top {
			width: 100%;
			padding: 10px;
			background: linear-gradient(-90deg, #F58D0A, #FB5509);
			display: flex;
			flex-direction: column;
			align-items: center;
			.topbottom{
				width: 70%;
				display: flex;
				justify-content: space-between;
				margin: 0 auto;
				margin-top: 60upx;
				margin-bottom: 40upx;
				p{
					
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
				span{
					
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFF7F1;
				}
				.left{
				
				}
				.right{
					
				}
			}
			.topleft {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				image {
					width: 50upx;
					height: 50upx;
					margin-right: 20upx;
				}

				span {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					margin-top: 50upx;
					margin-bottom: 20upx;
				}

				.jff {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 60upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
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
			padding: 10px;
			margin-bottom: 60px;
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
