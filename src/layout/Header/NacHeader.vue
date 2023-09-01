<template>
  <div class="header">
    <div class="menu-circle"></div>
    <div class="position">
      <i class="iconfont icon-houtui" @click="houtui"></i>
      <i class="iconfont icon-qianjin" @click="qianjin"></i>
    </div>
    <div class="search-bar">
      <input type="text" :placeholder="showKeyword" v-model="serch" />
    </div>
    <NavWheater></NavWheater>
    <div class="header-profile">
      <div class="notification">
        <span class="notification-number">3</span>
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" class="feather feather-bell">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      </div>

      <el-dropdown trigger="click">
        <div class="topic">
          <img class="profile-img" :src="userImg" alt="点击头像即可退出" />
          <p class="userNames">{{ userName }}</p>
        </div>

        <el-dropdown-menu>
          <el-dropdown-item @click.native="goSelf">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="serchResultList" v-if="this.serch === '' ? false : true">
      <div class="list">
        <h3>热门搜索</h3>
        <ul>
          <li v-for="(item, index) in song" :key="index" @click="serchPlay(item)">
            <div class="sName">{{ item.name }}</div>
            <div class="sAuthor">{{ item.ar[0].name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import request from "../../config/request";
import NavWheater from "../../components/NavWheater.vue";
export default {
  name: "NacHeader",
  data() {
    return {
      serch: "",
      song: [],
      uid: {},
      showKeyword: ''
    };
  },
  computed: {
    ...mapGetters(['userName', 'userImg'])
  },
  methods: {
    ...mapActions('user', ['loginOut']),
    goSelf() {
      this.$router.push({
        name: 'selfPage',
      })
    },

    //获取热搜词
    async getHotSearch() {
      let res = await request("/search/default")
      this.showKeyword = res.data.showKeyword
    },

    houtui() {
      this.$router.go(-1);
    },
    qianjin() {
      this.$router.go(1);
    },
    //搜索函数
    async serchResult(v) {
      let link = await request("/cloudsearch", { keywords: v });
      this.song = link.result.songs;
    },
    serchPlay(item) {
      this.$bus.$emit("musicId", item.id);
      this.serch = "";
    },


    exit() {
      this.loginOut()
      this.$message({
        showClose: true,
        message: "退出成功",
        type: "success",
      });
      this.$router.push({
        name: "userLogin",
      });
    },
  },
  components: {
    NavWheater,
  },
  watch: {
    //监视input，避免多次发送请求
    serch() {
      let timer;
      clearTimeout(timer);
      if (this.serch === "") {
        this.serch = "";
      } else {
        timer = setTimeout(() => {
          this.serchResult(this.serch.trim());
        }, 1000);
      }
    },
  },
  mounted() {
    this.getHotSearch()

  },
};
</script>

<style>
.position i:hover {
  color: #5fcf65;
}

.topic {
  display: flex;
  align-items: center;
}

.userNames {
  height: 30px;
  line-height: 30px;
  margin-left: 10px;
  font-size: 15px;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
}

.serchResultList {
  display: flex;
  position: absolute;
  top: 60px;
  left: 318px;
  z-index: 999999;
  width: 400px;
  height: 400px;
  border-radius: 20px;
  background-color: var(--dropdown-bg);
}

.list {
  width: 400px;
  height: 400px;
  overflow: scroll;

}

.list::-webkit-scrollbar {
  display: none;
}

.list h3 {
  width: 400px;
  height: 30px;
  padding: 0 20px;
  color: #f96057;
  border-bottom: 1px solid var(--inactive-color);
}

.list ul {
  width: 100%;
  height: 370px;
}

.list ul li {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  margin: 10px auto;
  color: #fff;
  border-bottom: 1px solid var(--inactive-color);
}

li:hover {
  background-color: var(--theme-bg-color);
}

li img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 0 10px;
}

li .sName {
  width: 200px;
  height: 50px;
  padding: 0 20px;
  line-height: 50px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
}

li .sAuthor {
  width: 100px;
  height: 50px;
  margin-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 50px;
}

.position i {
  color: #fff;
}

.header {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 58px;
  width: 100%;
  border-bottom: 1px solid var(--border-color);
  padding: 0 30px;
  white-space: nowrap;
}

@media screen and (max-width: 480px) {
  .header {
    padding: 0 16px;
  }
}

.header-menu {
  display: flex;
  align-items: center;
}

.header-menu a {
  padding: 20px 30px;
  text-decoration: none;
  color: var(--inactive-color);
  border-bottom: 2px solid transparent;
  transition: 0.3s;
}

@media screen and (max-width: 610px) {
  .header-menu a:not(.main-header-link) {
    display: none;
  }
}

.header-menu a.is-active,
.header-menu a:hover {
  color: var(--theme-color);
  border-bottom: 2px solid var(--theme-color);
}

.notify {
  position: relative;
}

.notify:before {
  content: "";
  position: absolute;
  background-color: #3a6df0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  right: 20px;
  top: 16px;
}

@media screen and (max-width: 1055px) {
  .notify {
    display: none;
  }
}

.menu-circle {
  width: 15px;
  height: 15px;
  background-color: #f96057;
  border-radius: 50%;
  box-shadow: 24px 0 0 0 #f8ce52, 48px 0 0 0 #5fcf65;
  margin-right: 195px;
  flex-shrink: 0;
}

@media screen and (max-width: 945px) {
  .menu-circle {
    display: none;
  }
}

.search-bar {
  height: 40px;
  display: flex;
  width: 100%;
  max-width: 400px;
  padding-left: 16px;
  border-radius: 4px;
}

.search-bar input {
  width: 100%;
  height: 100%;
  border: none;
  background-color: var(--search-bg);
  border-radius: 4px;
  font-family: var(--body-font);
  font-size: 15px;
  font-weight: 500;
  padding: 0 20px 0 40px;
  box-shadow: 0 0 0 2px rgba(134, 140, 160, 0.02);
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23717790c7'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
  background-size: 14px;
  background-repeat: no-repeat;
  background-position: 16px 48%;
  color: var(--theme-color);
}

.search-bar input::-moz-placeholder {
  font-family: var(--body-font);
  color: var(--inactive-color);
  font-size: 15px;
  font-weight: 500;
}

.search-bar input:-ms-input-placeholder {
  font-family: var(--body-font);
  color: var(--inactive-color);
  font-size: 15px;
  font-weight: 500;
}

.search-bar input::placeholder {
  font-family: var(--body-font);
  color: var(--inactive-color);
  font-size: 15px;
  font-weight: 500;
}

.header-profile {
  display: flex;
  align-items: center;
  padding: 0 16px 0 40px;
  margin-left: auto;
  flex-shrink: 0;
}

.header-profile svg {
  width: 22px;
  color: #f9fafb;
  flex-shrink: 0;
}

.notification {
  position: relative;
}

.notification-number {
  position: absolute;
  background-color: #3a6df0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  right: -6px;
  top: -6px;
}

.notification+svg {
  margin-left: 22px;
}

@media screen and (max-width: 945px) {
  .notification+svg {
    display: none;
  }
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
  border: 2px solid var(--theme-color);
  margin-left: 22px;
}

.wide .header-menu,
.wide .header-profile {
  display: none;
}

.wide .search-bar {
  max-width: 600px;
  margin: auto;
  transition: 0.4s;
  box-shadow: 0 0 0 1px var(--border-color);
  padding-left: 0;
}

.wide .menu-circle {
  margin-right: 0;
}
</style>