<template>
	<view class="feedback">
		<textarea v-model="content" placeholder="请输入您的建议，（不少于10个字）" class="input" type="text" value="" />
		<button class="cx_sq" @tap="tj()">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:""
			}
		},
		methods: {
			tj(){
				if(this.content.length<10){
					this.$mUtils.toast('输入内容不少于10个字');
					return
				}
				this.$api.service_back({
					serb_content:this.content
				}).then(res=>{
					if(res.code==1){
						this.$mUtils.toast(res.msg);
						this.$mUtils.timeout(() => {
							this.content="";
							this.$mRouter.back();
						})
						
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.feedback{
		.cx_sq {
			width: 95%;
			margin: 0 auto;
			margin-top: 30px;
			height: 50px;
			font-size: 38upx;
			line-height: 50px;
			background: linear-gradient(90deg, rgba(255, 85, 0, 1), rgba(255, 114, 0, 1));
			border: 1px solid rgba(238, 238, 238, 1);
			border-radius: 44px;
			color: #fff;
		}
		.input{
			width: 100%;
			height: 200px;
			background-color: #fff;
			padding: 10px;
			text-align: top;
			text-indent: 10px;
		}
		width: 100%;
		display: flex;
		flex-direction: column;
		background:rgba(246,246,246,1);
	}
</style>
