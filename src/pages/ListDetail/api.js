import request from "@/config/request"

//查询歌单详情

export const getSongGroup = (params) => {
    return request('/playlist/detail', { params })
}