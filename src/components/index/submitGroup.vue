<template>
	<view class="navigation">
		<view class="left">
			<view class="item" @click="callBoss">
				<u-icon name="../../static/imgs/index/message.png" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">联系商家</view>
			</view>
			<view class="item" @click="collect">
				<u-icon :name="is_collect === 1?'../../static/imgs/index/haveCollected.png':'../../static/imgs/index/favor.png'" :size="40" :color="$u.color['contentColor']"></u-icon>
				<view class="text u-line-1">{{is_collect === 1?'已收藏':'收藏'}}</view>
			</view>
		</view>
		<view class="right">
			<view class="buy-now" @click="openPop">立即购买</view>
		</view>
		<view>
			<u-popup v-model="show" mode="bottom" border-radius="14">
				<view class="container">
					<view class="header">
						<view class="goods-image">
							<image :src="goodsInfo.spu_img" mode="aspectFit" />
						</view>
						<view class="goods-info">
							<view class="title">{{goodsInfo.spu_name}}</view>
							<view class="price">{{price}}<del class='oldprice'>{{oldprice}}</del></view>
							<view class="trip">请确定 规格 数量</view>
						</view>
					</view>
					<view class="main">
						<view class="title">规格</view>
						<view class="scale-container">
							<view v-for="(item, index) in goodsInfo.sku" :key="index">
								<view :class="[item.isSelected?'actScale':'scale']" @click="comfirmScale(item)">
									<text>{{item.sku_name}}</text>
								</view>
							</view>
						</view>
						<view class="number">
							<view class="number-title">数量</view>
							<view class="number-box">
								<u-number-box v-model="value" @change="valChange"></u-number-box>
							</view>
						</view>
					</view>
					<view class="footer">
						<view class="comfirmBtn" @click="toCheckOrder">确认</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodsInfo: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {
				show: false,
				value: 1,
				currentGoods: '',
				is_collect: '',
				info: {}
			}
		},
		mounted() {
			console.log(this.goodsInfo, '11111111')
			this.is_collect = this.goodsInfo.is_collect
			console.log(this.is_collect)
		},
		methods: {
			openPop() {
				this.show = true
			},
			comfirmScale(item) {
				console.log(item.isSelected, '选择这个规格')
				if (typeof item.isSelected == 'undefined') {
					for (const iterator of this.goodsInfo.sku) {
						iterator.isSelected = false
					}
					console.log(123)
					item.isSelected = true
					this.currentGoods = item
					this.$emit('scale', item)
				} else if (item.isSelected) {
					item.isSelected = false
				} else {
					for (const iterator of this.goodsInfo.sku) {
						iterator.isSelected = false
					}
					item.isSelected = true
					this.currentGoods = item
					this.$emit('scale', item)
				}
			},
			valChange(e) {
				console.log('当前值为: ' + e.value)
			},
			toCheckOrder() {
				if (!this.openId) {
					let appid = 'wxbff9e2c08f9a7c48';
					let uri = encodeURIComponent(window.location.href); // 这里务必编码
					console.log(window.location.href)
					// let scope = 'snsapi_userinfo'; // 获取用户信息
					let scope = 'snsapi_base'; // 静默授权，仅可获取openid
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=${scope}&state=123#wechat_redirect`;
					return
				}
				if (!this.currentGoods) {
					this.$mUtils.toast('请选择具体规格');
					return
				}
				let goods = [{
					sku_id: this.currentGoods.sku_id,
					buy_num: this.value
				}]
				this.$api.checkOrder({
					goods: goods
				}).then(res => {
					if (res.code == 0) {
						this.$mUtils.toast(res.msg);
					} else {
						this.$mUtils.goPage('cartlist', {
							goods: JSON.stringify(goods)
						})
					}
				})
			},
			async collect() {
				const { data } = await this.$api.collectGoods({
					spu_id: this.goodsInfo.spu_id
				})
				this.is_collect = data.is_collected
			},
			callBoss() {
				// eslint-disable-next-line no-undef
				uni.makePhoneCall({
					phoneNumber: this.goodsInfo.store_base.service_mobile
				})
			}
		},
		computed: {
			price() {
				if (this.currentGoods) {
					return `￥${this.currentGoods.sku_price}`
				}
				return `￥${this.goodsInfo.min_price} - ￥${this.goodsInfo.max_price}`
			},
			oldprice() {
				if (this.currentGoods) {
					return `￥${this.currentGoods.origin_price}`
				}
				return ''
			}
		}
	};
</script>

<style lang="scss" scoped>
	.navigation {
		display: flex;
		margin-top: -10rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;

		.left {
			display: flex;
			font-size: 20rpx;
			margin-left: 25rpx;
			margin-right: 100rpx;
			width: 208rpx;
			justify-content: space-around;

			.item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}

		.right {
			display: flex;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;
			align-items: center;

			.buy-now {
				background-image: url("../../static/imgs/index/sub-button.png");
				width: 380rpx;
				height: 78rpx;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				-moz-background-size: 100% 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;

		.header {
			width: 750rpx;
			margin-top: 41rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;

			.goods-image {
				width: 223rpx;
				height: 223rpx;

				image {
					border-radius: 10rpx;
					width: 100%;
					height: 100%;
				}
			}

			.goods-info {
				width: 449rpx;
				.oldprice {
					margin-left: 10upx;
					color: #333333;
				}
				.title {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 36rpx;
				}

				.price {
					font-size: 24rpx;
					font-family: DIN;
					font-weight: 500;
					color: #ff4646;
					line-height: 70rpx;
				}

				.trip {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 70rpx;
				}
			}
		}

		.main {
			width: 750rpx;
			display: flex;
			flex-direction: column;

			.title {
				margin: {
					left: 28rpx;
					top: 20rpx;
				}

				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 70rpx;
			}

			.scale-container {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;

				.scale {
					margin: {
						left: 28rpx;
					}

					width: 213rpx;
					height: 62rpx;
					background: #f6f6f6;
					border-radius: 31rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					text {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 70rpx;
					}
				}

				.actScale {
					margin: {
						left: 28rpx;
					}

					width: 213rpx;
					height: 62rpx;
					background: #fa6009;
					border-radius: 31rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					text {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #fefefe;
						line-height: 70rpx;
					}
				}
			}

			.number {
				display: flex;
				width: 750rpx;

				margin: {
					top: 42rpx;
				}

				.number-title {
					margin: {
						left: 27rpx;
						right: 434rpx;
					}
				}

				.number-box {
					margin: {
						left: 500prx;
					}
				}
			}
		}

		.footer {
			width: 750rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			margin: {
				top: 27rpx;
				bottom: 13rpx;
			}

			.comfirmBtn {
				width: 700rpx;
				height: 78rpx;
				background-image: url("../../static/imgs/index/submitBtn.png");
				background-repeat: no-repeat;
				background-size: 100% 100%;
				-moz-background-size: 100% 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #ffffff;
			}
		}
	}
</style>