<template>
	<view class="kfxq">
		<view class="title">
			<p>{{nav.title}}</p>
			<span>{{nav.create_time}}</span>
		</view>
		<view class="nav" v-html="content">
			
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				content:'',//问题
				id:'0',
				type:'0',
				nav:{}
			}
		},
		onLoad(options){
			this.id=this.options.id;
			this.type=this.options.type;
			this.getxq()
		},
		methods:{
			getxq(){
				this.$api.question_schooldetail({
					type:this.type,
					id: this.id,
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.content=this.$mUtils.formatRichText(res.data.content);
						this.nav=res.data;
					} else {
						this.$mUtils.toast(res.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.kfxq{
	width: 100%;
	padding: 20upx;
	.title{
		width: 100%;
		height: 50px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-bottom: 10px;
		p{
			font-size: 42upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}
		span{
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}
	}
}
</style>