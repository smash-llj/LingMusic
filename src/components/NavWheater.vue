<template>
  <div class="tianqi">
    <div id="he-plugin-simple"></div>
  </div>
</template>

<script>
export default {
  name: "NavWheater",
  mounted() {
    window.WIDGET = {
      CONFIG: {
        modules: "01234",
        background: "1",
        tmpColor: "FFFFFF",
        tmpSize: "16",
        cityColor: "FFFFFF",
        citySize: "16",
        aqiColor: "FFFFFF",
        aqiSize: "16",
        weatherIconSize: "24",
        alertIconSize: "18",
        padding: "10px 10px 10px 10px",
        shadow: "1",
        language: "auto",
        borderRadius: "20",
        fixed: "false",
        vertical: "top",
        horizontal: "left",
        city: "CN101240101",
        key: "7a8d5a20cd5a4a1fb1e5808e7b3fce95",
      },
    };
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0";
    document.getElementsByTagName("head")[0].appendChild(script);
  },
};
</script>

<style>
/* 天气组件 */
.tianqi {
  width: 200px;
  margin-left: 50px;
  z-index: 99;
}
</style>