import Vue from "vue";
import App from "./App";
import Request from "luch-request";

const http = new Request();

// 配置请求根路径
let baseURL = "";

if (process.env.NODE_ENV === "production") {
  baseURL = "http://111.231.88.223";
} else {
  baseURL = "";
}

// 修改全局默认配置
http.setConfig((config) => {
  config.baseURL = baseURL;
  return config;
});

// 请求开始之前做一些事情
http.interceptors.request.use(
  (config) => {
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
    return response;
  },
  (config) => {
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
Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
