
import Vue from 'vue'
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
    return routerPush.call(this, location).catch(err => { })
};

Vue.use(VueRouter)
// import main from '../pages/Main'
const router = new VueRouter({

    routes: [
        {
            path: '/', component: resolve => require(['../pages/Main'], resolve), redirect: '/recommand', children: [
                {
                    name: 'recommand', path: '/recommand', component: resolve => require(['../pages/recommand'], resolve),
                },
                {
                    name: 'musichouse', path: '/musichouse', component: resolve => require(['../pages/MusicHouse'], resolve),
                },
                {
                    name: 'playlist', path: '/playlist', component: resolve => require(['../pages/PlayList'], resolve),
                },
                {
                    name: 'recentplay', path: '/recentplay', component: resolve => require(['../pages/RecentPlay'], resolve),
                },

                {
                    name: 'mylove', path: '/mylove', redirect: '/mylove/lovesongs', component: resolve => require(['../pages/MyLove'], resolve), children: [
                        { name: 'lovesongs', path: 'lovesongs', component: resolve => require(['../pages/LoveSongs'], resolve) },
                        { name: 'lovelist', path: 'lovelist', component: resolve => require(['../pages/LoveList'], resolve) }
                    ]
                },
                {
                    name: 'listDetail', path: '/list', component: resolve => require(['../pages/ListDetail'], resolve), props($route) {
                        return {
                            id: $route.query.id,
                            name: $route.query.name,

                        }
                    },
                }, 
                {
                    name: 'dayRemcomand', path: '/dayRemcomands', component: resolve => require(['../pages/dayRemcomand'], resolve)
                    
                }, 
                
                
                {
                    name: 'videodetail', path: '/videodetail', component: resolve => require(['../pages/VideoDetail'], resolve),
                },
                {
                    name: 'selfPage', path: '/selfPage', component: resolve => require(['../pages/selfPage'], resolve),
                },
                

            ]


        },
        {
            path: '/userLogin', name: 'userLogin', component: resolve => require(['../components/UserLogin'], resolve),
        }

    ]
})
export default router