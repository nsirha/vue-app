<script setup>
import { onMounted, ref } from 'vue';
import { gsap, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);;

const btnClass = 'border-2 border-jba bg-jba text-zinc-700 px-6 py-4 rounded-tl-3xl rounded-br-3xl font-black transition-all duration-300 ease-in-out hover:rounded-none';

const links = ref([
	'Risks',
	'Products',
	'Sectors',
	'Knowledge hub',
	'About us',
]);

const innerLinks = ref([
	{
		'heading': 'Talk to us',
		'children': [
			'+44 (0) 1756 799 919',
			'hello@jbarisk.com',
			'Get in touch',
		]
	},
	{
		'heading': 'Our Global Offices',
		'children': [
			'United Kingdom',
			'United States',
			'Europe',
			'Asia Pacific',
		]
	},
	{
		'heading': 'JBA Family',
		'children': [
			'JBA Consulting',
			'JBA Group',
			'JBA Trust',
		]
	},
	{
		'heading': 'Join us',
		'children': [
			'Careers',
		]
	},
]);

const socialLinks = ref(['L', 'X']);

const bottomLinks = ref([
	'Privacy Policy',
	'Legal information',
	'Website Terms',
	'Cookie Policy',
]);

const parallaxAnimation = () => {
	// Version 1
	// gsap.to('.footer-wave-orange', {
	// 	y: -100,
	// 	ease: 'none',
	// 	scrollTrigger: {
	// 		trigger: 'footer',
	// 		scrub: true,
	// 	}
	// });

	// Version 2
	// gsap.to('[data-speed]', {
	// 	y: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))) * ScrollTrigger.maxScroll(window),
	// 	ease: 'none',
	// 	scrollTrigger: {
	// 		start: 0,
	// 		end: 'max',
	// 		invalidateOnRefresh: true,
	// 		scrub: 0,
	// 		markers: true,
	// 	}
	// });

	// Version 3
	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: 'footer',
			start: 'top bottom',
			end: 'bottom top',
			scrub: true,
			// markers: true,
		}
	});

	gsap.utils.toArray('.parallax').forEach(layer => {
		const depth = layer.dataset.depth;
		const movement = -(layer.offsetHeight * depth)
		tl.to(layer, { y: movement, ease: 'none' }, 0)
	});
};

onMounted(() => {
	parallaxAnimation();
});
</script>

<template>
	<footer class="footer relative parallax text-white mt-40" data-depth="0">

		<img src="/assets/images/footer-wave-orange.png"
			class="parallax footer-wave-orange absolute -top-36 left-0 w-full h-[400px] xl:-top-60" data-depth="0.50">

		<div class="bg-[#4a4a49] z-10">
			<div class="container mx-auto p-6 border-b border-zinc-500">
				<p class="uppercase text-4xl font-black">
					Talk to our expert team <span class="inline-block w-3 h-3 rounded-full ml-1 bg-jba" />
				</p>

				<button :class="['mt-4', btnClass]">
					Get in touch
				</button>
			</div>

			<div class="container mx-auto px-6 pt-12 pb-24 grid grid-cols-12">
				<div class="col-span-12 md:col-span-6">
					<ul class="uppercase text-3xl border-b border-zinc-500 pb-12 md:border-0 md:pb-0">
						<li v-for="link in links" :key="link">
							<a href="#" class="font-black transition-all duration-100 ease-in hover:pl-4 hover:text-jba"
								v-text="link" />
						</li>
					</ul>

					<img src="/assets/images/logo-tagline.png" class="w-logo mt-8 hidden md:block" loading="lazy">
				</div>

				<div class="col-span-12 flex flex-wrap pt-12 md:col-span-6 md:pt-0">
					<div v-for="item in innerLinks" :key="item.heading" class="w-1/2 md:w-1/3">
						<h4 class="font-black" v-text="item.heading" />
						<ul>
							<li v-for="i in item.children" :key="i" v-text="i" />
						</ul>
					</div>

					<div>
						<h4 class="font-black">Follow us</h4>
						<div class="flex gap-x-4 mt-2 text-zinc-700">
							<button v-for="link in socialLinks" :key="link" :class="[
								'w-[60px] h-[60px] rounded-tl-3xl rounded-br-3xl',
								'bg-jba flex justify-center items-center',
								'transition-all duration-300 ease-in-out hover:rounded-none',
							]" v-text="link" />

							<img src="/assets/images/logo-tagline.png" class="w-40 object-contain md:hidden"
								loading="lazy">
						</div>
					</div>
				</div>
			</div>

			<div class="container mx-auto p-6 grid grid-cols-12 items-center border-t gap-y-5 border-zinc-500">
				<div class="text-zinc-400 col-span-12 order-2 xl:col-span-7 xl:order-1">
					<p>© 2011 - 2023 JBA Risk Management Limited. All rights reserved. Registered in England. 07732946
					</p>
					<p class="mt-2">1 Broughton Park, Old Lane North, Broughton, Skipton BD23 3FD</p>
				</div>

				<div class="col-span-12 order-1 xl:justify-self-end xl:col-span-5 xl:order-2">
					<ul class="flex gap-x-4">
						<li v-for="link in bottomLinks" :key="link" v-text="link" />
					</ul>
				</div>
			</div>
		</div>
	</footer>
</template>

<style>
footer::before {
	content: '';
	position: absolute;
	top: -120px;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url('/assets/images/footer-wave-dark.png');
	background-repeat: repeat-x;
	background-position: top;
	background-size: contain;
	z-index: 1;
}

@media screen and (min-width: 1280px) {
	footer::before {
		top: -220px;
		background-size: cover;
	}
}
</style>
