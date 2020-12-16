<template>
	<!-- 公告详情 -->
	<view class="details-notice">
		<view class="notice-title" v-html="content">
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:''
			}
		},
		onLoad(options){
			this.content=options.content;
			console.log(options)
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.details-notice{
		width: 100%;
		padding: 30upx;
		.notice-title{
			display: flex;
			flex-direction: column;
			
		}
	}
</style>
