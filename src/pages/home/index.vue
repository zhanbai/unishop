<template>
  <view class="home">
    <!-- 轮播图区域 -->
    <view class="swiper"></view>
    <!-- 商品列表区域 -->
    <view class="product-list">
      <view class="product-card" v-for="(item, i) in productsList" :key="i">
        <navigator :url="'/subpkg/products/detail?id=' + item.id" open-type="navigate" hover-class="navigator-hover">
          <view class="image"><image :src="item.image" mode="scaleToFill" /></view>
          <view class="info">
            <view class="title title-ellipsis">{{ item.title }}</view>
            <view class="price">￥{{ item.price }}</view>
          </view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      productsList: [], // 商品列表数据
      total: 0,
      page: 1,
      lastPage: 1,
    };
  },
  computed: {},
  methods: {
    // 获取商品列表
    async getProductsList() {
      const { data: res } = await uni.$http.get("/products?page=" + this.page);
      this.productsList = [...this.productsList, ...res.data];
      this.lastPage = res.last_page;
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    let token = uni.getStorageSync("referer");
    console.log(token);
    this.getProductsList();
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
    this.getProductsList();
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style lang="scss" scoped>
// 商品列表
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 32rpx;

  .product-card {
    margin-bottom: 24rpx;
  }
}
</style>
