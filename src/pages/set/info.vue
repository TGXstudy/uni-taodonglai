<template>
	<view class="grzl">
		<view class="one">
			<view class="tx" @tap="chooseImage">
				<view class="left">
					更换头像
				</view>
				<view class="right">
					<view class="container">
						<image v-if="newimg==''" :src=" '/mine/userinfo.png' | imgUrl" mode=""></image>
						<image :src="newimg" mode=""></image>
					</view>
				</view>
			</view>
			<view class="name">
				<view class="left">
					用户名
				</view>
				<view class="right">
					<input placeholder="请输入昵称" v-model="username" type="text" value="" />
				</view>
			</view>
		</view>
		<view class="two">
			<view class="tx">
				<view class="left">
					推荐人(不可修改推荐人)
				</view>
				<view class="right">
					<input v-bind:disabled="disabled" placeholder="请输入推荐人推荐码" v-model="tjr_bm" type="text" value="" />
				</view>
			</view>
			<view class="name">
				<view class="left">
					推荐码
				</view>
				<view class="right">
					{{invitation_code}}
				</view>
			</view>
		</view>
		<button class="qr" @click="qr()">确定保存</button>
	</view>
</template>

<script>
	import upload from "@/components/upload_img.vue"
	export default {
		components: {
			upload
		},
		data() {
			return {
				maxImageAmount: 1, //最大上傳圖片張數
				token: '', //七牛token
				imageList: [], //图片
				disabled: false, //输入框禁用
				compressPath: '',
				username: '',
				tjr_bm: '',
				zh_id: '', //账号id
				invitation_code: '', //推荐码
				newimg: ''
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {
			//選擇圖片
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
							console.log("itemitemitemitem", item)
							this.$mUtils.uploadFile(item).then(_res => {
								let filePath = _res.fileUrl;
								console.log("fghjkl", filePath)
								this.newimg = filePath;
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
			//获取用户信息
			getUserInfo() {
				this.$api.getuserinfo().then(res => {
					this.username = res.data.member_nickname;
					this.tjr_bm = res.data.upper_mobile;
					this.newimg = res.data.member_avatar;
					this.zh_id = res.data.wx_nickname;
					this.invitation_code = res.data.invitation_code;
					this.$mUtils.timeout(res => {
						if (this.tjr_bm) {
							this.disabled = true
						} else {
							this.disabled = false
						}
					})
				})
			},
			qr() {
				if (this.tjr_bm == '') {
					this.$api.edit_info({
						member_avatar: this.newimg,
						member_nickname: this.username,
						upper_mobile: this.tjr_bm
					}).then(res => {
						console.log(res)
						if (res.code == 1) {
							this.$mUtils.toast(res.msg)
						} else {
							this.$mUtils.toast(res.msg)
						}
					})
				} else {
					this.$api.edit_info({
						member_avatar: this.newimg,
						member_nickname: this.username,
					}).then(res => {
						console.log(res)
						if (res.code == 1) {
							this.$mUtils.toast(res.msg)
						} else {
							this.$mUtils.toast(res.msg)
						}
					})
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.grzl {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);

		.qr {
			margin: 0 auto;
			margin-top: 30px;
			width: 95%;
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

		.one {
			background-color: #fff;

			display: flex;
			flex-direction: column;

			.tx {
				padding: 10px;
				height: 80px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				.left {}

				.right {
					.container {
						image {
							width: 60px;
							height: 60px;
						}
					}

				}
			}

			.name {
				padding: 10px;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				.left {}

				.right {
					input {
						text-align: right;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;

					}
				}
			}
		}

		.two {
			margin-top: 20px;
			background-color: #fff;
			width: 100%;
			display: flex;
			flex-direction: column;

			.tx {
				padding: 10px;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid rgba(229, 229, 229, 1);

				.left {

					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.right {
					input {
						text-align: right;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
					}
				}
			}

			.name {
				padding: 10px;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				.left {}

				.right {
					input {
						text-align: right;
					}
				}
			}
		}

	}
</style>
