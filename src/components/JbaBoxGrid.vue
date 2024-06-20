<script setup>
import HeadingUnderline from './HeadingUnderline.vue';

import { onMounted, ref } from 'vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';

import { gsap, ScrollTrigger } from 'gsap/all';

import 'swiper/css';
import 'swiper/css/pagination';

gsap.registerPlugin[ScrollTrigger];

const modules = [Pagination];

// import UiSlider from './UiSlider.vue';

const heading = ref(null);
const underline = ref(null);
const para = ref(null);
const btn = ref(null);
const cardDesktop = ref(null);

const btnClass = [
	'border-2 border-jba px-6 py-4 rounded-tl-3xl rounded-br-3xl font-black opacity-0',
	'transition-all duration-300 ease-in-out',
	'hover:bg-jba hover:rounded-none focus:rounded-none focus:bg-jba',
];

const articleBtnClass = [
	'w-[72px] h-[72px] flex items-center justify-end bg-jba',
	'border-2 border-jba px-6 py-4 rounded-tl-3xl rounded-br-3xl font-black',
	'transition-all duration-300 ease-in-out',
	'hover:w-full hover:bg-zinc-700 hover:border-zinc-700 hover:text-white',
	'hover:rounded-tl-none focus:rounded-none',
];

const cards = ref([
	{
		title: 'Flood',
		copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		image: '/assets/images/box-grid-img.png',
		href: '#?v1',
	},
	{
		title: 'Wind',
		copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		image: '/assets/images/box-grid-img-2.png',
		href: '#?v2',
	},
	{
		title: 'Storm',
		copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		image: '/assets/images/box-grid-img-3.png',
		href: '#?v3',
	},
	{
		title: 'Crop',
		copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		image: '/assets/images/box-grid-img-4.png',
		href: '#?v4',
	},
]);

const animation = () => {
	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: '.jba-box-grid',
			start: 'top top',
			markers: true,
		},
	}
	);

	tl.to(heading.value, {
		opacity: 1,
		duration: 0.5,
		delay: 0.5,
	});

	tl.to(underline.value.$el, {
		scaleX: 1,
		transformOrigin: 'left',
		duration: 0.5,
	});

	tl.to(para.value, {
		opacity: 1,
		duration: 0.5,
	});

	tl.to(btn.value, {
		opacity: 1,
		duration: 0.5,
	});

	tl.fromTo(cardDesktop.value, {
		opacity: 0,
		y: 50,
	}, {
		opacity: 1,
		y: 0,
		stagger: 0.25,
	});
};

onMounted(() => {
	animation();
});
</script>

<template>
	<section class="jba-box-grid h-screen min-h-[1000px] bg2-[#f0f0f0] bg-red-100 p-6">
		<header class="container mx-auto grid grid-cols-12">
			<div class="col-span-12 md:col-span-6">
				<h2 ref="heading" class="uppercase text-5xl font-black opacity-0">
					Expertise in a number of risks impacting your customers
					<span class="inline-block w-3 h-3 rounded-full bg-orange-400" />
				</h2>

				<HeadingUnderline ref="underline" class="scale-x-0" />

				<p ref="para" class="mt-4 opacity-0">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua labore et dolore.
				</p>
			</div>

			<div class="col-span-12 mt-4 md:col-span-6 md:justify-self-end md:self-end md:mt-0">
				<button ref="btn" :class="btnClass">
					View all risks
				</button>
			</div>
		</header>

		<!-- <UiSlider :items="cards">
			<template #default="slide">
				<UiPlaceholder>
					<pre :class="[
						'absolute inset-0 size-full',
						'flex items-center justify-center',
						'text-white text-center',
						'bg-gradient-to-br from-red to-blue',
					]" v-text="slide.title" />
				</UiPlaceholder>
			</template>
</UiSlider> -->

		<div class="cards-at-mobile container mx-auto mt-8 md:hidden">
			<Swiper :loop="true" :slidesPerView="1.1" :spaceBetween="30" :pagination="{
				clickable: true,
			}" :modules="modules" class="mobile-swiper">
				<SwiperSlide v-for="card in cards" :key="card.title">
					<article class="relative w-[315px] rounded-tl-3xl rounded-br-3xl bg-white">
						<img :src="card.image" class="rounded-tl-3xl aspect-[315/290]">

						<div class="p-4">
							<h3 class="text-3xl font-black" v-text="card.title" />

							<p class="mt-4" v-text="card.copy" />
						</div>

						<div class="flex items-center justify-end group">
							<span :class="[
								'absolute left-4 top-1/2 -translate-y-1/2',
								'flex-shrink-0 z-10 opacity-0 font-black text-white',
								'group-hover:opacity-100 select-none appearance-none',
							]">
								Find out more
							</span>

							<a :href="card.href" :class="articleBtnClass">
								<span class="ml-2">></span>
							</a>
						</div>
					</article>
				</SwiperSlide>
			</Swiper>
		</div>

		<div class="cards-at-desktop container mx-auto justify-center gap-x-3 mt-12 hidden md:flex">
			<article v-for="card in cards" :key="card.title" ref="cardDesktop"
				class="relative w-[315px] rounded-tl-3xl rounded-br-3xl bg-white">
				<img :src="card.image" class="rounded-tl-3xl aspect-[315/290]">

				<div class="p-4">
					<h3 class="text-3xl font-black" v-text="card.title" />

					<p class="mt-4" v-text="card.copy" />
				</div>

				<div class="flex items-center justify-end group">
					<span :class="[
						'absolute left-4 top-1/2 -translate-y-1/2',
						'flex-shrink-0 z-10 opacity-0 font-black text-white',
						'group-hover:opacity-100 select-none appearance-none',
					]">
						Find out more
					</span>

					<a :href="card.href" :class="articleBtnClass">
						<span class="ml-2">></span>
					</a>
				</div>
			</article>
		</div>
	</section>
</template>

<style scoped>
.swiper {
	width: auto;
	/* height: 315px; */
	background-color: coral;
}

.swiper-slide {
	background-color: lightcyan;
}
</style>
