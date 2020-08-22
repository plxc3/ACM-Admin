import Vue from 'vue'
import VueRouter from 'vue-router'
import cookie from 'js-cookie'
import { Message } from 'element-ui';

Vue.use(VueRouter)

const routes=[
    {
        path:"/",
        redirect:"/adminMain"
    },
    {
        path:"/adminMain",
        component:()=>import("../components/admin/adminLogin.vue")
    },
    {
        path:"/adminManage",
        component:()=>import("../components/admin/adminManage.vue")
    },
    {
        path:"/excel",
        component:()=>import("../components/admin/Excel.vue")
    },
    {
        path:"/hotel",
        component:()=>import("../components/admin/hotel.vue")
    },
    {
        path:"/create",
        component:()=>import("../components/admin/create.vue")
    },
    {
        path:"/show",
        component:()=>import("../components/admin/show.vue")
    }
]

const router=new VueRouter({
    routes:routes
})

/**
 * 防止输入url跳转登录才能显示的界面调用全局导航守卫进行验证
 */
router.beforeEach((to, from, next) => {

    if ( to.path=='/adminManage'||to.path=="/excel" || to.path=="/hotel") {
        // 每次页面跳转执行，token或openId錯誤，均提示跳转到首页
        let admintoken = cookie.get('admintoken')
        if (admintoken === null || admintoken === '' || admintoken === undefined) {
            Message({
                type:'error',
                message:"没有登录请登录"
            })
            setTimeout(function () {
                next('/adminMain');
            },1000)
        }else{
            next();
        }

    } else {
        next();
    }
});


export default router
