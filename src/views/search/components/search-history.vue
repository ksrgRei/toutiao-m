<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories')">全部删除</span>
        &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  props: {
    // Prop 数据受父组件数据影响
    // 如果是普通数据(数字、字符串、布尔值) 绝对不能修改，即便改了也不会传给父组件
    // 如果是引用类型数据(数据、对象) 可以修改但不能重新赋值
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false, // 控制删除显示状态
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        // 删除状态
        this.searchHistories.splice(index, 1);
      } else {
        // 非删除状态
        this.$emit("search", item);
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
