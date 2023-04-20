import axios from "./config"

// 登录
export function login(data) {
    return axios({
        url: '/user/login',
        method: 'post',
        data: data,
        xhrFields: {withCredentials: true}, crossDomain: true,
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
export function getUserInfo(current,size,name,pno,talentId,archive,endTime,ifDuty,nowUnit,startTime,talentType,workclass) {
    return axios({
        url: '/userinfo/page',
        method: 'get',
        params: {
            current: current,
            size:size,
            name:name,
            pno:pno,
            talentId:talentId,
            archive:archive,
            endTime:endTime,
            ifDuty:ifDuty,
            nowUnit:nowUnit,
            pno:pno,
            startTime:startTime,
            talentType:talentType,
            workclass:workclass
        }
    })
}

//删除文件
export function delectfile(fileid){
    return axios({
        url:'/file/deleteFile',
        method:'delete',
        params:{
            fileId : fileid
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
//下载文件
export function dowwnload(fileid){
    return axios({
        url:'/file/download',
        method:'get',
        params:{
            fileId:fileid
        },
        responseType: 'blob'

    })
}


//申报文件删除
export function shenbaodelectfile(fileid){
    return axios({
        url:'/declarefile/delete',
        method:'delete',
        params:{
            fileId : fileid
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
//申报文件下载
export function shenbaodowwnload(fileid){
    return axios({
        url:'/declarefile/download',
        method:'get',
        params:{
            fileId:fileid
        },
        responseType: 'blob'

    })
}
//申报文件打包下载
export function shenbaodowwnloadall(declareId, userId){
    return axios({
        url:'/declarefile/downZip',
        method:'get',
        params:{
            declareId:declareId,
            userId:userId
        },
        responseType: 'blob'

    })
}
//获取所有日志信息
export function getjournal(data){
    return axios({
        url:'/log/quryBypage',
        method: 'post',
        data: data,
        xhrFields: {withCredentials: true}, crossDomain: true,
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
//上传档案
export function uploadrecord(data) {
    return axios({
        url: '/file/uploadBatch',
        method: 'post',
        headers: {
            //'Content-Type': 'application/json'
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

//根据姓名查询工号和id
export function checkidandnon(userName){
    return axios({
        url:'/user/getAllShortUser',
        method:'get',
        headers: {
            //'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            userName:userName,
        }
    })
}
//上传人才excel
export function uploadexcel(data) {
    return axios({
        url: '/excel/upload',
        method: 'post',
        headers: {
            //'Content-Type': 'application/json'
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

//导出人才信息
export function daochuuserinfo(userIds){
    return axios({
        url:'/excel/download',
        method:'get',
        traditional:true,
        //userIds:userIds,
         params: {
             userIds:userIds,
         },
        
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
}

//添加档案类别
export function addrecorditem(data) {
    return axios({
        url: '/recorditem/add',
        method: 'put',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

//添加申报项目类别
export function addprojectitem(dataname,dataid) {
    return axios({
        url: '/declaretype/addOrupdate',
        method: 'put',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            declarename:dataname,
            id:dataid
        },
       // item:data
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
        // params:{userinfoId:data},
        data
    })
}

//获得图片url
export function getUrl(data) {
    return axios({
        url: '/file/getUrlByuserId',
        method: 'post',
        params: {
            userId:data
        }
    })
}
//查询是否有届满考核
export function getfinalExam() {
    return axios({
        url: '/examine/finalExam',
        method: 'get',
        
    })
}
//查询是否有中期考核
export function getmidExam() {
    return axios({
        url: '/examine/midExam',
        method: 'get',
    })
}

//给某人考核提醒
export function sendRemind(data){
    return axios({
        url:'/remind/sendRemind',
        method:'get',
        params:{
            userId:data
        }
    })
}

//给某人发送自定义提醒
export function sendanyRemind(message,userId){
    return axios({
        url:'/remind/sendMessage',
        method:'put',
        params:{
            message:message,
            userId:userId
        }
    })
}
//新增考核类别
export function addexamfiletype(data){
    return axios({
        url:'/examfiletype/addOrupdate',
        method:'put',
        params:{
            examitename:data.itemname,
            id:data.id,
        }
    })
}
//分页查询考核信息
export function examgetBypage(current,name,size,state){
return axios({
    url:'/examine/getByPage',
    method:'get',
    params:{
        current:current,
        name:name,
        size:size,
        state:state
    }
})
}
//修改某人聘期
export function hireupdateHire(data){
    return axios({
        url:'hire/updateHire',
        method:'put',
        data
    })
}
//对某人增加聘期
export function addHire(data){
    return axios({
        url:'/hire/addHire',
        method:'delete',
        params:{
            buyhousemoney:data.buyhousemoney,
            comment:data.comment,
            endtime:data.endtime,
            finalResult:data.finalResult,
            hiremoney:data.hiremoney,
            hirestage:data.hirestage,
            housemoney:data.hiremoney,
            id:data.id,
            ifDuty:data.ifDuty,
            midResult:data.midResult,
            schoolmoney:data.schoolmoney,
            starttime:data.starttime,
            talentid:data.talentid,
            userid:data.userid
        }

    })
}

//删除聘期
export function deleteHire(data){
    return axios({
        url:'/hire/deleteHire',
        method:'delete',
        params:{
            hireGId:data
        }

    })
}

//人才考核获得所有审核状态
export function getState(){
    return axios({
        url:'/examine/getState',
        method:'get',

    })
}
//改变人才考核审核状态
export function changeState(id,message,state){
    return axios({
        url:'/examine/changeState',
        method:'put',
        params:{
            id:id,
            message:message,
            state:state
        }
    })
}

//经费申请
export function addfund(applyMoney,comment,userid){
    return axios({
        url:'/fund/add',
        method:'put',
        params:{

            applyMoney:applyMoney,
            comment:comment,
            userid:userid
        }

    })
}
//经费审核状态栏
export function getfundState(){
    return axios({
        url:'fund/getState',
        method:'get',

    })
}
//查询是否有审核
export function ifUndcheck(){
    return axios({
        url:'/fund/ifUncheck',
        method:'get',
    })
}

//查询人才考核类别
export function checkexamfiletype(){
    return axios({
        url:'/examfiletype/all',
        method:'put',
    })
}
//考核批量上传
export function uploadBatchexamFile(data){
    return axios({
        url:'/examFile/uploadBatch',
        method:'post',
        data
    })
}
//考核文件下载
export function downloadexamFile(fileid){
    return axios({
        url:'/examFile/download',
        method:'get',
        params:{
            fileId:fileid
        },
        responseType: 'blob'
    })
}
//考核文件删除
export function deleteexamFile(data){
    return axios({
        url:'/examFile/delete',
        method:'delete',
        params:{fileId:data}
    })
}
//考核文件批量下载
export function downZipexamFile(){
    return axios({
        url:'/examFile/downZip',
        method:'get',
        params:{
            id:declareId,
            userId:userId
        },
        responseType: 'blob'
    })
}

//修改经费申请审核状态
// export function changeStatefund(aggrementMoney,id,message,state){
//     return axios({
//         url:'/fund/changeState',
//         method:'put',
//         params:{
//             aggrementMoney: aggrementMoney,
//             id: id,
//             message: message,
//             state: state
//         }
//     })
// }
export function changeStatefund(data){
    return axios({
        url:'/fund/changeState',
        method:'put',
        data,
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
//删除经费申请
export function deletefund(id){
    return axios({
        url:"/fund/delete",
        method:'delete',
        params:{
            id:id
        }
    })
}

//分页查询经费申请
export function getByPagefund(current,name,size,state){
    return axios({
        url:"/fund/getByPage",
        method:'get',
        params:{
            current:current,
            name:name,
            size:size,
            state:state
        }
    })
}
//查询某人的详细经费申请
export function getDetailfund(userId){
    return axios({
        url:"/fund/getDetail",
        method:'get',
        params:{
            userId:userId
        }
    })
}
//通过id查询某人姓名
export function selectNameById(userId){
    return axios({
        url:"/user/selectNameById",
        method:'get',
        params:{
            ids:userId
        }
    })
}
//查询某人所有经费申请--
export function getsurplusfund(userId){
    return axios({
        url:"/fund/surplus",
        method:'get',
        params:{
            userId:userId
        }
    })
}

//查询某人所有聘期--
export function getHireshire(userId){
    return axios({
        url:"/hire/getHires",
        method:'get',
        params:{
            userId:userId
        }
    })
}

//获取人才申报状态
export function declaregetState(){
    return axios({
        url:"/declare/getState",
        method:'get',
    })
}
//获取用户详细考核材料
export function examFiledetail(id){
    return axios({
        url:"/examFile/detail",
        method:'get',
        params:{
            id:id
        }
    })
}
//根据考核id删除文件
export function examFiledelete(id){
    return axios({
        url:"/examFile/delete",
        method:'delete',
        params:{
            fileId:id
        }
    })
}
//根据考核id下载文件
export function examFiledownload(id){
    return axios({
        url:"/examFile/download",
        method:'get',
        params:{
            fileId:id
        }
    })
}
//将某考核打包成zip下载
export function examFiledownZip(id,userId){
    return axios({
        url:"/examFile/downZip",
        method:'get',
        params:{
            id:id,
            userId:userId
        }
    })
}


//新增
//new获取下载image的url通过userInfoId
export function getUrlByuserInfold(data) {
    return axios({
        url: '/file/getUrlByuserInfold',
        method: 'post',
        params: {
            userInfoId:data
        }
    })
}

