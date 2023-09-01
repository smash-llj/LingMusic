const getters = {
    userName: (state) => { return state.user.userInfo.nickname },
    userImg: (state) => { return state.user.userInfo.avatarUrl }

}
export default getters