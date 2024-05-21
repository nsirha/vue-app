<script setup>
	import { onMounted } from 'vue';
	import { gsap } from 'gsap';

	const startAnimation = () => {
		gsap.fromTo(
			'header',
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 1,
				delay: 1,
			}
		);
	};

	onMounted(() => {
		startAnimation();
	});
</script>

<template>
	<section>
		<div class="bg-orange-200 h-screen grid place-items-center">
			<header class="text-9xl uppercase font-black">Navneet</header>
		</div>
	</section>
</template>

<style scoped></style>
