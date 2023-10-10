//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/tindakans/index2.vue"),
  },
  {
    path: "/contoh",
    name: "tindakans.contoh",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/tindakans/contoh.vue"),
  },
  {
    path: "/contoh2",
    name: "tindakans.index",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/tindakans/contoh2.vue"),
  },
  {
    path: "/create",
    name: "tindakans.create",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/tindakans/create.vue"),
  },
  {
    path: "/edit/:id",
    name: "tindakans.edit",
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/tindakans/edit.vue"),
  },
  {
    path: "/option",
    name: "tindakans.setting",
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/tindakans/setting.vue"),
  },

  //AUTH
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/login.vue"),
  },
  {
    path: "/daftar",
    name: "daftar",
    component: () => import("../views/auth/daftar.vue"),
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // <-- routes,
});

export default router;
