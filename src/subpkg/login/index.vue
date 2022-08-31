<template>
  <view class="login">
    <view class="input-box"> <input type="text" placeholder="请输入手机号" @input="onPhone" /></view>
    <view class="input-box"
      ><input type="text" placeholder="请输入收到的验证码" @input="onPasswd" />
      <view>
        <view class="code-btn" v-if="!codeDisabled" @click="getSmsCode">{{ codeText }}</view>
        <view class="code-btn" v-else>{{ codeText }}</view>
      </view>
    </view>
    <view class="btn" @click="onSubmit">登录</view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      codeDisabled: false, // 是否禁用获取验证码
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
        this.codeDisabled = true;
        let i = 60;
        let timer = setInterval(() => {
          this.codeText = i + "s";
          i--;
          if (i < 0) {
            this.codeDisabled = false;
            this.codeText = "获取验证码";
            clearInterval(timer);
          }
        }, 1000);
        uni.$http.post("/smsCodes", { phone: this.phone });
      }
    },
    // 登录
    async onSubmit() {
      if (!this.phone || !this.passwd) {
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
  padding: 24rpx 50rpx;
}

// 输入框
.input-box {
  margin-top: 24rpx;
  display: flex;
  align-items: center;
  height: 100rpx;
  border-bottom: 1rpx solid #efefef;

  input {
    width: 500rpx;

    .input-placeholder {
      color: #00000066;
    }
  }

  // 发送验证码
  .code-btn {
    width: 220rpx;
    border-left: 1rpx solid #ccc;
    color: #848689;
    text-align: center;
  }
}

// 登录按钮
.btn {
  margin-top: 60rpx;
  width: 650rpx;
  height: 88rpx;
  line-height: 88rpx;
  background-color: #007aff;
  border-radius: 50rpx;
  color: #ffffff;
  font-size: 32rpx;
}
</style>
