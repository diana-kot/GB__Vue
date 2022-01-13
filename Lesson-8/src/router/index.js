import Vue from 'vue';
import VueRouter from 'vue-router';





Vue.use(VueRouter)


const routes = [{
        path: '/dashboard/:page',
        name: "dashboard",
        component: () =>
            import( /* webpackChunkName: "Dashboard" */ "../views/Dashboard.vue"),

    },
    {
        path: '/dashboard',
        name: "dashboard",
        component: () =>
            import( /* webpackChunkName: "Dashboard" */ "../views/Dashboard.vue"),
    },
    {
        path: '/about*',
        name: "about",
        component: () =>
            import( /* webpackChunkName: "About" */ "../views/About.vue"),
    },
    {
        path: '/editForm/:id',
        name: "editForm",
        component: () =>
            import( /* webpackChunkName: "EditForm" */ "../components/EditForm.vue"),
    },

    {
        path: '/notFound',
        name: "notFound",
        component: () =>
            import( /* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
    },
    {
        path: '/add/payment/:category',
        name: 'AddNewPayments',
        component: () =>
            import( /* webpackChunkName: "AddPaymentForm" */ "../components/AddPaymentForm.vue"),
    },
    {
        path: '*',
        component: () =>
            import( /* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
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