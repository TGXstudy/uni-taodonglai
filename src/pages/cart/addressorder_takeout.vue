<template>
	<!-- 地址列表 -->
	<view class="addaddress-list">
		<view v-for="(item, index) in addrList" :key="index">
			<view class="addaddress" @click="chooseAddr(item)">
				<view class="user-content">
					<view class="icon-img">
						<image src="../../static/imgs/index/ic_address_tag.png" mode=""></image>
					</view>
					<view class="landmark-name">
						<view class="default-phone">
							<image src="../../static/imgs/index/ic_address_def.png" mode="" v-if="item.status == 'yes'">
							</image>
							<view style="width:12rpx;height: 33upx;" v-else></view>
							<text class="fn-cl-333 fn-sz-36 fn-sz-400">{{item.fullname}}</text>
							<text class="fn-cl-999 fn-sz-28 margin-left-10"
								style="margin-top:7rpx">{{item.phone}}</text>
						</view>
						<view class="default-address margin-left-10">
							{{item.province}} {{item.county}} {{item.selected_area}} {{item.address}}
						</view>
					</view>
				</view>
				<view class="go-address">
					<image src="../../static/imgs/index/right.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 新建地址 -->
		<view class="new-address" @click="setAddress">
			新建收货地址
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addrList: []
			}
		},
		async onShow() {
			await this.getAddressList()
		},
		methods: {
			async getAddressList() {
				const {
					data
				} = await this.$api.getList({
					type: '2'
				})
				this.addrList = data.lists
			},
			setAddress() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.teakeout_add_address,
					query: {
						item: '',
						edit: 'yes'
					}
				})
			},
			chooseAddr(item) {
				console.log(item)
				const pages = getCurrentPages();
				const prevPage = pages[pages.length - 2];
				console.log(prevPage)
				//#ifndef H5
				prevPage.addressInfo = item;
				//#endif
				//#ifndef MP-WEIXIN
				prevPage.$vm.addressInfo = item;
				//#endif
				uni.navigateBack({
					 delta: 1,
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
	}
	.addaddress-list {
		display: flex;
		flex-direction: column;
		// width: 100%;
		position: relative;
		margin-bottom: 50px;
		.addaddress {
			width: 95%;
			margin: auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 20upx;
			padding: 40upx 20upx;
			background: #FFFFFF;
			border-radius: 10upx;
			.user-content {
				display: flex;
				align-items: center;

				.icon-img {
					width: 70upx;
					height: 70upx;

					image {
						width: 64upx;
						height: 64upx;
					}
				}

				.landmark-name {
					display: flex;
					flex-direction: column;

					.default-phone {
						display: flex;

						image {
							width: 52upx;
							height: 33upx;
							margin: auto 10upx;
						}
					}

					.default-address {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
					}
				}
			}

			.go-address {
				image {
					width: 12upx;
					height: 22upx;
				}
			}

		}

		.new-address {
			width: 100%;
			height: 97upx;
			background: #FFFFFF;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #F9660A;
			text-align: center;
			line-height: 97upx;
			position: fixed;
			bottom: 0;
		}
	}
</style>