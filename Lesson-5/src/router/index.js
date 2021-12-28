import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import About from '../views/About.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter)


const routes = [{
        path: '/dashboard/:page',
        name: "dashboard",
        component: Dashboard
    },
    {
        path: '/dashboard',
        name: "dashboard",
        component: Dashboard
    },
    {
        path: '/about',
        name: "about",
        component: About
    },
    {
        path: '/notFound',
        name: "notFound",
        component: NotFound
    },
    {
        path: '*',
        component: NotFound
    },

];
const router = new VueRouter({
    mode: 'history',
    routes,
});

const userAuth = true;
router.beforeEach((to, from, next) => {
    if (to.name !== "notfound" && !userAuth) {
        next({
            name: "notfound",
        });
    } else {
        next();
    }
});


const getTitleByRouters = (routeName) => {
    return {
        'dashboard': 'страница затрат',
        'about': 'страница о сервисе',
        'notFound': 'страница не найдена',
    } [routeName]
};

router.afterEach((to) => {
    document.title = getTitleByRouters(to.name)
})

export default router;