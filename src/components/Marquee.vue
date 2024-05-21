<script setup>
	import { ref } from 'vue';

	const items = ref([
		{
			title: 'Mouth Watering',
			image: 'https://fastly.picsum.photos/id/821/20/20.jpg?hmac=htkXLB9ingJoBP7w3jQdN1z6Us4Rssi9E0HWfyty_Xg',
		},
		{
			title: 'Gob Filling',
			image: 'https://fastly.picsum.photos/id/807/20/20.jpg?hmac=sIhV-fhAWrsnX3fQUAQGTGKpBzUd3TKLFFdxcKpVjWY',
		},
		{
			title: 'Real Tasty',
			image: 'https://fastly.picsum.photos/id/785/20/20.jpg?hmac=OoP2R37KKuAKvdeLwCUqOnUKELd9WjlPgwTsGF3u9Sg',
		},
	]);
</script>

<template>
	<div>
		<div class="marquee flex select-none overflow-hidden bg-[#F6A000]">
			<ul class="marquee__content flex min-w-full flex-shrink-0 items-center justify-around">
				<li v-for="item in items" :key="item.title" class="flex items-center gap-x-7">
					<span
						class="py-4 text-4xl font-bold uppercase lg:text-5xl"
						v-text="item.title"
					/>
					<img class="h-10 w-10 rounded-full" :src="item.image" />
				</li>
			</ul>

			<!-- Mirrors the content above -->
			<ul
				class="marquee__content flex min-w-full flex-shrink-0 items-center justify-around bg-red-500"
			>
				<li v-for="item in items" :key="item.title" class="flex items-center gap-x-7">
					<span
						class="py-4 text-4xl font-bold uppercase lg:text-5xl"
						v-text="item.title"
					/>
					<img class="h-10 w-10 rounded-full" :src="item.image" />
				</li>
			</ul>
		</div>
	</div>
</template>

<style>
	.marquee {
		--gap: 1rem;
		gap: var(--gap);
	}

	.marquee__content {
		gap: var(--gap);
	}
	.marquee__content {
		/* animation: scroll 20s linear infinite; */
		/* animation-direction: reverse; */
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}
</style>
