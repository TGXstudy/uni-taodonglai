<template>
  <!-- 推荐商品列表 -->
  <view class="goodsall">
    <view class="witness-list" @tap="faddish(item)">
      <view class="witness-all">
        <view class="witness-log">
          <image :src="item.spu_img" mode=""></image>
          <view class="witness-title sll">
            {{ item.spu_name }}
            <view class="witness-price"> ￥{{ item.price }} </view>
            <view class="sold-out"> 已售{{ item.stock }} </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    isGroup: {
      type: Boolean,
      default: true,
    },
    item: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    //爆款跳转
    faddish(item) {
      this.$mRouter.push({
        route: this.$mRoutesConfig.goodsdetails,
        query: {
          spu_type: item.spu_type,
          spu_id: item.spu_id,
          // gc_level_1:item.gc_level_1
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.goodsall {
  width: 221rpx;
  margin-top: 30rpx;
  margin-right: 6rpx;
  box-sizing: border-box;
  display: flex;
  .sll{
	  overflow: hidden;
	  text-overflow:ellipsis;
	  white-space: nowrap;
  }

  .witness-list {
    background: #ffffff;
    border-radius: 20upx;
    margin: auto;
    // padding: 10upx;

    .witness-all {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      margin-top: 20rpx;

      .witness-log {
        width: 192rpx;
        height: 380upx;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        display: block;
        margin: auto;
        // padding-top: 10rpx;

        image {
          width: 220upx;
          height: 221upx;
        }

        .witness-title {
          font-size: 26upx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #343434;
          line-height: 36upx;

          .witness-price {
            font-size: 28upx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #f23e3e;
            line-height: 36upx;
            margin: 10upx 0upx;
          }

          .sold-out {
            font-size: 22rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #9a9a9a;
            line-height: 36rpx;
          }
        }
      }
    }
  }
}
</style>
