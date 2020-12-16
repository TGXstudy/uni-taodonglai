<template>
	<view class="hhr">
		<!-- 姓名 -->
		<view class="name">
			<view class="left">
				姓名
			</view>
			<view class="right">
				<input v-model="username" placeholder="请输入真实姓名" type="text" value="" />
			</view>
		</view>
		<!-- 身份证-->
		<view class="phone">
			<view class="left">
				身份证
			</view>
			<view class="right">
				<input v-model="auth_id_num" placeholder="请输入身份证号" type="text" value="" />
			</view>
		</view>
		<!-- 电话 -->
		<view class="phone">
			<view class="left">
				联系电话
			</view>
			<view class="right">
				{{phone}}
			</view>
		</view>
		<!-- 验证码-->
		<view class="phone">
			<view class="left">
				验证码
			</view>
			<view class="right">
				<input v-model="yzm" placeholder="请输入验证码" type="text" value="" />
			</view>
			<verify-code class="yzm" :mob="phone" :type="'4'"></verify-code>
		</view>
		<!-- 区域 -->
		<view class="phone">
			<view class="left">
				<p>所在区域</p>
			</view>
			<view class="right">
				<pickRegions class="nrr" :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion2">
					<span class='djj' v-if="!regionName">请选择</span>
					<span>{{regionName}} </span>
					<image :src="'/mine/jt.png' | imgUrl"></image>
				</pickRegions>
			</view>
		</view>
		<!-- 身份证照片 -->
		<view class="sfz_zp">
			<view class="title">
				身份证照片
			</view>
			<view class="nav">
				<view class="left" @tap="chooseImage">
					<image v-if="image1==''" :src="'/mine/sfz1.png' | imgUrl"></image>
					<image  v-else :src="image1" ></image>
				</view>
				<view class="right">
				<view class="left" @tap="chooseImage2">
					<image v-if="image2==''" :src="'/mine/sfz2.png' | imgUrl"></image>
					<image v-else :src="image2" ></image>
				</view>
				</view>
			</view>
		</view>
		<button class="qr" @click="open">确定</button>
	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue';
	import verifyCode from "@/components/verifyCode.vue";
	export default {
		components: {
			pickRegions,
			verifyCode,
		},
		data() {
			return {
				userinfo: {}, //用户信息
				imageList:[],
				maxImageAmount: 1,
				image1:'', //身份证正面
				image2:'', //身份证反面
				username: '', //姓名
				auth_id_num: '', //身份证
				yzm: '', //验证码
				phone: '', //电话
				qrmm: '', //确认密码
				address: "", //地址
				code: "", //代理区域
				code1: "",
				code2: "",
				code3: "",
				region: [],
				defaultRegion: ['广东省', '广州市', '番禺区'],
				defaultRegionCode: '440113',
				current: 0,
				title: 'picker',
			}
		},
		computed: {
			regionName() {
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			}
		},
		onLoad(options){
			this.getuser()
			if(this.options.noagree){
				this.$mUtils.toast('审核未通过');
			}
			if(this.options.noagree2){
				this.$mUtils.toast('用户尚未提交审核');
			}
		},
		methods: {
			//获取用户信息
			getuser() {
				this.$api.getuserinfo().then(res => {
					this.userinfo = res.data;
					this.phone=res.data.member_mobile;
				})
			},
			//选择图片
			chooseImage() {
				let _leftCount = this.maxImageAmount - this.imageList.length;
				uni.chooseImage({
					count: _leftCount,
					success: (res) => {
						uni.showLoading({
							mask: true,
							title: '上传图片...',
						})
						let tempFiles = res.tempFiles.splice(0, _leftCount);
						tempFiles.forEach((item, index) => {
							this.$mUtils.uploadFile(item).then(_res => {
								let filePath = _res.fileUrl;
								this.image1=filePath
								//this.imageList.push(filePath);
							}).catch(err => {
								if (err.errMsg == "uploadFile:fail timeout") {
									this.$mUtils.toast("上传超时")
								} else {
									this.$mUtils.toast("上传失败，请稍后重试")
								}
							}).finally(() => {
								uni.hideLoading();
							})
						})
					},
					fail(res) {
						console.log(res);
					}
				})
			},
			chooseImage2() {
				let _leftCount = this.maxImageAmount - this.imageList.length;
				uni.chooseImage({
					count: _leftCount,
					success: (res) => {
						uni.showLoading({
							mask: true,
							title: '上传图片...',
						})
						let tempFiles = res.tempFiles.splice(0, _leftCount);
						tempFiles.forEach((item, index) => {
							this.$mUtils.uploadFile(item).then(_res => {
								let filePath = _res.fileUrl;
								this.image2=filePath
							}).catch(err => {
								if (err.errMsg == "uploadFile:fail timeout") {
									this.$mUtils.toast("上传超时")
								} else {
									this.$mUtils.toast("上传失败，请稍后重试")
								}
							}).finally(() => {
								uni.hideLoading();
							})
						})
					},
					fail(res) {
						console.log(res);
					}
				})
			},
			//选择地区
			handleGetRegion2(region) {
				this.region = region
				console.log('regionregionregion', region)
				this.province = region[0].name;
				this.city = region[1].name;
				this.county = region[2].name;
				this.province_code = region[0].code + '0000';
				this.city_code = region[1].code + '00';
				this.county_code = region[2].code;
			},
			open() {
				if(!this.province){
					this.$mUtils.toast('请填写完整')
					return
				}
				let that=this;
				this.$api.auth({
					auth_name: this.username,
					auth_id_num:this.auth_id_num,
					mobile: this.phone,
					code: this.yzm,
					province:this.region[0].name,
					city:this.region[1].name,
					county:this.region[2].name,
					id_card1:this.image1,
					id_card2:this.image2,
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.$mUtils.toast(res.msg)
						that.$mUtils.timeout(() => {
							that.$mRouter.back(0);
						});
					} else {
						that.$mUtils.toast(res.msg)
					}
				})
			},

			close() {
				this.$refs.qr.close()
			},


		}
	}
</script>

<style lang="scss" scoped>
	.hhr {
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 1);
		padding: 10px;
		padding-top: 20px;
		display: flex;
		flex-direction: column;

		.sfz_zp {
			width: 100%;

			.title {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			.nav {
				margin-top: 20upx;
				width: 100%;
				display: flex;
				justify-content: space-between;

				image {
					width: 307upx;
					height: 194upx;
				}

				.left {}

				.right {}
			}
		}

		.qrmm {
			width: 100%;
			padding: 10px;

			input {
				width: 150px;
				margin: 0 auto;
				height: 50px;
			}
		}

		.qrr {
			width: 100% !important;

			.qr_btn {

				height: 400px;
				background: rgba(255, 255, 255, 1);
				padding: 10px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.qr_a {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.one {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
					}

					.two {
						font-size: 40upx;
						font-family: DIN;
						font-weight: 500;
						color: rgba(246, 42, 42, 1);
					}
				}

				.qr_c {
					width: 100%;
					display: flex;
					justify-content: space-between;
					justify-content: center;
					align-items: center;

					.qxc {
						border: 1px solid rgba(220, 220, 220, 1);
					}

					.qrc {
						border: none;
						color: #fff;
						background: -o-linear-gradient(left, #ff5500, #ff7200);
						background: linear-gradient(90deg, #ff5500, #ff7200);

					}

					button {
						border-radius: 37px;
						width: 48%;
						height: 45px;

					}
				}

				.qr_b {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					width: 100%;
					height: 300px;

					.title {}

					.zf_box {
						width: 100%;
						display: flex;
						justify-content: space-between;

						.left {
							display: flex;
							align-items: center;

							image {
								margin-right: 10px;
								width: 50px;
								height: 50px;
							}
						}

						.right {}
					}
				}


			}
		}




		.ck_hhr {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: PingFang SC;
			font-weight: 400;
			text-decoration: underline;
			color: rgba(255, 89, 0, 1);
			margin-top: 30px;

		}

		.qr {
			margin-top: 30px;
			width: 100%;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 44px;
			outline: none;
			color: #fff;
		}

		.name {
			margin-bottom: 20px;
			width: 100%;
			height: 40px;
			padding-bottom: 20px;
			border-bottom: 1px solid rgba(229, 229, 229, 1);
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;

			.right {
				input {
					text-align: right;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
				}
			}
		}

		.phone {
			input {
				text-align: right;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
			}

			image {
				width: 20upx;
				height: 20upx;
			}

			.djj {
				color: #AAAAAA;
				margin-right: 5px;
			}

			margin-bottom: 20px;
			width: 100%;
			padding-bottom: 20px;
			border-bottom: 1px solid rgba(229, 229, 229, 1);
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {

				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				h3 {
					margin-left: 10px;

				}
			}

			.right {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;

				image {
					margin-left: 5px;
					width: 11px;
					height: 18px;
				}
			}
		}
	}
</style>
