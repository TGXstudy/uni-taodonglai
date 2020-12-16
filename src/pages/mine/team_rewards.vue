<template>
	<view class="sy">
		<view class="top">
			<image :src="'/mine/ic_juxing.png' | imgUrl" mode=""></image>

			<view class="left">
				<p class='one'>{{info.level}}</p>
				<p class='two'>团队等级</p>
			</view>
			<view class="right">
				<p class='one'>{{info.total_in_score}}</p>
				<p class='two'>总收益(积分)</p>
			</view>
		</view>
		<!-- 选项卡切换 -->
		<view class="check">
			<view class="left" @click="tabClick(0)" :class="[ tabCurrentIndex == 0 ? 'active':'']">
				消费收益{{info.member_score}}积分
			</view>
			<view class="right" @click="tabClick(1)" :class="[ tabCurrentIndex == 1 ? 'active':'']">
				店铺收益{{info.store_score}}积分
			</view>
		</view>

		<!-- 列表 -->
		<view class="bottom" v-if="tabCurrentIndex === 0">
			<view class="box" v-for="(item,index) in list1 " :key="index">
				<view class="left">
					<image :src="item.member_avatar"></image>
				</view>
				<view class="middle">
					<p class="middle_top">
						<span class='name'>{{item.member_nickname}}</span>
						<span class='xf'>消费{{item.amount}}</span>
					</p>
					
				</view>
				<view class="right">
					<p class='right_top'>+{{item.score}}积分</p>
					<p class='bottom1'>{{item.create_time}}</p>
				</view>
			</view>
		</view>
		<view class="bottom" v-if="tabCurrentIndex === 1">
			<view class="box" v-for="(item,index) in list2" :key="index">
				<view class="left">
					<image :src="item.logo" mode=""></image>
				</view>
				<view class="middle">
					<p class="middle_top">
						<span class='name'>{{item.store_name}}</span>
						<span class='xf'>营收{{item.amount}}</span>
					</p>
					
				</view>
				<view class="right">
					<p class='right_top'>+{{item.score}}积分</p>
					<p class='bottom1'>{{item.create_time}}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:'1',
				tabCurrentIndex: 0,
				list1:[],
				list2:[],
				info:{}
			}
		},
		onLoad() {
			this.get()
			this.get2()
		},
		methods: {
			get(){
				this.$api.groupReward({
					page:this.page,
					page_size:100,
					type:'1'
				}).then(res=>{
					console.log(res)
					this.list1=res.data.list.data;
					this.info=res.data;
				})
			},
			get2(){
				this.$api.groupReward({
					page:this.page,
					page_size:100,
					type:'2'
				}).then(res=>{
					console.log(res)
					this.list2=res.data.list.data;
				})
			},
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			
		}
	}
</script>

<style lang="scss" scopd>
	.active {
		background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1)) !important;
		color: rgba(255, 255, 255, 1) !important;
	}

	.sy {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;

		.bottom {
			width: 100%;
			padding: 10px;
			display: flex;
			flex-direction: column;
			.box {
				margin-top: 10px;
				width: 100%;
				height: 150upx;
				display: flex;
				align-items: center;
				padding-bottom: 10px;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				.left {
					image {
						width: 60px;
						height: 60px;
						margin-right: 5px;
					}
				}
				.middle {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 70px;
					.middle_top {
						height: 70px;
						display: flex;
						align-items: center;
						.name {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: rgba(51, 51, 51, 1);
							margin-right: 10px;
						}

						.xf {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
						}
					}

					
				}

				.right {
					display: flex;
					flex-direction: column;
					margin-left: auto;
					height: 70px;
					justify-content: space-around;
					align-items: flex-end;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					.right_top{
						font-size: 30upx;
						color: rgba(250, 92, 9, 1);
					}
					
					
				}
			}
		}

		.check {
			width: 90%;
			margin: 0 auto;
			margin-top: 20px;
			display: flex;
			justify-content: space-between;

			.left {
				width: 48%;
				height: 50px;
				background: rgba(255, 255, 255, 1);
				border-radius: 8px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				border: 1px solid #F96609;
				color: #F7790A;
			}

			.right {
				width: 48%;
				height: 50px;
				background: rgba(255, 255, 255, 1);
				border: 1px solid #F96609;
				border-radius: 8px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;	
				color: #F7790A;
			}
		}

		.top {
			width: 100%;
			height: 150px;
			position: relative;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.left {
				height: 60px;
				z-index: 99;
				width: 42%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex-direction: column;

				.one {
					font-size: 40upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}

				.two {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 247, 241, 1);
				}
			}

			.right {
				height: 60px;
				z-index: 99;
				width: 42%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex-direction: column;

				.one {
					font-size: 40upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}

				.two {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 247, 241, 1);
				}
			}

			image {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 150px;
			}
		}
	}
</style>
