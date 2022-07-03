import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../views/Dashboard.vue'
import DefaultLayout from "../components/DefaultLayout.vue"
import Login from "../views/Login.vue"
import register from "../views/Register.vue"

const routes = [
  {
    path: "/dashboard",
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: "/",
    name: 'home',
    component: DefaultLayout,


  },
  {
    path: "/login",
    name: 'login',
    component: Login,
  },
  {
    path: "/register",
    name: 'register',
    component: register,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
