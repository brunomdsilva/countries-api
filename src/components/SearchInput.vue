<template>
	<label class="bg-white dark:bg-primary-700 shadow-md flex items-center gap-4 py-4 px-8 rounded w-full sm:max-w-sm">
		<IconMagnifyGlass class="w-4 fill-primary-500 dark:fill-primary-400" />
		<input
			type="text"
			placeholder="Search for a country..."
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			class="w-full bg-transparent outline-none placeholder:text-primary-500 dark:placeholder:text-primary-400 text-sm"
		/>
	</label>
</template>

<script setup>
import IconMagnifyGlass from "@/components/icons/IconMagnifyGlass.vue";

const props = defineProps({
	modelValue: String,
});
</script>
