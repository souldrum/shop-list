import HomeVue from "@/views/Home/HomeView.vue";
import ListVue from "@/views/List/ListView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeVue,
    },
    {
      path: "/list",
      name: "list",
      component: ListVue,
    },
  ],
});

export default router;
