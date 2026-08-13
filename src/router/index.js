import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "weather-home", component: () => import("../views/WeatherHomeView.vue") },
    {
      path: "/about",
      name: "weather-about",
      component: () => import("../views/WeatherAboutView.vue"),
    },
    {
      path: "/favorites",
      name: "weather-favorites",
      component: () => import("../views/FavoriteView.vue"),
    },
    {
      path: "/settings",
      name: "weather-settings",
      component: () => import("../views/SettingsView.vue"),
    },
    {
      path: "/dev-notes",
      name: "weather-dev-notes",
      component: () => import("../views/DevNotesView.vue"),
    },
    {
      path: "/cities",
      name: "weather-cities",
      component: () => import("../views/CityManageView.vue"),
    },
    {
      path: "/weather/:cityId",
      name: "weather-detail",
      component: () => import("../views/WeatherDetailView.vue"),
      props: true,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
