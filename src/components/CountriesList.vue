<template>
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
		<RouterLink
			v-for="country in countries"
			:to="`country/${country.name.toLowerCase().replaceAll(' ', '-')}`"
			class="flex flex-col shadow-md bg-white dark:bg-primary-700 rounded overflow-hidden w-full max-sm:max-w-xs mx-auto"
		>
			<img
				:src="country.flag"
				:alt="country.name"
				class="h-40 w-full sm:object-cover border-b border-primary-200 dark:border-primary-600"
			/>

			<div class="p-6 flex flex-col gap-4">
				<h3 v-text="country.name" class="font-extrabold text-lg" />
				<div class="flex flex-col gap-1 text-sm">
					<p>
						<span class="font-semibold">Population: </span>
						<span>{{ country.population }}</span>
					</p>
					<p>
						<span class="font-semibold">Region: </span>
						<span>{{ country.region }}</span>
					</p>
					<p v-show="country.capital">
						<span class="font-semibold">Capital: </span>
						<span>{{ country.capital }}</span>
					</p>
				</div>
			</div>
		</RouterLink>
	</div>
</template>

<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
	countries: Array,
});
</script>
