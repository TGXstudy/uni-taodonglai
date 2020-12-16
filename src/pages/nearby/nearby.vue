<template>
	<!-- 附近的 -->
	<view class="nearby">
		<view class="nearby-title">
			<image src="../../static/imgs/index/location.png" mode=""></image>
			<view class="fn-sz-36 fn-cl-fff margin-left-10">新中泰国际大厦</view>
			<view class="right-img">
				<image src="../../static/imgs/index/right.png" mode=""></image>
			</view>
		</view>
		<view class="seek">
			<view class="seek-search">
				<image src="../../static/imgs/index/search.png" mode=""></image>
				<input type="text" value="" placeholder="输入商品" />
			</view>
		</view>
		<view class="bg-img">
			<image src="../../static/imgs/takeout/bgimg.png" mode=""></image>
		</view>
		<!-- nav一级导航 -->
		<view class="macroplate">
			<view class="icons_list">
				<view class="icons_all">
					<navigator :url="item.url" class="all_img" v-for="(item,index) in iconslist" :key="index">
						<image :src="item.imgUrl" mode=""></image>
						<view class="icons_tiele">
							{{item.text}}
						</view>
					</navigator>
				</view>
			</view>
		</view>
		<!--筛选 -->
		<view class="filtrate-all">
			<text>筛选</text>
			<text>距离</text>
			<text>评分</text>
			<text>销量</text>
			<text>优惠活动</text>
		</view>
		<!-- 商家信息 -->
		<view class="all-nearby" @tap="$mUtils.goPage('shopgoods')">
			<nearby-list></nearby-list>
		</view>
	</view>
</template>

<script>
	import NearbyList from '@/components/nearby/NearbyList.vue'
	export default {
		components: {
			NearbyList
		},
		data() {
			return {
				//导航
				iconslist: [{
						id: "1",
						imgUrl: "../../static/imgs/takeout/cooking.png",
						text: "鲜果饮料",
						url: "../../pages/takeout/takeout",
					},
					{
						id: "2",
						imgUrl: "../../static/imgs/takeout/ydlm.png",
						text: "面条",
						url: "../../pages/takeout/takeout",
					},
					{
						id: "3",
						imgUrl: "../../static/imgs/takeout/hbg.png",
						text: "汉堡薯条",
						url: "../../pages/takeout/takeout",
					},
					{
						id: "4",
						imgUrl: "../../static/imgs/takeout/rc.png",
						text: "串串烧烤",
						url: "../../pages/takeout/takeout",
					},
					{
						id: "5",
						imgUrl: "../../static/imgs/takeout/tp.png",
						text: "下午茶",
						url: "../../pages/takeout/takeout",
					},
					{
						id: "6",
						imgUrl: "../../static/imgs/takeout/ck.png",
						text: "家常菜",
						url: "../../pages/takeout/takeout",
					},
					{
						id: "7",
						imgUrl: "../../static/imgs/takeout/coofie.png",
						text: "咖啡",
						url: "../../pages/takeout/takeout",
					},
					{
						id: "8",
						imgUrl: "../../static/imgs/takeout/dg.png",
						text: "蛋糕",
						url: "../../pages/takeout/takeout",
					},
					{
						id: "9",
						imgUrl: "../../static/imgs/takeout/ss.png",
						text: "日餐",
						url: "../../pages/takeout/takeout",
					},
					{
						id: "10",
						imgUrl: "../../static/imgs/takeout/eig.png",
						text: "早餐",
						url: "../../pages/takeout/takeout",
					},

				],

			}
		},
		onLoad() {

		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
		background: #F5F5F5;
	}

	.nearby {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: 160upx;

		.nearby-title {
			height: 100upx;
			background-color: #FF7900;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 32upx;
				height: 32upx;
			}

			.right-img {
				margin-left: 15upx;

				image {
					width: 15upx;
					height: 22upx;

				}
			}
		}

		.seek {
			display: flex;
			height: 220upx;
			border-radius: 0upx 0upx 40upx 40upx;
			background-color: #FF7900;
			position: relative;

			.seek-search {
				height: 66upx;
				width: 95%;
				border-radius: 40upx;
				background: #FFFFFF;
				display: flex;
				margin: auto;

				image {
					width: 25upx;
					height: 25upx;
					margin: auto 20upx;
				}

				input {
					margin: auto 0upx;
				}
			}
		}

		.bg-img {
			width: 90%;
			height: 300upx;
			position: absolute;
			top: 272upx;
			left: 26upx;

			image {
				width: 701upx;
				height: 300upx;
			}
		}

		//nav导航
		.macroplate {
			width: 100%;
			margin: 20rpx 0rpx;
			box-sizing: border-box;
			margin-top: 280upx;

			.icons_list {
				// width: 700rpx;
				width: 95%;
				height: 343rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				margin: auto;
				// padding: 10rpx;

				.icons_all {
					display: flex;
					flex-wrap: wrap;
				}

				.all_img {
					flex: 20%;
					display: flex;
					flex-direction: column;
					margin: 20upx auto;
					justify-content: center;
					align-items: center;

					image {
						width: 80rpx;
						height: 80rpx;
					}
				}

				.icons_tiele {
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #333333;
					justify-content: center;
				}

			}

		}

		.filtrate-all {
			width: 100%;
			height: 80upx;

			text {
				margin-left: 30upx;
				font-size: 30upx;
				font-weight: 400;
				color: #333333;
			}
		}
	}
</style>
