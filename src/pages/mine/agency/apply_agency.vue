<template>
	<view class="dz">
		<view class="top">
			<view class="name">
				<p>姓名</p>
				<input v-model="fullname" v-bind:disabled="fullname!==''" type="text" placeholder="请输入姓名" value="" />
			</view>
			<view class="name">
				<p>联系电话</p>
				<p>{{phone}}</p>
			</view>
			<view class="ld">
				<p>所在地址</p>	
				<pick-regions class="nrr" :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					<span class='djj' v-if="!regionName">点击选择区域</span>
					<span>{{regionName}} </span>
					<image :src="'/mine/jt.png' | _imgUrl"   mode=""></image>
				</pick-regions>
			</view>
			<view class="bz">
				<view class="topp">
					备注(选填）
				</view>
				<textarea value="" v-model="bz" class="bzsr" placeholder="请在这里填写备注" />
			</view>
			<button @tap="bc()">确定</button>
		</view>
	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		components: {
			pickRegions
		},
		data() {
			return {
				bz:"",//备注信息
				fullname:'',//用户名
				phone:'',//手机
				status:'yes',
				region: [],
				defaultRegion: ['四川省', '成都市', '青羊区'],
				defaultRegionCode: '440113',
				province:'',
				city:'',
				county:'',
				province_code:'',
				city_code:'',
				county_code:'',
				addressname:""
			}
		},
		computed: {
			regionName() {
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			}
		},
		onLoad(){
			//获取用户信息
			this.getUserInfo()
		},
		methods: {
			//获取用户信息
			getUserInfo() {
				this.$api.getuserinfo().then(res => {
					console.log(res.data.data)
					this.phone = res.data.member_mobile;
					this.fullname=res.data.auth_name;
				})
			},
			bc() {
				this.$api.applyAgent({
					true_name:this.fullname,
					mobile:this.phone,
					province:this.province,
					city:this.city,
					country:this.county,
					country_adcode:this.county_code,
					remark:this.bz
				}).then(res=>{
					if(res.code==1){
						console.log(res)
						this.$mUtils.toast(res.msg);
						this.$mUtils.timeout(()=>{
							this.$mRouter.switchTab({
								route: this.$mRoutesConfig.mine,
							})
						})
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			},
			// 获取选择的地区
			handleGetRegion(region) {
				this.region = region
				console.log('regionregionregion', region)
				this.province=region[0].name;
				this.city=region[1].name;
				this.county=region[2].name;
				this.province_code=region[0].code+'0000';
				this.city_code=region[1].code+'00';
				this.county_code=region[2].code;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dz {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: rgba(246, 246, 246, 1);
		button{
			margin-top: 50upx;
			width: 100%;
			height: 88upx;
			background: linear-gradient(-90deg, #F58D0A, #FB5509);
			border: 1px solid #EEEEEE;
			border-radius: 44upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		.bz{
			display: flex;
			flex-direction: column;
			margin-top: 40upx;
			.topp{
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				margin-bottom: 20upx;
			}
			.bzsr{
				width: 100%;
				height: 226upx;
				background: #F6F6F6;
				border-radius: 10px;
				padding: 20upx;
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
				height: 50px;
				padding-bottom: 10px;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				.nrr {
					picker {
						width: 100%;
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
					.djj{
						color: #AAAAAA;
					}
					span{
						margin-right: 10px;
					}

					image {
						width: 20upx;
						height: 25upx;
					}
				}

			}

			.name {
				width: 100%;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				padding-bottom: 10px;
				margin-bottom: 10px;
				input{
					text-align: right;
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
		}
	}
</style>
