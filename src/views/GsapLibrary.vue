<script setup>
	import { ref } from 'vue';

	import Scroller from '@/views/Scroller.vue';
	import FiftyFifty from '@/components/FiftyFifty.vue';

	const scrollerView = ref(false);
	const fiftyView = ref(true);
</script>

<template>
	<header class="bg-gray-800 text-white p-4">
		<nav class="flex gap-x-5 justify-center">
			<button>Horizontal Section Scroller</button>
			<button>50/50</button>
			<button>Three</button>
			<button>Four</button>
			<button>Five</button>
		</nav>
	</header>

	<main>
		<template v-if="scrollerView">
			<Scroller />
		</template>

		<template v-if="fiftyView">
			<FiftyFifty />
		</template>
	</main>
</template>

<style scoped>
	/* */
</style>
