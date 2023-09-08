<template>
	<Container class="flex flex-col gap-12">
		<div class="flex flex-col sm:flex-row justify-between gap-4">
			<SearchInput v-model="search" />

			<FilterSelect :options="countryRegions" @select-region="selectedCountryRegion = $event" />
		</div>

		<p v-if="!filteredCountries.length" class="font-semibold text-lg">No countries were found...</p>

		<CountriesList v-else :countries="filteredCountries" />
	</Container>
</template>

<script setup>
import { computed, ref } from "vue";
import Container from "@/components/Container.vue";
import SearchInput from "@/components/SearchInput.vue";
import FilterSelect from "@/components/FilterSelect.vue";
import CountriesList from "@/components/CountriesList.vue";
import countriesData from "@/data.json";

const countries = ref(
	countriesData
		.sort((a, b) => b.population - a.population)
		.map((country) => {
			return {
				flag: country.flag,
				name: country.name,
				nativeName: country.nativeName,
				population: country.population.toLocaleString(),
				region: country.region,
				capital: country.capital,
			};
		})
);
const countryRegions = ref([...new Set(countries.value.map((country) => country.region))]);
const search = ref("");
const selectedCountryRegion = ref(null);

const filteredCountries = computed(() => {
	return countries.value.filter((country) => {
		const filteredRegion = selectedCountryRegion.value ? country.region === selectedCountryRegion.value : true;
		const filteredSearch =
			country.name.toLowerCase().includes(search.value.toLowerCase()) ||
			country.nativeName.toLowerCase().includes(search.value.toLowerCase());

		return filteredSearch && filteredRegion;
	});
});
</script>
