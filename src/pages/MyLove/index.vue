<template>
  <div class="myLove">
    <div class="Navtitle">
      <span @click="jopSong" :class="color ? 'titleColor' : ''">歌曲</span>
      <span @click="jopGeDan" :class="colors ? 'titleColor' : ''">歌单</span>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "MyLove",
  data() {
    return {
      color: true,
      colors: false,
    };
  },
  methods: {
    jopSong() {
      this.color = true;
      this.colors = false;
      this.$router.push({
        name: "lovesongs",
      });
    },
    jopGeDan() {
      this.$router.push({
        name: "lovelist",
      });
      this.color = false;
      this.colors = true;
    },
  },
};
</script>

<style  scoped>
.titleColor {
  color: green !important;
  font-size: 30px !important;
}
.Navtitle {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-radius: 0px;
  background-color: var(--theme-bg-color);
}
.Navtitle span {
  margin: 0 50px;
  color: #fff;
}
.el-carousel__indicators {
  display: none;
}
.topic {
  float: right;
  color: black;
  font-size: 10px;
  line-height: 30px;
}
.gedanName {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 800px;
  height: 100%;
  background-color: #ff4b2b;
  border-radius: 20px;
  box-shadow: 10px 0 50px rgba(0, 0, 0, 0.5);
  /* background-color: aquamarine; */
}

h2 {
  text-align: left;
  padding-left: 30px;
  color: #d81e06;
  margin: 5px auto;
}
.gedanItem {
  position: relative;
  width: 100%;
  height: 100%;

  /* background-color: #d81e06; */
}
.gedanItem img {
  width: 300px;
  margin-right: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.2);
}
.gedanItem .miaoshu {
  width: 500px;
  /* background-color: brown; */
}

.miaoshu .title {
  padding-top: 80px;
  font-size: 20px;
}

.miaoshu .detail {
  padding-top: 50px;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 设置对齐模式 */
  -webkit-line-clamp: 2;
}
.myLove {
  width: 100%;
  height: 595px;
  overflow: scroll;
  background-color: var(--theme-bg-color);
  /* background-color: brown; */
}
.myLove::-webkit-scrollbar {
  display: none;
}
.LoveGandan {
  width: 100%;
  margin-top: 10px;
}
/* .LoveGandan::-webkit-scrollbar {
  display: none;
} */
</style>