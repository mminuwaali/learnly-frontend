import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/components/layouts/MainLayout.vue";
import AuthLayout from "@/components/layouts/AuthLayout.vue";

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      component: AuthLayout,
      children: [
        { name: "signin", path: "signin", component: () => import("../views/auth/SigninView.vue") },
        { name: "signup", path: "signup", component: () => import("../views/auth/SignupView.vue") },
      ]
    },
    {
      path: "",
      component: MainLayout,
      children: [
        { name: "home", path: "", component: () => import("../views/HomeView.vue") },
        { name: "detail", path: ":id", component: () => import("../views/DetailView.vue") },
      ]
    },
  ],
});
