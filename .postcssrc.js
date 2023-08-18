// PostCSS配置文件
module.exports = {
  // 配置要使用的PostCSS插件
  plugins: {
    // 配置使用autoprefixer插件
    // 作用：生成浏览器CSS样式规则前缀
    // VueCli内部已经配置了autoprefixer插件，所以再配置一次会产生冲突
    // autoprefixer: {
    // 配置要兼容到的环境信息
    // browsers: ["Android >= 4.0", "iOS >= 7"],
    // },

    // 配置使用的postcss-pxtorem插件
    // 作用：把 px 转为 rem
    "postcss-pxtorem": {
      // lib-flexible 的 REM 解决方案：把一行分为10份，每份就是十分之一
      // 所以 rootValue 应该设置为设计稿宽度的十分之一
      // 但是 Vant 建议设置为37.5，因为 Vant 是基于375写的
      // 如果是 Vant 的样式则按照37.5转换，自己的按照75转换
      // rootValue支持数字(固定数值)和函数(动态处理)
      // postcss-pxtorem 处理每个 CSS 文件的时候都会来调用
      rootValue({ file }) {
        return file.indexOf("vant") !== -1 ? 37.5 : 75;
      },

      // 配置要转换的 css 属性，*表示所有
      propList: ["*"],
    },
  },
};
