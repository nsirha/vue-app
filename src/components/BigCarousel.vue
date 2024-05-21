<script setup>
	import { onMounted, ref } from 'vue';
	import Glide from '@glidejs/glide';

	const items = ref([
		{
			title: {
				one: 'ONE',
				two: 'UNO',
			},
			image: 'https://fastly.picsum.photos/id/411/300/300.jpg?hmac=vLP_Aguvnx9Fyhx1QKMZ3YaeKTDaxQTzPRbSgtZkrSo',
			backgroundImage:
				'https://fastly.picsum.photos/id/152/1800/1800.jpg?hmac=sr3t3ZoUyV8-pfUkj7xtSQmy7-EZVqxeDC8CyYhQYZk',
			decoration:
				'https://fastly.picsum.photos/id/953/200/200.jpg?hmac=S5zbAl9YqUc02Oezl6cR8gcLfF3pwkQ5_AcG8JXjeC0',
		},
		{
			title: {
				one: 'TWO',
				two: 'DOS',
			},
			image: 'https://fastly.picsum.photos/id/703/300/300.jpg?hmac=uTMUwdRYaCi0sD8hKj3Nz7WHmeeZeb1Dn8yITbQ4BGo',
			backgroundImage:
				'https://fastly.picsum.photos/id/294/1800/1800.jpg?hmac=LUF2qtDvTlLgvak_aXbM1F-hYUIs91iwHGMfgH4HjRU',
			decoration:
				'https://fastly.picsum.photos/id/1053/200/200.jpg?hmac=JOtR2adXynxSVClz0LNlPZjW0TJTRXc7c15kka2QoRk',
		},
		{
			title: {
				one: 'THREE',
				two: 'TRES',
			},
			image: 'https://fastly.picsum.photos/id/415/300/300.jpg?hmac=z6V3G_O6bVCSthyVsoBmAHrtbQ23ZJ5DQTsmMLDOk2E',
			backgroundImage:
				'https://fastly.picsum.photos/id/315/1800/1800.jpg?hmac=GkwWVacox3GCqh4mxci7ATRXxItmsGupuvgzkmai0yE',
			decoration:
				'https://fastly.picsum.photos/id/344/200/200.jpg?hmac=VNTdN95obd1fhoO6M8Pw3vxCOWmCrUPGGqavLT9ewl8',
		},
	]);

	const currentIndex = ref(0);
	const totalItems = items.value.length;

	const initGlide = () => {
		const glide = new Glide('#glide-root', {
			type: 'carousel',
			animationDuration: 2000,
			startAt: 0,
			gap: 8,
			perView: 1,
		});

		glide.on('run', (event) => {
			if (event.direction === '>') {
				console.log('Next');
				currentIndex.value++;
				if (currentIndex.value === totalItems) {
					currentIndex.value = 0;
				}
			} else {
				console.log('Prev');
				currentIndex.value--;
				if (currentIndex.value === -1) {
					currentIndex.value = totalItems - 1;
				}
			}
		});

		glide.mount();
	};

	const onPrevClick = () => {
		currentIndex.value--;
		if (currentIndex.value === -1) {
			currentIndex.value = totalItems - 1;
		}
	};

	const onNextClick = () => {
		currentIndex.value++;
		if (currentIndex.value === totalItems) {
			currentIndex.value = 0;
		}
	};

	onMounted(() => {
		// initGlide();
	});
</script>

<template>
	<div id="glide-root" class="relative bg-white">
		<div class="flex justify-between items-center gap-4 px-4" data-glide-el="controls">
			<!-- <button class="bg-blue-200 py-2 px-4 hover:bg-blue-300" data-glide-dir="<">Prev</button> -->
			<button class="bg-blue-200 py-2 px-4 hover:bg-blue-300" @click="onPrevClick">
				Prev
			</button>

			<p class="font-black" v-text="`${currentIndex + 1} / ${totalItems}`" />

			<!-- <button class="bg-blue-200 py-2 px-4 hover:bg-blue-300" data-glide-dir=">">Next</button> -->
			<button class="bg-blue-200 py-2 px-4 hover:bg-blue-300" @click="onNextClick">
				Next
			</button>
		</div>

		<div class="glide">
			<div class="h-[500px] bg-teal-200 text-9xl">
				<Transition name="slide-fade-top" mode="out-in">
					<p
						class="absolute top-0 -right-8"
						v-text="items[currentIndex].title.one"
						:key="currentIndex"
					/>
				</Transition>

				<Transition name="slide-fade-bottom" mode="out-in">
					<p
						class="absolute bottom-0 -left-8"
						v-text="items[currentIndex].title.two"
						:key="currentIndex"
					/>
				</Transition>
			</div>

			<img
				:src="items[currentIndex].image"
				class="absolute top-24 left-1/2 -translate-x-1/2"
			/>

			<!-- <div data-glide-el="track" class="glide__track">
				<ul class="glide__slides text-center">
					<li v-for="item in items" :key="item.title" class="glide__slide bg-red-500">
						<div>
							<p v-text="items[currentIndex].title.one" />
							<p v-text="items[currentIndex].title.two" />
						</div>

						<img class="mx-auto" :src="item.image" />
					</li>
				</ul>
			</div> -->
		</div>
	</div>
</template>

<style scoped>
	/* Top text animation */
	.slide-fade-top-enter-active {
		transition: all 0.3s ease-out;
		transition-delay: 0.8s;
	}

	.slide-fade-top-leave-active {
		transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.slide-fade-top-enter-from,
	.slide-fade-top-leave-to {
		transform: translateX(-50px);
		opacity: 0;
	}

	/* Bottom text animation */
	.slide-fade-bottom-enter-active {
		transition: all 0.3s ease-out;
		transition-delay: 0.8s;
	}

	.slide-fade-bottom-leave-active {
		transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.slide-fade-bottom-enter-from,
	.slide-fade-bottom-leave-to {
		transform: translateX(50px);
		opacity: 0;
	}
</style>
