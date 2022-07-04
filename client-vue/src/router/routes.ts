import type { RouteRecordRaw } from "vue-router";
import { Path, Route } from "@/enums";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    meta: { requireAuth: false },
    children: [
      {
        path: Path.Home,
        name: Route.Home,
        component: () => import("@/views/HomeView.vue"),
        meta: { requireAuth: true },
      },
      {
        path: Path.Signup,
        name: Route.Signup,
        component: () => import("@/views/SignupView.vue"),
      },
      {
        path: Path.Signin,
        name: Route.Signin,
        component: () => import("@/views/SigninView.vue"),
      },
    ],
  },
];
