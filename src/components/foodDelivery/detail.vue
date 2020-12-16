<template>
	<view class="container">
		<view class="content" v-if="ff_xx">
			{{ff_xx.detail}}
		</view>
		<view class="image" v-if="ff_xx">
			<image v-for="(item,index) in ff_xx.detail_pic" :key="index" :src="item" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ff_xx: {},
			}
		},
		props: {
			html: {
				type: String,
				default: ''
			},
			shopId: {
				type: Number,
				default: 0
			}
		},
		async mounted() {
			await this.getShopDeatil()
		},
		methods: {
			async getShopDeatil() {
				const { data } = await this.$api.getShopDeatil({
					shop_id: this.shopId
				})
				this.ff_xx = data;
				console.log(this.ff_xx, 'dsfvdfvdsdff')
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.content {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 72upx;
		}
		.image {
			width: 706upx;
			height: 430upx;
		}
	}
</style>