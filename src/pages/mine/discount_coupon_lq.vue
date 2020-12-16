<template>
	<view class="yhq">
		<view class="top">
			<view class="title" :class="[ currenStatus == item.status ? 'cur-title':'']" @tap="changeStatus(item)" v-for="(item,index) in statusList"
			 :key="index">
				{{item.ext}}
			</view>
		</view>
		<view class="pt_title" v-if="plat_coupon_list.length!==0">
			电商优惠券
		</view>
		<view class="bottom">
			<view class="banxin">
				<couponOrder  v-for="(item,idx) in plat_coupon_list" :key='idx' :item="item" @lq="lq"></couponOrder>
			</view>
		</view>
		<view class="pt_title" v-if="shop_coupon_list.length!==0">
			商家优惠券
		</view>
		<view class="bottom">
			<view class="banxin">
				<couponOrder  v-for="(item,idx) in shop_coupon_list" :key='idx' :item="item" @lq="lq"></couponOrder>
			</view>
		</view>
	</view>
</template>
<script>
	import couponOrder from '@/components/mine/couponOrder.vue';
	export default {
		components: {
			couponOrder
		},
		data() {
			return {
				plat_coupon_list: [],
				shop_coupon_list:[],
				currenStatus: '', //分类
				statusList: [{
						status: 0,
						ext: '全部'
					},
					{
						status: 1,
						ext: '电商优惠券'
					},
					{
						status: 2,
						ext: '外卖优惠券'
					},
				]
			}
		},
		onLoad() {
			this.coupon()
		},
		methods: {
			lq(item){
				if(item==1){
					this.coupon()
				}
			},
			coupon() {
				this.$api.takeCouponList({
					type: this.currenStatus,
				}).then(res => {
					console.log(res)
					this.plat_coupon_list = res.data.plat_coupon
					this.shop_coupon_list = res.data.shop_coupon
				})
			},
			changeStatus(item) {
				this.currenStatus = item.status;
				this.coupon()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.cur-title {
		border-bottom: 5upx solid #FF7200;
	}
	.yhq {
		width: 100%;
		background: #F6F6F6;
		.pt_title{
			width:95%;
			margin: 0 auto;
			margin-bottom: 10px;
		}
		.bottom{
			margin-top: 10px;
			width: 100%;
			.banxin{
				width: 95%;
				margin: 0 auto;
			}
		}
		.top {
			width: 100%;
			padding: 20upx;
			height: 90upx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-around;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-bottom: 40upx;
		}
	}
</style>