<template>
  <div>
    <div class="app">
      <NacHeader></NacHeader>
      <div class="wrapper">
        <NacAside></NacAside>
        <NacMain> </NacMain>
      </div>
    </div>
  </div>
</template>

<script>
import NacHeader from "../components/NacHeader.vue";
import NacAside from "../components/NacAside.vue";
import NacMain from "../components/NacMain.vue";
export default {
  name: "Main",
  components: {
    NacHeader,
    NacAside,
    NacMain,
  },
  mounted() {},
};
</script>

<style>
.video-bg {
  position: fixed;

  width: 1200px;
}

.app {
  background-color: var(--theme-bg-color);
  width: 1200px;
  height: 715px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 15px;
  font-weight: 500;
}
:root {
  --theme-bg-color: rgba(16 18 27 / 40%);
  --border-color: rgba(113 119 144 / 25%);
  --theme-color: #f9fafb;
  --inactive-color: rgb(113 119 144 / 78%);
  --body-font: "Poppins", sans-serif;
  --hover-menu-bg: rgba(12 15 25 / 30%);
  --content-title-color: #999ba5;
  --content-bg: rgb(146 151 179 / 13%);
  --button-inactive: rgb(249 250 251 / 55%);
  --dropdown-bg: #21242d;
  --dropdown-hover: rgb(42 46 60);
  --popup-bg: rgb(22 25 37);
  --search-bg: #14162b;
  --overlay-bg: rgba(36, 39, 59, 0.3);
  --scrollbar-bg: rgb(1 2 3 / 40%);
}
.main {
  background-color: var(--theme-bg-color);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 14px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 15px;
  font-weight: 500;
}
</style>