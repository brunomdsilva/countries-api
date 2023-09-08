<template>
	<Container>
		<div class="flex flex-col items-start gap-8">
			<h1 class="text-9xl font-extrabold">404</h1>

			<div class="flex flex-col gap-2">
				<p class="text-2xl font-semibold">Page not found</p>
				<p class="text-lg">
					Sorry, we couldn't find the page you're looking for. Please try going back to the home page!
				</p>
			</div>

			<RouterLink
				to="/"
				class="px-8 py-3 font-semibold rounded shadow-md bg-white dark:bg-primary-700 transition-colors duration-300"
			>
				Home
			</RouterLink>
		</div>
	</Container>
</template>

<script setup>
import { RouterLink } from "vue-router";
import Container from "@/components/Container.vue";
</script>
