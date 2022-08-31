<template>
  <view class="product">
    <!-- 商品图片 -->
    <view class="image"><image :src="product.image" mode="scaleToFill" /></view>
    <view class="info box">
      <view class="price price-color"
        >￥<span class="text">{{ product.price }}</span></view
      >
      <view class="title">{{ product.title }}</view>
    </view>
    <!-- 商品介绍 -->
    <view class="desc box">商品介绍</view>
    <view class="content">
      <mp-html :content="product.description" />
    </view>
    <!-- 固定底部 -->
    <view class="fixed-bottom box">
      <view class="btn" @click="open">立即购买</view>
    </view>
    <!-- 弹框 -->
    <uni-popup ref="popup" type="bottom">
      <view class="popup">
        <view class="price price-color"
          >￥<span class="text">{{ activeSku.price }}</span></view
        >
        <view class="space spec">
          <view class="title">选择</view>
          <view class="skus">
            <block v-for="(item, i) in product.skus" :key="i">
              <view class="sku" :class="{ active: activeSku.id === item.id }" @click="selectSku(item)">{{
                item.title
              }}</view>
            </block>
          </view>
        </view>
        <view class="space number">
          <view class="title">数量</view>
          <uni-number-box @change="changeActionSkuAmount"></uni-number-box>
        </view>
        <view class="btn" @click="createOrder">立即购买</view>
      </view>
    </uni-popup>
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
.product {
  padding-bottom: 120rpx;
}

// 商品图片
.image {
  height: 750rpx;
}

// 商品信息
.info {
  font-size: 32rpx;
  font-weight: 700;

  .price .text {
    font-size: 60rpx;
  }
}

// 商品介绍
.desc {
  margin-top: 20rpx;
  text-align: center;
}

// 固定底部
.fixed-bottom {
  width: 750rpx;
}

.btn {
  width: 710rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  background-color: #007aff;
  color: #ffffff;
}

// 弹框
.popup {
  padding: 30rpx;
  border-radius: 24rpx 24rpx 0 0;
  background-color: #ffffff;

  .price .text {
    font-size: 48rpx;
  }

  .space {
    margin-top: 20rpx;

    .title {
      font-weight: 700;
    }
  }

  .spec .title {
    margin-bottom: 20rpx;
    font-weight: 700;
  }

  .skus {
    display: flex;

    .sku {
      background-color: #f2f2f2;
      border-radius: 30rpx;
      color: #262626;
      font-size: 24rpx;
      height: 60rpx;
      line-height: 60rpx;
      margin-right: 24rpx;
      max-width: 540rpx;
      min-width: 40rpx;
      overflow: hidden;
      padding: 0 36rpx;
      text-align: center;
    }

    .active {
      background-color: #fcedeb;
      border: 1rpx solid #f2270c;
      color: #f2270c;
      font-weight: 700;
    }
  }

  .number {
    display: flex;
    justify-content: space-between;
    padding: 20rpx 0;
  }

  .btn {
    margin-top: 20rpx;
    width: 690rpx;
  }
}
</style>
