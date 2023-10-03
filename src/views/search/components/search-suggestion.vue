<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
    <!-- 双花括号绑定会直接输出纯文本内容 -->
    <!-- 使用v-html指令可绑定渲染带有HTML标签的字符串 -->
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash";

export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [], // 联想建议数据列表
      htmlStr: 'Hello <span style="color: red">World</span>',
    };
  },
  computed: {},
  watch: {
    searchText: {
      // 当 searchText 发生改变时会调用 handler 函数，名称固定

      // debounce 函数，参数1一个函数，参数2延迟时间，返回值是防抖之后的函数
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value);
      }, 200),
      // handler(value) {
      //   this.loadSearchSuggestions(value);
      // },
      immediate: true, // 该回调会在侦听开始之后立即被调用
    },
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q);
        this.suggestions = data.data.options;
      } catch (err) {
        this.$toast("数据获取失败，请稍后重试");
      }
    },
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`;

      if (!text) {
        return;
      }
      // 正则表达式 // 中间的内容会当做匹配字符而不是变量
      // 如果需要根据数据变量动态创建正则表达式则手动 new RegExp
      // RegExp 正则表达式构建函数，参数1匹配模式字符串，参数2匹配模式
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(reg, highlightStr);
    },
  },
};
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
