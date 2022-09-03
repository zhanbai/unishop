<template>
  <view class="my">
    <view class="profile">
      <view class="avatar">
        <image :src="userInfo.avatar ? userInfo.avatar : defaultAvatar" mode="scaleToFill" />
      </view>
      <view class="right">
        <view class="name">{{ userInfo.name }}</view>
        <view class="sub-name">{{ userInfo.created_at }}</view>
      </view>
    </view>
    <view class="lists">
      <view class="item" v-for="(item, i) in lists" :key="i" @click="onJump(item)">
        <view class="icon">
          <image :src="item.icon" mode="scaleToFill" />
        </view>
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
      defaultAvatar: "/static/image/avatar.png",
      userInfo: {},
      lists: [
        {
          type: "order",
          title: "订单",
          icon: "/static/image/bag.png",
          page: "/subpkg/orders/index",
        },
      ],
    };
  },
  computed: {},
  methods: {
    // 获取当前用户信息
    async getUser() {
      const { data: res } = await uni.$http.get("/user");
      res.name = isNaN(res.name) && res.name.length !== 11 ? res.name : res.name.replace(res.name.substr(3, 4), "****");
      this.userInfo = res;
    },
    // 跳转
    onJump(item) {
      console.log(item);
      uni.navigateTo({ url: item.page });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getUser();
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
.profile {
  display: flex;
  align-items: center;
  padding: 48rpx 32rpx;

  .avatar {
    margin-right: 32rpx;

    width: 144rpx;
    height: 144rpx;
  }

  .name {
    font-weight: bold;
    line-height: 150%;

    letter-spacing: 0.5px;
  }

  .sub-name {
    font-size: 24rpx;
    line-height: 180%;

    letter-spacing: 0.5px;

    color: #9098b1;
  }
}

.lists {
  margin-top: 16rpx;

  .item {
    display: flex;
    align-items: center;
    padding: 32rpx;

    .icon {
      margin-right: 32rpx;
      width: 48rpx;
      height: 48rpx;
    }

    .title {
      font-weight: bold;
      font-size: 24rpx;
      line-height: 150%;

      letter-spacing: 0.5px;
    }
  }

  .item:hover {
    background: #ebf0ff;
  }
}
</style>
