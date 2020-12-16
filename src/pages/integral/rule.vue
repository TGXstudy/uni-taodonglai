<template>
	<view class="rule">
		<view class="rule-content" v-html="content">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ""
			}
		},
		onLoad(options) {
			this.rule()
		},
		methods: {
			rule(){
				this.$api.getArticle({
					article_id:'18'
				}).then(res=>{
					this.content=this.$mUtils.formatRichText(res.data.article_text);
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.rule {
		width: 100%;
		padding: 10px;
	}
</style>
