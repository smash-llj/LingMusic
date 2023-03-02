<template>
  <div class="kt">
    <!-- 点击打开歌曲详情页 -->
    <transition name="animate__animated animate__bounce" appear enter-active-class="animate__fadeInUp"
      leave-active-class="animate__fadeOutDown">
      <div class="songDetailPage animate__faster" v-show="geciShow">
        <div class="klj">
          <div class="geciClose" @click="isTopic">关闭</div>
          <div class="kbs">
            <div class="left">
              <div class="containerl">
                <img :src="aImg === '' ? baseUrl : aImg" />
                <p>{{ usong }}</p>
                <p>{{ uname }}</p>
              </div>
            </div>
            <div class="right">
              <ul ref="lyricUL">
                <li v-for="(item, i) in lyricsObjArr" :style="{
                  color: lyricIndex === i ? 'skyblue' : '#ded9d9',
                  fontSize: lyricIndex === i ? '20px' : '15px',
                }" :key="item.uid" :data-index="i" ref="lyric">
                  {{ item.lyric }}
                </li>
              </ul>
            </div>
          </div>
          <div class="songControls">
            <div class="playmusic">
              <div class="musicContainer">
                <!-- 歌曲进度区 -->
                <div class="jindu">
                  <!-- 歌曲动态进度条 -->
                  <div class="barcontrol">
                    <!-- 播放进度 -->
                    <div class="radircontrol" :style="{ width: activeWidth + 'px' }">
                      <!-- 播放进度小圆球 -->
                      <div class="autocircle"></div>
                    </div>
                  </div>
                </div>
                <div class="songAuthor">
                  <img :src="aImg === '' ? baseUrl : aImg" @click="isTopic" />
                  <div class="songInfo">
                    <p>{{ usong }}</p>
                    <p>{{ uname }}</p>
                  </div>
                </div>
                <div class="controls">
                  <i class="iconfont" @click="songTypePlay" :class="
                    TypePlay ? 'icon-23_shunxubofang' : 'icon-suijibofang'
                  "></i>
                  <i class="iconfont icon-shangyishou" @click="prevent"></i>
                  <i class="iconfont" @click="playSong" :class="isActions ? 'icon-zanting' : ' icon-bofang'"></i>
                  <i class="iconfont icon-kuaijin" @click="next"></i>
                  <i class="iconfont icon-xihuan"></i>
                </div>
                <div class="songTimer">
                  <div class="timer">
                    <span>{{ current }}</span>/<span>{{ suntime }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="songBg">
          <img :src="aImg" />
        </div>
      </div>
    </transition>
    <!-- 路由展示页面 -->

    <keep-alive :include="['MyLove', 'MusicHouse', 'RecentPlay', 'PlayList']">
      <router-view></router-view>
    </keep-alive>

    <!-- 歌曲播放控件 -->
    <play ref="playFunction" @timer="ss" @date="obj" @showPage="showPage" @jindu="jindu" @Actions="link"
      @type="musicPlayType" :link="this.isActions" :type="this.TypePlay"></play>
  </div>
</template>

<script>
import "animate.css";

import play from "../components/Play.vue";
import request from "@/config/request";
export default {
  name: "NacMain",
  data() {
    return {
      baseUrl:
        "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
      geciShow: false, //打开歌词页面
      lyricsObjArr: [], //歌词
      uname: "", //歌曲作者
      usong: "", //歌曲名
      aImg: "", //歌曲图片
      lyricIndex: 0,
      current: 0, //当前播放时间
      suntime: 0, //歌曲总共时间
      activeWidth: 0, //圆点的位置
      isActions: false,
      TypePlay: false,
    };
  },
  components: {
    play,
  },

  methods: {

    //点击关闭歌词页面
    isTopic() {
      this.geciShow = !this.geciShow;
    },
    showPage() {
      this.geciShow = true;
    },
    //获取Play组件传来的数据
    obj(e) {
      (this.aImg = e.aImg),
        (this.uname = e.uname),
        (this.usong = e.usong),
        (this.lyricsObjArr = e.lyricsObjArr),
        (this.suntime = e.suntime);
    },
    //获取play组件传来的播放时间进度
    ss(e) {
      for (let i = 0; i < this.lyricsObjArr.length; i++) {
        if (e > parseInt(this.lyricsObjArr[i].time) - 0.5) {
          const index = this.$refs.lyric[i].dataset.index;

          if (i === parseInt(index)) {
            this.lyricIndex = i;
            this.$refs.lyricUL.style.transform = `translateY(${150 - 50 * i
              }px)`;
          }
        }
      }
    },
    //歌曲播放进度
    jindu(e) {
      let activeWidth = (e.currentTime / e.duration) * 1200;
      this.activeWidth = activeWidth;
      let current = this.timer(parseInt(e.currentTime));
      this.current = current;
    },
    //时间处理函数
    timer(s) {
      var h;
      h = Math.floor(s / 60);
      s = s % 60;
      h += "";
      s += "";
      h = h.length == 1 ? "0" + h : h;
      s = s.length == 1 ? "0" + s : s;
      if (isNaN(h)) {
        return "&infin;";
      }
      return h + ":" + s;
    },
    //通过 this.$refs触发子组件的下一首功能函数
    next() {
      this.$refs.playFunction.nextList();
    },
    //通过 this.$refs触发子组件的上一首功能函数
    prevent() {
      this.$refs.playFunction.preventList();
    },
    //获取子组件播放的方式
    musicPlayType(e) {
      this.TypePlay = e.songPlayType;
    },
    //点击将播放方式改变
    songTypePlay() {
      this.TypePlay = !this.TypePlay;
    },
    //同步歌曲播放时的播放和暂停
    link(e) {
      this.isActions = e.isActions;
    },
    //点击将歌曲的播放取反
    playSong() {
      this.isActions = !this.isActions;
    },
  },
};
</script>

<style scoped>
.geciClose {
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
  margin-left: 10px;
}

li {
  transition: 0.5s;
}

.jindu {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  border-radius: 3px;
  background-color: grey;
}

.barcontrol {
  position: relative;
  width: 100%;
  height: 2px;
  background: rgba(0, 0, 0, 0.2);
  /* background-color: pink; */
  margin: auto;
}

/* 小红圈 */
.radircontrol {
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 1;
  height: 2px;
  background: red;
}

.autocircle {
  position: absolute;
  right: -6px;
  top: -3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
}

.songControls {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 1200px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  margin: 0 auto;
  z-index: 9999;
  color: #fff;
  /* //#332746 */
}

.songControls .musicContainer {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  position: relative;
  width: 100%;
  height: 100%;
  /* background-color: brown; */
}

.songControls .musicContainer img {
  width: 50px;
  height: 50px;
  margin: 0 20px;
  border-radius: 10px;
}

.songControls .songAuthor {
  width: 200px;
  height: 70px;
  display: flex;
  align-items: center;
}

.songControls .songAuthor p {
  width: 150px;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  margin: 5px auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 设置对齐模式 */
  -webkit-line-clamp: 1;
}

.songControls .controls {
  width: 600px;
  height: 70px;
  line-height: 70px;
  /* background-color: aquamarine; */
}

.songControls .controls i {
  font-size: 25px !important;
  margin: 0 50px;
}

.songControls .songTimer {
  width: 200px;
  height: 70px;
  position: relative;
  /* background-color: blue; */
}

.songControls .timer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.kt {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--theme-bg-color);
}

.songBg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  overflow: hidden;
}

.songBg img {
  width: 100%;
  height: 100%;
  filter: blur(10px);
  transform: scale(1.5);
  opacity: 1;
}

.songDetailPage {
  position: fixed;
  width: 1200px;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 999999;
}

.klj {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  width: 1200px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.kbs {
  position: relative;
  display: flex;
  justify-content: space-between;
}

.klj .left {
  width: 600px;
  height: 600px;
  display: flex;
}

.klj .kbs .left .containerl {
  text-align: center;
  margin: auto;
}

.klj .left .containerl img {
  width: 300px;
  height: 300px;

  border-radius: 20px;
}

.klj p {
  margin: 25px auto;
  color: #fff;
  font-size: 20px;
}

.klj .right {
  position: relative;
  width: 600px;
  height: 415px;
  margin-top: 75px;

  overflow: hidden;
}

.klj .left .container {
  width: 600px;
  height: 605px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.klj ul {
  width: 600px;
  height: 605px;
}

.klj ul li {
  text-align: center;
  list-style: none;
  margin: 30px auto;
}

.actived {
  background: url(../../src/assets/R-C.gif);
  color: red;
}

.listI .songName {
  width: 100%;
  height: 40px;
  text-align: left;
  padding-left: 20px;
  line-height: 40px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 设置对齐模式 */
  -webkit-line-clamp: 2;
}

.listI .songUname {
  width: 100%;
  height: 40px;
  text-align: left;
  padding-left: 20px;
  line-height: 40px;
  font-size: 14px;
}

.listI {
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
  /* background-color: blue; */
  margin-top: 10px;
}

.listI:hover {
  background: var(--theme-bg-color);
}

.listCont {
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  /* background-color: aqua; */
}

.listCont::-webkit-scrollbar {
  display: none;
}

.el-drawer {
  width: 19% !important;
  background-color: var(--content-title-color);
  border-radius: 20px;
  text-align: center;
  border-radius: 0 !important;
}

.el-drawer__body::-webkit-scrollbar {
  display: none;
}

.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 0 !important;
  height: 0 !important;
  opacity: 0.5;
  background: #000;
}
</style>