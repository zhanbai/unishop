<template>
  <view class="home">
    <!-- 轮播图区域 -->
    <view class="swiper"></view>
    <!-- 商品列表区域 -->
    <view class="products-list">
      <view class="products-item" v-for="(item, i) in productsList" :key="i">
        <navigator url="/pages/" open-type="navigate" hover-class="navigator-hover">
          <view class="products-item-img"><image :src="item.image" mode="scaleToFill" /></view>
          <view class="products-item-info">
            <view class="products-item-title">{{ item.title }}</view>
            <view class="products-item-price text-price"><text style="font-size: 24rpx">￥</text>{{ item.price }}</view>
          </view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
// import data from "./mock";
export default {
  components: {},
  data: () => ({
    productsList: [], // 商品列表数据
    total: 0,
		page: 1,
		lastPage: 1,
  }),
  computed: {},
  methods: {
    async getProductsList() {
      const { data: res } = await uni.$http.get('/products')
      this.productsList = [...this.productsList, ...res.data]
			this.lastPage = res.last_page
      console.log(res.data)
      // this.productsList = data.productsList;
      // console.log(data.productsList);
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
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
    if (this.page >= this.lastPage) return
		this.page += 1
		this.getProductsList()
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style lang="scss" scoped>
.home {
  padding: $uni-spacing-col-base $uni-spacing-row-base;
}

// 商品列表区域
.products-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.products-item {
  width: 345rpx;
  margin-bottom: $uni-spacing-col-base;
  background-color: $uni-bg-color;
  border-radius: $uni-border-radius-base;

  &-info {
    padding: $uni-spacing-col-sm $uni-spacing-row-sm;
  }

  &-img {
    height: 345rpx;
    background-color: $uni-bg-color;
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
    margin-top: 8rpx;
  }
}
</style>
