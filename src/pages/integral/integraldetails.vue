<template>
	<!-- 积分详情 -->
	<view class="integraldetails">
		<view class="integraldetails" v-html="content">
			
		</view>
		<view class="tab-btn">
			<!-- 立即兑换按钮 -->
			<view class="integral">
				<view class="all-number fn-cl-999 fn-sz-30">
					所需积分<text class="fn-sz-28 fn-cl-fa5">{{xx_detail.score_price}}</text>积分
				</view>
				<view class="conversion"  @tap="ljdh(xx_detail)">立即兑换</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xx_detail:{},
				content:''
			}
		},
		onLoad(options) {
			let a=JSON.parse(options.detail)
			this.xx_detail=a;
			this.content=this.$mUtils.formatRichText(this.xx_detail.spu_detail);
		},
		methods: {
			ljdh(e){
				this.$mRouter.push({
				  route: this.$mRoutesConfig.jf_list,
				  query:{
						detail:JSON.stringify(e)
				  }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.integraldetails{
		width: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 10upx;
		.tab-btn{
		width: 100%;
		position: fixed;
		bottom: 0;
		.integral {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #FFFFFF;
			padding-top: 10px;
			padding-bottom: 10px;
			.all-number {
				margin-bottom: 20upx;
			}
			.conversion {
				width: 90%;
				border-radius: 40upx;
				height: 78upx;
				text-align: center;
				line-height: 78upx;
				color: #FFFFFF;
				background: #f7780a;
				margin: auto;
			}
		}
		}
	}
</style>
