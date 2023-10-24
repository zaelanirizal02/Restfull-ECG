//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
  {
    path: "/",
    name: "tindakans.index",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/tindakans/index.vue"),
  },
  {
    path: "/contoh2",
    name: "tindakans.contoh2",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/tindakans/contoh2.vue"),
  },
  {
    path: "/contoh3",
    name: "tindakans.contoh3",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/tindakans/contoh3.vue"),
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
