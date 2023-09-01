<template>
  <div class="entry">

    <div id="app">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>




export default {
  name: "App",
};
</script>

<style lang="scss" >
* {
  outline: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-touch-callout: none;
  /*系统默认菜单被禁用*/
  -webkit-user-select: none;
  /*webkit浏览器*/
  -khtml-user-select: none;
  /*早期浏览器*/
  -moz-user-select: none;
  /*火狐*/
  -ms-user-select: none;
  /*IE10*/
  user-select: none;
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

body {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;


}

.entry {
  width: 100%;
  height: 100%;
  display: flex;
  background: url(../src/assets/wallhaven-m9e3lk.jpg);
  /*图片路径*/
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;

  #app {
    width: 1200px;
    height: 758px;
    margin: auto;
  }

}
</style>
