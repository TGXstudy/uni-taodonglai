<template>
	<view class="page">
		<view class="container">
			<view class="drap">
				<view class="drap-item" @click="switchSearch">
					<text>{{currentSearch}}</text>
					<image src="../../static/imgs/index/ic_type_bom_false.png" mode="" />
				</view>
				<u-action-sheet :list="options" v-model="show" @click="confirmSwitch" :cancel-btn="false"></u-action-sheet>
			</view>
			<view class="line"></view>
			<u-icon size="25" name="search" style="margin-right: 10rpx"></u-icon>
			<u-input v-model="searchValue"></u-input>
		</view>
		<text class="search-text" @click="$u.throttle(doSearch, 500)">搜索</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 0,
				options: [{
					text: '商品',
					value: 0,
				},
				{
					text: '店铺',
					value: 1,
				},
				],
				searchValue: '',
				currentSearch: '商品',
				show: false
			};
		},
		methods: {
			async doSearch() {
				if (this.currentSearch == '商品') {
					let res = ''
					switch (this.searchValue) {
						case 0:
							res = await this.getGoodsList()
							this.$u.vuex("vuex_searchList", res.data.data)
							await this.saveSearch()
							break;
						default:
							res = await this.getGoodsList()
							this.$u.vuex("vuex_searchList", res.data.data)
							break;
					}
					console.log("搜索商品");
					return
				}
				await this.getStoreList()

			},
			async getGoodsList() {
				const res = await this.$api.goodsList({
					goods_list_type: '4',
					spu_name: this.searchValue,
				})
				return res
			},
			async saveSearch() {
				// eslint-disable-next-line no-undef
				let arr = uni.getStorageSync("lifeData").vuex_searchRecord || []
				arr.push(this.searchValue)
				this.$u.vuex("vuex_searchRecord", arr)
			},
			switchSearch() {
				this.show = true
			},
			confirmSwitch(index) {
				this.currentSearch = this.options[index].text
				this.$emit('switch-search', this.currentSearch)
				if (this.options[index].value == 1) {
					this.$u.vuex('vuex_searchList', [])
					return
				}
				this.$u.vuex('vuex_shopList', [])
			},
			async getStoreList() {
				const { data } = await this.$api.getStoreList({
					store_name: this.searchValue,
					longitude: '0',
					latitude: '0'
				})
				this.$u.vuex('vuex_shopList', data)
			}
		},
		computed: {
			vuexVal() {
				console.log(this.vuex_searchWord)
				return this.vuex_searchWord
			}
		},
		watch: {
			vuexVal(newVal) {
				console.log(newVal, '------------')
				this.searchValue = newVal
			}
		},
	};
</script>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	.container {
		width: 548rpx;
		height: 66rpx;
		background: #ffffff;
		border: 1prx solid #f96c09;
		border-radius: 33rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

		.drap {
			width: 250rpx;
			height: 66rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.drap-item {
				margin-right: 90rpx;

				text {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 72rpx;
				}

				image {
					margin-left: 10rpx;
					transform: translateY(-5rpx);
					width: 12rpx;
					height: 7rpx;
				}
			}

			.pop {
				top: 80rpx;
				position: absolute;
				width: 100rpx;
				height: 100rpx;
				background: #333333;
			}
		}

		.line {
			width: 1rpx;
			height: 64rpx;
			background: #e5e5e5;
			margin-left: -100rpx;
			margin-right: 20rpx;
		}
	}

	.search-text {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #fffefe;
		margin-left: 20rpx;
	}
</style>