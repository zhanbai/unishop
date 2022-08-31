import Vue from "vue";
import App from "./App";
import Request from "luch-request";

const http = new Request();

// 配置请求根路径
let baseURL = "";

if (process.env.NODE_ENV === "production") {
  baseURL = "http://111.231.88.223:8000/api";
} else {
  baseURL = "http://111.231.88.223:8000/api";
}

// 修改全局默认配置
http.setConfig((config) => {
  config.baseURL = baseURL;
  return config;
});

// 请求开始之前做一些事情
http.interceptors.request.use(
  (config) => {
    config.header = {
      Authorization: uni.getStorageSync("token") ?? "",
    };
    uni.showLoading({
      title: "加载中",
      mask: true,
    });
    return config;
  },
  (config) => {
    return Promise.reject(config);
  }
);

// 请求完成之后做一些事情
http.interceptors.response.use(
  (response) => {
    uni.hideLoading();
    if (response.data.code === 401) {
      uni.navigateTo({ url: '/subpkg/login/index' });
    } else if (response.data.code !== 200) {
      uni.showToast({
        title: response.data.msg,
        duration: 2000,
        icon: "none",
      });
      return Promise.reject(response);
    } else {
      return response.data;
    }
  },
  (response) => {
    uni.showToast({
      title: "服务器错误",
      duration: 2000,
      icon: "none",
    });
    return Promise.reject(response);
  }
);

// 封装的展示消息提示的方法
uni.$showMsg = function (title = "数据加载失败！", duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: "none",
  });
};

uni.$http = http;
uni.$moment = require("moment");
Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
