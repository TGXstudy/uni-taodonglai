<template>
	<view class="">
		<imgUpload class="width"   :imgArr="imgArray" @result="resultUrl"  @delImg="delImg"  :imgCount="max" ref="imgUpload" url="xxx(上传图片的url)"></imgUpload>
	
	</view>
</template>

<script>
	import imgUpload from '@/components/poiuy-uImgUpload/imgUpload.vue';
	export default {
		props:{
			max:{
				type:String
			}
		},
		components: {
			imgUpload
		},
		data() {
			return {
				imgArray: [],
				head: [{
					token: "zx6c54asdq89w7eqw6e46ad4"
				}, {
					sign: 's6d5a4dqwe7q9w87a6'
				}], //示范格式 JSON   使用方式header="head"
				config: {
					delIcon: '', //删除图片icon
					resultTip: true, //结果提示
					resultType: '1', //结果展示类型
					loadIcon: '', //加载时的图标
					loadText: '' //加载时的文字
				}
			}
		},
		methods: {
			submit() {
				//开始上传图片
				this.$refs.imgUpload.upload(res => {
					if (res.code == 0) {
						//0为正常返回，将回调的线上图片数组 赋值给需要提交的表单里
						//res.urlArray 线上路径图片数组对象
						//TODO
					} else {
						//用户没有上传图片的返回 code码为400
					}

					//可以在下面继续写提交代码
				});
			},
			resultUrl(e) {
				var news=e.map(item=>{
					return item.url
				})
				this.$emit("result",news);
				
			},
			delImg(e) {
				this.imgArr.splice(e, 1) //为删除图片数组的下标
			}
		}
	}
</script>

<style lang="scss" scoped>
.width{
	width: 102upx;
	height: 102upx;
}
</style>
