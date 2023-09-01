<template>
  <div class="left-side">
    <div class="side-wrapper"></div>
    <div class="side-wrapper">
      <div class="side-menu">
        <div class="asideitem" v-for="(item, index) in navListDate" :key="index" @click="jopContainer(item, index)">
          <i class="iconfont"></i>
          {{ item.name }}
        </div>
      </div>
      <AsideTimer></AsideTimer>
    </div>
  </div>
</template>

<script>
import AsideTimer from "../../components/AsideTimer.vue";
export default {
  name: "NacAside",
  data() {
    return {
      navListDate: [
        { path: "recommand", name: "推荐", icon: "tuijian" },
        { path: "musichouse", name: "音乐馆", icon: "yinleguan" },
        { path: "playlist", name: "歌单", icon: "gedan" },
        { path: "recentplay", name: "最近播放", icon: "zuijinbofang" },
        { path: "mylove", name: "我喜欢", icon: "woxihuan" },
      ],
    };
  },

  methods: {
    jopContainer(item, index) {
      this.$router.push({
        name: item.path,
      });
    },
  },
  components: {
    AsideTimer,
  },
};
</script>

<style lang="scss" scoped>
.active {
  background-color: rgba(0, 0, 0, 0.2);
}

.asideitem {
  width: 100%;
  height: 50px;
  margin: 10px auto;
  text-align: center;
  line-height: 50px;
  color: #fff;
}

.iconfont {
  font-size: 25px !important;
}

i {
  margin-right: 10px;
}


.left-side {
  width: 15%;
  border-right: 1px solid var(--border-color);
  padding: 26px;
  overflow: auto;
  flex-shrink: 0;
}

@media screen and (max-width: 945px) {
  .left-side {
    display: none;
  }
}

.side-wrapper+.side-wrapper {
  margin-top: 10px;
}

.side-title {
  color: var(--inactive-color);
  margin-bottom: 14px;
}

.side-menu {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}

.side-menu a {
  text-decoration: none;
  color: var(--theme-color);
  display: flex;
  align-items: center;
  font-weight: 400;
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  transition: 0.3s;
  margin: 20px auto;
}

.side-menu .asideitem:hover {
  background-color: var(--hover-menu-bg);
}

.updates {
  position: relative;
  top: 0;
  right: 0;
  margin-left: auto;
  width: 18px;
  height: 18px;
  font-size: 11px;
}

.main-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  height: 58px;
  flex-shrink: 0;
}

.main-header .header-menu {
  margin-left: 150px;
}

@media screen and (max-width: 1055px) {
  .main-header .header-menu {
    margin: auto;
  }
}
</style>