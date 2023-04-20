import axios from 'axios';
//axios.defaults.baseURL = 'https://张琰浩.王聪洋.top/api';
 axios.defaults.baseURL = ' http://10.11.52.164:8080/api';
//axios.defaults.baseURL = '';   
//axios.withCredentials = true
// // 请求拦截
// axios.interceptors.request.use(function(config){
//     //获取cookie
//     let cookie=document.cookie;
//     config.headers.cookie=cookie;
//     return config;
// },function(error){
//     return Promise.reject(error);
// })

// 响应拦截
axios.interceptors.response.use(function (response) {
    console.log(response.headers);
    let { data } = response;

    //es6 解构赋值
    return data;
}, function (err) {
    return Promise.reject(err)
})

export default axios;

