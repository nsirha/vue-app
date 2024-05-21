<script setup>
	import { onMounted } from 'vue';
	import { gsap } from 'gsap';

	onMounted(() => {
		console.log(gsap);
	});
</script>

<template>
	<div class="slider__container bg-amber-200 max-w-4xl mx-auto flex">
		<div class="slider__item w-12 h-12 bg-amber-400">1</div>
		<div class="slider__item w-12 h-12 bg-amber-400">2</div>
		<div class="slider__item w-12 h-12 bg-amber-400">3</div>
	</div>
</template>

<style scoped></style>
