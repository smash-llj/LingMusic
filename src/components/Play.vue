<template>
  <div>
    <div class="songControl">
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
          <audio :src="Url" autoplay @play="onPlay" @pause="onPause" @ended="onEnded" id="audio" @timeupdate="updata"
            @canplay="getDuration"></audio>
          <div class="controls">
            <i class="iconfont" @click="songType" :class="
              songPlayType ? 'icon-23_shunxubofang' : 'icon-suijibofang'
            "></i>
            <i class="iconfont icon-shangyishou" @click="preventList"></i>
            <i class="iconfont" @click="isPlay(link)" :class="isActions ? 'icon-zanting' : ' icon-bofang'"></i>
            <i class="iconfont icon-kuaijin" @click="nextList"></i>
            <i class="iconfont icon-24gf-playlistMusic5" @click="drawerAside"></i>
          </div>
          <div class="songTimer">
            <div class="timer">
              <span>{{ current }}</span>/<span>{{ suntime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 侧边栏播放队列 -->
    <div class="asideNav">
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" :modal="false">
        <div class="asideNavTitle">播放队列</div>
        <div class="asideNavList">
          <ul>
            <li v-for="(item, index) in this.list" :key="index" @click="playmusic(item.id, index)" ref="li">
              <img :src="item.al.picUrl" class="asidenavImg" />
              <div class="songAuthorInfo">
                <p>{{ item.name }}</p>
                <p>{{ item.ar[0].name }}</p>
              </div>
            </li>
          </ul>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import request from "../config/request";
import needLogin from "../config/needLogin";
import axios from "axios";
export default {
  name: "Play",
  props: ["link", "type"],
  data() {
    return {
      isplayShow: false, //底部控件的显示
      musicId: 0,
      Url: "",
      isActions: false,
      baseUrl:
        "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
      usong: "",
      aImg: "",
      uname: "",
      suntime: 0, //歌曲总时长
      current: 0, //歌曲进度时长
      activeWidth: 0, //歌曲进度百分比
      lyricsObjArr: [], //歌词信息
      lyricIndex: 0,
      isshowLyric: false, //歌词展示控制
      list: [], //获取各组件传来的播放歌曲数据列表
      indexs: 0, //获取各组件点击播放歌曲的索引值
      drawer: false, //打开侧边栏
      songPlayType: false, //切换歌曲播放方式
      geciShow: false, //歌词展示页面
    };
  },
  methods: {
    drawerAside() {
      this.drawer = true;
    },
    playmusic(e, index) {
      this.musicId = e;
    },
    //歌曲播放时
    onPlay() {
      this.isActions = true;
      this.$emit("date", {
        aImg: this.aImg,
        uname: this.uname,
        usong: this.usong,
        lyricsObjArr: this.lyricsObjArr,
        current: this.current,
        suntime: this.suntime,
      });
      this.$emit("Actions", {
        isActions: this.isActions,
      });
    },
    kio() {
      this.geciShow = false;
      this.isplayShow = false;
    },
    isTopic() {
      this.$emit("showPage", true);
    },
    //获取歌曲url
    async getUrl(Sid) {
      let url = await needLogin("/song/url", { id: Sid });

      this.Url = url.data[0].url;
    },
    //用户点击后，如果为真，那么获取url并播放歌曲。为假的时候暂停歌曲
    isPlay() {
      this.isActions = !this.isActions;
      this.$emit("Actions", {
        isActions: this.isActions,
      });
      this.songControlPlay(this.isActions);
    },

    //获取歌曲详情
    async getDetail(newl) {
      let songDetail = await request("/song/detail", { ids: newl });
      let Date = songDetail.songs[0];
      this.aImg = Date.al.picUrl;
      this.usong = Date.name;
      this.uname = Date.ar[0].name;
    },
    //获取总播放时间
    getDuration() {
      // var audio = document.querySelector("audio");
      // audio.duration; //获取总播放时间
      // audio.currentTime; //获取播放进度
      var audio = document.querySelector("audio");

      let sumtime = this.timer(parseInt(audio.duration));
      this.suntime = sumtime;
    },

    updata(e) {
      //获取音乐实时进度
      let current = this.timer(parseInt(e.target.currentTime));
      this.current = current;

      this.activeJindu();
      //获取当前播放秒数
      let s = this.time_to_sec(this.current);
      this.$emit("timer", s);
      // console.log("长度为" + this.lyricsObjArr.length);
      // 匹配歌词并滚动歌词
    },
    //歌曲进度函数（计算得出歌曲进度百分比）
    activeJindu() {
      var audio = document.querySelector("audio");

      let activeWidth = (audio.currentTime / audio.duration) * 1000;

      this.$emit("jindu", {
        currentTime: audio.currentTime,
        duration: audio.duration,
      });
      this.activeWidth = activeWidth;
    },
    //获取歌词
    async getLyric(newl) {
      let lyric = await request("/lyric", { id: newl });
      const regNewLine = /\n/;
      const lineArr = lyric.lrc.lyric.split(regNewLine); // 每行歌词的数组
      const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;

      lineArr.forEach((item) => {
        if (item === "") return;
        const obj = {};
        const time = item.match(regTime);

        obj.lyric =
          item.split("]")[1].trim() === "" ? "" : item.split("]")[1].trim();
        obj.time = this.formatLyricTime(time[0].slice(1, time[0].length - 1));

        obj.uid = Math.random().toString().slice(-6);
        if (obj.lyric === "") {
        } else {
          this.lyricsObjArr.push(obj);
        }
      });
    },

    // 格式化歌词的时间 转换成 sss:ms
    formatLyricTime(time) {
      const regMin = /.*:/;
      const regSec = /:.*\./;
      const regMs = /\./;

      const min = parseInt(time.match(regMin)[0].slice(0, 2));
      let sec = parseInt(time.match(regSec)[0].slice(1, 3));
      const ms = time.slice(
        time.match(regMs).index + 1,
        time.match(regMs).index + 3
      );
      if (min !== 0) {
        sec += min * 60;
      }
      return Number(sec + "." + ms);
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
    //时间处理函数，将00:00类型转换成秒
    time_to_sec(s) {
      let ss = s.split(":");
      let ms = parseInt(ss[0]);
      let ks = parseInt(ss[1]);

      let t = ms * 60 + ks;

      return t;
    },

    //歌曲暂停时
    onPause() {
      console.log("停止播放");
    },
    //歌曲结束播放时
    onEnded() {
      if (this.songPlayType) {
        let next = this.indexs + 1;
        this.musicId = this.list[next].id;
        this.indexs = next;
      } else {
        let suiji = Math.floor(Math.random() * (this.list.length - 0)) + 0;
        let next = suiji;
        this.musicId = this.list[next].id;
        this.indexs = suiji;
      }

      // this.isActions = false;
      //将歌曲展示区隐藏
      // this.isshowLyric = false;
      // this.activeWidth = 0;
      // this.songTypes();
    },
    //点击实现上一首和下一首
    nextList() {
      if (this.indexs === this.list.length) {
        alert("这是最后一首了");
      } else {
        if (this.songPlayType) {
          let next = this.indexs + 1;
          this.musicId = this.list[next].id;
          this.indexs = next;
        } else {
          let suiji = Math.floor(Math.random() * (this.list.length - 0)) + 0;
          let next = suiji;
          this.musicId = this.list[next].id;
          this.indexs = suiji;
        }
      }
    },
    preventList() {
      if (this.indexs === 0) {
        alert("这是第一首了");
      } else {
        let prevent = this.indexs - 1;
        this.musicId = this.list[prevent].id;
        this.indexs = prevent;
      }
    },
    getMusicId(item) {
      this.musicId = item;
    },

    //切换播放方式
    songType() {
      this.songPlayType = !this.songPlayType;
      this.$emit("type", {
        songPlayType: this.songPlayType,
      });
    },
    //歌曲播放完播放方式
    songTypes() {
      if (this.songPlayType) {
        if (this.indexs === this.list.length) {
          alert("这是最后一首了");
        } else {
          let next = this.indexs + 1;
          this.musicId = this.list[next].id;
          this.indexs = next;
        }
      } else {
        if (this.indexs === this.list.length) {
          alert("这是最后一首了");
        } else {
          let suiji = Math.floor(Math.random() * (this.list.length - 0)) + 0;
          let next = suiji;
          this.musicId = this.list[next].id;
          this.indexs = suiji;
        }
      }
    },
    //判断传入的值，如果为真，那就播放，否则暂停
    songControlPlay(type) {
      if (type) {
        if (this.Url === "") {
          this.getUrl();
        }
        var audio = document.querySelector("audio");
        audio.play();
      } else {
        var audio = document.getElementById("audio");
        audio.pause();
      }
    },
  },
  mounted() {
    this.$bus.$on("musicId", (x) => {
      this.musicId = x;
    });
    this.$bus.$on("musicList", (x) => {
      this.musicId = x.musicId;
      this.list = x.list;

      this.indexs = x.index;
    });
  },
  watch: {
    musicId(newl, oldl) {
      this.lyricsObjArr = [];
      this.getUrl(newl);
      this.getDetail(newl);
      this.getLyric(newl);
    },
    link: {
      handler(val) {
        console.log(val);
        this.isActions = val;
        this.songControlPlay(val);
      },
    },
    type: {
      handler(val) {
        this.songPlayType = val;
      },
    },
  },
};
</script>

<style >
.el-drawer {
  border-radius: 10px;
  background-color: #564859;
}

.el-drawer__body::-webkit-scrollbar {
  display: none;
}

.asideNav .asideNavTitle {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  background: var(--content-bg);
}

.asideNav .asideNavList {
  width: 100%;
  height: 100%;
}

.asideNav .asideNavList ul {
  width: 100%;
  height: 100%;
}

.asideNav .asideNavList ul li {
  box-sizing: border-box;
  padding-top: 20px;
  width: 100%;

  display: flex;
  line-height: 50px;
  padding: 10px;
}

.asideNav .asideNavList ul li .asidenavImg {
  width: 50px;
  height: 50px;
  border-radius: 20px;
}

.songAuthorInfo {
  display: flex;
}

.asideNav .asideNavList ul li p {
  width: 100px;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 10px;
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

.songControl {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 1000px;
  height: 60px;
  background-color: #564859;
  border-radius: 0px;
  /* //#332746 */
}

.musicContainer {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  position: relative;
  width: 100%;
  height: 100%;
  /* background-color: brown; */
}

.musicContainer img {
  width: 50px;
  height: 50px;
  margin: 0 20px;
  border-radius: 10px;
}

.songAuthor {
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
}

.songAuthor p {
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

.controls {
  width: 600px;
  height: 60px;
  line-height: 60px;
  /* background-color: aquamarine; */
}

.controls i {
  font-size: 25px !important;
  margin: 0 50px;
}

.songTimer {
  width: 200px;
  height: 60px;
  position: relative;
  /* background-color: blue; */
}

.timer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>