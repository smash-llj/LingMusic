import request from "@/config/request"


//新歌速递
export const getNewSongList = (params) => {
    return request("/personalized/newsong", {
        params
    })
}

//轮播图数据
export const ImgLoop = () => {
    return request("/banner")
}

//推荐歌单数据
export const recommandList = (params) => {
    return request("/top/playlist", { params })
}


//每日推荐歌单图片
export const FirstImg = () => {
    return request("/recommend/songs")
}

