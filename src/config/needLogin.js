import axios from "axios"
axios.defaults.withCredentials = true
//需要用户登录的可以通过post请求 body携带cookie获取
export default (url, data = {}, method = 'post') => {
    data.cookie = localStorage.getItem("cookie") ? localStorage.getItem("cookie") : ''
    return new Promise((resolve, reject) => {
        axios({
            url: ' http://localhost:3000' + url,
            params: data,
            method,
        }).then(
            (response) => {
                resolve(response.data)
            },
            (error) => {
                console.log("错误", error.message);
                reject(error)
            }
        );

    })
}