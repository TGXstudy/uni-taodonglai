<template>
  <view class="notice-wrapper">
    <swiper
      class="swiper-box"
      :vertical="true"
      :indicator-dots="false"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
    >
      <swiper-item
        class="swiper-item"
        v-for="(notice, idx) in list"
        :key="idx"
        @tap="goNoticeDetail(notice.content)"
      >
        <view class="notice-txt">{{ notice.title }}</view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
    },
  },
  methods: {
    goNoticeDetail(content) {
      this.$mUtils.goPage("detailsnotice", { content });
    },
  },
};
</script>

<style lang="scss" scoped>
.notice-wrapper {
  .swiper-box {
    width: 100%;
    height: 100upx;
    .swiper-item {
      width: 100%;
      height: 100upx;
      display: flex;
      align-items: center;
      .notice-txt {
        font-size: 25upx;
        color: #333;
      }
    }
  }
}
</style>
