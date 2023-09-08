<template>
	<div class="min-h-screen bg-primary-50 dark:bg-primary-800">
		<header class="shadow relative py-6 bg-white dark:bg-primary-700">
			<Container class="flex justify-between items-center gap-4">
				<RouterLink to="/">
					<h1 class="font-extrabold text-xl">Where in the world?</h1>
				</RouterLink>

				<button
					@click.prevent="toggleDarkMode()"
					class="p-1 flex items-center gap-2 font-semibold outline-none"
				>
					<component :is="darkTheme ? IconSun : IconMoon" class="w-5 h-5 fill-current" />
					<span class="max-sm:hidden">{{ darkTheme ? "Light" : "Dark" }} Mode</span>
				</button>
			</Container>
		</header>

		<div class="py-20">
			<RouterView />
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { RouterView, RouterLink } from "vue-router";
import Container from "@/components/Container.vue";
import IconMoon from "@/components/icons/IconMoon.vue";
import IconSun from "@/components/icons/IconSun.vue";

const darkTheme = ref(JSON.parse(localStorage.getItem("darkTheme")) || false);

function toggleDarkMode() {
	darkTheme.value = !darkTheme.value;
	persistDarkTheme();
}

function persistDarkTheme() {
	localStorage.setItem("darkTheme", darkTheme.value);
	document.documentElement.classList.toggle("dark", darkTheme.value);
}

onMounted(() => persistDarkTheme());
</script>
