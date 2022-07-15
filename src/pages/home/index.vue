<template>
  <view class="home">
    <!-- 轮播图区域 -->
    <view class="swiper"></view>
    <!-- 商品列表区域 -->
    <view class="goods-list">
      <view class="goods-item" v-for="(item, i) in goodsList" :key="i">
        <navigator url="/pages/" open-type="navigate" hover-class="navigator-hover">
          <view class="goods-item-img"><image :src="item.img" mode="scaleToFill" /></view>
          <view class="goods-item-info">
            <view class="goods-item-title">{{ item.title }}</view>
            <view class="goods-item-price"><text style="font-size: 24rpx">￥</text>{{ item.price }}</view>
          </view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
import data from "./mock";
export default {
  components: {},
  data: () => ({
    goodsList: [], // 商品列表数据
  }),
  computed: {},
  methods: {
    async getGoodsList() {
      this.goodsList = data.goodsList;
      console.log(data.goodsList);
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getGoodsList();
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
.home {
  padding: 24rpx;
}

// 商品列表区域
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.goods-item {
  width: 340rpx;
  margin-bottom: 20rpx;
  background-color: white;
  border-radius: $uni-border-radius-base;

  &-info {
    padding: 10rpx;
  }

  &-img {
    height: 340rpx;
    background-color: pink;
    border-radius: $uni-border-radius-base $uni-border-radius-base 0 0;

    image {
      border-radius: $uni-border-radius-base $uni-border-radius-base 0 0;
    }
  }

  &-title {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    word-break: break-all;
    -webkit-box-orient: vertical;
  }

  &-price {
    margin-top: $uni-spacing-row-sm;
    font-size: $uni-font-size-blg;
    color: $uni-text-color-primary;
  }
}
</style>
