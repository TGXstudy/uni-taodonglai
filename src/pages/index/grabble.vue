<template>
	<!-- 首页搜索 -->
	<view class="grabble">
		<view class="container">
			<u-navbar :is-back="true" title="" :background="background" :customBack="backToIndex">
				<new-search @switchSearch="searchType" @shopList="getShopList"></new-search>
			</u-navbar>
		</view>
		<default-search v-show="vuex_searchList == 0 && vuex_shopList == 0"></default-search>
		<view class="like-goods" v-if="vuex_searchList.length !== 0">
			<view class="go-like">
				<like-goods v-for="(lk, inx) in vuex_searchList" :key="inx" :item="lk" :shop-list="shopList"></like-goods>
			</view>
		</view>
		<search-shop v-else></search-shop>
	</view>
</template>
<script>
	import defaultSearch from "@/components/index/defaultSearch";
	import LikeGoods from "@/components/index/LikeGoods.vue";
	import newSearch from "@/components/index/newSearch";
	import searchShop from "@/components/index/searchShop";
	export default {
		components: {
			defaultSearch,
			LikeGoods,
			newSearch,
			searchShop,
		},
		data() {
			return {
				background: {
					background: "linear-gradient(-90deg, #F58D0A, #FB5509)",
				},
				currentSearch: "商品",
				shopList: [],
			};
		},
		methods: {
			backToIndex() {
				this.$u.vuex("vuex_searchList", "");
				this.$mUtils.goPage("index");
			},
			searchType(e) {
				this.currentSearch = e;
				console.log(this.currentSearch);
			},
			getShopList(list) {
				console.log(list);
				this.shopList = list;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.like-goods {
		.go-like {
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