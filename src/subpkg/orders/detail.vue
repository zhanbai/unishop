<template>
  <view class="detail">
    <!-- 订单状态 -->
    <view class="state">
      <view class="color-success" v-if="order.paid_at">已支付</view>
      <view class="color-error" v-else-if="order.closed">已关闭</view>
      <view class="color-warning" v-else>未支付</view>
    </view>
    <!-- 商品信息 -->
    <view class="product block">
      <view class="title">商品信息</view>
      <view class="product-card-2" v-for="(item, i) in order.items" :key="i">
        <view class="image"><image :src="item.product.image" mode="scaleToFill" /></view>
        <view class="info">
          <view class="card-title title-ellipsis-two">{{ item.product.title }}</view>
          <view class="font-sm">x{{ item.amount }}</view>
          <view class="price">￥{{ item.price }}</view>
        </view>
      </view>
    </view>
    <!-- 支付信息 -->
    <view class="payment block">
      <view class="title">支付信息</view>
      <view class="box">
        <view class="group">
          <view class="title-sm">总价</view>
          <view class="price">￥{{ order.total_amount }}</view>
        </view>
      </view>
    </view>
    <!-- 固定底部 -->
    <view class="btn-fixed-bottom" v-if="!order.paid_at && !order.closed">
      <view class="btn" @click="openPay">确认付款</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "detail",
  components: {},
  props: {},
  data() {
    return {
      orderId: 0,
      order: {},
    };
  },
  computed: {},
  methods: {
    // 获取订单详情
    async getOrder() {
      const { data: res } = await uni.$http.get("/orders/" + this.orderId);
      this.order = res;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    if (options.order_id) {
      this.orderId = options.order_id;
      this.getOrder();
    } else {
      uni.$showMsg("缺少订单ID");
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
.state {
  margin: 60rpx;

  font-weight: bold;
  font-size: 48rpx;
  line-height: 150%;

  text-align: center;
  letter-spacing: 0.5px;
}

.block {
  padding: 32rpx;

  .title {
    margin: 24rpx 0;
  }
}

.payment {
  .box {
    gap: 12px;

    .group {
      display: flex;
      justify-content: space-between;

      font-size: 24rpx;

      .price {
        font-weight: bold;

        color: #40bfff;
      }
    }
  }
}
</style>
