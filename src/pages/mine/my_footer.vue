<template>
	<view class="zj">
		<view class="box" v-for="(ite,idx) in newlist" :key="idx">
			<view class=ttitle>
				{{ite[0].create_time}}
			</view>
			<view class="navv" v-for="(item,index) in ite" :key="index">
				<slide-delete class="bottom"  @tap.stop="xq(item)" :item="item" @deleteItem="deleteItem">
					<view class="left">
						<image :src="item.spu_img" mode=""></image>
					</view>
					<view class="right">
						<view class="one">{{item.spu_name}} </view>
						<view class="two">
							<p class='time'>¥{{item.sku_price}}</p>
						</view>
					</view>
				</slide-delete>
			</view>
		</view>
	</view>
</template>
<script>
	import slideDelete from '@/components/SlideDelete/SlideDelete.vue'
	export default {
		components: {
			slideDelete
		},
		data() {
			return {
				page: '1',
				list: [],
				newlist:[]
			}
		},
		onLoad() {
			this.gey_lb();
		},
		methods: {
			xq(e) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.goodsDetails,
					query: {
						id: e.product_id,
						type: e.type
					}
				})
			},
			deleteItem(item) {
				this.$api.delFoot({
					id: item.id,
				}).then(res => {
					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.gey_lb();
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			gey_lb() {
				this.$api.footprint({
					page: this.page,
					pageSize: 1000
				}).then(res => {
					this.list = res.data.data;
					// 转换后的二维数组
					var arrayTwo = Object.values(this.list.reduce((res, item) => {
						console.log(res)
					  res[item.create_time] ? res[item.create_time].push(item) : res[item.create_time] = [item];
					  return res;
					}, {}));
					this.newlist=arrayTwo
					console.log(this.newlist)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.zj {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);
		padding: 10px;

		.box {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.ttitle{
				width: 100%;
				height: 60upx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}
			.navv{
				width: 100%;
			}
			.bottom {
				width: 100%;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				padding-bottom: 10px;
				background-color: #fff;
				padding-top: 10px;

				.left {
					width: 40%;

					image {
						width: 205upx;
						height: 205upx;
						border-radius: 10upx;
					}
				}

				.right {
					width: 55%;
					display: flex;
					flex-direction: column;
					padding-left: 20px;

					.one {
						font-size: 35upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.two {
						display: flex;
						flex-direction: column;
						margin-top: 10px;

						.person {
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(51, 51, 51, 1);

							span {
								color: #FF5900;
							}
						}

						.time {
							margin-top: 5px;
							font-size: 38upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #F3262D;
						}
					}

					.three {
						.left {
							width: 60px;
							height: 35px;
							background: rgba(246, 42, 42, 1);
							border-radius: 5px 0px 0px 19px;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #fff;
						}

						.right {
							color: #333333;
							width: 80px;
							height: 35px;
							background: rgba(253, 185, 22, 1);
							border-radius: 0px 22px 5px 0px;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}
			}

			.title {
				display: flex;
				align-items: center;
				width: 100%;
				margin-bottom: 10px;
				margin-top: 10px;

				image {
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}

				p {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}
			}
		}
	}
</style>
