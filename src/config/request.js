import axios from 'axios'

axios.defaults.withCredentials = true


// export default (url, data = {}, method = 'GET') => {
//     return new Promise((resolve, reject) => {
//         axios({
//             url: ' http://localhost:3000' + url,
//             params: data,
//             method,
//             header: {
//                 cookie: localStorage.getItem("cookies") ? localStorage.getItem("cookies").split(';').find((item) => item.indexOf("MUSIC_U") !== -1) : ""
//             },
//         }).then(
//             (response) => {
//                 if (data.islogin) {
//                     localStorage.setItem(
//                         'cookies',
//                         response.data.cookie
//                     )
//                     document.cookie = response.data.cookie.split(';').find((item) => item.indexOf("MUSIC_U") !== -1)
//                 }

//                 resolve(response.data)
//             },
//             (error) => {
//                 console.log("错误", error.message);
//                 reject(error)
//             }
//         );

//     })
// }




const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    withCredentials: true,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance