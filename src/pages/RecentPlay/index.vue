<template>
  <div class="DSEFWS">
    <div class="topTitle">
      <span class="dk">最近播放</span>
    </div>
    <div class="playBtn">
      <div class="playall" @click="playall">
        <div class="iconfont icon-bofang play"></div>
        <div>播放全部</div>
      </div>
      <div class="dowload">
        <div class="el-icon-bottom font"></div>
        <div class="ms">下载</div>
      </div>
      <div class="topic">仅展示最近50首歌曲</div>
    </div>
    <div class="songContainer">
      <div class="listTitle">
        <div class="poster">专辑图</div>
        <p>歌名</p>
        <p>歌手</p>
        <p>专辑</p>
      </div>
      <div class="songItem" v-for="(item, index) in list" :key="index" @click="git(index)">
        <img v-lazy="item.song.al.picUrl" class="poster" />

        <p>{{ item.song.name }}</p>
        <p>{{ item.song.ar[0].name }}</p>
        <p>{{ item.song.al.name }}</p>
      </div>
    </div>
  </div>
</template>
  
<script>
import request from "../../config/request";
export default {
  name: "RecentPlay",
  data() {
    return {
      list: [],
      newList: [],
    };
  },
  methods: {
    //请求最近播放歌曲函数
    async log() {
      let userInfo = localStorage.getItem("userInfo");
      let uid = JSON.parse(userInfo);
      let llk = await request("/user/record", {
        uid: uid.userId,
        type: 1,
        limit: 50,
      });
      this.list = llk.weekData.splice(0, 50);

      //将得到的数据进行处理
      for (let index = 0; index < this.list.length; index++) {
        this.newList.push(this.list[index].song);
      }
      // console.log(this.newList);
    },
    playall() {
      this.git(0);
    },
    git(index) {
      console.log(this.list[index].song.id);
      this.$bus.$emit("musicList", {
        list: this.newList,
        index: index,
        musicId: this.list[index].song.id,
      });
    },
  },
  mounted() {
    this.log();
  },
};
</script>
  
<style scoped>
/* 最近播放主页面 */
.DSEFWS {
  width: 100%;
  height: 595px;
  background-color: var(--theme-bg-color);
  overflow: scroll;
}

.DSEFWS::-webkit-scrollbar {
  display: none;
}

.topTitle {
  width: 100%;
  height: 100px;
  position: relative;
  font-size: 30px;
  text-align: left;
  border-radius: 0px;
  background-color: var(--theme-bg-color);
  /* background-color: aqua; */
}

.topTitle .dk {
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 40px;
  color: red;
}

/* 头部下面的播放全部 */
.playBtn {
  position: relative;
}

.topic {
  font-size: 14px;
  position: absolute;
  top: 10px;
  right: 20px;

  color: #fff;
}

.dowload {
  width: 125px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  text-align: center;
  line-height: 40px;
  background-color: var(--theme-bg-color);
}

.dowload .font {
  font-size: 25px;
  padding-left: 20px;
}

.dowload .ms {
  margin-left: 10px;
}

.playBtn {
  height: 50px;
  border-radius: 0px;
  color: #fff;
  display: flex;
  background-color: var(--theme-bg-color);
}

.playall {
  width: 125px;
  height: 40px;
  line-height: 40px;
  margin-left: 25px;
  background-color: var(--theme-bg-color);
  display: flex;
  align-items: center;
}

.playBtn .play {
  width: 50px;
  height: 50px;
  padding-top: 6px;
  text-align: center;

  display: inline-block;
  font-size: 30px !important;
}

/* 歌曲列表 */
.songContainer {
  width: 100%;
  /* background-color: aquamarine; */
  /* 设置可以溢出滑动 */
  overflow-y: scroll;
  background-color: var(--content-bg);
}

/* 去除多余的滑动条 */
.songContainer::-webkit-scrollbar {
  display: none;
}

.listTitle {
  display: flex;
  justify-content: space-around;
  background-color: var(--theme-bg-color);
  border-radius: 0px;
}

.listTitle p {
  text-align: center;
  width: 200px;
  height: 50px;
  line-height: 50px;
  margin: 0 30px;
  border-radius: 0px;
  /* background-color: aquamarine; */
  font-size: 14px;
  color: #fff;
}

.listTitle .poster {
  width: 50px;
  height: 50px;
  margin-left: 50px;
  color: #fff;
  line-height: 50px;
}

.songItem {
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #fff;
  width: 100%;
  height: 60px;
  line-height: 100px;
  margin-top: 20px;
  border-radius: 20px;
  border-bottom: 1px solid var(--border-color);
}

.songItem:hover {
  background-color: var(--theme-bg-color);
}

.songItem img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-left: 50px;
}

.songItem p {
  text-align: center;
  width: 200px;
  height: 50px;
  line-height: 50px;
  /* background-color: aquamarine; */
  font-size: 14px;
  margin: 0 30px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.no {
  position: relative;
  top: 200px;
}
</style>