<template>
	<!-- 商品详情页面 -->
	<view class="goodsdetails">
		<!-- 轮播 -->
		<view class="bannar">
			<swiper class="swiper" indicator-color="#ccc" indicator-active-color="#fff" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(lb, inx) in goodslist.spu_album" :key="inx">
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
			<view class="skill-price" v-if="spu_type == 3">
				<view class="skill-lf">
					<text class="fn-sz-28 fn-cl-fff">秒杀价</text>
					<text class="fn-sz-36 fn-bold fn-cl-fff">￥{{goodsPrice}}</text>
				</view>
				<view class="skill-tiem">
					<!-- <text class="title fn-sz-28 fn-cl-fff"> 距结束仅剩 </text> -->
					<text class="title fn-sz-36 fn-bold fn-cl-fff">{{countDown}}</text>
				</view>
			</view>
		</view>
		<!-- 商品名字 -->
		<view class="goods-title">
			<view class="goods-name">{{ goodslist.spu_name }}</view>
			<view class="goods-price">
				<view class="price">
					<span>￥</span>{{goodsPrice}}
				</view>
				<text class="price-sell">已售{{ goodslist.sell_num }}</text>
				<text class="price-area">{{ goodslist.produce_area }}</text>
			</view>
		</view>
		<!-- 快递服务 -->
		<view class="main">
			<view class="express">
				<view class="freight-free">
					<text class="fn-cl-999 fn-sz-28">快递</text>
					<text class="fn-cl-333 fn-sz-28">{{deliveryFee}}</text>
				</view>
				<view class="express-service">
					<text class="fn-cl-999 fn-sz-28">服务</text>
					<view class="guarantee" @click="showBottomVisible = true" type="bottom">
						<view class="service">
							<text class="fn-cl-333 fn-sz-28 margin-right-20" v-for="(ite, indx) in goodslist.service_label" :key="indx">{{ite.title}}</text>
						</view>
						<image src="../../static/imgs/index/right.png" mode="aspectFit"></image>
					</view>
				</view>
				<s-popup custom-class="bottom-popup" position="bottom" v-model="showBottomVisible">
					<view class="guarantee-all">
						<text class="title fn-cl-333 fn-bold fn-sz-36">服务保障</text>
						<view class="guarantee-center" v-for="(ite, indx) in goodslist.service_label" :key="indx">
							<view class="">
								<image src="../../static/imgs/index/ic_round_gou.png" mode="aspectFit"></image>
							</view>
							<view class="guarantee-fade">
								<text class="fn-sz-28 fn-bold margin-bottom-20">{{ ite.title }}</text>
								<text class="center">{{ ite.content }}</text>
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
			<!-- 进店逛逛 -->
			<view class="Into-shop">
				<view class="Into-picture">
					<image :src="dp.logo" mode="scaleToFill"></image>
					<view class="Info-title">
						<view class="Info-autotrophy">
							<image v-if="dp.store_id=='0'" src="../../static/imgs/index/ziying.png" mode="aspectFit"></image>
							<text class="fn-sz-30 fn-cl-333">{{
								dp.store_name
							}}</text>
						</view>
						<view class="Info-autotrophy">
							<text class="fn-sz-22" style="margin-left:2rpx;margin-right:8rpx">{{~~star}}</text>
							<image src="../../static/imgs/index/comment_star.png" mode="aspectFit" v-for="(item, index) in ~~star" :key="index" style="margin-top:3rpx;margin-right:-15rpx"></image>
						</view>
						<view class="Info-autotrophy">
							<text class="fn-sz-22 fn-cl-999">收藏 {{ goodslist.is_collect }}</text>
							<text class="fn-sz-22 fn-cl-999 margin-left-40">订单{{goodslist.sell_num}}</text>
						</view>
					</view>
				</view>
				<view class="go-store">
					<view class="store-btn" @tap="goshop(dp)"> 进店逛逛 </view>
				</view>
			</view>
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
								<view class="start-container">
									<image src="../../static/imgs/index/comment_star.png" mode="aspectFit" v-for="(i,index) in ~~item.star" :key="index"></image>
								</view>
							</view>
						</view>
						<view>
							<view class="evaluate-content">
								{{item.content}}
							</view>
							<view class="evaluate-reply" v-if="item.reply">
								<text>{{item.reply}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="goods-particulars">
			<text class="title-particulars">商品详情</text>
			<view class="goods-print">
				<jyf-parser :html="goodslist.spu_detail"></jyf-parser>
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
			<submit-group v-if="this.spu_type == 2 && rendFlag" :goods-info="goodslist" ref="submit" @scale="getScale"></submit-group>
			<submit-bar v-if="this.spu_type == 1 && rendFlag" :goods-info="goodslist" ref="submit" @scale="getScale"></submit-bar>
			<submit-now v-if="this.spu_type == 3 && rendFlag" :goods-info="goodslist" ref="submit" @scale="getScale"></submit-now>
		</view>
	</view>
</template>

<script>
	import LikeGoods from "@/components/index/LikeGoods.vue";
	import sPopup from "@/components/s-ui/s-popup";
	import parser from "@/components/jyf-parser/jyf-parser";
	import submitBar from "@/components/index/submitBar.vue";
	import submitGroup from "@/components/index/submitGroup";
	import submitNow from "@/components/index/submitNow"
	import getUrlParam from "../../common/js/getUrlParam"
	export default {
		components: {
			LikeGoods,
			sPopup,
			"jyf-parser": parser,
			submitBar,
			submitGroup,
			submitNow
		},
		data() {
			return {
				//bannar数据
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				showBottomVisible: false,
				referrallist: [], //同类推荐
				banner_list: [], //banner商品详情轮播
				goodslist: {}, //商品详情
				spu_id: "", //商品id
				spu_type: "", //商品值
				spu_name: "", //商品名字
				sku: [],
				dp: {}, //店铺详情
				gc_level_1: '',
				fwbq: [], //服务标签
				type: {
					1: 'submit-bar',
					2: 'submit-group',
					3: 'submit-now'
				},
				current: '',
				star: '',
				comments: '',
				commentsNum: '',
				red_packet: '',
				countDown: '',
				endTime: 0,
				options: {},
				starttime: '',
				rendFlag: false
			};
		},
		onLoad(options) {
			this.spu_id = options.spu_id;
			this.spu_type = options.spu_type;
			this.options = options
			console.log(options)
			Promise.all([this.get_goodsDetail(options), this.get_referral(), this.getComment(), this.getOpenid()])
		},
		methods: {
			//获取商品详情
			async get_goodsDetail(options) {
				const res = await this.$api.goodsDetail({
					spu_id: options.spu_id,
					spu_type: options.spu_type,
				});
				this.goodslist = res.data;
				this.spu_type = res.data.spu_type;
				this.rendFlag = true
				this.dp = res.data.store_base;
				this.gc_level_1 = res.data.gc_level_1;
				this.fwbq = res.data.service_label;
				this.endTime = res.data.sec_start_time;
				this.starttime = res.data.sec_start_time;
				this.goodslist.spu_detail = this.$mUtils.rplaceRichImg(
					this.goodslist.spu_detail
				);
				this.sku = this.goodslist.sku;
				this.star = this.goodslist.store_base.star
				this.red_packet = this.goodslist.red_packet
			},
			async getComment() {
				const { data } = await this.$api.comments({
					spu_id: this.spu_id,
					page: '1',
					page_size: '4'
				})
				console.log(data)
				this.comments = data.data
				this.commentsNum = data.total
			},
			async getOpenid() {
				if (this.vuex_code && this.vuex_code == getUrlParam.getUrlParam('code')) return
				if (getUrlParam.getUrlParam('code')) {
					const res = await this.$api.getOpenid({
						code: getUrlParam.getUrlParam('code'),
						client: 'gzh'
					})
					this.$u.vuex('openId', res.data.openid)
					console.log(this.openId, '授权成功')
					return
				}
				console.log('还没有进入授权')
			},
			//领取红包
			async getRedPacket() {
				await this.$api.getRedPacket({
					id: this.red_packet.id
				})
				await this.get_goodsDetail(this.options)
			},
			//点击进入店铺
			goshop(e) {
				console.log(typeof (e.store_id))
				console.log(typeof (e.lon))
				console.log(typeof (e.lon))
				this.$mRouter.push({
					route: this.$mRoutesConfig.autotrophy,
					query: {
						store_id: e.store_id,
						longitude: e.lon,
						latitude: e.lat,
						store_name: e.store_name,
						service_mobile: e.service_mobile,
					},
				});
			},
			//蒙城
			beforeHide() {
				return new Promise((resolve, reject) => {

					// eslint-disable-next-line no-undef
					uni.showModal({
						title: "提示",
						content: "确认关闭弹框吗",
						success: (res) => {
							if (res.cancel) {
								reject();
							} else {
								resolve();
							}
						},
					});
				});
			},
			//点击蒙城确定后关闭蒙城
			btnoff() {
				this.showBottomVisible = false;
			},
			//同类推荐
			async get_referral() {
				this.$api
					.goodsList({
						goods_list_type: "6",
						page: 1,
						page_size: 10,
						gc_level_1: this.gc_level_1,
					})
					.then((res) => {
						if (res.code == 1) {
							this.referrallist = res.data.data;
						} else {
							this.referrallist = this.referrallist.concat(
								res.data.data
							);
						}
					});
			},
			selectScale() {
				this.$refs.submit.openPop()
			},
			getScale(val) {
				this.current = val
			},
			//倒计时
			initTimer() {
				let that = this;
				this.timer = setInterval(() => {
					var nowTime = new Date(),
						//endTime = this.endTime*1000;
						endTime = Number(this.endTime + 3600) * 1000;
					var b = nowTime.getTime()
					// console.log(b, '现在')
					// console.log(this.starttime * 1000, '开始时间')
					// console.log(endTime, '结束时间')
					if (b < this.starttime * 1000) {
						var lefttime = this.starttime * 1000 - nowTime.getTime(), //距离结束时间的毫秒数
							lefth = Math.floor(((lefttime - 0) / (1000 * 60 * 60))), //计算小时数
							leftm = Math.floor(((lefttime - 0) / (1000 * 60)) % 60), //计算分钟数
							lefts = Math.floor(((lefttime - 0) / 1000) % 60); //计算秒数
						// console.log('开始倒计时---------------lefts', lefts,lefttime)
						var a = (lefth < 10 ? '0' + lefth : lefth) + ':' + (leftm < 10 ? '0' + leftm : leftm) + ':' + (lefts < 10 ? '0' + lefts : lefts);
						that.countDown = '距开始仅剩' + a
					}
					else if (b > that.starttime) {
						var lefttime = endTime - nowTime.getTime(), //距离结束时间的毫秒数
							lefth = Math.floor(((lefttime - 0) / (1000 * 60 * 60))), //计算小时数
							leftm = Math.floor(((lefttime - 0) / (1000 * 60)) % 60), //计算分钟数
							lefts = Math.floor(((lefttime - 0) / 1000) % 60); //计算秒数
						// console.log('开始倒计时---------------lefts', lefts,lefttime)
						var a = (lefth < 10 ? '0' + lefth : lefth) + ':' + (leftm < 10 ? '0' + leftm : leftm) + ':' + (lefts < 10 ? '0' + lefts : lefts);
						var a = (lefth < 10 ? '0' + lefth : lefth) + ':' + (leftm < 10 ? '0' + leftm : leftm) + ':' + (lefts < 10 ? '0' + lefts : lefts);
						that.countDown = '距结束仅剩' + a
					}
					else {
						clearInterval(this.timer)
						that.countDown = '秒杀已结束'
						return;
					}
				}, 1000)
			},
			clearTimer() {
				// 清除定时器
				console.log(this.timer, '清除定时器成功')
				clearInterval(this.timer);

			},
			lookMore() {
				this.$mUtils.goPage('commentList', {
					spu_id: this.spu_id,
				})
			}
		},
		computed: {
			goodsPrice() {
				if (this.current.sku_name) {
					return `${this.current.sku_price}`
				}
				return `${this.goodslist.min_price}-${this.goodslist.max_price}`
			},
			deliveryFee() {
				if (this.goodslist.shipping_fee == '0.00') {
					return `免运费`
				}
				return `￥${this.goodslist.shipping_fee}`
			}
		},
		created() {
			this.initTimer()
		},
		beforeDestroy() {
			console.log('组件销毁');
			this.clearTimer();
		},
	};
</script>

<style lang="scss" scoped>
	.content {
		width: 738rpx;
		margin-left: 6rpx;
	}

	.main {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.goodsdetails {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #f6f6f6;
		position: relative;
		overflow-x: hidden;
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

		.Allbannar {
			width: 100%;
			background: #f6800a;
		}

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

		.goods-title {
			display: flex;
			flex-direction: column;
			width: 95%;
			margin: 0 auto;
			.goods-name {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.goods-price {
				width: 750rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.price {
					font-size: 36rpx;
					font-family: DIN;
					font-weight: 500;
					color: #ff4646;
					line-height: 70rpx;

					span {
						font-size: 24rpx;
						font-family: DIN;
						font-weight: 500;
						color: #ff4646;
						line-height: 70rpx;
					}
				}

				.price-sell {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 70rpx;
				}

				.price-area {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 70rpx;
					margin-right: 46rpx;
				}
			}
		}

		.express {
			width: 701rpx;
			// margin: 0upx auto;
			background: #ffffff;
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

					.service {
						display: flex;
						justify-content: center;
						align-items: center;
					}

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
				margin-top: 44rpx;
				// padding: 30upx;
				// position: relative;
				// z-index: 5;

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
					background: #ffffff;
					height: 78upx;
					width: 100%;
					z-index: 10;
					padding: 30upx;

					text {
						width: 90%;
						height: 78upx;
						background: #f58d09;
						color: #ffffff;
						margin: 30upx auto 0upx;
						text-align: center;
						line-height: 78upx;
						border-radius: 50upx;
						position: fixed;
						bottom: 20rpx;
					}
				}
			}
		}

		.Into-shop {
			display: flex;
			justify-content: space-between;
			height: 178rpx;
			background: #ffffff;
			border-radius: 10rpx;
			width: 701rpx;
			margin-bottom: 20rpx;
			margin-top: 20rpx;
			align-items: center;

			.Into-picture {
				display: flex;
				margin-left: 29rpx;

				image {
					width: 124upx;
					height: 124upx;
					border-radius: 10rpx;
				}

				.Info-title {
					display: flex;
					flex-direction: column;
					margin-left: 20upx;

					.Info-autotrophy {
						display: flex;
						margin-top: 10upx;

						image {
							margin-top: 6rpx;
							margin-left: 2rpx;
							margin-right: 5rpx;
							width: 48upx;
							height: 28upx;
						}
					}
				}
			}

			.go-store {
				margin-right: 23rpx;

				.store-btn {
					width: 163upx;
					height: 62upx;
					border: 2upx solid #f6830a;
					border-radius: 31upx;
					margin: auto 0upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #fa600a;
					text-align: center;
					line-height: 62upx;
				}
			}
		}

		.good-estimate {
			background: #ffffff;
			width: 701rpx;
			// margin: 30upx auto;
			padding: 30upx;
			display: flex;
			border-radius: 10rpx;
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
							width: 160rpx;
							display: flex;
							align-items: center;
							font-size: 24upx;
							margin-top: 0rpx;
							justify-content: flex-start;

							text {
								margin-right: 10rpx;
							}
							.start-container {
								display: flex;
								image {
									width: 24upx;
									height: 24upx;
									margin: auto;
								}
							}
						}
					}

					.evaluate-content {
						margin-left: 20rpx;
						width: 600rpx;
						margin-top: 20upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #343434;
						line-height: 70upx;
					}

					.evaluate-reply {
						width: 649upx;
						background: #f6f6f6;
						border-radius: 5upx;
						padding: 25upx;

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
			margin-top: 50upx;

			.title-particulars {
				align-self: center;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #343434;
				margin-top: -30rpx;
				margin-bottom: 20rpx;
			}

			.goods-print {
				width: 701rpx;
				align-self: center;
			}
		}

		.recommend {
			margin-bottom: 400upx;
			margin-top: 40upx;

			image {
				width: 221upx;
				height: 26upx;
				display: block;
				margin: auto;
			}

			.recommend-list {
				background: #f5f5f5;
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
			// margin-top: 30upx;
			width: 100%;
			// height: 100upx;
			background-color: #ffffff;
			padding: 10upx 0upx;
			position: fixed;
			bottom: 0;
		}

		.bottom-popup {
			// display: flex;
			// flex-direction: column;

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
