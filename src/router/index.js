import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SingleView from "../views/SingleView.vue";

import countriesData from "@/data.json";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			beforeEnter(to, from) {
				const countryNames = countriesData.map((country) => country.name.toLowerCase().replaceAll(" ", "-"));
				if (!countryNames.includes(to.params.name)) {
					return {
						name: "NotFound",
						params: { pathMatch: to.path.substring(1).split("/") },
						query: to.query,
						hash: to.hash,
					};
				}
			},
			path: "/country/:name",
			name: "country",
			component: SingleView,
		},
		{
			path: "/:pathMatch(.*)*",
			name: "NotFound",
			component: () => import("../views/NotFound.vue"),
		},
	],
});

export default router;
