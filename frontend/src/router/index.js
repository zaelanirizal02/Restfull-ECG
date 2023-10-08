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
    path: "/index",
    name: "tindakans.index",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/tindakans/index.vue"),
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
    name: "tindakans.options",
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/tindakans/option.vue"),
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // <-- routes,
});

export default router;
