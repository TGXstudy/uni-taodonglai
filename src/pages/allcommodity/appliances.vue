<template>
	<!-- 首页分类 -->
	<view class="appliances">
		<view class="appliances-search">
			<search></search>
		</view>
		<view class="appliances-list">
			<cate-title></cate-title>
		</view>
		<view class="appliances-rank">
			<rank></rank>
		</view>
		<view class="goods-list">
			<like-goods v-for="(apl,inx) in applist" :key="inx" :item="apl"></like-goods>
		</view>
	</view>
</template>

<script>
	import Search from "@/components/index/Search.vue"
	import CateTitle from "@/components/index/CateTitle.vue"
	import Rank from "@/components/index/Rank.vue"
	import LikeGoods from "@/components/index/LikeGoods.vue"
	export default {
		components: {
			Search,
			CateTitle,
			Rank,
			LikeGoods
		},
		data() {
			return {
				applist: []//商品列表
			}
		},
		onLoad() {
			this.get_appliances()
		},
		methods: {
			//秒杀列表
			get_appliances() {
				this.$api.goodsList({
					goods_list_type: "4",
					page: 1,
					page_size: 9,
					new: "1",
					price: "1",
					sell_num: "1"
				}).then(res => {
					if (res.code == 200) {
						this.applist = res.data.data
					}else{
						this.applist = this.applist.concat(res.data.data);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.appliances {
		width: 100%;
		background: #F5F5F5;
		.goods-list{
			padding: 0 20upx;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			flex: 1;
		}
	}
</style>
