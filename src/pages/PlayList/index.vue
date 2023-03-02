<template>
  <div class="playListContainer">
    <div class="gedanTags">
      <el-tabs type="border-card" @tab-click="changeClick" class="topName">
        <el-tab-pane
          :label="item.name"
          v-for="(item, index) in tags"
          :key="index"
          class="gedanList"
        >
          <div
            class="sitem"
            v-for="(item, index) in ListDate"
            :key="index"
            @click="fasong(item)"
          >
            <img v-lazy="item.coverImgUrl" />
            <p>{{ item.name }}</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import request from "../../config/request";
export default {
  name: "PlayList",
  data() {
    return {
      ListDate: [], //歌单数据
      tags: [], //分类标签
      tagName: "华语",
    };
  },
  methods: {
    //请求歌单数据，并携带分类标签
    async getGenDan(x) {
      let gedanDate = await request("/top/playlist/highquality", { cat: x });
      this.ListDate = gedanDate.playlists;
    },
    //用户点击之后切换分类标签
    changeClick(e, t) {
      console.log(e, t);
      this.tagName = e._props.label;
      this.ListDate = [];
    },
    //请求歌单分类标签
    async getTags() {
      let tagsDate = await request("/playlist/highquality/tags");

      this.tags = tagsDate.tags;
    },
    //点击跳往歌单详情页
    fasong(item) {
      this.$router.push({
        name: "listDetail",
        query: {
          id: item.id,
          name: item.name,
          author: item.creator.avatarUrl,
          ds: item.description,
          img: item.coverImgUrl,
          authorName: item.creator.nickname,
        },
      });
    },
  },
  watch: {
    //监视tagName,如果发生变化就立即发送请求获取新数据
    tagName(n, x) {
      this.getGenDan(n);
    },
  },
  mounted() {
    //获取歌单分类标签
    this.getTags();
    //初始化获取歌单
    this.getGenDan(this.tagName);
  },
};
</script>

<style >
.gedanTags {
  margin: 5px auto;
}
.el-tabs__nav-next {
  right: -10px;
}
.el-tabs--border-card .el-tabs__header {
  background-color: var(--border-color);
  border: none;
}

.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #409eff;
  background-color: #ccc;
  border: none;
}

/* 歌单主页面 */
.playListContainer {
  position: relative;
  width: 1000px;
  height: 595px;
  overflow: scroll;
  background-color: var(--theme-bg-color);
  /* background-color: aquamarine; */
}
.playListContainer::-webkit-scrollbar {
  display: none;
}
.gedanTags {
  width: 1000px;
}
.gedanList {
  /* background-color: aquamarine; */
  display: flex;
  flex-wrap: wrap;
}
.el-tabs {
  box-shadow: none !important;
  background: none;
  border: none;
}
/* 歌单每一项 */
.sitem {
  height: 180px;
  margin: 10px 36px;
}
.sitem img {
  width: 120px;
  height: 120px;
  border-radius: 20px;
}
.sitem p {
  width: 120px;
  height: 50px;
  font-size: 13px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
}
</style>