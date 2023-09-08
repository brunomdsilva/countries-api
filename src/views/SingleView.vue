<template>
	<Container class="flex flex-col gap-20">
		<RouterLink
			to="/"
			class="flex items-center gap-2 px-6 py-2 rounded shadow-md bg-white dark:bg-primary-700 mr-auto dark:hover:bg-primary-600 transition-colors duration-300"
		>
			<IconArrowLeft class="w-5 fill-current" />
			<p>Back</p>
		</RouterLink>

		<div class="flex items-center flex-col xl:flex-row gap-16 sm:gap-28 w-full max-xl:max-w-lg mx-auto">
			<img :src="country.flag" alt="" class="w-full max-w-lg" />

			<div class="flex flex-col flex-grow gap-10">
				<h2 v-text="country.name" class="font-extrabold text-3xl" />

				<div class="grid sm:grid-cols-2 gap-4">
					<div class="flex flex-col gap-4">
						<p v-for="info in infosFirstCol" v-show="info.value">
							<span class="font-semibold" v-text="info.label" />
							<span v-text="info.value" />
						</p>
					</div>
					<div class="flex flex-col gap-4">
						<p v-for="info in infosSecondCol" v-show="info.value">
							<span class="font-semibold" v-text="info.label" />
							<span v-text="info.value" />
						</p>
					</div>
				</div>

				<div v-if="country.borders.length" class="flex flex-col gap-4">
					<p class="font-semibold">Border Countries:</p>

					<div class="flex flex-wrap gap-2 text-sm">
						<RouterLink
							v-for="border in country.borders"
							:to="`/country/${border.toLowerCase().replaceAll(' ', '-')}`"
							class="px-4 py-1 rounded shadow-md bg-white dark:bg-primary-700 dark:hover:bg-primary-600 transition-colors duration-300"
							v-text="border"
						/>
					</div>
				</div>
			</div>
		</div>
	</Container>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import Container from "@/components/Container.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import countriesData from "@/data.json";

const route = useRoute();

const country = computed(() => {
	const pageCountry = countriesData.find(
		(country) => country.name.toLowerCase().replaceAll(" ", "-") === route.params.name
	);

	return {
		flag: pageCountry.flag,
		name: pageCountry.name,
		nativeName: pageCountry.nativeName,
		population: pageCountry.population.toLocaleString(),
		region: pageCountry.region,
		subRegion: pageCountry.subregion,
		capital: pageCountry.capital,
		topLevelDomain: pageCountry.topLevelDomain,
		currencies: pageCountry.currencies,
		languages: pageCountry.languages,
		borders: getValidBorders(pageCountry.borders, pageCountry.alpha3Code),
	};
});

const infosFirstCol = ref([
	{ label: "Native Name: ", value: country.value.nativeName },
	{ label: "Population: ", value: country.value.population },
	{ label: "Region: ", value: country.value.region },
	{ label: "Sub Region: ", value: country.value.subRegion },
	{ label: "Capital: ", value: country.value.capital },
]);

const infosSecondCol = ref([
	{ label: "Top Level Domain: ", value: country.value.topLevelDomain.join(", ") },
	{
		label: "Currencies: ",
		value: country.value.currencies?.map((each) => each.name).join(", "),
	},
	{ label: "Languages: ", value: country.value.languages.map((each) => each.name).join(", ") },
]);

function getValidBorders(borders, currentCountryCode) {
	const validBorders = [];

	borders?.forEach((borderCode) => {
		countriesData.find((compareCountry) => {
			const matchCodes = compareCountry.alpha3Code === borderCode || compareCountry.alpha2Code === borderCode;
			const matchBackwards = compareCountry.borders?.includes(currentCountryCode);

			if (matchCodes && matchBackwards) validBorders.push(compareCountry.name);
		});
	});

	return validBorders;
}
</script>
