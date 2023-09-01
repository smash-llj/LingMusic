<template>
    <div class="listContainer">
        <div class="top">
            <div class="left">
                <img v-lazy="img">
            </div>
            <div class="right">
                <div class="songTitle">
                    <h3>你的每日30首</h3>
                </div>
                <div class="songAuthor">
                    <img src="../../assets/logo.png">
                    <h4>聆音乐官方歌单</h4>
                </div>
                <div class="jiesao">
                    <div>{{ des }}</div>
                </div>
            </div>
        </div>
        <playTag></playTag>
        <div class="songContainer">
            <div class="listTitle">
                <p>歌名</p>
                <p>歌手</p>
                <p>专辑</p>

            </div>
            <div class="songItem" v-for="(item, index) in dayResult" :key="index">
                <div @click="player(item, index)" class="links">
                    <img v-lazy="item.al.picUrl">
                    <p>{{ item.name }}</p>
                    <p>{{ item.ar[0].name }}</p>
                    <p>{{ item.al.name }}</p>
                </div>
                <p style="color: val(--content-title-color); ">
                    {{ item.recommendReason ? item.recommendReason : '' }}
                </p>
            </div>
        </div>
    </div>
</template>
    
<script>


import playTag from "../../components/playTag"


import { getDayRecommandList } from "./api.js"
export default {
    name: "dayRemcomand",

    data() {
        return {
            dayResult: [],
            img: '',
            des: '',
            isLike: false,
            playIndex: 0,
            lastIndex: 0

        };
    },
    components: {
        playTag,
    },
    methods: {
        //获取每日推荐歌曲
        async getDayRecommand() {
            let res = await getDayRecommandList()
            console.log(res);
            if (res.code === 200) {
                this.dayResult = res.data.dailySongs
                this.img = res.data.dailySongs[0].al.picUrl
                let reason = res.data.recommendReasons
                reason.forEach(item => {
                    this.des += item.reason + '  '
                });
            }
        },

        //点击播放
        player(item, index) {
            this.lastIndex = this.playIndex
            this.playIndex = index
            if (this.lastIndex != this.playIndex) {
                item.isplay = true
                this.dayResult[this.lastIndex].isplay = false
            }
            this.$bus.$emit("musicList", {
                list: this.dayResult,
                index: index,
                musicId: item.id,
            });
        }
    },
    mounted() {
        this.getDayRecommand()
    },
};
</script>
<style lang="scss" scoped>
.listContainer {
    width: 100%;
    height: 100%;
    background-color: var(--theme-bg-color);
    /* background-color: aquamarine; */

    /* 设置可以溢出滑动 */
    overflow: scroll;


    .top {
        display: flex;
        width: 100%;
        height: 185px;

        background-color: var(--theme-bg-color);
        color: #fff;

        .left {
            width: 200px;
            height: 185px;

            display: flex;

            img {
                width: 150px;
                height: 150px;
                margin: auto;
                border-radius: 20px;
            }

        }

        .right {
            max-width: 600px;
            height: 185px;

            /* background-color: aquamarine; */
            .songTitle {
                margin: 25px 0;
                text-align: left;
            }

            .songAuthor {
                display: flex;
                align-items: center;

                height: 50px;
                margin: 10px 0;

                /* background-color: brown; */
                img {
                    width: 35px;
                    height: 35px;
                    margin-right: 10px;
                    border-radius: 10px;
                }
            }

            .jiesao {
                font-size: 14px;
                height: 30px;
                line-height: 30px;
                text-align: left;

                div {
                    height: 30px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }
        }

    }

    .songContainer {
        width: 100%;
        background-color: var(--content-bg);

        .listTitle {
            display: flex;
            background-color: var(--theme-bg-color);
            border-radius: 0px;

            p {
                width: 100px;
                height: 50px;
                line-height: 50px;
                margin-left: 135px;
                border-radius: 0px;
                /* background-color: aquamarine; */
                font-size: 14px;
                color: #fff;
            }
        }

        .songItem {
            display: flex;
            color: #fff;
            border-bottom: 1px solid var(--inactive-color);
            align-items: center;
            width: 100%;
            height: 60px;
            line-height: 100px;
            margin-top: 10px;
            border-radius: 20px;

            img {
                width: 50px;
                height: 50px;
                border-radius: 10px;
                margin: 0 30px;
            }

            p {
                width: 200px;
                height: 50px;
                line-height: 50px;
                /* background-color: aquamarine; */
                font-size: 14px;
                margin: 0 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                /* 设置对齐模式 */
                -webkit-line-clamp: 1;
            }

            .links {
                display: flex;

            }
        }

        .songItem:hover {
            background-color: var(--theme-bg-color);
        }
    }

}

/* 去除多余的滑动条 */
.listContainer::-webkit-scrollbar {
    display: none;
}
</style>