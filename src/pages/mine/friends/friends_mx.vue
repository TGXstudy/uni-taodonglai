<template>
	<view class="xfxq">
		<view class="top">
			<view class="left">
				<image :src="member_avatar" mode=""></image>
				<p>{{member_nickname}}</p>
			</view>
			<view class="right">
				<p>{{in_score}}</p>
				<span>收益积分</span>
			</view>
			<view class="right">
				<p>{{consumption}}</p>
				<span>消费总金额</span>
			</view>
		</view>
		<view class="cx">
			<view class="left">
				<view class="sj_xz">
					<picker class="picker" mode="date" :value="date" @change="bindDateChange">
						<view class="date">{{date}}
							<image class="down" :src="'/mine/down.png' | _imgUrl" mode=""></image>
						</view>
					</picker>
					<picker class="picker" mode="date" :value="date1" @change="bindDateChange1">
						<view class="date">{{date1}}
							<image class="down" :src="'/mine/down.png' | _imgUrl" mode=""></image>
						</view>
					</picker>
				</view>
			</view>
			<view class="right">
				<view class="right_cx" @tap="cx()">
					查询
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="box" v-for="(item,index) in xf_list" :key="index">
				<view class="middle">
					<p class="middle_top">
						<span class='name'>消费{{item.amount}}元</span>
					</p>
					<p class="bottom">
						<span>{{item.create_time}}</span>
					</p>
				</view>
				<view class="right">
					<p>+{{item.score}}积分</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '', //好友id
				in_score: "", //积分收益
				consumption: '', //消费营收
				member_nickname: '', //用户名
				member_avatar: '',
				type: '',//类型
				xf_list: [], //好友消费列表
				date: '',
				date1: ''
			}
		},
		onLoad(options) {
			let date = new Date();
			let today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
			this.date = today;
			this.date1 = today;
			console.log("onload", options);
			this.id=options.mid
			this.in_score = options.in_score;
			this.consumption = options.consumption;
			this.member_nickname = options.member_nickname;
			this.member_avatar = options.member_avatar;
			this.type = options.type;
			//this.get_myfriend();
			this.cx();
		},
		methods: {
			//好友明细查询
			cx() {
				this.$api.friendDetail({
					mid: this.id,
					type:this.type,
					page: 1,
					pageSize: 10000,
					start_time: this.date,
					end_time: this.date1
				}).then(res => {
					this.xf_list = res.data.data;
				})
			},
			get_myfriend() {
				this.$api.myFriend_mx({
					mid: this.id
				}).then(res => {
					this.avatar = res.data.mem.avatar;
					this.nickname = res.data.mem.nickname;
				})
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindDateChange1: function(e) {
				this.date1 = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.xfxq {
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
				height: 70px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 10px;
				border-bottom: 1px solid rgba(229, 229, 229, 1);

				.middle {
					.name {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
					width: 80%;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 70px;

					.bottom {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						padding: 0;
					}
				}

				.right {
					margin-left: auto;
					display: flex;
					flex-direction: column;
					height: 70px;
					justify-content: space-around;
					font-size: 30upx;
					font-family: DIN;
					font-weight: 500;
					color: #FA5C09;
				}
			}
		}

		.cx {
			width: 95%;
			margin: 0 auto;
			margin-top: 20px;
			display: flex;
			justify-content: space-between;
			height: 80px;

			.left {
				width: 73%;

				.sj_xz {
					display: flex;
					justify-content: space-around;
					align-items: center;
					width: 100%;
					height: 35px;
					background: rgba(246, 246, 246, 1);
					border-radius: 33px;

					.date {
						width: 125px;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}

					.picker {}

					.down {
						margin-left: 20upx;
						width: 8px;
						height: 8px;
					}
				}
			}

			.right {
				width: 26%;

				.right_cx {
					display: flex;
					justify-content: space-around;
					align-items: center;
					color: #fff;
					width: 85px;
					height: 35px;
					background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
					border-radius: 20px;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
		}

		.top {
			width: 100%;
			height: 120px;
			background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 10px;
			image {
				width: 80px;
				height: 80px;
			}
			.left {
				display: flex;
				align-items: center;

				

				p {
					margin-left: 20upx;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}

			.right {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;

				span {
					margin-left: auto;
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFF4EE;
				}

				p {
					font-size: 36upx;
					font-family: DIN;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
