import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import Admin from "./views/Admin.vue";
import AdminUsers from "./views/AdminUsers.vue";
import AdminSelectedUser from "./views/AdminSelectedUser.vue";
import ForgotPassword from "./views/ForgotPassword.vue";
import ChangePassword from "./views/ChangePassword.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin
    },
    {
      path: "/adminUsers",
      name: "adminUsers",
      component: AdminUsers
    },
    {
      path: "/adminSelectedUser",
      name: "adminSelectedUser",
      component: AdminSelectedUser
    },
    {
      path: "/forgot-password",
      name: "forgotPassword",
      component: ForgotPassword
    },
    {
      path: "/change-password",
      name: "changePassword",
      component: ChangePassword
    }
  ]
});
