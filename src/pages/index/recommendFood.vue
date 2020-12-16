<template>
   <view class="container">
      <u-navbar :is-back="true" title="" :background="background" title-color="white" :border-bottom="false">
         <view class="slot-wrap" @click="init">
            <view class="slot-left">
               <image src="../../static/imgs/takeout/poi.png" mode="" class="poi" />
               <text>{{headPoi}}...</text>
            </view>
            <view class="slot-middle">
               <text class="title">{{title}}</text>
            </view>
         </view>
      </u-navbar>
      <view class="select">
         <u-tabs :list="option" :is-scroll="false" :current="current" @change="change" active-color="#FF4646"></u-tabs>
      </view>
      <view class="main">
         <shop-item :shop-list="shopList"></shop-item>
      </view>
   </view>
</template>

<script>
   import shopItem from '../../components/foodDelivery/shopItem'
   export default {
      async onLoad(options) {
         this.init()
      },
      components: {
         shopItem
      },
      data() {
         return {
            background: {
               backgroundImage: 'linear-gradient(-90deg, #FB5509, #F58D0A)'
            },
            title: '推荐外卖',
            option: [{
                  id: 1,
                  name: '距离',
               },
               {
                  id: 2,
                  name: '评分'
               },
               {
                  id: 3,
                  name: '销量'
               },
               {
                  id: 4,
                  name: '优惠活动'
               }
            ],
            current: 0,
            industry_id: '',
            longitude: '',
            latitude: '',
            headPoi: '',
            shopList: [],
            latitude: '',
            longitude: ''
         }
      },
      methods: {
         init() {
            const that = this
            uni.chooseLocation({
                success: async function (res) {
                    that.headPoi = res.name.substring(0,3)
                    that.latitude = res.latitude
                    that.longitude = res.longitude
                    await that.getShopList()
                }
            });
         },
         async getShopList(order = 1) {
            const res = await this.$api.getStoreList({
               longitude: this.longitude,
               latitude: this.latitude,
               order,
            })
            this.shopList = res.data
         },
         async change(index) {
            this.current = index;
            await this.getShopList(index + 1)
         },
         toShopDetail(shop) {
            this.$mUtils.goPage('shopDetail', {
               shopInfo: JSON.stringify(shop)
            })
         },
      },
   }
</script>


<style lang="scss" scoped>
   page {
      background: #F6F6F6;
   }

   .slot-wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex: 1;

      .slot-left {
         display: flex;
         flex-direction: row;
         align-items: center;

         text {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFFFF;

            margin: {
               left: 12rpx;
               right: 12rpx;
            }

            ;
         }

         .poi {
            width: 24rpx;
            height: 26rpx;
         }

      }

      .slot-middle {
         position: absolute;
         left: 50%;
         transform: translateX(-50%);

         .title {
            font-size: 36rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
         }
      }
   }

   .container {
      width: 750rpx;
      background: #F6F6F6;
      display: flex;
      align-items: center;
      flex-direction: column;

      .select {
         // position: fixed;
         width: 701rpx;
         // top: 88rpx;
      }

      .main {
         .main-box {
            width: 701rpx;
            height: 230rpx;
            background: #FFFFFF;
            border-radius: 10rpx;
            margin-bottom: 20rpx;
         }
      }
   }
</style>