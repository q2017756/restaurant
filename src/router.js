import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: () =>
          import("./views/Login.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
        path: "/calendar",
        name: "calendar",
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
        component: () =>
            import("./views/Schedule.vue")
    },

  ]
});
