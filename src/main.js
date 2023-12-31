import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 加载Vant核心组件库
import Vant from "vant";

// 加载Vant全局样式
import "vant/lib/index.css";

// 加载全局样式
import "./style/index.less";

// 动态设置REM基准值
import "amfe-flexible";

// 加载 dayjs 初始化配置
import "./utils/dayjs";

// 注册使用Vant组件库
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
