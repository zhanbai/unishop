<template>
  <view class="payment">
    <!-- 支付信息 -->
    <view class="info">
      <view class="price price-color">￥<span class="text">7993.00</span></view>
      <view class="time-left">
        <view class="text">支付剩余时间</view>
        <uni-countdown
          :font-size="12"
          background-color="#fff"
          :show-day="false"
          :minute="12"
          :second="40"
        ></uni-countdown>
      </view>
    </view>
    <!-- 支付方式 -->
    <view class="methods">
      <view class="item box" v-for="(item, i) in payMethods" :key="i">
        <view class="left">
          <view class="icon"><image :src="item.icon" mode="scaleToFill" /></view>
          <view>{{ item.title }}</view>
        </view>
        <view
          ><radio
            style="transform: scale(0.8)"
            color="#f2270c"
            :value="item.type"
            :checked="activePayType === item.type"
            @click="selectPayType(item.type)"
        /></view>
      </view>
    </view>
    <!-- 固定底部 -->
    <view class="fixed-bottom">
      <view class="btn">确认付款</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "payment",
  components: {},
  props: {},
  data: () => ({
    payMethods: [
      {
        type: "wechat_pay",
        title: "微信支付",
        icon: "/static/image/wechat_pay.png",
      },
      {
        type: "alipay",
        title: "支付宝支付",
        icon: "/static/image/alipay.png",
      },
    ],
    activePayType: "wechat_pay",
  }),
  computed: {},
  methods: {
    selectPayType(type) {
      this.activePayType = type;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style lang="scss" scoped>
// 支付信息
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;

  .price .text {
    font-size: 60rpx;
  }

  .time-left {
    margin-top: 12rpx;
    display: flex;
    align-items: center;

    .text {
      margin-right: 12rpx;
      font-size: 24rpx;
    }
  }
}

.methods {
  .item {
    margin-bottom: 24rpx;
    display: flex;
    justify-content: space-between;
    border-radius: 24rpx;

    .left {
      display: flex;
      align-items: center;
    }

    .icon {
      margin-right: 12rpx;
      width: 48rpx;
      height: 48rpx;
    }
  }
}

.fixed-bottom {
  padding: 25rpx;
}

.btn {
  width: 700rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  background-color: #007aff;
  color: #ffffff;
}
</style>
