<template>
	<p>
		<span class="font-semibold" v-text="infoLabel" />
		<span v-text="infoValue" />
	</p>
</template>

<script setup>
const props = defineProps({
	infoLabel: String,
	infoValue: String,
});
</script>
