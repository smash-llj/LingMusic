<template>
  <div class="entry">

    <div class="link">
      <div class="denglong">
        <div class="xians">
          <div class="fonts">春</div>
          <div class="t-xians"></div>
          <div class="b-xians">
            <div class="b-xians-1">
              <div class="b-xians-2"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="denglong two">
        <div class="xians">
          <div class="fonts">节</div>
          <div class="t-xians"></div>
          <div class="b-xians">
            <div class="b-xians-1">
              <div class="b-xians-2"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="denglong three">
        <div class="xians">
          <div class="fonts">快</div>
          <div class="t-xians"></div>
          <div class="b-xians">
            <div class="b-xians-1">
              <div class="b-xians-2"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="denglong four">
        <div class="xians">
          <div class="fonts">乐</div>
          <div class="t-xians"></div>
          <div class="b-xians">
            <div class="b-xians-1">
              <div class="b-xians-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

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

<style >
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

body {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background: url(../src/assets/wallhaven-m9e3lk.jpg);
  /*图片路径*/
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}

.entry {
  width: 100%;
  height: 100%;
  display: flex;
}

#app {
  width: 1200px;
  height: 715px;
  margin: auto;
}

.link {
  position: fixed;
  z-index: 999999999;
}

.denglong {
  position: fixed;
  top: 15px;
  left: 80%;
  width: 120px;
  height: 90px;
  background-color: #d8000f;
  border-radius: 50% 50%;
  box-shadow: 0px 5px 30px 4px rgba(252, 144, 61, 1);
  position: relative;
  z-index: 10;
  animation: shake 6s infinite ease-in-out;
  transform-origin: 50% -100px;
}

.two {
  position: fixed;
  top: 20px;
  left: 30%;
  animation: shake 5s infinite ease-in-out;
  transform-origin: 50% -100px;
}

.three {
  position: fixed;
  top: 20px;
  left: 70%;
  animation: shake 7s infinite ease-in-out;
  transform-origin: 50% -100px;
}

.four {
  position: fixed;
  top: 20px;
  left: 90%;
  animation: shake 6s infinite ease-in-out;
  transform-origin: 50% -100px;
}

.denglong::before {
  content: "";
  display: block;
  position: absolute;
  left: 30px;
  top: -5px;
  width: 60px;
  height: 12px;
  border-radius: 5px 5px 0 0;
  background-color: #ffa500;
  background: linear-gradient(to right,
      #dc8f03,
      #ffa500,
      #dc8f03,
      #ffa500,
      #dc8f03);
  z-index: 1;
}

.denglong::after {
  content: "";
  display: block;
  position: absolute;
  left: 30px;
  top: 80px;
  width: 60px;
  height: 12px;
  border-radius: 0px 0px 5px 5px;
  background-color: #ffa500;
  background: linear-gradient(to right,
      #dc8f03,
      #ffa500,
      #dc8f03,
      #ffa500,
      #dc8f03);
  z-index: 1;
}

.xians {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  background-color: #d8000f;
  border-left: 2px solid #dc8f03;
  border-right: 2px solid #dc8f03;
  border-radius: 50%;
}

.fonts {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 45px;
  height: 90px;
  border-radius: 50% 50%;
  border-left: 2px solid #dc8f03;
  border-right: 2px solid #dc8f03;
  text-align: center;
  line-height: 90px;
  font-size: 40px;
  font-weight: bolder;
  color: #dc8f03;
}

.t-xians {
  width: 5px;
  height: 30px;
  background: #ffa500;
  border-radius: 20px;
  position: absolute;
  top: -30px;
  left: 42px;
}

.b-xians {
  position: relative;
  width: 5px;
  height: 20px;
  background: #ffa500;
  border-radius: 30px;
  position: absolute;
  top: 90px;
  left: 42px;
  animation: shake 4s infinite ease-in-out;
  transform-origin: 50% 0px;
}

.b-xians-2 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 10px;
  height: 10px;
  background-color: #dc8f03;
  border-radius: 50%;
}

.b-xians-1 {
  position: absolute;

  top: 14px;
  left: -2px;
  width: 10px;
  height: 35px;

  background-color: #ffa500;
  border-radius: 5px 5px 0px 5px;
}

@keyframes shake {
  0% {
    transform: rotate(-10deg);
  }

  50% {
    transform: rotate(10deg);
  }

  100% {
    transform: rotate(-10deg);
  }
}
</style>
