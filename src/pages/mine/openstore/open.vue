<template>
	<view class="open">
		<view class="top1">
			<!-- 标题 -->
			<view class="one">
				<view class=" title" @tap="titleindex=0" :class="[titleindex==0?'active':'']">
					线上商家
				</view>
				<view class=" title" @tap="titleindex=1" :class="[titleindex==1?'active':'']">
					外卖门店
				</view>
			</view>
			<!-- 内容 -->
			<view class="xianshang" v-if="titleindex==0">
				<view class="two" @tap="mendian()">
					<view class="left">
						门店头像/logo
					</view>
					<view class="right">
						<image v-if="!mdimg" :src="'/mine/photo.png' | _imgUrl" mode=""></image>
						<image v-else :src="mdimg" mode=""></image>
					</view>
				</view>
				<view class="three">
					<view class="left font_left">
						线上店铺名称
					</view>
					<view class="right">
						<input class="input_font" v-model="dpname" type="text" value="" placeholder="请输入线上店铺名" />
					</view>
				</view>
				<view class="three">
					<view class="left font_left">
						联系电话
					</view>
					<view class="right">
						<input class="input_font" v-model="phone" type="number" value="" placeholder="请输入店铺手机号" />
					</view>
				</view>
				<!-- 店铺照 -->
				<view class="top2" @tap="mtzp()">
					<view class="title font_left">
						店铺门头照
					</view>
					<view class="mdtp">
						<image v-if="!mtimg" :src="'/mine/photo.png' | _imgUrl" mode=""></image>
						<image v-else :src="mtimg" mode=""></image>
					</view>
				</view>
				<!-- 企业 -->
				<view class="top3">
					<view class="three">
						<view class="left font_left">
							企业名称
						</view>
						<view class="right">
							<input class="input_font" v-model="qyname" type="text" value="" placeholder="请输入企业名称" />
						</view>
					</view>
					<view class="three">
						<view class="left font_left">
							法人姓名
						</view>
						<view class="right">
							<input class="input_font" type="text" v-model="frname" value="" placeholder="请输入企业法人姓名" />
						</view>
					</view>
					<view class="four">
						<view class="font_left title">
							法人证件
						</view>
						<view class="nav">
							<image @tap="fr1()" v-if="!frimg1" :src="'/mine/sfz1.png' | _imgUrl" mode=""></image>
							<image @tap="fr1()" v-else :src="frimg1" mode=""></image>

							<image @tap="fr2()" v-if="!frimg2" :src="'/mine/sfz2.png' | _imgUrl" mode=""></image>
							<image @tap="fr2()" v-else :src="frimg2" mode=""></image>
						</view>
					</view>
				</view>
				<!-- 营业执照 -->
				<view class="top4">
					<view class="font_left title">
						营业执照
					</view>
					<view class="nav" @tap="yyzz()">
						<image v-if="!yyzzimg" :src="'/mine/yyzz.png' | _imgUrl" mode=""></image>
						<image v-else :src="yyzzimg" mode=""></image>
					</view>
					<view class="three">
						<view class="left font_left">
							营业执照号
						</view>
						<view class="right">
							<input class="input_font" v-model="yyzzh"  value="" placeholder="请输入统一信用社会码" />
						</view>
					</view>
				</view>
				<!-- 其他执照 -->
				<view class="top4">
					<view class="font_left title">
						其他执照（选填、最多可上传3张）
					</view>
					<view class="nav">
						<image v-if="imageList==''" @tap="qtzz" :src="'/mine/yyzz.png' | _imgUrl" mode=""></image>
						<view class="imglist" v-for="(item,index) in imageList" :key="item">
							<image :src="item" mode=""></image>
							<image @tap="delImage(item,index)" class="close" :src="'/takeout/close.png' | _imgUrl" mode=""></image>
						</view>
					</view>
				</view>
				<!-- 地区选择 -->
				<view class="top5">
					<view class="hhr_dj">
						<view class="left font_left">
							所属行业
						</view>
						<view class="right">
							<view class="uni-list">
								<view>
									<view @tap="toOpen"><span v-if='!name'>请选择</span> {{name}}</view>
									<jpSelect ref="jpSelect" :list="array1" @checked="checked" select="radio" tite="选择所属行业"></jpSelect>
								</view>
								<image class="jt" :src="'/mine/jt.png' | _imgUrl"></image>
							</view>
						</view>
					</view>
					<view class="ld">
						<p>所在地址</p>
						<pick-regions class="nrr" :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
							<span class='djj' v-if="!regionName">点击选择区域</span>
							<span>{{regionName}} </span>
							<image :src="'/mine/jt.png' | _imgUrl" mode=""></image>
						</pick-regions>
					</view>
					<view class="xxdz">
						<view class="title font_left">
							详细地址
						</view>
						<textarea value="" v-model="xxdz" placeholder="请输入详细地址" />
						</view>
					</view>
			</view>
				<!-- 外卖 -->
				<view class="xianshang" v-if="titleindex==1">
					<view class="three">
						<view class="left font_left">
							外卖店铺名称
						</view>
						<view class="right">
							<input class="input_font" v-model="wmname" type="text" value="" placeholder="请输入店铺名" />
						</view>
					</view>
					<view class="three">
						<view class="left font_left">
							联系电话
						</view>
						<view class="right">
							<input class="input_font" v-model="phone" type="text" value="" placeholder="请输入店铺手机号" />
						</view>
					</view>
					<!-- 地区选择 -->
					<view class="top5">
						<view class="hhr_dj">
							<view class="left font_left">
								所属行业
							</view>
							<view class="right">
								<view class="uni-list">
									<view>
										<view @tap="toOpen"><span v-if='!name'>请选择</span> {{name}}</view>
										<jpSelect ref="jpSelect" :list="array1" @checked="checked" select="radio" tite="选择所属行业"></jpSelect>
									</view>
									<image class="jt" :src="'/mine/jt.png' | _imgUrl"></image>
								</view>
							</view>
						</view>
						<view class="ld" @tap='position()'>
							<p>所在地址</p>
							<span>{{address}}</span>
							<image :src="'/mine/jt.png' | _imgUrl"   mode=""></image>
						</view>
						<view class="xxdz">
							<view class="title font_left">
								详细地址
							</view>
							<textarea value="" v-model="xxdz" placeholder="请输入详细地址" />
							</view>
						</view>
					<!-- 店铺照 -->
					<view class="top2" @tap="mtzp()">
						<view class="title font_left">
							店铺门头照
						</view>
						<view class="mdtp">
							<image v-if="!mtimg" :src="'/mine/photo.png' | _imgUrl" mode=""></image>
							<image v-else :src="mtimg" mode=""></image>
						</view>
					</view>
					<!-- 企业 -->
					<view class="top3">
						<view class="three">
							<view class="left font_left">
								店主姓名
							</view>
							<view class="right">
								<input class="input_font" type="text" v-model="frname"  value="" placeholder="请输入企业法人姓名" />
							</view>
						</view>
						<view class="four">
							<view class="font_left title">
								店主证件
							</view>
							<view class="nav">
								<image @tap="fr1()" v-if="!frimg1" :src="'/mine/sfz1.png' | _imgUrl" mode=""></image>
								<image @tap="fr1()" v-else :src="frimg1" mode=""></image>
								
								<image @tap="fr2()" v-if="!frimg2" :src="'/mine/sfz2.png' | _imgUrl" mode=""></image>
								<image @tap="fr2()" v-else :src="frimg2" mode=""></image>
							</view>
						</view>
					</view>
					<!-- 其他执照 -->
					<view class="top4">
						<view class="font_left title">
							其他执照（选填、最多可上传3张）
						</view>
						<view class="nav">
							<image v-if="imageList==''" @tap="qtzz" :src="'/mine/yyzz.png' | _imgUrl" mode=""></image>
							<view class="imglist" v-for="(item,index) in imageList" :key="item">
								<image :src="item" mode=""></image>
								<image @tap="delImage(item,index)" class="close" :src="'/takeout/close.png' | _imgUrl" mode=""></image>
							</view>
						</view>
					</view>
					</view>
			</view>
			<!-- 阅读同意 -->
			<view class="isno" @tap="doAgree">
				<image :src="(isAgree ? '/mine/checked.png' : '/mine/unchecked.png') | _imgUrl" mode=""></image>
				<p> 我已阅读并同意<span @tap="$mUtils.goPage('open_xy')">《商家入驻协议》</span></p>
			</view>
			<button  :disabled="!isAgree" :class="[isAgree?'btn':'btnno']" @tap="tj()">提交</button>
	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	import jpSelect from '@/components/jp-select/jp-select.vue';
	export default {
		components: {
			pickRegions,
			jpSelect
		},
		data() {
			return {
				maxImageAmount:1, //最大上傳圖片張數
				maxImageAmount2:3, //最大上傳圖片張數
				imageList:[], //图片
				array1:[],//行业列表
				isAgree:false,
				titleindex:0,//标题
				defaultRegionCode: '510107',//默认地址编码
				region: [],
				index:0,
				name:'',//分类名称
				id:'',//分类id
				dpname:'',//门店名称
				mdimg:'',//门店图片
				mtimg:'',//门头照片
				phone:'',//联系电话
				qyname:'',//企业名称
				frname:'',//法人姓名
				frimg1:'',//法人证件照1
				frimg2:'',//法人证件照2
				yyzzimg:'',//营业执照
				yyzzh:'',//营业执照号
				xxdz:'',//详细地址
				province:'',//省
				city:'',//市
				county:'',//区
				county_code:'',//编码
				feigeeeeeeeeeeeeee:'00000',
				wmname:'',//外卖店铺名称
				address:'',
				dzname:'',
				lat:'',//维度
				lon:'',//经度
			}
		},
		computed: {
			regionName() {
				// 转为字符串
				return this.region.map(item => item.name).join('')
			}
		},
		onLoad(){
			this.getindustry()
		},
		methods: {
			//获取行业分类列表
			getindustry(){
				this.$api.industry().then(res=>{
					this.array1=res.data
				})
			},
			checked(el) {
				this.item = el
				this.id=el.id
				this.name=el.name
			},
			toOpen() {
			     this.$refs.jpSelect.toOpen()
			},
			tj(){
				if(this.titleindex==0){
					let data={
						type:'1',
						store_name:this.dpname,
						logo:this.mdimg,
						tel:this.phone,
						store_photos:this.mtimg,
						company_name:this.qyname,
						boss_name:this.frname,
						business_license:this.yyzzimg,
						other_license:this.imageList,
						business_num:this.yyzzh,
						hangye:this.id,
						province:this.province,
						city:this.city,
						county:this.county,
						county_adcode:this.county_code,
						address:this.xxdz,
						boss_id_card1:this.frimg1,
						boss_id_card2:this.frimg2
					}
					this.$api.to_be_store(data).then(res=>{
						if(res.code==1){
							this.$mUtils.toast(res.msg);
							this.$mUtils.timeout(()=>{
								 this.$mRouter.back();
							})
						}else{
							this.$mUtils.toast(res.msg)
						}
					})
				}else if(this.titleindex==1){
					let data={
						type:'2',
						store_name:this.wmname,
						logo:this.mdimg,
						tel:this.phone,
						store_photos:this.mtimg,
						company_name:this.qyname,
						boss_name:this.frname,
						business_license:this.yyzzimg,
						other_license:this.imageList,
						business_num:this.yyzzh,
						hangye:this.id,
						province:this.province,
						city:this.city,
						county:this.county,
						county_adcode:this.county_code,
						address:this.xxdz,
						boss_id_card1:this.frimg1,
						boss_id_card2:this.frimg2,
						lon:this.lon,
						lat:this.lat
					}
					this.$api.to_be_store(data).then(res=>{
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
			doAgree(){
				this.isAgree = !this.isAgree;
			},
			handleGetRegion(region) {
				this.region = region
				console.log('regionregionregion', region)
				this.province=region[0].name;
				this.city=region[1].name;
				this.county=region[2].name;
				this.province_code=region[0].code+'0000';
				this.city_code=region[1].code+'00';
				this.county_code=region[2].code;
			},
			//選擇圖片
			mendian(){
				let _leftCount= this.maxImageAmount - this.imageList.length;
				uni.chooseImage({
					count:_leftCount,
					success:(res)=> {
						uni.showLoading({
						    mask: true,
						    title: '上传图片...',
						})
						let tempFiles=res.tempFiles.splice(0,_leftCount);
						tempFiles.forEach((item,index)=> {
							console.log("itemitemitemitem",item)
							this.$mUtils.uploadFile(item).then(_res=> {
								let filePath =  _res.fileUrl;
								console.log("fghjkl",filePath)
								this.mdimg=filePath;
								//this.imageList.push(filePath);
							}).catch(err=> {
								if(err.errMsg == "uploadFile:fail timeout") {
									this.$mUtils.toast("上传超时")
								}else {
									this.$mUtils.toast("上传失败，请稍后重试")
								}
							}).finally(()=> {
								uni.hideLoading();
							})
						})
					},
					fail(res) {
						console.log(res);
					}
				})
			},
			//门头照
			mtzp(){
				let _leftCount= this.maxImageAmount - this.imageList.length;
				uni.chooseImage({
					count:_leftCount,
					success:(res)=> {
						uni.showLoading({
						    mask: true,
						    title: '上传图片...',
						})
						let tempFiles=res.tempFiles.splice(0,_leftCount);
						tempFiles.forEach((item,index)=> {
							console.log("itemitemitemitem",item)
							this.$mUtils.uploadFile(item).then(_res=> {
								let filePath =  _res.fileUrl;
								console.log("fghjkl",filePath)
								this.mtimg=filePath;
								//this.imageList.push(filePath);
							}).catch(err=> {
								if(err.errMsg == "uploadFile:fail timeout") {
									this.$mUtils.toast("上传超时")
								}else {
									this.$mUtils.toast("上传失败，请稍后重试")
								}
							}).finally(()=> {
								uni.hideLoading();
							})
						})
					},
					fail(res) {
						console.log(res);
					}
				})
			},
			//法人证件照1
			fr1(){
				let _leftCount= this.maxImageAmount - this.imageList.length;
				uni.chooseImage({
					count:_leftCount,
					success:(res)=> {
						uni.showLoading({
						    mask: true,
						    title: '上传图片...',
						})
						let tempFiles=res.tempFiles.splice(0,_leftCount);
						tempFiles.forEach((item,index)=> {
							console.log("itemitemitemitem",item)
							this.$mUtils.uploadFile(item).then(_res=> {
								let filePath =  _res.fileUrl;
								console.log("fghjkl",filePath)
								this.frimg1=filePath;
								//this.imageList.push(filePath);
							}).catch(err=> {
								if(err.errMsg == "uploadFile:fail timeout") {
									this.$mUtils.toast("上传超时")
								}else {
									this.$mUtils.toast("上传失败，请稍后重试")
								}
							}).finally(()=> {
								uni.hideLoading();
							})
						})
					},
					fail(res) {
						console.log(res);
					}
				})
			},
			//法人证件照2
			fr2(){
				let _leftCount= this.maxImageAmount - this.imageList.length;
				uni.chooseImage({
					count:_leftCount,
					success:(res)=> {
						uni.showLoading({
						    mask: true,
						    title: '上传图片...',
						})
						let tempFiles=res.tempFiles.splice(0,_leftCount);
						tempFiles.forEach((item,index)=> {
							console.log("itemitemitemitem",item)
							this.$mUtils.uploadFile(item).then(_res=> {
								let filePath =  _res.fileUrl;
								console.log("fghjkl",filePath)
								this.frimg2=filePath;
								//this.imageList.push(filePath);
							}).catch(err=> {
								if(err.errMsg == "uploadFile:fail timeout") {
									this.$mUtils.toast("上传超时")
								}else {
									this.$mUtils.toast("上传失败，请稍后重试")
								}
							}).finally(()=> {
								uni.hideLoading();
							})
						})
					},
					fail(res) {
						console.log(res);
					}
				})
			},
			//营业执照
			yyzz(){
				let _leftCount= this.maxImageAmount - this.imageList.length;
				uni.chooseImage({
					count:_leftCount,
					success:(res)=> {
						uni.showLoading({
						    mask: true,
						    title: '上传图片...',
						})
						let tempFiles=res.tempFiles.splice(0,_leftCount);
						tempFiles.forEach((item,index)=> {
							console.log("itemitemitemitem",item)
							this.$mUtils.uploadFile(item).then(_res=> {
								let filePath =  _res.fileUrl;
								console.log("fghjkl",filePath)
								this.yyzzimg=filePath;
								//this.imageList.push(filePath);
							}).catch(err=> {
								if(err.errMsg == "uploadFile:fail timeout") {
									this.$mUtils.toast("上传超时")
								}else {
									this.$mUtils.toast("上传失败，请稍后重试")
								}
							}).finally(()=> {
								uni.hideLoading();
							})
						})
					},
					fail(res) {
						console.log(res);
					}
				})
			},
			//其他执照
			qtzz(){
				let _leftCount= this.maxImageAmount2 - this.imageList.length;
				uni.chooseImage({
					count:_leftCount,
					success:(res)=> {
						uni.showLoading({
						    mask: true,
						    title: '上传图片...',
						})
						let tempFiles=res.tempFiles.splice(0,_leftCount);
						tempFiles.forEach((item,index)=> {
							console.log("itemitemitemitem",item)
							this.$mUtils.uploadFile(item).then(_res=> {
								let filePath =  _res.fileUrl;
								console.log("fghjkl",filePath)
								this.imageList.push(filePath);
							}).catch(err=> {
								if(err.errMsg == "uploadFile:fail timeout") {
									this.$mUtils.toast("上传超时")
								}else {
									this.$mUtils.toast("上传失败，请稍后重试")
								}
							}).finally(()=> {
								uni.hideLoading();
							})
						})
					},
					fail(res) {
						console.log(res);
					}
				})
			},
			//删除门头照图片
			delImage(item,idx){
				this.imageList.splice(idx,1)
			},
			////////////////////////////////////////外卖门店//////////////
			//定位
			position(){
				let that=this;
				uni.chooseLocation({
				    success: function (res) {
				        console.log('位置名称：' + res.name);
				        console.log('详细地址：' + res.address);
				        console.log('纬度：' + res.latitude);
				        console.log('经度：' + res.longitude);
						that.lon=res.longitude;
						that.lat=res.latitude;
						that.address=res.address;
						that.dzname=res.name;
						that.an();
				    }
				});
			},
			an(){
				let that=this;
				uni.request({
				    url: 'https://restapi.amap.com/v3/geocode/regeo?output=JSON&location='+this.lon+','+this.lat+'&key=b9cc1e0492911c29090c5cfbaddcb051&radius=1000', //仅为示例，并非真实接口地址。
				    success: (res) => {
				        console.log(res.data);
						that.county_code=res.data.regeocode.addressComponent.adcode;
						that.province=res.data.regeocode.addressComponent.province;
						that.city=res.data.regeocode.addressComponent.city;
						that.county=res.data.regeocode.addressComponent.district;
				    }
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.open {
		width: 100%;
		background: #F5F5F5;
		padding-bottom: 50upx;
		.font_left {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
		.active{
			color: #FFFFFF !important;
			background: linear-gradient(-90deg, #F58D0A, #FB5509) !important;
		}
		.input_font {
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 400;
			text-align: right;
		}

		.title {
			margin-top: 20upx;
			margin-bottom: 20upx;
		}
		.btnno{
			margin-top: 20upx;
			width: 95%;
			height: 88upx;
			background: #E6E6E6;
			border: 1px solid #EEEEEE;
			border-radius: 44upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
		}
		.btn{
			margin-top: 20upx;
			width: 95%;
			height: 88upx;
			background: linear-gradient(-90deg, #F58D0A, #FB5509);
			border: 1px solid #EEEEEE;
			border-radius: 44upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		.isno{
			width: 100%;
			padding-left: 20upx;
			display: flex;
			align-items: center;
			margin-top: 30upx;
			margin-bottom: 30upx;
			p{
				span{
					color: #FA5E09 !important;
				}
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}
			image{
				margin-right: 10upx;
				width: 26upx;
				height: 26upx;
			}
		}
		.top5 {
			margin: 0 auto;
			margin-top: 30upx;
			background-color: #FFFFFF;
			padding: 20upx;
			.xxdz{
				textarea{
					width: 100%;
					height: 100upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
				}
			}
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
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				min-height: 50px;
				p{
					width: 30%;
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
					.djj {
						color: #AAAAAA;
					}
					span {
						margin-right: 10px;
					}
					image {
						width: 20upx;
						height: 25upx;
					}
				}
			}
			.hhr_dj {
				padding-bottom: 20px;
				width: 100%;
				height: 40px;
				border-bottom: 1px solid rgba(229, 229, 229, 1);
				display: flex;
				justify-content: space-between;
				align-items: center;
				.uni-list {
					display: flex;
					align-self: flex-end;
				}

				.jt {
					margin-left: 5px;
					display: flex;
					align-self: flex-end;
					width: 8px;
					height: 18px;
				}
			}
		}

		.top4 {
			margin: 0 auto;
			margin-top: 30upx;
			background-color: #FFFFFF;
			padding: 20upx;

			.nav {
				border-bottom: 1px solid #E5E5E5;
				padding-bottom: 20upx;
				.imglist{
					position: relative;
					.close{
						position: absolute;
						left:260upx;
						top: 5px;
						width: 30upx;
						height: 30upx;
						z-index: 9999;
					}
				}
				image {
					width: 307upx;
					height: 194upx;
				}
			}

			.three {
				width: 100%;
				display: flex;
				justify-content: space-between;
				padding-top: 20upx;
				padding-bottom: 20upx;
			}
		}

		.top2 {
			margin: 0 auto;
			margin-top: 30upx;
			background-color: #FFFFFF;
			padding: 20upx;

			image {
				width: 160upx;
				height: 160upx;
			}
		}

		.top3 {
			margin: 0 auto;
			margin-top: 30upx;
			background-color: #FFFFFF;
			padding-left: 20upx;
			padding-right: 20upx;
			padding-bottom: 20upx;

			.four {
				width: 100%;

				.nav {
					width: 100%;
					display: flex;
					justify-content: space-between;
					.imglist{
						position: relative;
						.close{
							position: absolute;
							left:260upx;
							top: 5px;
							width: 30upx;
							height: 30upx;
							z-index: 9999;
						}
					}
					image {
						width: 307upx;
						height: 194upx;
					}
				}
			}

			.three {
				width: 100%;
				display: flex;
				justify-content: space-between;
				padding-top: 40upx;
				padding-bottom: 40upx;
				border-bottom: 1px solid #E5E5E5;
			}
		}

		.top1 {
			margin: 0 auto;
			background-color: #FFFFFF;
			padding-left: 20upx;
			padding-right: 20upx;

			.three {
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-top: 40upx;
				padding-bottom: 40upx;
				border-bottom: 1px solid #E5E5E5;
			}
			.one {
				width: 100%;
				height: 60px;
				display: flex;
				margin-top: 20upx;
				background-color: #FFFFFF;
				.title {
					width: 50%;
					height: 90upx;
					border: 1px solid #F95D09;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #F95D09;
				}
			}

			.two {
				margin-top: 40upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #E5E5E5;
				padding-bottom: 30upx;

				.left {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.right {
					image {
						width: 160upx;
						height: 160upx;
					}
				}
			}
		}

	}
</style>
