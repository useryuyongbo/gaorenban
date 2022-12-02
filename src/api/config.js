import axios from 'axios';

axios.defaults.baseURL = '/api';  

// 响应拦截
axios.interceptors.response.use(function (response) {
    let { data } = response;
    //es6 解构赋值
    return data;
}, function (err) {
    return Promise.reject(err)
})

export default axios;

