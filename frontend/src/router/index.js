//import vue router
import { createRouter, createWebHistory } from "vue-router";

// Fungsi untuk memeriksa apakah token JWT telah di-blacklist
function isTokenBlacklisted(accessToken) {
  // Lakukan pemeriksaan terhadap daftar token yang di-blacklist di server
  // Misalnya, Anda dapat melakukan permintaan HTTP ke server untuk memeriksa status token
  // Jika token telah di-blacklist, kembalikan true, jika tidak, kembalikan false
  // Contoh sederhana, Anda dapat mengganti ini sesuai kebutuhan aplikasi Anda
  const blacklistedTokens = ["token1", "token2"]; // Daftar token yang di-blacklist

  return blacklistedTokens.includes(accessToken);
}

const requireAuth = (to, from, next) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken && !isTokenBlacklisted(accessToken)) {
    next(); // Continue navigation to the requested page if the token is available
  } else {
    localStorage.removeItem("accessToken");
    next({ name: "login" }); // Redirect to the login page if the token is not available (user is not logged in)
  }
};

//define a routeas
const routes = [
  {
    path: "/",
    name: "tindakans.index",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/tindakans/index.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/create",
    name: "tindakans.create",
    component: () =>
      import(/* webpackChunkName: "create" */ "../views/tindakans/create.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/edit/:id",
    name: "tindakans.edit",
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/tindakans/edit.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/setting",
    name: "tindakans.setting",
    component: () =>
      import(/* webpackChunkName: "edit" */ "../views/tindakans/setting.vue"),
    beforeEnter: requireAuth,
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
