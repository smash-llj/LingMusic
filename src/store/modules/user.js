import request from "@/config/request"
import router from "@/router";

const user = {
    namespaced: true,
    actions: {

        //手机号登陆请求
        async phoneLogin(context, data) {
            let params = {
                phone: data.uName,
                password: data.uPassword,
                islogin: true,
            }
            let res = await request("/login/cellphone", {
                params
            });
            console.log(res);
            if (res.code === 200) {
                context.commit('SETUSER', res.profile)
                context.commit('SETTOKEN', res.token)
                localStorage.setItem(
                    'cookies',
                    res.cookie
                )
                document.cookie = res.cookie.split(';').find((item) => item.indexOf("MUSIC_U") !== -1)
                router.push({
                    name: "recommand",
                });
            }
        },
        loginOut(context, data) {
            context.commit('LOGINOUT')
        }
    },
    mutations: {
        SETUSER(state, data) {
            state.userInfo = data
        },
        SETTOKEN(state, data) {
            state.token = data
        },
        LOGINOUT(state, data) {
            state.userInfo = {}
            state.token = ""
        }
    },
    state: {
        userInfo: {},
        token: ''
    }
}
export default user