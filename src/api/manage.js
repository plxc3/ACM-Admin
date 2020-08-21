import request from "../utils/request"

export  default {
    closeRegister(){
        return request({
            url:'/admin/manager/closeRegister',
            method:"get"
        })
    },
    openRegister(){
        return request({
            url:"/admin/manager/openRegister",
            method: "get"
        })
    }
}
