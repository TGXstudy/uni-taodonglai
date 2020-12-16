<template>
	<view class="dz">
		<view class="top">
			<view class="name">
				<p>收件人姓名</p>
				<input v-model="fullname"  type="text" placeholder="请输入收件人姓名" value="" />
			</view>
			<view class="name">
				<p>联系电话</p>
				<input  v-model="phone"  type="text" placeholder="请输入收件人手机号" value="" />
			</view>
			<view class="ld">
				<p>所在地址</p>
				<pick-regions class="nrr" :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					<span class='djj' v-if="!province">点击选择区域</span>
					<span class='djj' v-if="!regionName">{{province}}{{city}}{{county}}</span>
					<span>{{regionName}} </span>
					<image :src="'/mine/jt.png' | imgUrl"   mode=""></image>
				</pick-regions>
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
				 <image class="yhm_img" :src="require(status=='yes' ?'@/static/imgs/mine/switch_true.png' : '@/static/imgs/mine/switch_false.png')">
				<!-- <image class="yhm_img" v-if="status=='yes'" :src=" '/mine/switch_true.png' | imgUrl">
				<image class="yhm_img" v-if="status=='no'" :src=" '/mine/switch_false.png' | imgUrl"> -->
			</view>
		</view>
		<view class="add" @tap="bc()">
			保存
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
				fullname:'',//用户名
				phone:'',//手机
				xx_dz:'',//详细地址,
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
				addressname:"",
				edit:'',//是否编辑
				id:""//收货地址id
			}
		},
		computed: {
			regionName() {
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			}
		},
		watch:{
			status(value){
				//console.log(value,'状态')
			}
		},
		onLoad(options){
			console.log(options)
			let a=JSON.parse(options.item)
			console.log(a)
			this.fullname=a.fullname;
			this.phone=a.phone;
			this.province=a.province;
			this.city=a.city;
			this.county=a.county;
			this.xx_dz=a.address;
			this.county_code=a.county_adcode;
			this.edit=options.edit;
			this.id=a.id;
			//this.status=a.status;
		},
		methods: {
			bc() {
				if(this.edit=='yes'){
					this.$api.editAddr({
						id:this.id,
						fullname:this.fullname,
						phone:this.phone,
						province:this.province,
						city:this.city,
						county:this.county,
						address:this.xx_dz,
						status:this.status,
						county_adcode:this.county_code,
						type:'1',
					}).then(res=>{
						if(res.code==1){
							this.$mUtils.toast(res.msg);
							this.$mUtils.timeout(()=>{
								 this.$mRouter.back();
							})
						}else{
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
						type:'1',
					}).then(res=>{
						if(res.code==1){
							this.$mUtils.toast(res.msg);
							this.$mUtils.timeout(()=>{
								 this.$mRouter.back();
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
		height: 100%;
		width: 100%;
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
				height: 50px;
				padding-bottom: 10px;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				.nrr {
					picker {
						width: 100%;
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
					.djj{
						
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
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				padding-bottom: 10px;
				margin-bottom: 10px;
				input{
					
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
				input{
					font-size: 30upx;
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
