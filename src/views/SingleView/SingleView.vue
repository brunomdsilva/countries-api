<template>
	<div>
		<Container class="flex flex-col gap-20">
			<RouterLink
				to="/"
				class="flex items-center gap-2 px-6 py-2 rounded shadow-md bg-white dark:bg-primary-700 mr-auto dark:hover:bg-primary-600 transition-colors duration-300"
			>
				<IconArrowLeft class="w-5 fill-current" />
				<p>Back</p>
			</RouterLink>

			<div class="flex items-center gap-28">
				<img :src="country.flag" alt="" class="w-full max-w-lg" />

				<div class="flex flex-col flex-grow gap-10">
					<h2 v-text="country.name" class="font-extrabold text-3xl" />

					<div class="grid grid-cols-2 gap-4">
						<div class="flex flex-col gap-4">
							<InfoWrapper infoLabel="Native Name: " :infoValue="country.nativeName" />
							<InfoWrapper infoLabel="Population: " :infoValue="country.population" />
							<InfoWrapper infoLabel="Region: " :infoValue="country.region" />
							<InfoWrapper infoLabel="Sub Region: " :infoValue="country.subRegion" />
							<InfoWrapper v-show="country.capital" infoLabel="Capital: " :infoValue="country.capital" />
						</div>
						<div class="flex flex-col gap-4">
							<InfoWrapper
								infoLabel="Top Level Domain: "
								:infoValue="country.topLevelDomain.join(', ')"
							/>
							<InfoWrapper
								infoLabel="Currencies: "
								:infoValue="country.currencies.map((each) => each.name).join(', ')"
							/>
							<InfoWrapper
								infoLabel="Languages: "
								:infoValue="country.languages.map((each) => each.name).join(', ')"
							/>
						</div>
					</div>

					<div v-if="country.borders.length" class="flex items-center gap-4">
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
	</div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import Container from "@/components/Container.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import InfoWrapper from "./Partials/InfoWrapper.vue";
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
