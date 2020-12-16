<template>
	<!-- 首页tab下面的分类 -->
	<view class="classify">
		<view class="search" @tap="$mUtils.goPage('grabble')">
			<view class="search-lf">
				<view class="search-img">
					<image src="../../static/imgs/index/search.png" mode=""></image>
				</view>
				<view class="search-input">
					<input type="text" v-model="spu_name" placeholder="输入上架、商品名" />
				</view>
			</view>
			<view class="search-title" @tap="sssp()">
				<text>搜索</text>
			</view>
		</view>
		<view class="classify-box">
			<scroll-view scroll-y="true" class="left-cate-box">
				<view class="left-cate-item" v-for="(item,idx) in classifylist" :key="idx" @click="all_goods(idx,item)" :class="active == idx ?'active' : ''">
					<text class="left-cate-name one-line-txt">{{item.parent.gc_name}}</text>
				</view>
			</scroll-view>
			<view class="witness-list">
				<view class="witness-all">
					<view class="witness-log">
						<view class="witness-cont" v-for="(itc,inc) in sp_list" :key="inc" @tap="faddish(itc)">
							<image :src="itc.gc_img" mode=""></image>
							<view class="witness-title">
								{{itc.gc_name}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				classifylist: [], //分类页面数据
				sp_list: [],//商品列表
				spu_name: '',//商品名称
			}
		},
		onLoad() {
			this.get_classify()
		},
		methods: {
			//搜索跳转
			sssp() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.classdetails,
					query: {
						spu_name: this.spu_name,
					}
				})
			},
			//商品切换类型
			all_goods(idx, item) {
				console.log(item)
				this.sp_list = item.child_list
				this.active = idx
			},
			//获取分类页面
			get_classify() {
				this.$api.category({
					type: "5",
					gc_id: this.gc_id
				}).then(res => {
					console.log(res, '分类')
					if (res.code == 1) {
						this.classifylist = res.data
						this.sp_list = res.data[0].child_list
					} else {
						this.classifylist = this.classifylist.concat(res.data);
					}
				})
			},
			//分类跳转
			faddish(e) {
				console.log(e)
				let gc_level_1 = e.gc_parent_id;
				let gc_level_2 = e.gc_id;
				this.$mRouter.push({
					route: this.$mRoutesConfig.classdetails,
					query: {
						gc_level_1,
						gc_level_2
					}
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.classify {
		width: 100%;
		background: #f6f6f6;

		.search {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 100upx;
			background: linear-gradient(-90deg, #f58d0a, #fb5509);

			.search-lf {
				display: flex;
				width: 548upx;
				height: 66upx;
				background: #ffffff;
				border: 2upx solid #f96c09;
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
					color: #fffefe;
				}
			}
		}

		.classify-box {
			margin-top: 30upx;
			width: 100%;
			display: flex;
			justify-content: space-between;

			.left-cate-box {
				width: 30%;
				height: 1061upx;
				// height: calc(100vh - var(--window-top));
				background: #ffffff;

				.current-cate {
					background-color: #fff;
				}

				.left-cate-item {
					height: 90upx;
					width: 100%;
					align-items: center;
					padding: 20upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #363135;
					line-height: 48upx;
					.left-cate-name {
						flex: 1;
						// padding: 0 10upx;
						box-sizing: border-box;
					}
				}
			}

			.witness-list {
				width: 66%;
				// height: 1061upx;
				background: #ffffff;
				border-radius: 10upx;
				.witness-all {
					width: 100%;
					.witness-log {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						padding: 0 10upx;
						.witness-cont {
							text-align: center;
							width: 136upx;
							// height: 136upx;
							background: #ffffff;
							display: flex;
							flex-direction: column;
							margin-top: 20upx;
							image {
								width: 136upx;
								height: 136upx;
								border-radius: 10upx;
							}
							.witness-title {
								font-size: 26upx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #666666;
							}
						}
					}
				}
			}
		}

		.active {
			border-left: solid 2px #fb5509;
			background: #f6f6f6;
		}
	}
</style>
