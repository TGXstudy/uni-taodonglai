<template>
	<view class="ddxq" v-html="content">
		消息详情
	</view>
</template>

<script>
	export default {
		data(){
			return{
				content:'',
				id:''
			}
		},
		onLoad(options){
			console.log(options)
			this.id=options.id;
			this.content=options.content;
			this.td()
		},
		methods:{
			td(){
				this.$api.readMsg({
					id:this.id
				}).then(res=>{
					console.log(res)
				})
			}
		}
	}
	
</script>

<style lang="scss" scoped>
.ddxq{
	padding: 10px;
	width: 100%;
}
</style>