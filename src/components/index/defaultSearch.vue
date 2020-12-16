<template>
	<view class="default">
        <view class="witness">
            <view class="title"> 大家都在搜索 </view>
            <view class="witness-list">
                <view class="witness-all">
                    <view class="witness-log" v-for="(item, index) in hotList" :key="index">
                        <view class="witness-title" @tap="wordSearch(item)">
                            {{ item }}
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="witness1" v-if="recordList && recordList.length !== 0">
            <view class="title1">
                <text>搜索记录</text>
                <image src="../../static/imgs/index/delete.png" mode="aspectFit" @click="delAll"></image>
            </view>
            <view class="witness-list1">
                <view class="witness-all1">
                    <view class="witness-log1" v-for="(item, index) in recordList" :key="index">
                        <view class="witness-title1">
                            {{ item }}
                            <image src="../../static/imgs/index/close.png" mode="aspectFit" @click="delWord(item)"></image>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>



<script>
	export default {
		data() {
			return {
				hotList: [],
				recordList: [],
			};
		},

		async mounted() {
			await this.init();
		},
		methods: {
			async init() {
				await Promise.all([this.getHotSearch(), this.getRecordList()]);	
			},
			async getHotSearch() {
				const { data } = await this.$api.getHotSearch();
				this.hotList = data.hot_words;
			},
			async getRecordList() {
				this.recordList = uni.getStorageSync("lifeData").vuex_searchRecord;
			},
			async wordSearch(item) {
                let data = item
                this.$u.vuex("vuex_searchWord", data);
                await this.doSearch(data)
			},
			async saveSearch(item) {
                let arr = uni.getStorageSync("lifeData").vuex_searchRecord || [];
                arr.push(item);
                this.$u.vuex("vuex_searchRecord", arr);                
			},
			async doSearch(item) {
				console.log("搜索");
				const { data } = await this.getGoodsList(item);
				this.$u.vuex("vuex_searchList", data.data);
				await this.saveSearch(item);
			},
			async getGoodsList(word) {
				const res = await this.$api.goodsList({
					goods_list_type: "4",
					spu_name: word,
				});
				return res;
            },
            async delWord(item) {
                console.log(item)
                let index = this.recordList.indexOf(item)
				this.recordList.splice(index, 1)
                this.$u.vuex("vuex_searchRecord", this.recordList)
            },
			async delAll() {
				this.recordList = []
				this.$u.vuex("vuex_searchRecord", [])
			}
		},
	};
</script>

<style lang="scss">
	.default {
		width: 100%;
		display: flex;
		flex-direction: column;

		.witness {
			width: 100%;
			margin-top: 30rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.title {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #aaaaaa;
				padding: 30upx;
			}

			.witness-list {
				// height: 400rpx;
				border-radius: 10rpx;
				padding: 10rpx;

				.witness-all {
					display: flex;
					flex-wrap: wrap;
					flex: 1;

					.witness-log {
						width: 158upx;
						text-align: center;
						background: #ffffff;
						display: block;
						margin-left: 15rpx;
						margin-top: 20rpx;
						padding-top: 10rpx;
					}

					.witness-title {
						display: flex;
						width: 158upx;
						height: 58upx;
						background: #f6f6f6;
						border-radius: 29px;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
						justify-content: center;
						line-height: 58upx;
					}
				}
			}
		}

		.witness1 {
			width: 100%;
			margin-top: 30rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.title1 {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				padding: 30upx;
				display: flex;
				justify-content: space-between;

				image {
					width: 50upx;
					height: 50upx;
				}
			}

			.witness-list1 {
				// height: 400rpx;
				border-radius: 10rpx;
				padding: 10rpx;

				.witness-all1 {
					display: flex;
					flex-wrap: wrap;
					flex: 1;

					.witness-log1 {
						width: 158upx;
						text-align: center;
						background: #ffffff;
						display: block;
						margin-left: 15rpx;
						margin-top: 20rpx;
						padding-top: 10rpx;
					}

					.witness-title1 {
						display: flex;
						width: 158upx;
						height: 58upx;
						background: #f6f6f6;
						border-radius: 29px;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
						justify-content: center;
						line-height: 58upx;

						image {
							width: 18upx;
							height: 18upx;
							margin: auto 0upx auto 10upx;
						}
					}
				}
			}
		}
	}
</style>