import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import Login from "../views/Login/index.vue";
import Register from "../views/Register/index.vue";
import AuthLayout from "../components/AuthLayout.vue";
import store from "../store";

const routes = [
   {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
   },
   {
      path: "/",
      name: "home",
      component: DefaultLayout,
   },
   {
      path: "/auth",
      redirect: "/login",
      name: "Auth",
      component: AuthLayout,
      meta: {isGuest: true},
      children: [
         {
            path: "/login",
            name: "login",
            component: Login,
         },
         {
            path: "/register",
            name: "register",
            component: Register,
         },
      ],
   },
];
const router = createRouter({
   history: createWebHistory(),
   routes,
});

router.beforeEach((to, from, next) => {
   if (to.meta.requiresAuth && !store.state.user.token) {
      next({name: "Login"});
   } else if (store.state.user.token && to.meta.isGuest) {
      next({name: "Dashboard"});
   } else {
      next();
   }
});

export default router;
