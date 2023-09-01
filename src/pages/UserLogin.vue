<template>
  <div class="LoginContainer">
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <form action="#">
          <h1>二维码登录</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="iconfont icon-QQ"></i></a>
            <a href="#" class="social"><i class="iconfont icon-weixin"></i></a>
            <a href="#" class="social"><i class="iconfont icon-facebook"></i></a>
          </div>
          <button @click.prevent="getCode">获取二维码</button>
          <img :src="img" />
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#">
          <h1>手机账号登录</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="iconfont icon-QQ"></i></a>
            <a href="#" class="social"><i class="iconfont icon-weixin"></i></a>
            <a href="#" class="social"><i class="iconfont icon-facebook"></i></a>
          </div>
          <span>账号是网易云手机号码</span>
          <input type="text" placeholder="手机号码" v-model="uName" />
          <input type="password" placeholder="密码" v-model="uPassword" />
          <a href="#">忘记密码?</a>
          <button @click.prevent="go">登录</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Please use your mobile phone to scan the QR code</p>
            <button class="ghost" id="signIn">手机号码登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Please enter your mobile phone account and password</p>
            <button class="ghost" id="signUp">二维码登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script >
import { mapActions } from "vuex";
import request from "../../src/config/request";
import { instance } from "../../src/config/request";
export default {
  data() {
    return {
      uName: "", //用户输入的账号
      uPassword: "", //用户输入的密码
      img: "", //产生的二维码图片
      key: "", //产生的key
      isLogin: false, //检查是否登录
      codes: 0, //获取登录的状态码
    };
  },
  methods: {
    ...mapActions('user', ['phoneLogin']),



    //二维码登录

    //获取产生的key
    async getCode() {
      let k = await request("/login/qr/key", { timer: new Date().getTime() });
      this.getCodeimg(k.data.unikey);
      console.log(k.data.unikey);
      this.key = k.data.unikey;
    },
    //获取产生的图片
    async getCodeimg(x) {
      let s = await request("/login/qr/create", {
        key: x,
        timer: new Date().getTime(),
        qrimg: true,
      });
      this.img = s.data.qrimg;
      this.checkCodeStatus();
    },
    //获取登录的状态
    async checkCodeStatus() {
      let m = await request("/login/qr/check", {
        key: this.key,
        timerstamp: new Date().getTime(), //传入参数时间戳
        withCredentials: true,
      });

      //判断是否授权，如果授权获取用户cookie
      if (m.code === 803) {
        localStorage.setItem("cookie", m.cookie);
      }
      this.codes = m.code;
      this.isLogin = true;
    },
    //获取登录之后用户信息
    async getStatus() {
      let getStatus = await request("/login/status", {
        cookie: localStorage.getItem("cookie"),
      });
      this.setUserInfo(getStatus.data.profile)
      localStorage.setItem("userInfo", JSON.stringify(getStatus.data.profile));
      this.$router.push({
        name: "recommand",
      });
    },

    //点击登录提交网络请求
    go() {
      //输入手机号和密码不能为空
      if (this.uName === "" || this.uPassword === "") {
        this.$message({
          showClose: true,
          message: "输入不能为空",
          type: "error",
        });
      } else {
        //验证手机号码是否符合规则
        let uPhone =
          /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
        if (!uPhone.test(this.uName)) {
          this.$message({
            showClose: true,
            message: "检查手机账号",
            type: "error",
          });
        } else {

          this.phoneLogin({ uName: this.uName, uPassword: this.uPassword });
        }
      }
    },
  },
  watch: {
    isLogin: function () {
      let times = setInterval(async () => {
        this.checkCodeStatus();
        let code = this.codes;
        // 判断返回值中的code
        // 判断返回值中的code
        if (code === 801) {
        } else if (code === 802) {
        } else if (code === 803) {
          //用户登录成功后清除定时器
          clearInterval(times);
          this.getStatus();
        }
      }, 5000);
    },
  },
  mounted() {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  },
};
</script>
  
<style scoped>
* {
  box-sizing: border-box;
}

.social-container i {
  margin-left: 10px !important;
}

.checkNum {
  width: 284px;
  height: 40px;
  margin: 10px auto;
}

.checkLogin {
  margin: 10px auto;
}

.LoginContainer {
  width: 768px;
  height: 500px;

  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
</style>