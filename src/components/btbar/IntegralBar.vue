<template>
	<!-- 积分底部固定组件 -->
	<view class="IntegralBar">
		<view class="icons-box" v-if="product.info.type != 6">
			<view class="icon-item" @click="doCall">
				<image class="icon-img" :src="'footer/icon_concat.png' | imgUrl" mode=""></image>
				<text class="icon-txt"> 联系商家 </text>
			</view>
			<view class="icon-item" @tap="doCollect">
				<image class="icon-img" :src=" (isCollect ?'footer/icon_like1.png':'footer/icon_like.png' ) | imgUrl" mode=""></image>
				<text class="icon-txt"> 收藏 </text>
			</view>
			<view class="icon-item" @tap="goCart">
				<image class="icon-img" :src="'footer/icon_cart.png' | imgUrl" mode=""></image>
				<text class="icon-txt"> 购物车 </text>
			</view>
		</view>

		<view class="btns-box" v-if="product.info.type == 6">
			<view class="one-btn" @tap="doPurchase('point')">
				<text class="fn-sz-30 fn-cl-fff ">立即兑换</text>
			</view>
		</view>
		<view class="btns-box" v-if=" product.info.type == 3 || product.info.type == 4 || product.info.type == 5">
			<view class="btn-item left-btn" @tap="doPurchase('now')">
				<text class="fn-sz-30 fn-cl-fff">￥ {{product.info.option_price}}</text>
				<text class="fn-sz-24 fn-cl-fff ">立即购买</text>
			</view>
			<view class="btn-item right-btn" @tap="doPurchase('group')">
				<text class="fn-sz-30 fn-cl-fff">￥ {{product.info.pt_price}}</text>
				<text class="fn-sz-24 fn-cl-fff ">立即{{product.info.type == "5" || groupId? "拼" : "开"}}团</text>
			</view>

		</view>
		<view class="btns-box" v-if="product.info.type == 2">
			<view class="one-btn" @tap="doPurchase('now')">
				<text class="fn-sz-30 fn-cl-fff ">立即购买</text>
			</view>
		</view>
		<view class="btns-box" v-if=" product.info.type == 1">
			<view class="btn-item left-btn" @tap="doPurchase('now')">
				<text class="fn-sz-24 fn-cl-fff ">立即购买</text>
			</view>
			<view class="btn-item right-btn" @tap="doPurchase('cart')">
				<text class="fn-sz-24 fn-cl-fff ">加入购物车</text>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			product: {
				type: Object,
				default: function() {
					return {}
				}
			},
			groupId: {
				type: [String, Number]
			}
		},

		data() {
			return {
				isCollect: this.product.is_collect,
				pt_tel: '"400-0033-166"',

			}
		},
		methods: {
			doPurchase(type) {
				this.$emit("doPurchase", type)


			},
			goCart() {
				this.$mRouter.switchTab({
					route: this.$mRoutesConfig.cart
				})
			},
			//收藏 
			doCollect() {
				console.log(this.isCollect)

				this.$api.collect({
					product_id: this.product.info.id
				}).then(res => {
					console.log("收藏", res)
					if (res.code == 200) {

						this.isCollect = !this.isCollect
						this.$mUtils.toast(this.isCollect ? '收藏成功' : '取消收藏')
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			doCall() {
				uni.makePhoneCall({
					phoneNumber: this.product.pt_tel
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.IntegralBar {
		width: 100%;
		height: 100upx;
		padding: 0 20upx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.icons-box {
			display: flex;
			justify-content: space-around;
			align-items: center;

			.icon-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-right: 30upx;

				.icon-img {
					width: 50upx;
					height: 50upx;
					margin-bottom: 10upx;
				}

				.icon-txt {
					color: #999999;
					font-size: 22upx;
				}
			}
		}

		.btns-box {
			flex: 1;
			flex-shrink: 1;

			.btn-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 50%;
				height: 80upx;
				justify-content: center;
			}

			.left-btn {
				background-color: #F6830A;
				border-radius: 40upx 0 0 40upx;
			}

			.right-btn {
				background-color: #F62A2A;
				border-radius: 0 40upx 40upx 0;
			}

			.one-btn {
				width: 100%;
				border-radius: 40upx;
				background-color: #F6830A;
				height: 80upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>

</view>
</template>

<script>
</script>

<style>
</style>
