<template>
  <div class="orders">
    <view class="item" v-for="(order, i) in orders" :key="i">
      <view class="title title-ellipsis-sm">{{ order.items[0].product.title }}</view>
      <view class="created-at text">下单时间：{{ order.created_at }}</view>
      <view class="line"></view>
      <view class="box">
        <view class="text">订单状态</view>
        <view v-if="order.paid_at">已支付</view>
        <view v-else-if="order.closed">已关闭</view>
        <view v-else>未支付</view>
      </view>
      <view class="box">
        <view class="text">商品种类</view>
        <view>{{ order.items.length }}</view>
      </view>
      <view class="box">
        <view class="text">总价</view>
        <view class="price">￥{{ order.total_amount }}</view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  name: "orders",
  components: {},
  props: {},
  data() {
    return {
      orders: [],
      total: 0,
      page: 1,
      lastPage: 1,
    };
  },
  computed: {},
  methods: {
    // 获取订单列表
    async getOrders() {
      const { data: res } = await uni.$http.get("/orders?page=" + this.page);
      this.orders = [...this.orders, ...res.data];
      this.lastPage = res.last_page;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getOrders();
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
  onReachBottom() {
    if (this.page >= this.lastPage) return;
    this.page += 1;
    this.getOrders();
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style lang="scss" scoped>
.orders {
  padding: 30rpx;
}

.item {
  display: flex;
  flex-direction: column;
  padding: 32rpx;
  gap: 12px;
  margin-bottom: 32rpx;

  border: 1px solid #ebf0ff;
  border-radius: 10rpx;

  .text {
    font-size: 24rpx;
    line-height: 180%;

    letter-spacing: 0.5px;

    opacity: 0.5;
  }

  .line {
    border: 1px dashed #ebf0ff;
  }

  .box {
    display: flex;
    justify-content: space-between;

    font-size: 24rpx;

    .price {
      font-weight: bold;

      color: #40bfff;
    }
  }
}
</style>
