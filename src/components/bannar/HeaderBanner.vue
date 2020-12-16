<template>
	<view class="nav-wrapper">
    <view class="carousel-wrapper">
			<carousel :list="banner_list"></carousel>
		</view>
	</view>
</template>

<script>
import carousel from "@/components/index/Carousel.vue"
export default {
  data() {
    return {
      //bannar数据
      banner_list: [
        { url: "../../static/imgs/index/banner.png" },
        { url: "../../static/imgs/index/banner.png" },
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
    };
  },
  components: {
    carousel
  }
};
</script>

<style scoped lang="scss">
	.nav-wrapper {
		height: 320upx;
		width: 100%;
		// position: relative;
		.bg-wrapper {
			width: 750rpx;
			height: 100%;
			box-sizing: border-box;
			// background-color: $theme-color-blue;
			// background-image: url('../../static/imgs/index/home_bg.png');
			background-size: contain;
			background-position: top left;
			background-repeat: no-repeat;
			padding-top: 150upx;

			.search-box {
				margin-top: 40rpx;
				width: 702rpx;
				height: 60upx;
				margin-left: 24rpx;
				background-color: #fff;
				border-radius: 30upx;
				display: flex;
				align-items: center;

				.image-sz-32 {
					margin: 0 30upx;
				}
			}
		}

		.carousel-wrapper {
			margin-top: -200rpx;
			background: #fff;
			box-sizing: border-box;
			width: 700upx;
			height: 240upx;
			// position: absolute;
			bottom: 0;
			margin-left: calc( 50% - 350upx);
			border-radius: 16rpx;
			/deep/ .top-banner {
				border-radius: 16rpx !important;
			}
		}
	
	}
</style>
