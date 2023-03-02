<template>
    <div>
        <div class="self-tip">
            <div>
                歌名
            </div>
            <div>
                歌手
            </div>
            <div>
                专辑
            </div>
        </div>
        <div class="self-list" v-if="isEmpty">

            <div class="item" v-for="item, index in loveList" :key="index" @click="goPlayer(item, index)"
                :class="item.isplay ? 'play' : ''">
                <div>
                    <span class="iconfont icon-xihuan1">
                    </span>
                    {{ item.name }}
                </div>
                <div>
                    {{ item.ar[0].name }}
                </div>
                <div>
                    {{ item.al.name }}
                </div>
            </div>


        </div>
        <el-empty :image-size="200" v-else></el-empty>
    </div>
</template>
<script>
import needLogin from '@/config/needLogin'
export default {
    name: 'selfPage',
    data() {
        return {
            info: '',
            loveList: [],
            lastIndex: 0,
            playIndex: 0,
            isEmpty: false
        }
    },
    methods: {

        //获取用户的歌单
        async getUserIist() {
            let res = await needLogin('/user/playlist', {
                uid: this.info.userId
            })

            let id = res.playlist[0].id


            this.getUserLove(id)

        },


        //获取用户喜欢的歌曲
        async getUserLove(id) {
            let res = await needLogin('/playlist/track/all', {
                id: id,
                limit: 50,
                offset: 0
            })

            this.loveList = res.songs
            this.loveList.forEach(item => {
                item.isplay = false
            })

        },
        //点击播放
        goPlayer(item, index) {
            this.lastIndex = this.playIndex
            this.playIndex = index
            if (this.lastIndex != this.playIndex) {
                item.isplay = true
                this.loveList[this.lastIndex].isplay = false
            }
            this.$bus.$emit("musicList", {
                list: this.loveList,
                index: index,
                musicId: this.loveList[index].id,
            });
        }

    },
    mounted() {
        this.info = JSON.parse(localStorage.getItem('userInfo'))
        this.getUserIist()
    },
    //监视 列表 
    watch: {
        loveList() {
            if (this.loveList.length != 0) this.isEmpty = true
        }
    }



}

</script>

<style scoped>
.play {
    background-color: var(--theme-bg-color);

}

.self-list {
    width: 100%;
    height: 430px;
    color: aliceblue;
    overflow: scroll;

}

.self-list::-webkit-scrollbar {
    display: none;
}

.self-tip {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: aliceblue;
    text-align: left;
    line-height: 50px;
}

.self-tip div {
    width: 290px;
    height: 50px;
}

.self-list .item {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.self-list .item div {
    width: 300px;
    height: 50px;
    text-align: left;
    line-height: 50px;
    display: flex;
    align-items: center;
    /* 单行文本溢出显示 */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}


.self-list .item:hover {
    background-color: var(--theme-bg-color);
}



span {
    display: block;
    width: 50px;
    height: 50px;
    text-align: center;



}
</style>