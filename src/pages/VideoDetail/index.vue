<template>
  <div class="videoContainer">
    <div class="navTypemk">
      <i class="iconfont icon-houtui backs" @click="back"></i>
    </div>

    <div class="video">
      <video :src="VideoUrl" autoplay controls class="videos"></video>
    </div>

    <div class="videoDetail">
      <div class="VdTitle">{{ videoDetails.name }}</div>
      <div class="Vdtimer">
        <span>演唱: {{ videoDetails.artistName }}</span>
        <span>发布时间: {{ videoDetails.publishTime }}</span>
        <div class="love">
          <i class="iconfont icon-aixin ai"></i>
          <span>{{ videoInfo.likedCount }}</span>
          <i class="iconfont icon-pinglun" @click="showComments"></i>
          <span>{{ videoInfo.commentCount }}</span>
          <i class="iconfont icon-zhuanfa"></i>
          <span>{{ videoInfo.shareCount }}</span>
        </div>
      </div>
      <div class="comments" v-if="isComments">
        <h4 class="title">热门评论</h4>
        <div
          class="commentsItem"
          v-for="(item, index) in videoComments"
          :key="index"
        >
          <div class="commentsDetail">
            <img :src="item.user.avatarUrl" />
            <div class="commentAuthor">
              <p>{{ item.user.nickname }}</p>
              <p>{{ item.timeStr }}</p>
            </div>
          </div>

          <div class="texts">
            <div>
              {{ item.content }}
            </div>
            <div class="dianzan">
              <i class="iconfont icon-dianzan zan"></i>
              <span>{{ item.likedCount }}</span>
              <i class="iconfont icon-zhuanfa fen"> 分享评论</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import request from "../../config/request";
export default {
  name: "VideoDetail",
  data() {
    return {
      VideoUrl: "",
      videoDetails: {},
      videoInfo: {},
      videoComments: [],
      isComments: true,
    };
  },
  methods: {
    //获取视频的播放地址
    async getVideoUrl() {
      let Url = await request("/mv/url", { id: this.$route.query.videoId });
      // console.log(Url);
      this.VideoUrl = Url.data.url;
    },
    //获取mv相关信息
    async getVideoDetail() {
      let detail = await request("/mv/detail", {
        mvid: this.$route.query.videoId,
      });
      // console.log(detail);
      this.videoDetails = detail.data;
    },
    //获取视频的评论数和喜欢人数
    async getVideoInfo() {
      let info = await request("/mv/detail/info", {
        mvid: this.$route.query.videoId,
      });
      this.videoInfo = info;
    },

    //获取评论内容
    async getComments() {
      let comment = await request("/comment/mv", {
        id: this.$route.query.videoId,
        limit: 40,
      });
      console.log(comment);
      this.videoComments = comment.hotComments;
    },
    //点击取反，将评论关闭
    showComments() {
      this.isComments = !this.isComments;
    },
    //返回上一级菜单
    back() {
      this.$router.back();
    },
  },
  mounted() {
    this.getVideoUrl();
    this.getVideoDetail();
    this.getVideoInfo();
    this.getComments();
  },
};
</script>
  
  <style scoped>
.VdTitle {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  margin: 10px 0;
  font-size: 20px;
}
.Vdtimer {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  margin: 10px 0;
  font-size: 18px;
}
.Vdtimer span {
  margin-right: 30px;
}
.dianzan {
  margin: 10px auto;
}
.fen {
  margin-left: 30px;
  font-size: 16px !important;
}
.zan {
  margin-right: 10px;
}
.videoContainer {
  width: 100%;
  height: 595px;
  overflow: scroll;
  color: #fff;
  background-color: var(--theme-bg-color);
}
.videoContainer::-webkit-scrollbar {
  display: none;
}

.comments .title {
  padding-left: 20px;
  color: red;
}

.navTypemk {
  position: relative;
  width: 100%;
  top: 1%;
  left: 1%;
  margin-bottom: 10px;
}

.video {
  width: 100%;
  height: 400px;
  background-color: black;
  margin-top: 10px;
  overflow-y: hidden;
}
.videos {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
.videoDetail {
  text-align: left;
  width: 100%;
  overflow: scroll;
}

.videoDetail::-webkit-scrollbar {
  display: none;
}

.videoDetail h2,
h3 {
  margin-left: 20px;
  margin-top: 15px;
  line-height: 30px;
}
h3 span {
  margin-right: 30px;
}
.love {
  float: right;
  margin-right: 20px;
}
.love .ai {
  color: red;
}
.love i {
  font-size: 20px;
  margin: 0 5px;
}
.love span {
  margin: 0 5px;
}
.comments {
  width: 100%;
}
.commentsItem {
  width: 100%;
  /* background-color: blueviolet; */
  border-radius: 10px;
  margin: 30px auto;
}
.commentsDetail {
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.commentsItem img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 0 10px;
}
.texts {
  width: 980px;
  margin: 10px auto;
  overflow: hidden;
  padding-left: 80px;
  text-overflow: ellipsis;
}
</style>