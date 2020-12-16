<template>
	<view class="address">
		<slide-delete class="top" v-for="(item,index) in sh_list" :key="index" :item="item" @deleteItem="deleteItem">
			<view class="top_a">
				<view class="a_nav">
					<span class="mr" v-if="item.status=='yes'">默认</span>
					<span class="name">{{item.fullname}}</span>
					<span class="phone">{{item.phone}}</span>
				</view>
				<p>{{item.province}} {{item.city}} {{item.county}} {{item.address}}</p>
			</view>
			<image class="post" @tap="toadd(item)" :src="'/mine/post.png' | imgUrl" mode=""></image>
		</slide-delete>
		<view class="add" @tap="toadd()">
			新建收货地址
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
				sh_list: [], //收货列表
			}
		},
		onLoad() {

			this.get_address();
		},
		methods: {
			deleteItem(item) {
				this.$api.delAddr({
					id: item.id,
				}).then(res => {
				
					if (res.code == 1) {
						this.$mUtils.toast(res.msg)
						this.$mUtils.timeout(() => {
							this.get_address();
						})
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			},
			get_address() {
				let that = this;
				this.$api.getList({
					type: '2'
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.sh_list = res.data.lists;
					} else {
						console.log("获取用户信息", res)
					}
				})
			},
			toadd(item) {
				let a=item;
				this.$mRouter.push({
					route: this.$mRoutesConfig.teakeout_add_address,
					query: {
						item:JSON.stringify(a),
						edit:'yes'
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.radio {
		margin-right: 20px;
	}

	.address {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding-top: 0;
		position: relative;
		padding-bottom: 100upx;

		.add {
			width: 100%;
			background: rgba(255, 255, 255, 1);
			height: 60px;
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(250, 96, 9, 1);
			z-index: 9999;
		}


		.bottom {
			width: 100%;
			background-color: #fff;
			height: 150px;
			display: flex;
			flex-direction: column;
			padding: 10px;

			.top_a {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				height: 90px;

				p {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
				}

				.a_nav {
					display: flex;
					align-items: center;

					.mr {
						width: 45px;
						height: 25px;
						color: #fff;
						border-radius: 15px;
						background: rgba(250, 54, 9, 1);
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.name {
						margin-left: 10px;
						font-size: 38upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.phone {
						margin-left: 10px;
						font-size: 36upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}
				}
			}

			.top_b {
				width: 100%;
				height: 50px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.right {
				display: flex;

				image {
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}

				.box1 {
					margin-right: 10px;
				}
			}
		}

		.top {
			width: 100%;
			background-color: #fff;
			height: 100px;
			display: flex;
			flex-direction: column;
			position: relative;

			.post {
				position: absolute;
				right: 20px;
				top: 40px;
				width: 45upx;
				height: 42upx;
			}

			.top_a {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				height: 90px;

				p {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
				}

				.a_nav {
					display: flex;
					align-items: center;

					.mr {
						font-size: 28upx;
						width: 45px;
						height: 25px;
						color: #fff;
						border-radius: 15px;
						background: rgba(250, 54, 9, 1);
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.name {
						margin-left: 10px;
						font-size: 38upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}

					.phone {
						margin-left: 10px;
						font-size: 36upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
					}
				}
			}

			.top_b {
				width: 100%;
				height: 50px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.right {
				display: flex;

				image {
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}

				.box1 {
					margin-right: 10px;
				}
			}
		}
	}
</style>
