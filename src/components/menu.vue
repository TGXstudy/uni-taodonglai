<template>
    <view class="u-menu-wrap">
        <scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
            <view v-for="(item, index) in goodsList" :key="index" class="u-tab-item" :class="[current == index ? 'u-tab-item-active' : '']" :data-current="index" @tap.stop="swichMenu(index)">
                <text class="u-line-1">{{ item.gc_name }}</text>
            </view>
        </scroll-view>
        <block v-for="(item, index) in goodsList" :key="index">
            <scroll-view scroll-y class="right-box" v-if="current == index">
                <view class="page-view">
                    <view class="class-item">
                        <view class="item-container">
                            <view class="thumb-box" v-for="(item1, index1) in item.list" :key="index1">
                                <view class="item-box">
                                    <image class="item-menu-image" :src="item1.goods_img" mode="aspectFit"></image>
                                    <view class="item-menu-data">
                                        <view class="data-head">
                                            <view class="item-menu-name">{{item1.goods_name}}</view>
                                            <text>销量 {{item1.sell_num}}</text>
                                        </view>
                                        <view class="data-footer">
                                            <text>￥ {{item1.goods_price}}</text>
                                            <u-number-box v-model="item1.num" @change="valChange(item1)" :min="0" :input-width="60" :input-height="40">
                                            </u-number-box>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </block>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                scrollTop: 0, //tab标题的滚动条位置
                current: 0, // 预设当前项的值
                menuHeight: 0, // 左边菜单的高度
                menuItemHeight: 0, // 左边菜单item的高度
                current: 0,
                number: 0
            }
        },
        props: {
            goodsList: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        mounted() {
            console.log(this.goodsList)
        },
        methods: {
            // 点击左边的栏目切换
            async swichMenu(index) {
                if (index == this.current) return;
                this.current = index;
                // 如果为0，意味着尚未初始化
                if (this.menuHeight == 0 || this.menuItemHeight == 0) {
                    await this.getElRect("menu-scroll-view", "menuHeight");
                    await this.getElRect("u-tab-item", "menuItemHeight");
                }
                // 将菜单菜单活动item垂直居中
                this.scrollTop =
                    index * this.menuItemHeight +
                    this.menuItemHeight / 2 -
                    this.menuHeight / 2;
            },
            // 获取一个目标元素的高度
            getElRect(elClass, dataVal) {
                new Promise((resolve, reject) => {
                    const query = uni.createSelectorQuery().in(this);
                    query
                        .select("." + elClass)
                        .fields({
                                size: true,
                            },
                            (res) => {
                                // 如果节点尚未生成，res值为null，循环调用执行
                                if (!res) {
                                    setTimeout(() => {
                                        this.getElRect(elClass);
                                    }, 10);
                                    return;
                                }
                                this[dataVal] = res.height;
                            }
                        )
                        .exec();
                });
            },
            valChange(goods) {
                this.$emit('chooseGoods', goods)
            }
        },
    }
</script>

<style lang="scss">
    .u-menu-wrap {
        flex: 1;
        display: flex;
        overflow: hidden;
        width: 750rpx;
        height: 58vh;
    }

    .u-tab-view {
        width: 200rpx;
        height: 54vh !important;
    }

    .u-tab-item {
        height: 110rpx;
        background: #f6f6f6;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26rpx;
        color: #444;
        font-weight: 400;
        line-height: 1;
    }

    .u-tab-item-active {
        position: relative;
        color: #000;
        font-size: 30rpx;
        font-weight: 600;
        background: #fff;
    }

    // .u-tab-item-active::before {
    //     content: "";
    //     position: absolute;
    //     border-left: 4px solid $u-type-primary;
    //     height: 32rpx;
    //     left: 0;
    //     top: 39rpx;
    // }

    .u-tab-view {
        height: 100%;
    }

    .right-box {
        background-color: rgb(250, 250, 250);
    }

    .page-view {
        padding: 16rpx;
    }

    .class-item {
        margin-bottom: 30rpx;
        background-color: #fff;
        padding: 16rpx;
        border-radius: 8rpx;
    }

    .item-title {
        font-size: 26rpx;
        color: $u-main-color;
        font-weight: bold;
    }

    .item-menu-name {
        font-weight: normal;
        font-size: 24rpx;
        color: $u-main-color;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        // line-height: 90rpx;
    }

    .item-container {
        display: flex;
        flex-wrap: wrap;
    }

    .thumb-box {
        width: 234rpx;
        width: 560rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        // margin-top: 30rpx;
        // margin-right: 11rpx;
    }

    .item-box {
        border-bottom: 1rpx solid #E5E5E5;
        display: flex;
        align-items: center;
        width: 100%;
        height: 240rpx;
    }

    .item-menu-data {
        margin-left: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 180rpx;
    }

    .data-head {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 40rpx;

        text {
            font-size: 22rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 30rpx;
            margin-top: 10rpx;
        }
    }

    .data-footer {
        display: flex;
        width: 360rpx;
        justify-content: space-between;
        align-items: center;

        text {
            font-size: 30rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FF4646;
            line-height: 30rpx;
        }
    }

    .item-menu-image {
        width: 180rpx;
        height: 180rpx;
    }
</style>