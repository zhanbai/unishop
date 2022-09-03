<template>
  <view class="payment">
    <!-- 支付信息 -->
    <view class="info">
      <view class="price">￥{{ order.total_amount }}</view>
      <view class="time-left">
        <view class="text">支付剩余时间</view>
        <uni-countdown
          :font-size="14"
          color="#223263"
          splitorColor="#223263"
          background-color=""
          :show-day="false"
          :second="order.pay_time_left"
        ></uni-countdown>
      </view>
    </view>
    <!-- 支付方式 -->
    <view class="methods">
      <view class="item" v-for="(item, i) in payMethods" :key="i">
        <view class="left">
          <view class="icon"><image :src="item.icon" mode="scaleToFill" /></view>
          <view class="title">{{ item.title }}</view>
        </view>
        <view
          ><radio
            style="transform: scale(0.8)"
            color="#40bfff"
            :value="item.type"
            :checked="activePayType === item.type"
            @click="selectPayType(item.type)"
        /></view>
      </view>
    </view>
    <!-- 固定底部 -->
    <view class="btn-fixed-bottom">
      <view class="btn" @click="openPay">确认付款</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "payment",
  components: {},
  props: {},
  data() {
    return {
      payMethods: [
        {
          type: "wechat",
          title: "微信支付",
          icon: "/static/image/wechat_pay.png",
        },
        {
          type: "alipay",
          title: "支付宝支付",
          icon: "/static/image/alipay.png",
        },
      ],
      activePayType: "wechat",
      order: {},
      isPaid: false,
    };
  },
  computed: {},
  methods: {
    // 获取订单详情
    async getOrder(id) {
      const { data: res } = await uni.$http.get("/orders/" + id);
      if (res.paid_at || res.closed) {
        // uni.switchTab({ url: "/pages/home/index" });
      }
      this.order = res;
      console.log(res.pay_time_left);
    },
    // 选择支付方式
    selectPayType(type) {
      this.activePayType = type;
    },
    // 唤起支付
    async openPay() {
      const { data: res } = await uni.$http.get("/payment/" + this.orderId + "/" + this.activePayType);
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    if (!options.id) {
      uni.$showMsg("缺少订单ID");
    } else {
      this.orderId = options.id;
      this.getOrder(this.orderId);
    }
  },
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
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx;

  .price {
    font-weight: bold;
    font-size: 48rpx;
    line-height: 150%;

    text-align: center;
    letter-spacing: 0.5px;

    color: #40bfff;
  }

  .time-left {
    margin-top: 12rpx;
    display: flex;
    align-items: center;

    .text {
      margin-right: 8rpx;

      font-size: 24rpx;
      line-height: 180%;

      letter-spacing: 0.5px;

      color: #223263;
    }
  }
}

.methods {
  .item {
    display: flex;
    justify-content: space-between;
    padding: 32rpx;

    .left {
      display: flex;
      align-items: center;

      .icon {
        margin-right: 32rpx;
        width: 36rpx;
        height: 36rpx;
      }
    }

    .title {
      font-weight: bold;
      font-size: 24rpx;

      letter-spacing: 0.5px;

      color: #223263;
    }
  }
}
</style>
