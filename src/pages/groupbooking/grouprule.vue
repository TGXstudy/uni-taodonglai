<template>
	<view class="ptt" v-html="content">
		
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
			this.rule()
		},
		methods:{
			rule(){
				this.$api.getArticle({
					article_id:'20'
				}).then(res=>{
					this.content=this.$mUtils.formatRichText(res.data.article_text);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.ptt{
	width: 100%;
	padding: 10px;
}
</style>