<template>
	<view class="upload-box">
		<view @tap="chooseImage">
			<slot></slot>
		</view>
		<compress-img ref="cpimg" @result="cpimgOk" @err="cpimgErr" :number="maxImgNum-imgNum" :fixOrientation="true" :size="1000"
		 :maxWidth="1000" :ql="0.9" :type="'base64'"></compress-img>
	</view>
</template>

<script>
	import compressImg from "@/components/CompressImg.vue"
	export default {
		props: {
			maxImgNum: {
				type: Number,
				default: 1
			},
			imgNum: { //当前已上传图片张数
				type: Number,
				default: 0,
			},
			
		},
		watch:{
			imgNum(newVal){
				console.log("watch---",newVal)
			}
		},
		components: {
			compressImg
		},
		methods: {
			chooseImage() {
				console.log("====",this.imgNum,this.maxImgNum)
				if (this.imgNum >= this.maxImgNum) {
					this.$mUtils.toast("最多只能上传" + this.maxImgNum + "张图片");
					return;
				}
				this.$refs.cpimg._changImg()
			},
			cpimgOk(base64Arr) {
				Promise.all(
					this.uploadImg(base64Arr),
				).then((results) => {
					this.$emit('getImage', results)
				})
			},
			uploadImg(base64Arr) {
				let promiseArr = []
				for (let i = 0; i < base64Arr.length; i++) {
					let base64 = base64Arr[i]
					let promise = new Promise((resolve, reject) => {
						//图片上传接口
						this.$api.qiniuToken({
							base64: [base64]
						}).then(res => {
							console.log("图片上传接口------", res);
							// this.$mUtils.toast("图片上传接口"+res.data.preview_url);
							if (res.code == 1) {
								resolve(res.data)
							} else {
								this.$mUtils.toast(res.msg);
								reject(res.msg);
							}
						})
					})
					console.log("2222");
					promiseArr.push(promise);

				}
				console.log("33333");
				return promiseArr;

			},
			cpimgErr(res) {
				console.log("-----------err", res);
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>

</script>

<style lang="scss" scoped>
</style>
