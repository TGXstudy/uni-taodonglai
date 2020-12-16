<template>
	<view class="yhqy" v-html="content">
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				content:''
			}
		},
		onLoad(){
			this.$api.getArticle({
				article_id:'15'
			}).then(res=>{
				this.content=this.$mUtils.formatRichText(res.data.article_text);
			})
		},
		methods:{
			
		}
	}
	
</script>

<style lang="scss" scoped>
.yhqy{
	width: 100%;
	padding: 20upx;
}
</style>