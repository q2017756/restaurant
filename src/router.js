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
