<template>
	<!-- 共用搜索框 -->
	<view class="search">
		<view class="search-lf">
			<view class="goods fn-sz-24">
				<!-- <image src="../../../static/imgs/cd.png" mode=""></image> -->
				<ms-dropdown-menu>
					<ms-dropdown-item v-model="value1" :list="list"></ms-dropdown-item>
				</ms-dropdown-menu>
			</view>
			<view class="search-img">
				<image src="../../static/imgs/index/search.png" mode=""></image>
			</view>
			<view class="search-input">
				<input type="text" placeholder="输入上架、商品名" />
			</view>
		</view>
		<view class="search-title" @tap="$mUtils.goPage('classdetails')">
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
	import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
	export default {
		components: {
			msDropdownMenu,
			msDropdownItem
		},
		data() {
			return {
				//下拉
				list: [{
						text: '首页',
						value: 0,
						// url:"../../pages/home/Home",
						
					},
					{
						text: '店铺',
						value: 1,
						// url:"../../pages/aboutus/Aboutus"
					},
					{
						text: '商品',
						value: 2,
						// url:"../../pages/information/Information"
					}
				],

				value1: 0,
				value2: 1,
				value3: 'init'
			}
		},
		methods:{
			choose() {
				let obj = {
					value: 'test'
				}
				this.$refs.dropdownItem.choose(obj)
			},
			close() {
				this.$refs.dropdownItem.closePopup()
			},
			phone(){
				uni.makePhoneCall({
				    phoneNumber: '028-67517995' //仅为示例
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100upx;
		background: linear-gradient(-90deg, #F58D0A, #FB5509);

		.search-lf {
			display: flex;
			width: 548upx;
			height: 66upx;
			background: #FFFFFF;
			border: 2upx solid #F96C09;
			border-radius: 33upx;
			margin: auto;

			.goods {
				margin: auto 0upx auto 10upx;
				color: #999999;
			}

			.search-img {
				height: 66upx;
				margin: 0upx 15upx;
				display: flex;
				image {
					width: 25upx;
					height: 25upx;
					margin: auto;

				}
			}

			.search-input {
				margin: auto 0upx;
				input {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					// line-height: 70upx;
				}
			}
		}

		.search-title {
			// height: 66upx;
			// padding-right: 30upx;
			margin: auto;
			text {
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFEFE;
			}
		}

	}
</style>
