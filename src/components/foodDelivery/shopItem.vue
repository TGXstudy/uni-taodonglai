<template>
    <view class="container">
        <view class="main-item" v-for="(item, index) in shopList" :key="index" @click="toShopDetail(item)">
            <image :src="item.store_photos" mode="scaleToFill" />
            <view class="box-right">
                <view class="title">{{item.store_name}}</view>
                <view class="data">
                    <view class="data-star">
                        <image src="../../static/imgs/takeout/food-star.png" mode="" />
                        <text>{{item.star}}</text>
                    </view>
                    <text class="orderNum">月销 {{item.order_num}}</text>
                    <text class="far">{{item.distance}} km</text>
                </view>
                <view class="price">
                    <text>起送￥{{item.send_amount}}</text>
                    <text class="average">人均￥{{item.average_amount}}</text>
                </view>
                <view class="address">{{item.address}}</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            shopList: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        methods: {
            toShopDetail(shop) {
                this.$mUtils.goPage('shopDetail', {
                    shopInfo: JSON.stringify(shop)
                })
            },
        }
    }
</script>

<style lang="scss">
    .main-item {
        width: 701rpx;
        height: 230rpx;
        background: #FFFFFF;
        border-radius: 10rpx;
        margin-bottom: 20rpx;
        display: flex;
        align-items: center;

        image {
            margin-left: 30rpx;
            width: 200rpx;
            height: 166rpx;
        }

        .box-right {
            display: flex;
            flex-direction: column;
            margin-left: 30rpx;
            width: 417rpx;
            height: 166rpx;
            justify-content: space-between;

            .title {
                font-size: 34rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #333333;
            }

            .data {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .data-star {
                    display: flex;
                    align-items: center;
                    transform: translateX(-28rpx);

                    image {
                        width: 21rpx;
                        height: 21rpx;
                    }

                    text {
                        margin-left: 5rpx;
                        font-size: 24rpx;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: #F96C09;
                    }
                }

                .orderNum {

                    font-size: 22rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #666666;
                }

                .far {
                    font-size: 22rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #666666;
                }
            }

            .price {
                display: flex;
                align-items: center;

                .average {
                    margin-left: 25rpx;
                }

                text {
                    font-size: 22rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #666666;
                }
            }

            .address {
                font-size: 22rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
            }
        }
    }
</style>