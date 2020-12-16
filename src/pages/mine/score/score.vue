<template>
	<view class="jf">
		<view class="top_top">
			<image class="tpbj" :src="'/mine/score.png' | _imgUrl" mode=""></image>
			<view class="topleft">
				<span>可用积分</span>
				<p class="jff">{{userinfo.score}}</p>
				<p class="jl" @tap="tojl()">兑换记录</p>
			</view>
			<view class="topright" @tap="buy()" >
				购买积分
			</view>
		</view>
		<view class="top">
			<view class="top_c">
				<view class="left" @tap="jf_sc()">
					<image :src="'/mine/gwd.png' | _imgUrl"  mode=""></image>
					<p>积分商城</p>
				</view>
				<view class="middle" @tap="$mUtils.goPage('dh_yellow')">
					<image :src="'/mine/jb.png' | _imgUrl"  mode=""></image>
					<p>兑换黄积分</p>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="title">
				<view class="left">
					积分明细
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
		<no-more class="width-100-per" :visible="nomore"></no-more>
		<load-more class="width-100-per" :visible="loading"></load-more>
	</view>
</template>

<script>
	import noMore from "@/components/index/NoMore.vue";
	import loadMore from "@/components/index/LoadMore.vue"
	import getUrlParam from "@/common/js/getUrlParam"
export default{
	components: {
		noMore,
		loadMore
	},
	data(){
		return{
			page: 1,
			userinfo: {} ,//用户信息
			jf_mxlist:[],//积分明细记录
			nomore: true,
			loading: false,
		}
	},
	onReachBottom() {
		if (this.nomore) return;
		console.log("上拉加载更多....")
		this.page++;
		this.jf_mx();
	},
	onNavigationBarButtonTap(e) {
	    console.log("11")        
	},
	onShow() {
		this.getUserInfo()
		this.jf_mx();
		this.getOpenid()
	},
	async onLoad(){
		await this.getOpenid()
	},
	methods:{
		buy(){
			
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
				route: this.$mRoutesConfig.buy_score,
			})
		},
		jf_sc(){
			this.$mRouter.push({
				route: this.$mRoutesConfig.integral,
			})
		},
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
		//积分明细
		jf_mx(){
			this.loading = true;
			this.$api.record({
				page: this.page,
				pageSize: 10,
			}).then(res=>{
				console.log(res)
				this.loading = false
				if (res.code == 1) {
					if (this.page == 1) {
					this.jf_mxlist=res.data.record.list
					} else {
						this.jf_mxlist = this.jf_mxlist.concat(res.data.record.list);
					}
					this.nomore = res.data.record.total_page <= this.page;
				
				} else {
					console.log("获取拼团商品", res)
				}
				
			})
		},
		
		//获取用户信息
		getUserInfo() {
			this.$api.getuserinfo().then(res => {
				this.userinfo = res.data;
			})
		},
		tojl(){
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
		.top_top{
			width: 100%;
			height: 150px;
			padding: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			.tpbj{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
			}
			.topleft{
				z-index: 999;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				span{
					font-size:24upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(241,241,241,1);
				}
				.jff{
					margin-top: 10px;
					font-size:60upx;
					font-family:DIN;
					font-weight:500;
					color: #fff;
				}
				.jl{
					margin-top: 10px;
					font-size:28upx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(255,255,255,1);
				}
			}
			.topright{
				z-index: 999;
				width:190upx;
				height:73upx;
				background:rgba(255,255,255,1);
				border-radius:37px;
				font-size:30upx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(250,93,9,1);
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
				.left{
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-bottom: 10px;
				}
				.right{
					width: 176upx;
					height: 66upx;
					background: #ff5900;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size:28upx;
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
			z-index: 999;
			width: 95%;
			padding: 10px;
			height:189upx;
			margin: 0 auto;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			border-radius:10px;
			margin-top: -20px;
			.top_a {
				padding-top: 30px;
				width: 50%;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				.one {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}
				.two {
					margin-top: 10px;
					font-size: 60upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}
			}

		

			.top_c {
				width: 100%;
				height: 60px;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.left {
					width:40%;
					height:111upx;
					background:#FFCDB2;
					border-radius:10px;
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin-right: 5px;
					image {
						width: 60upx;
						height: 60upx;
					}

					p {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #CD6212;
						margin-right: 20upx;
					}
				}
				.middle {
					width:40%;
					height:111upx;
					background:#FCE1B9;
					border-radius:10px;
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin-right: 5px;
					image {
						width: 60upx;
						height: 60upx;
				
					}
				
					p {
						margin-right: 20upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #E77A10;
					}
				}
			}
		}
	}
</style>
