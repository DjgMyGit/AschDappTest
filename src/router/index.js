import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from "@/page/login.vue"
import home_wrapper from "@/page/home.vue"
import Home_index from "@/page/home/index.vue"
import Home_trans from "@/page/home/trans.vue"
//import Home_Two from 
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'logon',
            component: Login
        },
        {
            path: "/home",
            name: "home",
            component: home_wrapper,
            children: [{
                path: "",
                name: 'index',
                component: Home_index
            }, {
                path: 'trans',
                name: "trans",
                component: Home_trans
            }]
        }
    ]
})