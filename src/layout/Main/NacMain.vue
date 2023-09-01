<template>
  <div class="kt">

    <!-- 路由展示页面 -->
    <keep-alive :include="['MyLove', 'MusicHouse', 'RecentPlay', 'PlayList']">
      <router-view></router-view>
    </keep-alive>

    <div class="playControls"></div>
    <!-- 歌曲播放控件 -->
    <play ref="playFunction"></play>

  </div>
</template>

<script>
import "animate.css";

import play from "../../components/Play.vue";
export default {
  name: "NacMain",
  data() {
    return {
    };
  },
  components: {
    play,
  },


};
</script>

<style lang="scss" scoped>
li {
  transition: 0.5s;
}

.kt {

  width: 85%;
  height: 100%;
  background-color: var(--theme-bg-color);

  .songDetailPage {
    position: fixed;
    width: 1200px;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 999999;

    .klj {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 99999;
      width: 1200px;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);

      .geciClose {
        color: #fff;
        font-size: 18px;
        margin-top: 10px;
        margin-left: 10px;
      }

      .kbs {
        width: 100%;
        display: flex;
        align-content: center;



        .left {
          width: 40%;
          height: 600px;
          display: flex;

          .containerl {
            text-align: center;
            margin: auto;

            p {
              margin: 25px auto;
              color: #fff;
              font-size: 20px;
            }

            img {
              width: 300px;
              height: 300px;

              border-radius: 20px;
            }

          }

        }


        .right {

          width: 60%;
          height: 415px;
          margin-top: 75px;

          overflow: hidden;

          ul {
            width: 600px;
            height: 605px;

            .actived {
              background: url(../../../src/assets/R-C.gif);
              color: red;
            }

            li {
              text-align: center;
              list-style: none;
              margin: 30px auto;
            }
          }
        }

      }

    }

    .songBg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        filter: blur(10px);
        transform: scale(1.5);
        opacity: 1;
      }
    }

  }


}

.playControls {
  width: 1000px;
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
</style>