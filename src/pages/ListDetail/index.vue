<template>
  <div class="listContainer">
    <div class="top">
      <div class="left"><img v-lazy="groupInfo.coverImgUrl" /></div>
      <div class="right">
        <div class="songTitle">
          <h3>{{ groupInfo.name }}</h3>
        </div>
        <div class="songAuthor">
          <img :src="groupAuthor.avatarUrl" />
          <h4>{{ groupAuthor.nickname }}</h4>
        </div>
        <div class="jiesao">
          <div v-html="groupInfo.description"></div>
        </div>
      </div>
    </div>
    <playTag></playTag>
    <div class="songContainer">
      <div class="listTitle">
        <p>歌名</p>
        <p>歌手</p>
        <p>专辑</p>
      </div>
      <div class="songItem" v-for="(item, index) in songDateList" :key="index" @click="songSrc(index)">
        <div class="iconfont icon-xihuan xihuan">
        </div>
        <p>{{ item.name }}</p>
        <p>{{ item.ar[0].name }}</p>
        <p>{{ item.al.name }}</p>
      </div>
    </div>
  </div>
</template>
  
<script>
import playTag from "../../components/playTag.vue";
import { getSongGroup } from "./api.js"
export default {
  name: "songList",
  props: ["id", "name"],
  data() {
    return {
      groupInfo: {},//歌单信息
      groupAuthor: {},//歌单创造人信息
      songDateList: [],
      playlist: {},
      baseUrl:
        "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
    };
  },
  components: {
    playTag,
  },
  methods: {
    songSrc(index) {
      this.$bus.$emit("musicList", {
        list: this.songDateList,
        index: index,
        musicId: this.songDateList[index].id,
      });
      //有待优化
    },
    async getSongGroupDetail() {
      let id = this.$route.query.id
      let res = await getSongGroup({ id })
      if (res.code === 200) {
        this.groupInfo = res.playlist
        this.groupAuthor = res.playlist.creator
        this.songDateList = res.playlist.tracks
      }

    },
  },
  mounted() {
    this.getSongGroupDetail()
  },
};
</script>
<style scoped>
.xihuan {
  width: 130px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}

.listContainer {
  width: 100%;
  height: 595px;
  background-color: var(--theme-bg-color);
  /* background-color: aquamarine; */

  /* 设置可以溢出滑动 */
  overflow: scroll;
}

/* 去除多余的滑动条 */
.listContainer::-webkit-scrollbar {
  display: none;
}

.songContainer {
  background-color: var(--content-bg);
}

.songItem {
  display: flex;
  color: #fff;
  border-bottom: 1px solid var(--inactive-color);
  align-items: center;
  width: 100%;
  height: 60px;
  line-height: 100px;
  margin-top: 10px;
  border-radius: 20px;
}

.songItem:hover {
  background-color: var(--theme-bg-color);
}

.songItem img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 0 30px;
}

.listTitle {
  display: flex;
  background-color: var(--theme-bg-color);
  border-radius: 0px;
}

.listTitle p {
  width: 100px;
  height: 50px;
  line-height: 50px;
  margin-left: 135px;
  border-radius: 0px;
  /* background-color: aquamarine; */
  font-size: 14px;
  color: #fff;
}

.songItem p {
  width: 235px;
  height: 50px;
  line-height: 50px;
  /* background-color: aquamarine; */
  font-size: 14px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 设置对齐模式 */
  -webkit-line-clamp: 1;
}

.top {
  display: flex;
  width: 100%;
  height: 185px;

  background-color: var(--theme-bg-color);
  color: #fff;
}

.top .left {
  width: 200px;
  height: 185px;

  display: flex;
}

.top .left img {
  width: 150px;
  height: 150px;
  margin: auto;
  border-radius: 20px;
}

.top .right {
  max-width: 600px;
  height: 185px;
  /* background-color: aquamarine; */
}

.songTitle {
  margin: 25px 0;
  text-align: left;
}

.songAuthor {
  display: flex;
  align-items: center;

  height: 50px;
  margin: 10px 0;
  /* background-color: brown; */
}

.songAuthor img {
  width: 35px;
  height: 35px;
  margin-right: 10px;
  border-radius: 10px;
}

.jiesao {
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  text-align: left;
}

.jiesao div {
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>