<template>
  <view class="detail">
    <!-- 商品信息 -->
    <view class="product">
      <view class="image"><image :src="product.image" mode="scaleToFill" /></view>
      <view class="info">
        <view class="title title-ellipsis-two">{{ product.title }}</view>
        <view class="price">￥{{ activeSku.price }}</view>
      </view>
    </view>
    <!-- 选择规格 -->
    <view class="box select">
      <view class="title">选择</view>
      <view class="skus">
        <block v-for="(item, i) in product.skus" :key="i">
          <view class="sku" :class="{ active: activeSku.id === item.id }" @click="selectSku(item)">{{
            item.title
          }}</view>
        </block>
      </view>
    </view>
    <!-- 选择数量 -->
    <view class="box number">
      <view class="title">数量</view>
      <uni-number-box :min="1" @change="changeActionSkuAmount"></uni-number-box>
    </view>
    <!-- 商品介绍 -->
    <view class="box spec">
      <view class="title">商品介绍</view>
      <view class="content">
        <mp-html :content="product.description" />
      </view>
    </view>
    <!-- 固定底部 -->
    <view class="btn-fixed-bottom">
      <view class="btn" @click="createOrder">立即购买</view>
    </view>
  </view>
</template>

<script>
import mpHtml from "mp-html/dist/uni-app/components/mp-html/mp-html";

export default {
  components: {
    mpHtml,
  },
  data() {
    return {
      product: {},
      activeSku: {},
      activeSkuAmount: 1,
    };
  },
  computed: {},
  methods: {
    // 获取商品详情
    async getProduct(id) {
      const { data: res } = await uni.$http.get("/products/" + id);
      this.product = res;
      this.activeSku = res.skus[0];
    },
    // 打开弹框
    open() {
      this.$refs.popup.open();
    },
    // 选择商品规格
    selectSku(item) {
      this.activeSku = item;
    },
    // 变更购买数量
    changeActionSkuAmount(amount) {
      this.activeSkuAmount = amount;
    },
    // 创建订单
    async createOrder() {
      let items = [
        {
          sku_id: this.activeSku.id,
          amount: this.activeSkuAmount,
        },
      ];
      const { data: res } = await uni.$http.post("/orders/", { items: items });
      console.log(res);
      uni.navigateTo({ url: "/subpkg/payment/index?id=" + res.id });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    if (!options.id) {
      uni.$showMsg("缺少商品ID");
    } else {
      this.getProduct(options.id);
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
.detail {
  padding-bottom: 180rpx;
}

.product {
  .image {
    height: 750rpx;
  }

  .info {
    padding: 32rpx;

    font-size: 40rpx;
    font-weight: bold;
    line-height: 150%;

    letter-spacing: 0.5px;

    .title {
      height: 120rpx;
    }

    .price {
      color: #40bfff;
    }
  }
}

.box {
  padding: 32rpx;
}

.select {
  .skus {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-top: 24rpx;
    gap: 16px;

    .sku {
      padding: 12rpx;
      height: 60rpx;

      font-weight: bold;
      line-height: 60rpx;

      text-align: center;
      letter-spacing: 0.5px;

      border: 1px solid #ebf0ff;
      border-radius: 60rpx;
    }

    .active {
      border: 1px solid #40bfff;
    }
  }
}

.number {
  display: flex;
  justify-content: space-between;
}

.spec {
  .content {
    margin-top: 24rpx;
  }
}
</style>
