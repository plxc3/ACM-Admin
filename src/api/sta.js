import request from "../utils/request"

export default {
    createStatistics(day){
        return request({
            url:"/admin/daily/createRegister/"+day,
            method:"get"
        })
    },
    show(enddata){
        return request({
            url:"/admin/daily/showData",
            method: "post",
            data:enddata
        })
    }
}
