<template>
	<view class="sjxx" v-html="content">
		商家入驻协议
	</view>
</template>

<script>
	export default {
		data(){
			return{
				content:'',//内容
			}
		},
		onLoad(){
			this.xy()
		},
		methods:{
			xy(){
				this.$api.getArticle({
					article_id:'19'
				}).then(res=>{
					this.content=this.$mUtils.formatRichText(res.data.article_text);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.sjxx{
	width: 100%;
	padding: 20upx;
}
</style>
