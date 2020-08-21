import request from '../utils/request'

export default {
    closeRoleAll(){
        return request({
            url:"/admin/proxy/closeRoleAll",
            method:"get"
        })
    },
    openRoleAll(){
        return request({
            url:"/admin/proxy/openRoleAll",
            method: "get"
        })
    },
    closeRoleById(id){
        return request({
            url:"/admin/proxy/closeRoleById/"+id,
            method:"get"
        })
    },
    openRoleById(id){
        return request({
            url:"/admin/proxy/openRoleById/"+id,
            method:"get"
        })
    }
}
