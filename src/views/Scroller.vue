<script setup>
	import { computed, onMounted, ref } from 'vue';
	import { gsap, ScrollTrigger } from 'gsap/all';

	gsap.registerPlugin(ScrollTrigger);

	const scrollContainer = ref(null);
	const panelClass = ref(
		'relative w-full h-full flex flex-col justify-center items-center text-white p-8 box-border'
	);
	const panels = ref([
		{
			title: 'SMOKY',
			image: 'https://cdn.shopify.com/s/files/1/0529/2461/2804/t/19/assets/bacon-nooch-packet-B12.png?v=142086939099955473321682521849',
		},
		{
			title: 'CHEESE',
			image: 'https://cdn.shopify.com/s/files/1/0529/2461/2804/t/19/assets/cheesy-nooch-packet-B12.png?v=71069129710958613681682520552',
		},
		{
			title: 'CHICK`N',
			image: 'https://cdn.shopify.com/s/files/1/0529/2461/2804/t/19/assets/chicken-packet.png?v=97047802902640156701681329886',
		},
	]);

	const handleScroll = () => {
		const sections = gsap.utils.toArray('.panel');

		gsap.to(sections, {
			xPercent: -100 * (sections.length - 1),
			ease: 'none',
			scrollTrigger: {
				trigger: scrollContainer.value,
				pin: true,
				scrub: 1,
				// markers: true,
				// snap: 1 / (sections.length - 1),
				end: () => '+=' + scrollContainer.value.offsetWidth,
			},
			backgroundColor: '#125d4a',
		});
	};

	const computedWidth = computed(() => {
		return `${panels.value.length * 100}%`;
	});

	onMounted(() => {
		handleScroll();
	});
</script>

<template>
	<header class="p-8 text-center">
		<p>This is the header</p>
	</header>

	<div class="flex flex-col justify-center items-center h-screen bg-pink-400">
		<h1 class="uppercase font-bold">Horizontal scrolling</h1>
		<h2>First container</h2>
	</div>

	<div
		class="scroll-container h-screen flex flex-nowrap"
		:style="{ width: computedWidth }"
		ref="scrollContainer"
	>
		<div v-for="panel in panels" :key="panel.title" :class="['panel', panelClass]">
			<img :src="panel.image" alt="" class="max-w-[300px]" />

			<p v-text="panel.title" class="text-[100px] font-black leading-tight" />

			<a
				:href="panel.image"
				:class="[
					'absolute bottom-8 left-1/2 -translate-x-1/2',
					'border-4 border-white rounded p-4 font-black',
					'hover:border-yellow-400 hover:text-yellow-400',
				]"
			>
				SHOP NOW
			</a>
		</div>
	</div>

	<div class="flex flex-col justify-center items-center h-screen bg-indigo-300">
		<h2>Last container</h2>
	</div>

	<footer class="p-8 text-center">
		<p>This is the footer</p>
	</footer>
</template>

<style scoped>
	.scroll-container {
		background-color: #ce0f69;
	}
</style>
