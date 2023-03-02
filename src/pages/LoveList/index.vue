<template>
  <div class="gedanList">
    <div class="listDate">
      <div class="listItem" v-for="(item, index) in gedanList" :key="index" @click="getid(item)">
        <img v-lazy="item.coverImgUrl" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../config/request";
export default {
  name: "LoveList",
  data() {
    return {
      gedanList: [],
    };
  },
  methods: {
    //获取用户喜欢的歌单
    async getLoveList() {
      let userInfo = localStorage.getItem("userInfo");
      let uid = JSON.parse(userInfo);
      let loveList = await request("/user/playlist", { uid: uid.userId });
      this.gedanList = loveList.playlist;
    },
    getid(item) {
      this.$router.push({
        name: "listDetail",
        query: {
          id: item.id,
          name: item.name,
          author: item.creator.avatarUrl,
          ds: item.description,
          img: item.coverImgUrl,
          authorName: item.creator.nickname,
        },
      });
    },
  },
  mounted() {
    this.getLoveList();
  },
};
</script>

<style>
.gedanList {
  width: 100%;

  background-color: var(--content-bg);
}

.listDate {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.listItem {
  margin: 10px 25px;
}

.listDate img {
  width: 150px;
  height: 150px;
  border-radius: 20px;
}

.listDate p {
  width: 150px;
  height: 30px;
  color: #fff;
  text-align: center;
  line-height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>