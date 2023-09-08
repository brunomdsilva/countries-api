import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView/HomeView.vue";
import SingleView from "../views/SingleView/SingleView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/country/:name",
			name: "about",
			component: SingleView,
		},
	],
});

export default router;
