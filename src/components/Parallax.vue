<script setup>
import { onMounted } from 'vue';
import { gsap, SplitText, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(SplitText, ScrollTrigger);

const btnClass = 'border-2 border-orange-400 px-6 py-4 rounded-tl-3xl rounded-br-3xl font-black transition-all duration-300 ease-in-out hover:rounded-none';

const initAnimation = () => {
	const splitLines = new SplitText('.split-me h1', {
		type: 'lines',
		linesClass: 'font-bold line line++'
	});

	document.querySelectorAll('.split-me .line').forEach((el) => {
		const wrapper = document.createElement('div');
		wrapper.className = 'line-wrapper';
		el.parentNode.insertBefore(wrapper, el);
		wrapper.appendChild(el);
	});

	gsap.utils.toArray('.line').forEach((el, index) => {
		gsap.from(el, {
			yPercent: 200,
			duration: 1,
			ease: 'power4.out',
			delay: 1.5,
		});
	});

	gsap.fromTo('.content-wrapper', {
		opacity: 0,
	}, {
		opacity: 1,
		duration: 1,
		delay: 1,
	});

	gsap.fromTo('.hero-content', {
		opacity: 0,
		y: 50,
	}, {
		opacity: 1,
		y: 0,
		duration: 1,
		delay: 1.5,
	});
};

const parallaxAnimation = () => {
	gsap.to('[data-speed]', {
		y: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))) * ScrollTrigger.maxScroll(window),
		ease: 'none',
		scrollTrigger: {
			start: 0,
			end: 'max',
			invalidateOnRefresh: true,
			scrub: 0,
		}
	});
};

onMounted(() => {
	initAnimation();
	parallaxAnimation();
});
</script>

<template>
	<!-- Parallax -->
	<section class="relative h-screen flex flex-col justify-end bg-slate-600 text-slate-700">
		<img src="/assets/images/hero-img.jpg" class="absolute inset-0 w-full h-full object-cover">

		<div class="relative content-wrapper">
			<div class="orange">
				<img
					src="/assets/images/orange-wave.png"
					class="absolute -top-64 left-0 w-full object-cover"
					data-speed="1.2"
				>
			</div>

			<!-- <div class="white">
				<img
					src="/assets/images/white-wave.png"
					class="absolute -top-40 xl:-top-56 left-0 w-full object-cover"
					data-speed="1.05"
				>
			</div> -->

			<div class="hero-content-wrapper relative grid grid-cols-12 px-12 pb-24 bg-[#f0f0f0]">
				<div class="col-span-6 split-me">
					<h1 class="uppercase text-6xl font-black">
						Global leaders in flood risk science<span class="text-orange-400 text-9xl leading-[0]">.</span>
					</h1>
				</div>

				<div class="col-span-5 col-start-8 hero-content">
					<p>
						We're experts in translating complex, scientific data into useful information, using sophisticated
						hydraulic approaches and models to provide cutting-edge flood risk intelligence.
					</p>

					<div class="flex gap-x-4 mt-6">
						<button :class="[btnClass, 'bg-orange-400']">
							About Us
						</button>

						<button :class="btnClass">
							Get in touch
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style>
.split-me .line-wrapper {
  overflow: hidden;
}

.hero-content-wrapper::before {
	content: '';
	position: absolute;
	top: -182px;
	left: 0;
	width: 100%;
	height: 200px;
	background-image: url('/assets/images/white-wave.png');
	background-repeat: repeat-x;
	background-position: center;
	background-size: cover;
}

.orange::before {
	content: '';
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background-color: #f6a124;
}

/* .white::before {
	content: '';
	position: absolute;
	top: -60px;
	left: 0;
	width: 100%;
	height: 800px;
	background-color: #f0f0f0;
} */
</style>

<!-- https://codepen.io/GreenSock/pen/RwVGNea -->
