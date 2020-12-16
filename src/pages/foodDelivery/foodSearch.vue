<template>
	<view class="container">
		<u-navbar :is-back="true" title="" :background="background">
			<u-search placeholder="输入商品" :show-action="true" action-text="搜索" :animation="false" :action-style="searchStyle" @custom="searchShop" v-model="searchVal"></u-search>
		</u-navbar>
		<shop-item :shop-list="shopList"> </shop-item>
	</view>
</template>

<script>
	import shopItem from "../../components/foodDelivery/shopItem";
	export default {
		onLoad(options) {
			this.longitude = options.longitude;
			this.latitude = options.latitude;
		},
		components: {
			shopItem,
		},
		data() {
			return {
				background: {
					backgroundImage: "linear-gradient(-90deg, #FB5509, #F58D0A)",
				},
				searchStyle: {
					color: "white",
				},
				searchVal: "",
				longitude: "",
				latitude: "",
				shopList: [],
			};
		},
		methods: {
			async searchShop() {
				const { data } = await this.$api.getStoreList({
					longitude: this.longitude,
					latitude: this.latitude,
					order: "1",
					store_name: this.searchVal,
				});
				this.shopList = data;
			},
		},
	};
</script>

<style lang="scss"></style>