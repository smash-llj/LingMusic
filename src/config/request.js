import axios from 'axios'

axios.defaults.withCredentials = true


export default (url, data = {}, method = 'GET') => {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://551r0695e7.zicp.fun' + url,
            params: data,
            method,
            header: {
                cookie: localStorage.getItem("cookies") ? localStorage.getItem("cookies").split(';').find((item) => item.indexOf("MUSIC_U") !== -1) : ""
            },
        }).then(
            (response) => {
                if (data.islogin) {
                    localStorage.setItem(
                        'cookies',
                        response.data.cookie
                    )
                    document.cookie = response.data.cookie.split(';').find((item) => item.indexOf("MUSIC_U") !== -1)
                }

                resolve(response.data)
            },
            (error) => {
                console.log("错误", error.message);
                reject(error)
            }
        );

    })
}