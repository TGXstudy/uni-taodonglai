<template>
	<!-- 商品分类标题 -->
	<view class="catetitle">
		<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
			<view class="buy-list">
				<view class="buy-icons">
					<view class="buy-all" v-for="item in buylist" :key="item.id">
						<text class="buy-title">
							{{item.text}}
						</text>
						<view class="boder">
						</view>
					</view>
				</view>

			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buylist: [{
						id: "1",
						text: "首页",
						url: "",
					},
					{
						id: "2",
						text: "所有宝贝",
						url: ""
					},
					{
						id: "3",
						text: "女童",
						url: ""
					},
					{
						id: "4",
						text: "男童",
						url: ""
					},
					{
						id: "5",
						text: "婴儿",
						url: ""
					},
					{
						id: "6",
						text: "秋季新品",
						url: ""
					},



				],

				scrollTop: 0,
				old: {
					scrollTop: 0
				}

			}
		},
		methods: {
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
		}

	}
</script>

<style lang="scss" scoped>
	.catetitle {
		.scroll-view_H {
			width: 100%;
			white-space: nowrap;
			// padding: 30upx 30upx 0upx;
			padding-top: 30upx;

			.buy-list {
				width: 95%;
				// height: 100upx;

				// margin: 30upx auto;
				.buy-icons {
					margin: auto;

					.buy-all {

						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						background-color: #FFFFFF;
						margin: 0upx 25upx;
						display: inline-block;

					}

					.buy-title {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						font-weight: bold;
						color: #333333;
						justify-content: center;
						align-items: center;
					}

					.boder {
						width: 50upx;
						height: 5upx;
						background-color: #FA5E09;
						border-radius: 5upx;
						margin: 0 auto;
						margin: 10upx auto 0upx;

					}
				}
			}
		}

	}
</style>
