<template>
  <div class="orders">
    <view class="navs fixed-top">
      <block v-for="(item, i) in navs" :key="i">
        <view class="nav" :class="{ active: item.state == activeNav }" @click="changeNav(item.state)">{{
          item.name
        }}</view>
      </block>
    </view>
    <!-- 订单列表 -->
    <view class="list-group">
      <block v-for="(order, k) in orders" :key="k">
        <!-- 每个订单 -->
        <view class="list-group-item">
          <view class="header">
            <view>{{ order.created_at }}</view>
            <view>
              <view v-if="order.paid_at">已支付</view>
              <view v-else-if="order.closed">已关闭</view>
              <view v-else>未支付</view>
            </view>
          </view>
          <block v-for="(item, i) in order.items" :key="i">
            <!-- 订单商品 -->
            <view class="product">
              <view class="product-info">
                <view class="image"><image :src="item.product.image" mode="scaleToFill" /></view>
                <view class="title">
                  <view class="product-title title-ellipsis">{{ item.product.title }}</view>
                  <view class="sku-title text-sm">{{ item.product_sku.title }}</view>
                </view>
              </view>
              <view>
                <view class="sku-price text-sm">￥{{ item.price }}</view>
                <view class="sku-amount text-sm">x{{ item.amount }}</view>
              </view>
            </view>
          </block>
          <view class="total-amount"
            >金额：<span class="text-lg">￥{{ order.total_amount }}</span></view
          >
        </view>
      </block>
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
      navs: [
        {
          state: -1,
          name: "全部",
        },
        {
          state: 0,
          name: "待付款",
        },
        {
          state: 1,
          name: "已完成",
        },
      ],
      activeNav: -1,
      orders: [],
      total: 0,
      page: 1,
      lastPage: 1,
    };
  },
  computed: {},
  methods: {
    // 切换导航
    changeNav(state) {
      this.activeNav = state;
      this.orders = [];
      this.getOrders();
    },
    // 获取订单列表
    async getOrders() {
      const { data: res } = await uni.$http.get("/orders?page=" + this.page + "&state=" + this.activeNav);
      this.orders = [...this.orders, ...res.data];
      this.lastPage = res.last_page;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.activeNav = options.state;
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
.navs {
  display: flex;
  padding: 0 60rpx;
  width: 750rpx;
  background-color: #ffffff;

  .nav {
    margin-right: 120rpx;
    padding: 16rpx 0;
    text-align: center;
  }

  .active {
    color: #007aff;
    border-bottom: 6rpx solid #007aff;
  }
}

.list-group {
  margin-top: 80rpx;
  padding: 24rpx;

  .list-group-item {
    margin-bottom: 24rpx;
    padding: 24rpx;
    border-radius: 24rpx;
    background-color: #ffffff;

    .header {
      display: flex;
      justify-content: space-between;
    }

    .product {
      display: flex;
      justify-content: space-between;
      margin: 20rpx 0;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #f2f6fc;

      .product-info {
        display: flex;
        justify-content: space-between;

        .image {
          margin-right: 16rpx;
          width: 120rpx;
          height: 120rpx;
          border-radius: 8rpx;

          image {
            border-radius: 8rpx;
          }
        }

        .title {
          width: 380rpx;
        }
      }
    }

    .total-amount {
      margin-left: 400rpx;
    }

    .text-sm {
      color: #909399;
      font-size: 24rpx;
    }

    .text-lg {
      font-size: 32rpx;
      font-weight: 700;
    }
  }
}
</style>
