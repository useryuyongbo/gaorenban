import axios from "./config"

// 登录
export function login(data) {
    return axios({
        url: '/user/login',
        method: 'post',
        data: data,
        // 利用 transformRequest 进行转换配置
        transformRequest: [
            function (oldData) {
                // console.log(oldData)
                let newStr = '';
                for (let item in oldData) {
                    newStr += encodeURIComponent(item) + '=' + encodeURIComponent(oldData[item]) + '&';
                }
                newStr = newStr.slice(0, -1);
                return newStr;
            }
        ],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

//退出登录
export function exit(){
    return axios({
        url: '/user/logout',
        method: 'get',
    })
}

// 获取所有人才类别
export function getTalent(data) {
    return axios({
        url: '/talentclass/all',
        method: 'get',
    })
}

// 获取所有人才信息
export function getUserInfo(current,size,name,pno,talentId,archive) {
    return axios({
        url: '/userinfo/page',
        method: 'get',
        params: {
            current: current,
            size:size,
            name:name,
            pno:pno,
            talentId:talentId,
            archive:archive
        }
    })
}

// 获取个人详细信息
export function userDetail(userId) {
    return axios({
        url: '/userinfo/detail',
        method: 'get',
        params: {
            userId:userId
        }
    })
}

// 修改个人详细信息
export function updateDetail(data) {
    return axios({
        url: '/userinfo/updateDetail',
        method: 'put',
        data
    })
}

//查询所有档案类别
export function getRecorditem(){
    return axios({
        url: '/recorditem/all',
        method: 'get'
    })
}


// 获取所有档案文件
export function getFileInfo(current,size,userName,recordId) {
    return axios({
        url: '/file/page',
        method: 'get',
        params: {
            current: current,
            size:size,
            userName:userName,
            recordId:recordId
        }
    })
}

//获取所有人才申报审核信息
export function getDeclareInfo(current,size,userName,state) {
    return axios({
        url: '/declare/page',
        method: 'get',
        params: {
            current: current,
            size:size,
            userName:userName,
            state:state
        }
    })
}

//获取个人申报材料
export function getDeclarefile(declareId) {
    return axios({
        url: '/declarefile/detail',
        method: 'get',
        params: {
            declareId:declareId
        }
    })
}

//修改个人申报状态
export function changeDeclare(data) {
    return axios({
        url: '/declare/changeState',
        method: 'put',
        data
    })
}

//获取所有申报文件类型
export function getDeclareFileType() {
    return axios({
        url: '/declaretype/all',
        method: 'get'
    })
}

//文件上传
export function uploadFiles(data) {
    return axios({
        url: '/declarefile/uploadBatch',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}