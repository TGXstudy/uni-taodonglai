<template>
    <view class="container">
        <view class="shop" v-for="(item, index) in vuex_shopList" :key="index">
            <view class="shop-img">
                <image :src="item.store_photos" mode="scaleToFill" />
            </view>
            <view class="shop-info">
                <text>{{item.store_name}}</text>
                <view class="shop-star">
                    <text>{{item.star}}</text>
                    <image src="../../static/imgs/index/comment_star.png" mode="aspectFit" v-for="(it, idx) in ~~item.star" :key="idx"></image>
                </view>
                <view class="shop-data">
                    <text>收藏 {{item.collect_num}}</text>
                    <text>订单 {{item.order_num}}</text>
                </view>
            </view>
            <view class="shop-go" @click="toShop(item)">
                <text>进店逛逛</text>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        methods: {
            toShop(item) {
                if (item.type == 1) {
                    this.$mRouter.push({
                        route: this.$mRoutesConfig.autotrophy,
                        query: {
                            store_id: item.id,
                            longitude: '0',
                            latitude: '0'
                        },
                    });
                    return
                }
                this.$mUtils.goPage('shopDetail', {
                    shopInfo: JSON.stringify(item)
                })
            }
        }
    }
</script>

<style lang="scss">
    .container {
        width: 750rpx;
        display: flex;
        flex-direction: column;
        align-items: center;

        .shop {
            margin-top: 29rpx;
            width: 701rpx;
            display: flex;
            flex-direction: row;
        }

        .shop-img {
            width: 124rpx;
            height: 124rpx;
        }

        .shop-info {
            margin-left: 26rpx;
            width: 384rpx;

            text {
                font-size: 30rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #333333;
            }

            .shop-data {
                text {
                    font-size: 22rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #999999;
                    margin-right: 16rpx;
                }
            }

            .shop-star {
                margin-bottom: 10rpx;

                text {
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #333333;
                }

                image {
                    margin-top: 5rpx;
                    margin-left: 10rpx;
                    width: 24rpx;
                    height: 24rpx;
                }
            }
        }

        .shop-go {
            background-image: url('../../static/imgs/index/goShop.png');
            width: 168rpx;
            height: 59rpx;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30rpx;

            text {
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FA5D09;
            }
        }
    }
</style>