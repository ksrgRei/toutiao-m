<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <!-- 
        v-bind: class 语法
        一个对象，对象中key表示作用的CSS类名，value要计算出布尔值
       -->
        <van-icon
          v-show="isEdit && !fixChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span class="text" :class="{ active: index === active }" slot="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel, index)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";

export default {
  name: "ChannelEdit",
  components: {},
  props: {
    myChannels: {
      tpye: Array,
      require: true,
    },
    active: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fixChannels: [0], // 固定频道，不允许删除
    };
  },
  computed: {
    ...mapState(["user"]),
    // 依赖数据发生变化时，计算属性重新执行
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.myChannels.find(
          (myChannel) => myChannel.id === channel.id
        );
      });
    },
    // recommendChannels() {
    //   const channels = [];
    //   this.allChannels.forEach((channel) => {
    //     // find 遍历数组，找到满足条件的元素项
    //     const ret = this.myChannels.find((myChannel) => {
    //       return myChannel.id === channel.id;
    //     });

    //     // 如果我的频道中不包括该频道项，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel);
    //     }
    //   });

    //   // 把计算结果返回
    //   return channels;
    // },
  },
  watch: {},
  created() {
    this.loadAllChannels();
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        this.allChannels = data.data.channels;
      } catch (err) {
        this.$toast("数据获取失败");
      }
    },
    async onAddChannel(channel) {
      this.myChannels.push(channel);

      // 数据持久化处理
      if (this.user) {
        try {
          // 已登录，数据请求接口放到线上
          await addUserChannel({
            id: channel.id, // 频道id
            seq: this.myChannels.length, // 序号
          });
        } catch (err) {
          this.$toast("保存失败，请稍后重试");
        }
      } else {
        // 未登录，存储到本地
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 1.如果是固定频道不删除
        if (this.fixChannels.includes(channel.id)) {
          return;
        }

        // 2.如果是编辑状态则执行删除频道
        this.myChannels.splice(index, 1);

        // 3.删除激活之前的频道则更新激活的频道
        // 参数1要删除的元素索引，参数2删除个数
        if (index < this.active || this.active == this.myChannels.length - 1) {
          // 让激活频道索引减1
          this.$emit("update-active", this.active - 1, true);
        }

        // 4.处理持久化
        this.deleteChannel(channel);
      } else {
        // 如果是非编辑状态执行切换频道
        this.$emit("update-active", index, false);
      }
    },
    async deleteChannel(channel) {
      if (this.user) {
        // 已登录则更新到线上
        try {
          await deleteUserChannel(channel.id);
        } catch (err) {
          this.$toast("操作失败，请稍后重试");
          console.log(err);
        }
      } else {
        // 未登录更新到本地
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
