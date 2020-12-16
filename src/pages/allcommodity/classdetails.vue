<template>
	<!-- 分类详情 -->
	<view class="classdetails">
		<view class="search">
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
		<!-- 滚动条 -->
		<view class="gdt" v-if="isshow=='yes'">
			<scroll-view scroll-x="true" style="width: 100%;overflow:hidden;white-space:nowrap;">
				<view class="scroll-view_H">
					<!-- <view id="demo1" class=" membershipLevel_item" :class="[ currt== '-1' ? 'active':'']"  @tap="fenlei2()">全部</view> -->
					<view id="demo3" class=" membershipLevel_item" :class="[ currt== index ? 'active':'']"  @tap="fenlei(item,index)" v-for="(item,index) in fl_list" :key="index">{{item.gc_name}}</view>
				</view>
			</scroll-view>
		</view>
		<view class="appliances-rank">
			<view class="rank-list">
				<text class="all-rank" @tap='news()'>新品</text>
				<view class="rank-volume" @tap="prices()">
					<text>价格</text>
					<view class="rank-all">
						<image v-if="price=='1'" :src=" '/index/paixu_top.png' | imgUrl" mode=""></image>
						<image v-if="price=='2'" :src=" '/index/paixu_bottom.png' | imgUrl" mode=""></image>
					</view>
				</view>
				<view class="rank-volume">
					<text>销量</text>
					<view class="rank-all" @tap="editnum()">
						<image v-if="sell_num=='1'" :src=" '/index/paixu_top.png' | imgUrl" mode=""></image>
						<image v-if="sell_num=='2'" :src=" '/index/paixu_bottom.png' | imgUrl" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="goods-list">
			<like-goods v-for="(gs,inx) in goodslist" :key="inx" :item="gs"></like-goods>
		</view>
	</view>
</template>

<script>
	import Search from "@/components/index/Search.vue"
	import CateTitle from "@/components/index/CateTitle.vue"
	import LikeGoods from "@/components/index/LikeGoods.vue"
	export default {
		components: {
			Search,
			CateTitle,
			LikeGoods
		},
		data() {
			return {
				currt:'-1',
				isshow:'no',//是否显示二级分类
				goodslist: [],
				gc_level_1: '',
				gc_level_2: '',
				page: 1,
				new: '', //新品
				price: '1', //价格排序,默认升序
				sell_num: '2', //销量排序
				spu_name: '', //搜索商品名
				fl_list: [], //分类列表
			}
		},
		onLoad(options) {
			this.gc_level_1 = options.gc_level_1;
			this.gc_level_2 = options.gc_level_2;
			this.spu_name = options.spu_name;
			this.isshow=options.isshow;
			this.get_goods() //获取搜索商品列表
			this.get_child() //获取子分类
			console.log(options)
		},
		methods: {
			//获取二级分类
			fenlei(e,index){
				this.gc_level_2=e.gc_id;
				this.currt=index;
				this.get_goods() //获取搜索商品列表
			},
			fenlei2(){
				this.gc_level_2='';
				this.currt='-1';
				this.get_goods() //获取搜索商品列表
			},
			//搜索商品
			sssp() {
				this.get_goods()
			},
			get_child() {
				this.$api.category({
					type: '5',
					gc_id: this.gc_level_1
				}).then(res => {
					this.fl_list = res.data[0].child_list;
				})
			},
			//获取搜索商品列表
			get_goods() {
				this.$api.goodsList({
					goods_list_type: "4",
					page: this.page,
					page_size: 10,
					gc_level_1: this.gc_level_1,
					gc_level_2: this.gc_level_2,
					new: this.new,
					price: this.price,
					sell_num: this.sell_num,
					spu_name: this.spu_name
				}).then(res => {
					if (res.code == 1) {
						this.goodslist = res.data.data;
					} else {
						this.$mUtils.toast(res.msg)
					}
					console.log(res)
				})
			},
			news() {
				this.new = '1';
				this.get_goods()
			},
			prices() {
				if (this.price == '1') {
					this.price = '2'
				}
				 else if (this.price == '2') {
					this.price = '1'
				}
				this.get_goods()
				console.log(this.price)
			},
			editnum() {
				if (this.sell_num == '1') {
					this.sell_num = '2'
				} else if (this.sell_num == '2') {
					this.sell_num = '1'
				}
				this.get_goods()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.classdetails {
		.active{
			border-bottom: 2px solid #FB5509;
		}
		.scroll-view_H {
			.membershipLevel_item{
				margin-right: 30upx;
			}
			width: 200%;
			display: flex;
			align-items: center;
			flex-wrap: nowrap;
		}
		.gdt {
			padding: 10upx;
			padding-top: 20upx;
			width: 100%;
			.nav {
				margin-right: 20upx;
			}
		}
		width: 100%;
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
		.rank-list {
			display: flex;
			justify-content: center;
			box-sizing: border-box;

			.all-rank {
				width: 20%;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 113upx;
			}

			.rank-volume {
				width: 20%;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 113upx;
				// margin-left: 40upx;
				display: flex;

				.rank-all {
					display: flex;
					flex-direction: column;
					margin: auto 10upx;

					image {
						width: 20upx;
						height: 35upx;
					}
				}

			}
		}
		.goods-list {
			background: #F5F5F5;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			flex: 1;
		}
	}
</style>
