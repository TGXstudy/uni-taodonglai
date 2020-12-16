<template>
	<view class="kf">

		<view class="tw">
			<view class="box" @tap="tochild(item.id)" v-for="(item,index) in wt_list" :key="index">
				<view class="left">
					{{item.title}}
				</view>
				<view class="right">
					<image :src="'/mine/jt.png' | imgUrl" mode=""></image>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="left" @tap="tel_phone()">
				<image :src="'/mine/wdphone.png' | imgUrl"></image>
				<p>{{phone_num}}</p>
			</view>
			<view class="right" @tap="tel_phone()">
				<image :src="'/mine/wdxx.png' | imgUrl" mode=""></image>
				<p>联系客服</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone_num:'',//客服电话
				wt_list: [],
				id:'',
			}
		},
		onLoad(options) {
			this.getVal();
			this.id=options.cate_id;
			this.getlist();
		},
		methods: {
			getlist(){
				this.$api.question_schoolList({
					type:'2',
					cate_id:this.id,
					page:'1',
					pageSize:9999
				}).then(res=>{
					console.log(res)
				this.wt_list=res.data.data;
				})
			},
			tel_phone(){
				uni.makePhoneCall({
				    phoneNumber: this.phone_num, //仅为示例
				});
			},
			getVal(){
				this.$api.siteConf({
					key:'pt_tel'
				}).then(res=>{
					this.phone_num=res.data.customer_service_mobile;
				})
			},
			tochild(e) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.customer_detail,
					query: {
						id: e,
						type:'2'
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.kf {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #F6F6F6 !important;
		position: relative;

		.bottom {
			height: 60px;
			position: fixed;
			bottom: 0;
			width: 100%;
			background-color: #fff;
			display: flex;

			align-items: center;

			.left {
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				border-right: 1px solid rgba(229, 229, 229, 1);

				image {
					width: 25px;
					height: 25px;
					margin-right: 10px;
				}

				p {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			}

			.right {
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 25px;
					height: 25px;
					margin-right: 10px;
				}

				p {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			}
		}

		.tw {
			width: 100%;
			background-color: #fff;
			padding: 10px;

			.box {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 50px;
				border-bottom: 1px solid #E5E5E5;

				.left {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.right {
					image {
						width: 8px;
						height: 18px;
					}
				}

			}
		}
	}
</style>
