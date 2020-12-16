<template>
	<!-- 商品抢购详情 -->
	<view class="buy-goods">
		<view class="buy-list" @tap="faddish(item)">
			<view class="buy-img">
				<image :src="item.spu_img" mode=""></image>
			</view>
			<view class="product-name">
				<text class="title">{{item.spu_name}}</text>
				<text class="price">¥{{item.price}}</text>
				<view class="work-off">
					<text class="tricky">已抢{{item.sell_num}}件</text>
					<text>剩余{{item.stock}}件</text>
				</view>
				<view class="off-hand">
					<button>立即抢购</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		props:{
			item:{
				type:Object
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			faddish(item) {
			  this.$mRouter.push({
			    route: this.$mRoutesConfig.goodsdetails,
			    query: {
			      spu_id: item.spu_id, //商品类型
			      spu_type: item.spu_type, //s商品值
			    },
			  });
			},
		}
	}
</script>

<style lang="scss" scoped>
	.buy-goods {
		width: 100%;
		padding: 30upx;
		padding-top: 0;
		background: #F6F6F6;
		box-sizing: border-box;

		.buy-list {
			height: 350upx;
			background: #FFFFFF;
			border-radius: 10upx;
			padding: 30upx 30upx;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			.buy-img {
				width: 286upx;
				height: 286upx;

				image {
					width: 286upx;
					height: 286upx;
					border-radius: 10upx;
					margin: auto;
				}
			}
		}
		.product-name {
			display: flex;
			flex-direction: column;
			margin-left: 20upx;
			flex-grow: 1;
			.title {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 36upx;
			}

			.price {
				font-size: 24upx;
				font-family: DIN;
				font-weight: 500;
				color: #FF4646;
				line-height: 70upx;
			}

			.work-off {
				display: flex;
				justify-content: space-between;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 60upx;
				color: #999999;

				.tricky {
					color: #F8720A;
				}
			}

			.off-hand {
				width: 100%;
				display: flex;
				justify-content: flex-end;
				
				button {
					margin-right: 0;
					width: 167upx;
					height: 62upx;
					background: #FA3609;
					border-radius: 31upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					text-align: center;
					line-height: 60upx;
					margin-top: 20upx;
				}

			}
		}
	}

</style>
