<script setup>
import { onMounted, ref } from 'vue';
import { gsap, ScrollTrigger } from 'gsap/all';

defineProps({
	data: {
		type: Array,
		required: true,
	}
});

const btnClass = 'border-2 border-white px-6 py-4 rounded-tl-3xl rounded-br-3xl font-black transition-all duration-300 ease-in-out hover:rounded-none';

const reverse = ref(false);

const fiftyfifty = ref(null)
const heading = ref(null);
const underline = ref(null);
const copy = ref(null);
const image = ref(null);
const btnContainer = ref(null);

gsap.registerPlugin(ScrollTrigger);

const initAnimation = () => {
	const timeline = gsap.timeline({
		scrollTrigger: {
			trigger: fiftyfifty.value,
			start: 'top center',
			// markers: true,
		}
	});

	timeline
		.fromTo(heading.value, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.2 }, 0.1)
		.fromTo(underline.value, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: 0.3 }, 0.4)
		.fromTo(copy.value, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.4 }, 0.6)
		.fromTo(btnContainer.value, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, 0.8)
		.fromTo(image.value, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.0);
};

onMounted(() => {
	initAnimation();
});
</script>

<template>
	<!-- WaveFiftyFifty -->
	<section ref="fiftyfifty" class="fiftyfifty relative w-full overflow-hidden bg-zinc-700 text-white">
		<div v-for="(item, index) in data" :key="item.heading" class="grid grid-cols-12">
			<div :class="[
				'fiftyfifty-content col-span-12 md:col-span-6 self-center p-8',
				{
					'order-1': (!reverse && index % 2 === 0) || (reverse && index % 2 !== 0),
					'order-2': (!reverse && index % 2 !== 0) || (reverse && index % 2 === 0),
				}
			]">
				<h2 ref="heading" class="uppercase text-4xl font-black">
					{{ item.heading }}<span class="inline-block w-3 h-3 rounded-full ml-1 bg-orange-400" />
				</h2>

				<span ref="underline" class="block w-20 h-2 mt-4 bg-orange-400" />

				<p ref="copy" class="mt-4" v-text="item.copy" />

				<div ref="btnContainer" class="flex gap-x-4 mt-6">
					<button :class="[btnClass, 'bg-white text-zinc-700']">
						Find out more
					</button>

					<button :class="btnClass">
						Find out more
					</button>
				</div>
			</div>

			<div :class="[
				'col-span-12 md:col-span-6',
				{
					'order-2': (!reverse && index % 2 === 0) || (reverse && index % 2 !== 0),
					'order-1': (!reverse && index % 2 !== 0) || (reverse && index % 2 === 0)
				}
			]">
				<img ref="image" :src="item.image" class="w-full h-auto" loading="lazy">
			</div>
		</div>

		<div class="absolute top-0 w-full h-24 bg-center bg-cover bg-no-repeat wave-top-orange" />
		<div class="absolute top-0 w-full h-24 bg-center bg-cover bg-no-repeat wave-top-white" />

		<div class="absolute bottom-0 w-full h-24 bg-center bg-cover bg-no-repeat wave-bottom-orange" />
		<div class="absolute bottom-0 w-full h-24 bg-center bg-cover bg-no-repeat wave-bottom-white" />
	</section>
</template>

<style scoped>
.wave-top-orange {
	background-image: url('/assets/images/fifty-wave-top-orange.png');
}

.wave-top-white {
	background-image: url('/assets/images/fifty-wave-top-white.png');
}

.wave-bottom-orange {
	background-image: url('/assets/images/fifty-wave-bottom-orange.png');
}

.wave-bottom-white {
	background-image: url('/assets/images/fifty-wave-bottom-white.png');
}
</style>
