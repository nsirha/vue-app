<script setup>
import { ref } from 'vue';

import Parallax from '@/components/Parallax.vue';
import WaveFiftyFifty from '@/components/WaveFiftyFifty.vue';
import JbaBoxGrid from '@/components/JbaBoxGrid.vue';
import JbaFooter from '@/components/JbaFooter.vue';

const fiftyFiftyData = ref([
	{
		'heading': '1 Understand the impacts of climate change on flood risk',
		'copy': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		'image': 'https://fastly.picsum.photos/id/192/860/860.jpg?hmac=f42AkJ8e_9BvZI6tN-Q3hZXv4L5Rtm_LrYojHTxD3Io'
	},
	{
		'heading': 'At vero eos et accusamus et iusto odio dignissimos ducimus',
		'copy': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.',
		'image': 'https://fastly.picsum.photos/id/986/860/860.jpg?hmac=bZs69v7sY4VGeqx_JF4i5Dr2G5PX8h25x_SwaYcnMz8'
	},
]);

</script>

<template>
	<!-- Navigation -->
	<nav class="absolute top-0 left-0 w-full z-10 h-14 grid place-content-center bg-white">
		<p>Navigation</p>
	</nav>

	<Parallax />

	<section class="h-screen grid place-content-center bg-[#f0f0f0]">
		<p>Content</p>
	</section>

	<WaveFiftyFifty :data="fiftyFiftyData" />

	<section class="h-screen grid place-content-center bg-[#f0f0f0]">
		<p>Content2</p>
	</section>

	<JbaBoxGrid />

	<JbaFooter />
</template>
