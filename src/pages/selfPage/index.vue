<template>
    <div class="selfContainer">
        <div class="Self-top">
            <div class="self-left">
                <img :src="info.avatarUrl">
            </div>

            <div class="Self-Detail">
                <h2>{{ info.nickname }}</h2>
                <div class="vip">
                    <p id="lever">等级:{{ info.djStatus }} </p>
                    <p class="iconfont icon-vip"></p>
                </div>

                <p>{{ info.signature }}</p>
            </div>
        </div>
        <LoveListConponent></LoveListConponent>

    </div>
</template>
<script>
import LoveListConponent from '@/components/LoveListConponent.vue'
export default {
    name: 'selfPage',
    data() {
        return {
            info: '',
            loveList: [],
            lastIndex: 0,
            playIndex: 0
        }
    },
    components: {
        LoveListConponent
    },
    mounted() {
        this.info = JSON.parse(localStorage.getItem('userInfo'))

    },

}
</script>

<style scoped>
.play {
    background-color: var(--theme-bg-color);

}

.selfContainer {
    padding: 0 20px;

}

.vip {
    display: flex;
    align-items: center;
    margin: 20px 0;
}

.vip p {
    margin: 0 10px;
}

.Self-top {
    width: 100%;
    height: 250px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    background-color: var(--theme-bg-color);
    border-radius: 20px;
}

.self-left {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-left: 20px;
}

h2 {
    color: aliceblue;
}

.self-left img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}


.Self-Detail {
    height: 150px;
    margin-left: 20px;
}

.Self-Detail p {
    height: 40px;
    text-align: left;
    line-height: 40px;
    color: aliceblue;
}

#lever {
    color: red;
}
</style>