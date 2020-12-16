<template>
	<view class="dz">
		<view class="top">
			<view class="name">
				<p>收件人姓名</p>
				<input v-model="fullname" type="text" placeholder="请输入收件人姓名" value="" />
			</view>
			<view class="name">
				<p>联系电话</p>
				<input v-model="phone" type="text" placeholder="请输入收件人手机号" value="" />
			</view>
			<view class="ld" @tap='position()'>
				<p>所在地址</p>
				<span>{{address}}</span>
				<image :src="'/mine/jt.png' | imgUrl" mode=""></image>
			</view>
			<view class="dzz">
				<p>详细地址</p>
				<input v-model="xx_dz" type="text" placeholder="这里填写详细地址" value="" />
			</view>
		</view>
		<view class="mr_dz">
			<view class="left">
				设置为默认地址
			</view>
			<view class="right" @tap="check()">
				 <image class="yhm_img" v-if="status=='yes'" :src=" '/mine/switch_true.png' | imgUrl">
				<image class="yhm_img" v-if="status=='no'" :src=" '/mine/switch_false.png' | imgUrl">
			</view>
		</view>
		<view class="add" @tap="bc()">
			保存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fullname: '', //用户名
				phone: '', //手机
				xx_dz: '', //详细地址,
				status: 'yes',
				code: '',
				province: '',
				city: '',
				county: '',
				address: "",
				name: '',
				latitude: "", //维度
				longitude: "", //经度
				edit: '', //是否编辑
				id: "", //收货地址id
			}
		},
		onLoad(options) {
			console.log(options)
			let a = JSON.parse(options.item)
			console.log(a)
			this.fullname = a.fullname;
			this.phone = a.phone;
			this.province = a.province;
			this.city = a.city;
			this.county = a.county;
			this.xx_dz = a.address;
			//this.status = a.status;
			this.county_code = a.county_adcode;
			this.address = a.selected_area;
			this.latitude = a.latitude;
			this.longitude = a.longitude;
			this.edit=options.edit;
			this.id=a.id;
		},
		methods: {
			//定位
			position() {
				let that = this;
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						that.longitude = res.longitude;
						that.latitude = res.latitude;
						that.address = res.address;
						that.name = res.name;
						that.an();
					}
				});
			},
			an() {
				let that = this;
				uni.request({
					url: 'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=' + this.longitude + ',' + this.latitude +
						'&key=b9cc1e0492911c29090c5cfbaddcb051&radius=1000', //仅为示例，并非真实接口地址。
					success: (res) => {
						console.log(res.data);
						that.county_code = res.data.regeocode.addressComponent.adcode;
						that.province = res.data.regeocode.addressComponent.province;
						that.city = res.data.regeocode.addressComponent.city;
						that.county = res.data.regeocode.addressComponent.district;
					}
				});
			},
			bc() {
				if (this.edit == 'yes') {
					this.$api.editAddr({
						id:this.id,
						fullname: this.fullname,
						phone: this.phone,
						province: this.province,
						city: this.city,
						county: this.county,
						address: this.xx_dz,
						status: this.status,
						county_adcode: this.county_code,
						longitude: this.longitude,
						latitude: this.latitude,
						type: '2',
						selected_area: this.address
					}).then(res => {
						if (res.code == 1) {
							this.$mUtils.toast(res.msg);
							this.$mUtils.timeout(() => {
								this.$mRouter.push({
									route: this.$mRoutesConfig.takeout_address
								})
							})
						} else {
							this.$mUtils.toast(res.msg)
						}
					})
				}else{
					this.$api.addAddr({
						fullname:this.fullname,
						phone:this.phone,
						province:this.province,
						city:this.city,
						county:this.county,
						address:this.xx_dz,
						status:this.status,
						county_adcode:this.county_code,
						longitude:this.longitude,
						latitude:this.latitude,
						type:'2',
						selected_area:this.address
					}).then(res=>{
						if(res.code==1){
							this.$mUtils.toast(res.msg);
							this.$mUtils.timeout(()=>{
								this.$mRouter.push({
									route: this.$mRoutesConfig.takeout_address
								})
							})
						}else{
							this.$mUtils.toast(res.msg)
						}
					})
				}
			},
			check(){
				if(this.status=='no'){
					console.log('点击1')
					this.status='yes';
					return
				}
				else if(this.status=='yes'){
					this.status='no';
					console.log('点击2')
					return
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.dz {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);
		.add {
			width: 100%;
			background: rgba(250, 54, 9, 1);
			height: 60px;
			position: absolute;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 33upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #fff;
		}

		.mr_dz {
			width: 100%;
			background-color: #fff;
			margin-top: 20px;
			height: 60px;
			padding: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			.right{
				width: 84upx;
				height: 46upx;
			}
		}

		.top {
			background-color: #fff;
			padding: 10px;
			display: flex;
			flex-direction: column;

			.ld {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 10px;
				padding-bottom: 10px;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				min-height: 50px;

				p {
					width: 25%;
					flex-wrap: nowrap;
				}

				image {
					width: 20upx;
					height: 25upx;
				}

				.nrr {
					picker {
						width: 100%;
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					span {
						margin-right: 10px;
					}
				}
			}

			.name {
				width: 100%;
				height: 50px;
				display: flex;
				align-items: center;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				padding-bottom: 10px;
				margin-bottom: 10px;

				input {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
				}

				p {
					margin-right: 10px;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			}

			.dzz {
				width: 100%;
				height: 50px;
				display: flex;
				align-items: center;
				margin-bottom: 10px;

				input {
					font-size: 30upx;
				}

				p {
					width: 25%;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			}
		}
	}
</style>
