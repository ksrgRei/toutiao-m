import Vue from "vue";
import dayjs from "dayjs";

// 加载中文语言包
import "dayjs/locale/zh-cn";

import relativeTime from "dayjs/plugin/relativeTime";

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime);

// dayjs默认是英文，需要配置成中文
dayjs.locale("zh-cn"); // 全局使用

// 定义一个全局过滤器后可以在任何组件的模板中使用，相当于一个全局可用的方法(仅供模板使用)
Vue.filter("relativeTime", (value) => {
  return dayjs().to(dayjs(value));
});

// dayjs() 获取当前最新时间
// dayjs().format("YYYY-MM-DD");
