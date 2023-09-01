import request from '@/config/request'

//获取每日推荐歌曲
export const getDayRecommandList = () => {
    return request('/recommend/songs')
}