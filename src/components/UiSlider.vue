<script setup lang="ts">
import { ref } from 'vue';
// import { useSlider } from '@/composables/slider.ts';
import { useSlider } from './../composables/slider';
// import type { SliderProps } from '@/types/slider';
import type { SliderProps } from './../types/slider';

const props = withDefaults(defineProps<SliderProps>(), {
	options: null,
	// Ideally we'd tailwind merge these classes. Some are necessary and not to be overwritten
	classList: () => ({
		outer: 'overflow-hidden',
		wrapper: 'flex flex-nowrap',
		slide: 'relative shrink-0 w-full',
	}),
});

const wrapper = ref<HTMLElement>();
const slides = ref<HTMLElement[]>();

const {
	index,
	realIndex,
	items,
	moveTo,
} = useSlider({
	wrapper,
	slides,
	items: props.items,
	options: props.options,
});

defineExpose({
	index,
	realIndex,
	moveTo,
});
</script>

<template>
	<div :class="classList.outer">
		<div ref="wrapper" :class="[
			classList.wrapper,
			$attrs.class,
		]">
			<div v-for="(slide, i) in items" :key="i" ref="slides" :class="classList.slide"
				:data-active="i === realIndex">
				<slot v-bind="slide" />
			</div>
		</div>
	</div>
</template>
