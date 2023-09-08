<template>
	<div>
		<div v-show="showDropdown" @click.prevent="showDropdown = false" class="fixed inset-0" />

		<div class="relative w-60">
			<button
				@click.prevent="showDropdown = !showDropdown"
				class="py-4 px-6 w-full bg-white dark:bg-primary-700 flex items-center justify-between gap-16 shadow-md rounded"
			>
				<span class="font-semibold text-sm">{{ selectedOption || "Filter by Region" }}</span>
				<IconChevronDown class="w-3 fill-current" />
			</button>

			<Transition
				enter-from-class="opacity-0 -translate-y-2"
				leave-to-class="opacity-0 -translate-y-2"
				enter-active-class="transition-all duration-300"
				leave-active-class="transition-all duration-300"
			>
				<div
					v-show="showDropdown"
					class="absolute inset-x-0 top-full mt-2 bg-white dark:bg-primary-700 shadow-md rounded py-2 flex flex-col text-sm font-semibold"
				>
					<button
						@click.prevent="handleSelection(null)"
						class="text-left px-6 py-2 hover:bg-primary-100 dark:hover:bg-primary-600 transition-colors duration-300"
						v-text="'All'"
					/>

					<button
						v-for="option in options"
						@click.prevent="handleSelection(option)"
						class="text-left px-6 py-2 hover:bg-primary-100 dark:hover:bg-primary-600 transition-colors duration-300"
						v-text="option"
					/>
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup>
import IconChevronDown from "@/components/icons/IconChevronDown.vue";
import { ref } from "vue";

const emit = defineEmits(["selectRegion"]);
const props = defineProps({
	options: Array,
});

const showDropdown = ref(false);
const selectedOption = ref("");

function handleSelection(option) {
	showDropdown.value = false;
	selectedOption.value = option;
	emit("selectRegion", option);
}
</script>
