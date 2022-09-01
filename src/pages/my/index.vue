<template>
  <view class="my">
    <view class="info">
      <view class="avatar">
        <image :src="userInfo.avatar ? userInfo.avatar : defaultAvatar" mode="scaleToFill" />
        <!-- <view v-else>{{ 头 }}头</view> -->
      </view>
      <view class="name">{{ userInfo.name }}</view>
    </view>
    <view class="order">
      <view class="item" v-for="(item, i) in orderTypes" :key="i" @click="toOrders(item.state)">
        <view class="icon"><image :src="item.icon" mode="scaleToFill" /></view>
        <view class="title">{{ item.title }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      defaultAvatar: "/static/image/avatar.svg",
      userInfo: {
        id: 1,
        name: "18668014527",
        phone: "18668014527",
        avatar: null,
        created_at: "2022-08-30 17:37:56",
        updated_at: "2022-08-30 17:37:56",
      },
      orderTypes: [
        {
          state: 0,
          title: "待付款",
          icon: "/static/image/order_wait_pay.svg",
        },
        {
          state: 1,
          title: "已完成",
          icon: "/static/image/order_complete.svg",
        },
        {
          state: -1,
          title: "全部订单",
          icon: "/static/image/order.svg",
        },
      ],
    };
  },
  computed: {},
  methods: {
    // 跳转订单列表页
    toOrders(state) {
      uni.navigateTo({ url: "/subpkg/orders/index?state=" + state });
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
.info {
  padding: 60rpx 40rpx 120rpx 40rpx;
  display: flex;
  align-items: center;
  background-image: linear-gradient(90deg, #409eff, #007aff);
  color: #ffffff;
  font-size: 36rpx;

  .avatar {
    margin-right: 20rpx;
    width: 100rpx;
    height: 100rpx;
    line-height: 100rpx;
    border-radius: 50%;
    text-align: center;
    font-size: 40rpx;
    font-weight: 700;
    background-color: #e9e9eb;
  }
}

.order {
  margin-top: -50rpx;
  margin-left: 25rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 700rpx;
  height: 160rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  // border: 1rpx solid red;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon {
    width: 60rpx;
    height: 60rpx;
  }
}
</style>
