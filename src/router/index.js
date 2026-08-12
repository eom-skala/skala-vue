import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 각 페이지 컴포넌트는 해당 주소에 방문할 때만 내려받는다. (Lazy Loading)
    { path: "/", name: "weather-home", component: () => import("../views/WeatherHomeView.vue") },
    {
      path: "/about",
      name: "weather-about",
      component: () => import("../views/WeatherAboutView.vue"),
    },
    {
      path: "/weather/:cityId",
      name: "weather-detail",
      component: () => import("../views/WeatherDetailView.vue"),
      props: true,
    },
    // 위 규칙에 해당하지 않는 모든 경로를 404 페이지로 연결한다. (Catch-all Route)
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
