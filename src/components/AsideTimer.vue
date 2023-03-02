<template>
  <div>
    <div class="dateBox">
      <div class="time">{{ time }}</div>
      <div class="date">{{ date }}</div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "AsideTimer",
  data() {
    return {
      date: null,
      time: null,
    };
  },
  methods: {
    // 日期时间格式化——获取当前日期时间，格式化为 2021/08/30 和 15:35:06
    getToday() {
      var datas = new Date();
      var on1 = "/";
      var on2 = ":";
      var onY = datas.getFullYear(); //年
      var onM = datas.getMonth() + 1; //月
      var onD = datas.getDate(); //日
      var onS = datas.getHours(); //时
      var onF = datas.getMinutes(); //分
      var onN = datas.getSeconds(); //秒

      if (onM >= 1 && onM <= 9) {
        //月
        onM = "0" + onM;
      }
      if (onD >= 1 && onD <= 9) {
        //日
        onD = "0" + onD;
      }
      if (onS >= 0 && onS <= 9) {
        //时
        onS = "0" + onS;
      }
      if (onF >= 0 && onF <= 9) {
        //分
        onF = "0" + onF;
      }
      if (onN >= 0 && onN <= 9) {
        //秒
        onN = "0" + onN;
      }

      return {
        date: onY + on1 + onM + on1 + onD,
        time: onS + on2 + onF + on2 + onN,
      };
    },
  },
  mounted() {
    const clock = setInterval(() => {
      this.date = this.getToday().date;
      this.time = this.getToday().time;
    }, 1000);
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once("hook:beforeDestroy", () => {
      clearInterval(clock);
    });
  },
};
</script>
  
  <style>
.dateBox {
  background: var(--content-bg);
  background-image: url("../assets/0d38ab25514d4583af54b261dab2ac2b.png");
  background-repeat: no-repeat;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 200px;
  height: 160px;
  border-radius: 20px 20px 0px 0px;
}

.date {
  position: absolute;
  bottom: 20px;
  right: 25px;
  font-size: 25px;
  color: black;
  margin-left: 15px;
}

.time {
  position: absolute;
  top: 45px;
  right: 10px;
  font-size: 23px;
  color: red;
}
.date {
  color: #fff;
}
</style>