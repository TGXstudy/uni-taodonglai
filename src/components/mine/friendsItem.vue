<template>
	<view class="">
		<view class="box" v-for="(ite,idx) in item.list.data" :key="idx" @tap="hy_mx(ite,item)">
			<view class="left">
				<image :src="ite.member_avatar" mode=""></image>
				<span class='name'>{{ite.member_nickname}}</span>
			</view>
			<view class="middle">
				<p class="middle_top">
					<!-- 直推好友 -->
					<span v-if="item.type=='1'" class='xf'>消费{{ite.consumption}}元</span>
					<!-- 店铺好友 -->
					<span v-if="item.type=='4'" class='xf'>总营收{{ite.consumption}}</span>
				</p>
			</view>
			<view class="right">
				<p class='right_top'>+{{ite.in_score}}积分</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object
			},
			type: {
				type: Number
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			hy_mx(ite,item) {
				//直推好友
				if (item.type==1) {
					this.$mRouter.push({
						route: this.$mRoutesConfig.friends_mx,
						query: {
							mid:ite.id,
							member_avatar: ite.member_avatar,
							member_nickname: ite.member_nickname,
							in_score: ite.in_score,
							consumption: ite.consumption,
							type:1
						}
					})
				}else if(item.type==4){  //店铺好友
					this.$mRouter.push({
						route: this.$mRoutesConfig.friends_mx,
						query: {
							mid: ite.id,
							member_avatar: ite.member_avatar,
							member_nickname: ite.member_nickname,
							in_score: ite.in_score,
							consumption: ite.consumption,
							type:2
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		margin-top: 10px;
		width: 100%;
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding-bottom: 10px;

		.left {
			display: flex;
			justify-content: center;
			align-items: center;

			span {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			image {
				margin-right: 10px;
				width: 60px;
				height: 60px;
			}
		}

		.middle {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-left: 30px;
			height: 70px;

			.middle_top {
				display: flex;
				flex-direction: column;
				align-items: center;

				.name {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-right: 10px;
				}

				.xf {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}

			.bottom {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				padding: 0;
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			margin-left: auto;
			height: 70px;
			justify-content: space-around;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FA6009;
		}
	}
</style>
