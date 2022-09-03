<template>
  <view class="login">
    <view class="logo">
      <image src="/static/image/logo.png" mode="scaleToFill" />
    </view>
    <view class="title">欢迎来到 W3C</view>
    <view class="sub-title">未注册将自动注册</view>
    <view class="input">
      <view class="icon">
        <image src="/static/image/phone.png" mode="scaleToFill" />
      </view>
      <input placeholder="手机号" placeholder-class="input-placeholder" @input="onPhone" />
    </view>
    <view class="input">
      <view class="icon">
        <image src="/static/image/password.png" mode="scaleToFill" />
      </view>
      <input placeholder="验证码" placeholder-class="input-placeholder" @input="onPasswd" />
    </view>
    <view class="sms-code">
      <view v-if="canGetSmsCode" @click="getSmsCode">{{ codeText }}</view>
      <view v-else>{{ codeText }}</view>
    </view>
    <view class="btn" @click="onSubmit">登录</view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      canGetSmsCode: true, // 是否可以获取验证码
      codeText: "获取验证码",
      phone: "",
      passwd: "",
    };
  },
  computed: {},
  methods: {
    // 监听账号输入框
    onPhone(e) {
      this.phone = e.detail.value;
      console.log(e)
    },
    // 监听密码输入框
    onPasswd(e) {
      this.passwd = e.detail.value;
    },
    // 获取验证码
    getSmsCode() {
      if (!this.phone) {
        uni.$showMsg("请输入手机号");
      } else {
        this.canGetSmsCode = false;
        let i = 60;
        let timer = setInterval(() => {
          this.codeText = i + "s 后重新获取";
          i--;
          if (i < 0) {
            this.canGetSmsCode = true;
            this.codeText = "获取验证码";
            clearInterval(timer);
          }
        }, 1000);
        uni.$http.post("/smsCodes", { phone: this.phone });
      }
    },
    // 登录
    async onSubmit() {
      console.log(this.phone)
      if (this.phone === '' || this.passwd === '') {
        uni.$showMsg("请输入手机号和验证码");
      } else {
        const { data: res } = await uni.$http.post("/users", { phone: this.phone, sms_code: this.passwd });
        uni.setStorageSync("token", res.token_type + " " + res.access_token);
        let referer;
        if ((referer = uni.getStorageSync("referer") && referer !== "/subpkg/login/index")) {
          uni.reLaunch({ url: $referer });
        } else {
          uni.reLaunch({ url: "/pages/home/index" });
        }
        console.log(res);
      }
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
.login {
  padding: 32rpx;
}

.logo {
  margin-top: 192rpx;
  margin-left: calc(50% - 144rpx / 2);

  width: 144rpx;
  height: 144rpx;
}

.title {
  margin-top: 32rpx;

  font-weight: bold;
  font-size: 32rpx;
  line-height: 150%;

  text-align: center;
  letter-spacing: 0.5px;
}

.sub-title {
  margin-top: 16rpx;
  margin-bottom: 56rpx;

  font-size: 24rpx;
  line-height: 180%;

  text-align: center;
  letter-spacing: 0.5px;

  color: #9098b1;
}

.input {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;

  height: 96rpx;

  border: 1px solid #ebf0ff;
  border-radius: 10rpx;

  .icon {
    margin: 24rpx 20rpx 24rpx 32rpx;

    width: 48rpx;
    height: 48rpx;
  }

  .active {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .input-placeholder {
    font-size: 24rpx;

    letter-spacing: 0.5px;

    color: #9098b1;
  }
}

.sms-code {
  margin-top: 32rpx;

  font-weight: bold;
  font-size: 24rpx;
  line-height: 150%;

  text-align: center;
  letter-spacing: 0.5px;

  color: #40bfff;

  .box {
    padding: 20rpx 0;
  }
}

.btn {
  margin-top: 32rpx;
}
</style>
