<template>
	<!-- 拼团详情 -->
	<view class="groupdetails">
		<view class="bannar">
			<swiper class="swiper" indicator-color="#ccc" indicator-active-color="#fff" :indicator-dots="indicatorDots"
			 :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(lb,inx) in goodslist.spu_album" :key="inx">
					<image class="bannerimg" :src="lb"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="goodsdetails-seckill">
		    <view class="packet" v-if="red_packet">
		        <view class="packet-lf">
		            <image src="../../static/imgs/index/round_redpacket_fill.png" mode=""></image>
		            <view class="packet-name">点击领取商品红包</view>
		        </view>
		        <view class="packet-rt" @click="getRedPacket">
		            <view class="title"> 立即领取 </view>
		        </view>
		    </view>
		</view>
		<!-- 商品名字 -->
		<view class="goods-title">
			<view class="goods-name">{{goodslist.spu_name}}</view>
			<view class="goods-price">
				<view class="price">
					￥{{goodslist.min_price}}-{{goodslist.max_price}}
				</view>
				<text>已售{{goodslist.sell_num}}</text>
				<text>{{goodslist.produce_area}}</text>
			</view>
		</view>
		<!-- 快递服务 -->
		<view class="express">
			<view class="freight-free">
				<text class="fn-cl-999 fn-sz-28">快递</text>
				<text class="fn-cl-333 fn-sz-28">{{goodslist.shipping_fee==0?'免运费':goodslist.shipping_fee}}</text>
			</view>
			<view class="express-service">
				<text class="fn-cl-999 fn-sz-28">服务</text>
				<view class="guarantee" @click="showBottomVisible = true" type="bottom">
					<text class="fn-cl-333 fn-sz-28 margin-right-20" v-for="(ite,indx) in goodslist.service_label" :key="indx">{{ite.title}}</text>
					<image src="../../static/imgs/index/right.png" mode=""></image>
				</view>
			</view>
			<s-popup custom-class="bottom-popup" position="bottom" v-model="showBottomVisible">
				<view class="guarantee-all">
					<text class="title fn-cl-333 fn-bold fn-sz-36">服务保障</text>
					<view class="guarantee-center" v-for="(ite,indx) in goodslist.service_label" :key="indx">
						<view class="">
							<image src="../../static/imgs/index/ic_round_gou.png" mode=""></image>
						</view>
						<view class="guarantee-fade">
							<text class="fn-sz-28 fn-bold margin-bottom-20">{{ite.title}}</text>
							<text class="center">{{ite.content}}</text>
						</view>
					</view>
					<view class="go-pay" @click="btnoff">
						<text> 确定</text>
					</view>
				</view>
			</s-popup>
			<s-popup custom-class="center-popup" position="center" :beforeHide="beforeHide"></s-popup>
			<view class="express-service">
				<text class="fn-cl-999 fn-sz-28">规格</text>
				<view class="guarantee" @click="selectScale">
					<text class="fn-cl-333 fn-sz-28 margin-right-20">{{current.sku_name || '请选择规格'}}</text>
					<image src="../../static/imgs/index/right.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<!-- 拼团 -->
<!-- 		<view class="group-booking">
			<view class="participate-in">
				<view class="fn-cl-fa5 fn-sz-30 fn-sz-400">
					已成团{{goodslist.number}}个拼团
				</view>
				<view class="examine-group">
					<text class="fn-cl-fa5 fn-sz-24 margin-right-10" @tap="ckgd(goodslist.spu_id)">查看更多</text>
					<image src="../../static/imgs/index/right.png" mode=""></image>
				</view>
			</view>
			<view class="participate-info" v-for="(item,index) in goodslist.team_list" :key="index">
				<view class="participate-name">
					<image :src="item.member_avatar" mode=""></image>
					<text class="fn-sz-28 fn-cl-333">{{item.member_nickname}}</text>
				</view>
				<view class="go-group">
					<view class="fn-sz-22 fn-cl-333">参团时间：{{item.create_time}}</view>
					<view class="fn-sz-22 fn-cl-999">成团时间：{{item.finish_time}}</view>
				</view>
			</view>
		</view> -->
		<!-- 用户评价 -->
			<view class="good-estimate">
				<view class="Info-estimate fn-sz-30 fn-cl-333">
					<text>用户评价({{commentsNum}})</text>
					<view class="look-more" @click="lookMore">
						<text>查看更多</text>
						<image src="../../static/imgs/index/right.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="Info-list" v-for="(item, index) in comments" :key="index">
					<view class="user-estimate">
						<view class="user-list">
							<view class="name-estimate">
								<image :src="item.member_avatar" mode="aspectFit"></image>
								<view class="tiem-estimate">
									<text class="fn-sz-30 fn-cl-333">{{item.member_nickname}}</text>
									<text class="fn-sz-22 fn-cl-999 margin-top-10">{{item.create_time}}</text>
								</view>
							</view>
							<view class="estimate-grade">
								<text>{{~~item.star}}</text>
								<image src="../../static/imgs/index/comment_star.png" mode="aspectFit"  v-for="(i, ix) in ~~item.star" :key="ix"></image>
							</view>
						</view>
						<view class="evaluate-content">
							{{item.content}}
						</view>
						<view class="evaluate-reply" v-if="!item.reply==''">
							<text>商家回复:{{item.reply}}</text>
						</view>
					</view>
				</view>
			</view>
		<!-- 商品详情 -->
		<view class="goods-particulars">
			<text class="title-particulars">商品详情</text>
			<view class="goods-print" v-html="goodslist.spu_detail">
				
			</view>
		</view>
		<!-- 同类推荐 -->
		<view class="recommend">
			<image src="../../static/imgs/index/ic_goods_detail_tj.png" mode="aspectFit"></image>
			<view class="recommend-list">
				<like-goods v-for="(rfl, inx) in referrallist" :key="inx" :item="rfl"></like-goods>
			</view>
		</view>
		<view class="goods-cart">
			<submit-group :goodsInfo="goodslist" ref="submit" @scale="getScale"></submit-group>
		</view>
	</view>
</template>

<script>
	import submitGroup from "@/components/index/submitGroup";
	import ButtonAll from "@/components/index/ButtonAll.vue"
	import sPopup from '@/components/s-ui/s-popup';
	import LikeGoods from "@/components/index/LikeGoods.vue";
	export default {
		components: {
			ButtonAll,
			sPopup,
			submitGroup,
			LikeGoods
		},
		data() {
			return {
				//bannar数据
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				//蒙城
				showBottomVisible: false,
				//星星图片
				// imageStar: {
				// 	yellow: require('../../static/imgs/static/xinxin.png'),
				// 	gray: require('../../static/imgs/static/huixin.png')
				// },
				referrallist: [], //同类推荐
				banner_list: [], //banner商品详情轮播
				goodslist: {}, //商品详情
				spu_id:'',//店铺id
				comments: '',
				commentsNum: '',
				current: '',
				red_packet: '',
			}
		},
		onLoad(options) {
			this.get_referral() //同类推荐
			this.get_banner() //轮播
			this.spu_id=options.spu_id
			this.spu_type = options.spu_type
			this.get_goodsDetail(options) //商品详情
			this.get_pj();
		},
		methods: {
			lookMore() {
				this.$mUtils.goPage('commentList', {
					spu_id: this.spu_id,
				})
			},
			//领取红包
			async getRedPacket() {
			    await this.$api.getRedPacket({
			        id: this.red_packet.id
			    })
			    await this.get_goodsDetail(this.options)
			},
			selectScale() {
				this.$refs.submit.openPop()
			},
			getScale(val) {
				this.current = val
			},
			//获取评价
			get_pj(){
				this.$api.comments({
					spu_id:this.spu_id,
					page: '1',
					page_size: '5'
				}).then(res=>{
					this.comments = res.data.data
					this.commentsNum = res.data.total
					console.log(res,'评价列表')
				})
			},
			//查看更多
			ckgd(e){
				this.$mRouter.push({
				  route: this.$mRoutesConfig.groupmore,
				  query: {
				    spu_id: e,
				  },
				});
			},
			//获取商品详情banner
			get_banner() {
				this.$api.banner({
					position_id: '1'
				}).then(res => {
					if (res.code == 1) {
						this.banner_list = res.data.data
					}
				})
			},
			//获取商品详情
			get_goodsDetail(options) {
				this.$api.goodsDetail({
					spu_id: this.spu_id,
					spu_type: this.spu_type
				}).then(res => {
					console.log(res,'商品详情')
					if (res.code == 1) {
						this.goodslist = res.data;
						this.spu_id=res.data.spu_id;
						 this.red_packet = this.goodslist.red_packet;
						this.goodslist.spu_detail = this.$mUtils.rplaceRichImg(this.goodslist.spu_detail);
					}
				})
			},
			//点击进入店铺
			goshop() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.autotrophy,
					query: {
						// spu_id:this.spu_id,
						// spu_name:this.spu_name,
						// spu_img:this.spu_img,
						// sell_num:this.sell_num,
						// price:this.price,
						// spu_type:this.spu_type,
						// stock:this.stock
					}
				})
			},
			//蒙城
			beforeHide() {
				return new Promise((resolve, reject) => {
					uni.showModal({
						title: '提示',
						content: '确认关闭弹框吗',
						success: res => {
							if (res.cancel) {
								reject();
							} else {
								resolve();
							}
						}
					});
				});
			},
			//点击蒙城确定后关闭蒙城
			btnoff() {
				this.showBottomVisible = false
			},
			//同类推荐
			get_referral() {
				this.$api.goodsList({
					goods_list_type: "6",
					page: 1,
					page_size: 9,
					gc_level_1: this.gc_level_1,
				}).then(res => {
					if (res.code == 1) {
						this.referrallist = res.data.data

					} else {
						this.referrallist = this.referrallist.concat(res.data.data);
					}
				})
			},
		}
	}
</script>


<style lang="scss" scoped>
	.groupdetails {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #F6F6F6;
		position: relative;
		.goodsdetails-seckill {
		    justify-content: space-between;
		    // height: 500upx;
		    position: relative;
		
		    image {
		        height: 500upx;
		    }
		
		    .goodsdetails-Img {
		        display: flex;
		        justify-content: space-between;
		        padding: 30upx;
		        position: absolute;
		        top: 0;
		        left: 0;
		        width: 100%;
		
		        image {
		            width: 64upx;
		            height: 64upx;
		        }
		    }
		
		    .packet {
		        width: 100%;
		        display: flex;
		        justify-content: space-between;
		        height: 98upx;
		        background: #f6800a;
		
		        .packet-lf {
		            display: flex;
		            padding: 10upx 20upx;
		            height: 98upx;
		
		            image {
		                width: 78upx;
		                height: 78upx;
		            }
		
		            .packet-name {
		                height: 50upx;
		                font-size: 30upx;
		                font-family: PingFang SC;
		                font-weight: 500;
		                color: #ffffff;
		                margin: auto 20upx;
		            }
		        }
		
		        .packet-rt {
		            width: 172upx;
		            height: 63upx;
		            border: 2upx solid #ffffff;
		            border-radius: 32upx;
		            margin: auto 20upx;
		
		            .title {
		                font-size: 28upx;
		                font-family: PingFang SC;
		                font-weight: 500;
		                color: #ffffff;
		                text-align: center;
		                line-height: 60upx;
		            }
		        }
		    }
		
		    .skill-price {
		        width: 100%;
		        display: flex;
		        justify-content: space-between;
		        height: 98upx;
		        background: #f6800a;
		        padding: 0upx 20upx;
		
		        .skill-lf {
		            display: flex;
		            flex-direction: column;
		            justify-content: center;
		            align-content: center;
		
		            text {
		                text-align: center;
		            }
		        }
		
		        .skill-tiem {
		            display: flex;
		            flex-direction: column;
		            justify-content: center;
		            align-content: center;
		
		            text {
		                text-align: center;
		            }
		        }
		    }
		}
		.bannar {
			width: 100%;
			height: 320rpx;
			justify-content: center;

			/deep/.swiper {
				// width: 700rpx;
				height: 314rpx;
				border-radius: 33px;
				;
				margin: auto;
				box-shadow: 1px 1px 10px 1px #eee;
			}
		}

		.goods-title {
			display: flex;
			flex-direction: column;
			padding: 20upx;

			.goods-name {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.goods-price {
				display: flex;
				// justify-content: space-around;

				.price {
					width: 50%;
					font-size: 32upx;
					font-family: DIN;
					// font-weight: 500;
					color: #FF4646;
					line-height: 70upx;
					font-weight: bold;
				}

				text {
					width: 25%;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 70upx;
				}
			}
		}

		.express {
			width: 95%;
			margin: 0upx auto;
			background: #FFFFFF;
			border-radius: 10upx;
			display: flex;
			flex-direction: column;
			padding: 20upx;

			.freight-free {
				display: flex;
				justify-content: space-between;
			}

			.express-service {
				display: flex;
				justify-content: space-between;
				// height: 80upx;
				margin-top: 50upx;

				.guarantee {
					display: flex;

					image {
						width: 25upx;
						height: 25upx;
						justify-content: center;
						margin: auto;
						padding-top: 6upx;

					}
				}
			}

			.guarantee-all {
				display: flex;
				flex-direction: column;
				// padding: 30upx;
				position: relative;
				z-index: 5;

				.title {
					text-align: center;
				}

				.guarantee-center {
					display: flex;
					margin-top: 20upx;
					padding: 10upx 30upx;
					// margin-bottom: 40upx;

					image {
						width: 30upx;
						height: 30upx;
						display: block;
					}

					.guarantee-fade {
						display: flex;
						flex-direction: column;
						margin: auto 10upx;

						.center {
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
							line-height: 36upx;
						}
					}
				}
				.go-pay {
					background: #FFFFFF;
					height: 78upx;
					width: 100%;
					z-index: 10;
					padding: 30upx;

					text {
						width: 90%;
						height: 78upx;
						background: #F58D09;
						color: #FFFFFF;
						margin: 30upx auto 0upx;
						text-align: center;
						line-height: 78upx;
						border-radius: 50upx;
						position: fixed;
						bottom: 0;

					}
				}
			}


		}

		.group-booking {
			display: flex;
			flex-direction: column;
			padding: 30upx;
			background: #FFFFFF;
			width: 95%;
			margin: 30upx auto;

			.participate-in {
				display: flex;
				justify-content: space-between;
				margin: auto 0upx;

				.examine-group {
					display: flex;

					image {
						width: 12upx;
						height: 24upx;
						margin: auto;
						padding-bottom: 6upx;
					}
				}
			}
			.participate-info {
				display: flex;
				justify-content: space-between;
				margin: 30upx 0upx;
				margin-bottom: 0;
				.participate-name {
					display: flex;

					image {
						width: 82upx;
						height: 82upx;
						border-radius: 50%;
						margin: auto;
					}

					text {
						margin: auto 10upx;
					}
				}

				.go-group {
					display: flex;
					flex-direction: column;
					padding: 10upx 20upx;
				}
			}

		}

		.good-estimate {
			background: #FFFFFF;
			width: 95%;
			margin: 30upx auto;
			padding: 30upx;
			display: flex;
			flex-direction: column;

			.Info-estimate {
				display: flex;
				justify-content: space-between;

				.look-more {
					display: flex;

					image {
						width: 12upx;
						height: 22upx;
						margin: auto 10upx;
					}
				}
			}

			.Info-list {
				display: flex;
				flex-direction: column;
				margin-top: 20upx;

				.user-estimate {
					display: flex;
					flex-direction: column;

					.user-list {
						display: flex;
						justify-content: space-between;

						.name-estimate {
							display: flex;

							image {
								width: 82upx;
								height: 82upx;
								border-radius: 50%;
								margin: 0upx 10upx;
							}

							.tiem-estimate {
								display: flex;
								flex-direction: column;

							}
						}

						.estimate-grade {
							display: flex;
							margin: auto 0upx;
							font-size: 24upx;
							padding: 0upx 20upx;
							text {
								margin: 0upx 10upx;
							}
							image {
								width: 32upx;
								height: 32upx;
								margin: auto;

							}
						}
					}
					.evaluate-content {
						padding-left: 10px;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #343434;
						line-height: 70upx;
					}

					.evaluate-reply {
						width: 649upx;
						background: #F6F6F6;
						border-radius: 3upx;
						padding: 10upx;

						text {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #343434;
						}
					}
				}
			}
		}

		.goods-particulars {
			display: flex;
			flex-direction: column;
			margin-top: 20upx;

			.title-particulars {
				text-align: center;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #343434;
				// line-height: 70upx;
			}

			.goods-print {
				padding: 10upx 20upx;
				margin: auto;
			}
		}

		.recommend {
			margin-bottom: 40px;
			margin-top: 40upx;

			image {
				width: 221upx;
				height: 26upx;
				display: block;
				margin: auto;
			}

			.recommend-list {
				background: #F5F5F5;
				padding: 0 20upx;
				box-sizing: border-box;
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				flex: 1;
			}
		}
		.goods-cart {
			width: 100%;
			background-color: #FFFFFF;
			padding: 10upx 0upx;
			// position: fixed;
			// bottom: 0;
		}
		.bottom-popup {
			// display: flex;
			// flex-direction: column;
			.s-popup-wrapper {
				// height: 400upx;
			}
			/* #ifdef H5 */
			/deep/ .s-popup-wrapper {
				height: 1000upx;
				border-radius: 20upx 20upx 0upx 0upx;
			}
			/*  #endif  */
			.center-popup {
				.s-popup-wrapper {
					width: 500upx;
					height: 600upx;
				}
				/* #ifdef H5 */
				/deep/ .s-popup-wrapper {
					width: 500upx;
					height: 500upx;
				}

				/*  #endif  */
			}
		}
	}
</style>
