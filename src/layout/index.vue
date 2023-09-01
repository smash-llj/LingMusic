<template>
    <div class="app">
        <NacHeader></NacHeader>
        <div class="wrapper">
            <NacAside></NacAside>
            <NacMain> </NacMain>
        </div>
    </div>
</template>
  
<script>
import NacHeader from "./Header/NacHeader.vue";
import NacAside from "./Aside/NacAside.vue";
import NacMain from "./Main/NacMain.vue";
export default {
    name: "Main",
    components: {
        NacHeader,
        NacAside,
        NacMain,
    },
};
</script>
  
<style lang="scss" scoped>
.app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 500;
    background-color: var(--theme-bg-color);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    .wrapper {
        width: 100%;
        height: 700px;
        display: flex;

        justify-content: space-between;
    }

}
</style>