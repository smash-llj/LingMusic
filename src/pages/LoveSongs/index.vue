<template>
  <div class="loveList">
    <div class="playBtn">
      <div class="playall">
        <div class="iconfont icon-bofang play"></div>
        <div>播放全部</div>
      </div>
      <div class="dowload">
        <div class="el-icon-bottom font"></div>
        <div class="ms">下载</div>
      </div>
    </div>
    <LoveListConponent></LoveListConponent>
  </div>
</template>

<script>

import LoveListConponent from "../../components/LoveListConponent.vue";
export default {
  name: "LoveSongs",
  data() {
    return {
      superLoveList: [],
      uid: 0,
      id: 0

    };
  },
  components: {
    LoveListConponent
  },

  mounted() {
    let userInfo = localStorage.getItem("userInfo");
    this.uid = JSON.parse(userInfo).userId



  },
};
</script>

<style scoped>
/* 头部下面的播放全部 */
.playBtn {
  height: 60px;
  line-height: 60px;
  border-radius: 0px;
  color: #fff;
  display: flex;
  align-items: center;
  background-color: var(--theme-bg-color);
}

.dowload {
  width: 125px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  text-align: center;
  line-height: 40px;
  border-radius: 10px;
  background-color: var(--theme-bg-color);
}

.dowload .font {
  font-size: 25px;
  padding-left: 20px;
}

.dowload .ms {
  margin-left: 10px;
}

.playall {
  width: 125px;
  height: 40px;
  line-height: 40px;
  margin-left: 25px;
  border-radius: 10px;
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

.LoveItem {
  width: 200px;

  /* background-color: blue; */
  border-radius: 20px;
  margin: 10px 18px;
}

.LoveItem img {
  width: 120px;
  height: 120px;
  margin: 10px 0px;
  border-radius: 20px;
}

.LoveItem .name {
  text-align: center;
  margin: 0 auto;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 设置对齐模式 */
  -webkit-line-clamp: 2;
}

.loveList {
  width: 100%;
}

/* 用户喜欢歌曲列表 */
.songContainerList {
  width: 100%;
  background-color: var(--content-bg);
  /* background-color: aquamarine; */

  /* 设置可以溢出滑动 */
  overflow-y: scroll;
}

/* 去除多余的滑动条 */
.songContainerList::-webkit-scrollbar {
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
  width: 100px;
  height: 50px;
  margin-left: 50px;
}

.songItem {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 60px;
  line-height: 100px;
  margin-top: 10px;
  border-radius: 20px;
  color: #fff;
  border-bottom: 1px solid var(--border-color);
}

.songItem:hover {
  background-color: var(--theme-bg-color);
}

.songItem img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 0 !important;
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 设置对齐模式 */
}

.no {
  position: relative;
  top: 200px;
}

#love {
  width: 50px;
  height: 100%;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
  color: #d81e06;
}
</style>