<template>
	<!-- 积分商城 -->
	<view class="integral">
		<view class="bannar">
			<swiper class="swiper" indicator-color="#ccc" indicator-active-color="#fff" :indicator-dots="indicatorDots"
			 :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in lblist" :key="index">
					<image class="bannerimg" @tap="tzxq(item)" :src="item.banner_img"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="integral-top">
			<view class="Img">
				<image src="../../static/imgs/index/store.png" mode=""></image>
				<view class="allIntegral">
					{{user_score}}
				</view>
			</view>
			<view class="integralRules" @tap="$mUtils.goPage('rule')">
				<view>积分规则</view>
			</view>
		</view>
		<view class="like-goods">
			<view class="witness-list" v-for="(item,inx) in integrallist" :key="inx" @tap="faddish(item)">
			  <view class="witness-all">
			    <view class="witness-log">
			      <image :src="item.spu_img" mode="scaleToFill"></image>
			      <view class="witness-title">
			        {{ item.spu_name }}
			      </view>
			      <view class="priceList">
			        {{ item.score_price }}积分
			        <view class="del-line fn-cl-aaa fn-sz-20">
			          已售{{ item.sell_num }}
			        </view>
			      </view>
			    </view>
			  </view>
			</view>
		</view>
	</view>
</template>

<script>
	import LikeGoods from "@/components/index/LikeGoods.vue"
	export default {
		components: {
			LikeGoods
		},
		data() {
			return {
				//bannar数据
				banner_list: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				//积分列表
				integrallist: [],
				user_score:'',//积分总数
				page:1,
				lblist:[],
			}
		},
		onLoad() {
			this.get_scoreGoodsList()
			this.get_bannar();
		},
		methods: {
			tzxq(item) {
				console.log(item)
				if (item.link_type == 2) {
					this.$mRouter.push({
						route: this.$mRoutesConfig.goodsdetails,
						query: {
							spu_id: item.link_params
						}
					});
				} else if (item.link_type == 3) {
					this.$mRouter.push({
						route: this.$mRoutesConfig.autotrophy,
						query: {
							store_id: item.link_params
						}
					});
				} else if (item.link_type == 4) {
					this.$mRouter.push({
						route: this.$mRoutesConfig.customer_detail,
						query: {
							id: item.link_params,
							type:'1'
						}
					});
				} else {
					console.log('什么都meiy')
				}
			
			},
			//banner
			get_bannar(){
				this.$api.banner({
					position_id:'3'
				}).then(res=>{
					this.lblist=res.data;
				})
			},
			faddish(item){
				this.$mRouter.push({
				  route: this.$mRoutesConfig.integraldetails,
				  query:{
						detail:JSON.stringify(item)
				  }
				});
			},
			get_scoreGoodsList() {
				this.$api.scoreGoodsList({
					page:this.page,
					page_size:10
				}).then(res => {
					console.log(res)
					this.integrallist=res.data.data;
					this.user_score=res.data.user_score
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.integral {
		width: 100%;
		.like-goods{
			width: 100%;
			display: flex;
			justify-content: space-around;
		}
		.witness-list {
		  border-radius: 10upx;
		  display: flex;
		  .witness-all {
		    display: flex;
		    flex-wrap: wrap;
		    .witness-log {
		      width: 338upx;
		      // height: 493upx;
		      display: flex;
		      flex-direction: column;
		      display: block;
		      background: #ffffff;
		      border-radius: 10upx;
		      margin: 20upx 10upx 0upx;
		
		      image {
		        width: 338upx;
		        height: 300upx;
				  border-top-left-radius: 10rpx;
				  border-top-right-radius: 10rpx;
		      }
		
		      .witness-title {
		        font-size: 30px;
		        font-family: PingFang SC;
		        font-weight: 400;
		        color: #333333;
		        line-height: 36px;
		        font-size: 30upx;
		        font-family: PingFang SC;
		        font-weight: 400;
		        color: #333333;
		        line-height: 36upx;
		        // margin-top: 15upx;
		        padding: 20upx;
		      }
		
		      .priceList {
		        display: flex;
		        justify-content: space-between;
		        font-size: 24upx;
		        font-family: DIN;
		        font-weight: 500;
		        color: #ff4646;
		        line-height: 70upx;
		        padding: 0upx 20upx;
		
		        .del-line {
		          font-size: 20upx;
		          font-family: PingFang SC;
		          font-weight: 400;
		          color: #aaaaaa;
		          line-height: 70upx;
		        }
		      }
		    }
		  }
		}
		.bannar {
			width: 100%;
			height: 470rpx;
			justify-content: center;
		
			/deep/.swiper {
				// width: 700rpx;
				height: 470rpx;
				border-radius: 33px;
				
				margin: auto;
				box-shadow: 1px 1px 10px 1px #eee;
			}
		}
		.integral-top {
			width: 90%;
			display: flex;
			justify-content: space-between;
			margin: auto;
			margin-top: 10px;
			margin-bottom: 10px;
			.Img {
				display: flex;
				image {
					width: 42upx;
					height: 42upx;
				}
				.allIntegral {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #343434;
				}
			}
			.integralRules {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #9A9A9A;
			}
		}

	}
</style>
