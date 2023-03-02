<template>
  <div class="ko">
    <div class="ls">
      <section class="pricing-table">
        <div class="card" v-for="(item, index) in topListItem" :key="index">
          <div class="prices">{{ item.name }}</div>
          <ul class="details">
            <li v-for="(itemk, index) in item.tracks" :key="index" @click="playTop(itemk)">
              <div class="songName">
                <img :src="itemk.al.picUrl" />
                <div class="aName">{{ itemk.name }}</div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <div class="video">
      <div class="MvTitle">热门Mv <span @click="next">下一页</span></div>
      <div class="videoContainer">
        <div class="videoImg" v-for="(item, index) in Mv" :key="index">
          <img :src="item.cover" />
          <i class="iconfont videoPlay icon-bofang" @click="playVideo(item)"></i>
          <p class="MvName">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import request from "../../config/request";
export default {
  name: "musichouse",
  data() {
    return {
      topListItem: [],
      videoUrl: "",
      kj: false,
      Mv: [],
      page: 0
    };
  },
  methods: {

    //获取排行榜详情
    async getRec() {
      let topList = await request("/toplist");
      let resultArr = [];
      for (let i = 2; i < 5; i++) {
        let topListId = topList.list[i].id;
        let topListItem = await request("/playlist/detail", { id: topListId });
        let weneed = {
          name: topListItem.playlist.name,
          tracks: topListItem.playlist.tracks.slice(0, 3),
        };
        resultArr.push(weneed);
        this.topListItem = resultArr;
      }
    },
    next() {
      this.page += 1
      this.getAR()
    },
    //获取mV
    async getAR() {
      let MvDate = await request("/top/mv", {
        limit: 9,
        offset: this.page
      });
      this.Mv = MvDate.data;
    },

    playTop(x) {
      this.$bus.$emit("musicId", x.id);
    },

    //播放mV
    playVideo(video) {
      this.$router.push({
        name: "videodetail",
        query: {
          videoId: video.id,
        },
      });
    },

  },

  mounted() {
    this.getRec();
    this.getAR();

  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700");

.MvName {
  text-align: center;
  font-size: 15px;
  color: #fff;
}

.MvTitle {
  color: var(--content-title-color);
  font-size: 18px;
  margin-left: 20px;
}

.MvTitle span {
  float: right;
  margin-right: 30px;
}

li {
  list-style: none;
}

.videoPlay {
  display: none;
}

.videoContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.videoContainer :hover .videoPlay {
  display: block;
  color: #96c93d;
  font-size: 50px !important;
}

.videoImg {
  position: relative;
  width: 300px;
  height: 200px;
  margin: 30px auto;
}

.video img {
  width: 300px;
  height: 200px;
  border-radius: 20px;
}

.video p {
  margin-top: 5px;
  font-size: 13px;
}

.videoPlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
}

.video {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
}

.video h1 {
  text-align: left;
  margin-top: 10px;
}

.songName {
  display: flex;
  justify-content: center;
  align-items: center;
}

.songName img {
  width: 50px;
  height: 50px;
  margin: 0 10px;
  border-radius: 10px;
}

.aName {
  width: 120px;
  margin: 0 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}

.aName {
  font-size: 15px;
}

.ko {
  position: relative;
  width: 100%;
  height: 595px;
  background-color: var(--theme-bg-color);
  /* background-color: #ff416c; */
  overflow: scroll;
}

.ko::-webkit-scrollbar {
  display: none;
}

.prices {
  font-size: 1.5rem;
}

.pricing-table {
  display: flex;
  position: absolute;

  top: 2%;
  left: 50%;
  transform: translate(-50%);
}

.pricing-table .card {
  width: 300px;
  padding: 15px;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 2px 2px 46px -4px rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease-in-out;
}

.pricing-table .card:nth-child(1) {
  background: #7f7fd5;
  background: linear-gradient(to left, #91eae4, #86a8e7, #7f7fd5);
}

.pricing-table .card:nth-child(1) .price::before {
  content: "$20";
}

.pricing-table .card:nth-child(2) {
  margin: 0 30px;
  z-index: 2;

  background: #ff416c;
  background: linear-gradient(to right, #ff4b2b, #ff416c);
}

.pricing-table .card:nth-child(2) .price::before {
  content: "$50";
}

.pricing-table .card:nth-child(3) {
  background: #00b09b;
  background: linear-gradient(to right, #96c93d, #00b09b);
}

.pricing-table .card:nth-child(3) .price::before {
  content: "$100";
}

.pricing-table .card:nth-child(1) .price,
.pricing-table .card:nth-child(3) .price {
  font-size: 6rem;
}

.pricing-table .card .type {
  margin-top: 30px;
  letter-spacing: 0.1rem;
}

.pricing-table .card .price {
  font-size: 6.5rem;
  position: relative;
  margin: 10px 0px 20px;
  z-index: 2;
}

.pricing-table .card .price span {
  font-size: 1.8rem;
  position: absolute;
  left: -15%;
  top: 65%;
}

.pricing-table .card .price::before {
  position: absolute;
  content: "";
  color: rgba(255, 255, 255, 0.06);
  font-size: 9.5rem;
  z-index: -1;
  right: -30%;
  bottom: 15%;
  text-shadow: 0 0 0px rgba(51, 55, 69, 0);
  transition: all 1s ease-in-out;
}

.pricing-table .card .details {
  text-transform: capitalize;
}

.pricing-table .card .details li {
  margin: 15px 0px;
}

.pricing-table .card .buy-button {
  cursor: pointer;
  position: absolute;
  width: 250px;
  height: 180px;
  background: #fff;
  border-radius: 15%;
  right: -34%;
  bottom: -27%;
  transition: all 0.4s ease-in-out;
}

.pricing-table .card .buy-button h3 {
  text-shadow: 0 0 0;
  text-decoration: none;
  color: #fff;
  position: absolute;
  left: 8%;
  top: 10%;
  color: #333745;
  font-size: 1.2rem;
  transition: all 0.4s ease-in-out;
}

.pricing-table .card:hover {
  transform: scale(1.02);
}

.pricing-table .card:hover .price::before {
  -webkit-animation: text-hover 1s ease-in-out infinite normal;
  animation: text-hover 1s ease-in-out infinite normal;
}

@-webkit-keyframes text-hover {
  0% {
    right: -30%;
  }

  50% {
    right: -37%;
  }

  100% {
    right: -30%;
  }
}

@keyframes text-hover {
  0% {
    right: -30%;
  }

  50% {
    right: -37%;
  }

  100% {
    right: -30%;
  }
}
</style>