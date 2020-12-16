<template>
	<view class="gy" v-html="content">
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
					content:''//详细内容
			}
		},
		onLoad(){
			this.$api.getArticle({
				article_id:'16'
			}).then(res=>{
				this.content=this.$mUtils.formatRichText(res.data.article_text);
				console.log(res)
			})
		}
	}
</script>

<style lang="scss" scoped>
	.gy{
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 10px;
	}
</style>