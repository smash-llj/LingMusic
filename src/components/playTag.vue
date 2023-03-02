<template>
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
</template>

<script>
export default {
  name: "playTag",
};
</script>

<style scoped>
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
</style>