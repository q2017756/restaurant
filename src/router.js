import Vue from "vue"
import Router from "vue-router"
import store from "./store"

Vue.use(Router)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit('login', window.localStorage.getItem('token'))
}

const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "",
      component: () =>
          import("./views/Login.vue")
    },
    {
      path: "/calendar",
      name: "calendar",
      meta: {
        requireAuth: true,
      },
      component: () =>
          import("./views/Calendar.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
          import("./views/Login.vue")
    },
    {
      path: "/schedule",
      name: "schedule",
      meta: {
        requireAuth: true,
      },
      component: () =>
          import("./views/Schedule.vue")
    }, {
      path: "/basicSet",
      name: "basicSet",
      meta: {
        requireAuth: true,
      },
      component: () =>
          import("./views/BasicSet.vue")
    }, {
      path: "/detailSet",
      name: "detailSet",
      meta: {
        requireAuth: true,
      },
      component: () =>
          import("./views/DetailSet.vue")
    }, {
      path: "/reserveInfo",
      name: "reserveInfo",
      meta: {
        requireAuth: true,
      },
      component: () =>
          import("./views/ReserveInfo.vue")
    }

  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})

export default router;