<template>
  <view class="notice border-radius-10">
    <image  @tap="$mUtils.goPage('notice_list')" src="../../static/imgs/index/title1gg.png" mode="aspectFit"></image>
    <view class="notice-list">
      <notice-scroll class="width-100-per" :list="list"></notice-scroll>
    </view>
  </view>
</template>

<script>
import noticeScroll from "@/components/index/NoticeScroll.vue";
export default {
  props: {
    list: {
      type: Array,
    },
  },
  components: {
      noticeScroll
  }
};
</script>

<style lang="scss">
.notice {
  width: 700rpx;
  height: 100rpx;
  margin: auto;
  // padding: 10rpx;
  background: rgba(255, 255, 255, 1);
  border-radius: 20rpx;
  display: flex;
  align-items: center;

  image {
    width: 141upx;
    height: 28upx;
    margin-left: 24rpx;
  }

  .notice-list {
    flex: 1;
    height: 100%;
    flex-shrink: 1;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #343434;
    line-height: 90rpx;
    margin-left: 30rpx;
  }
}
</style>
