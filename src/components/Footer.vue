<script setup>
	//
</script>

<template>
	<footer class="relative p-4 bg-green-200 flex justify-center">
		<div class="py-8 text-center">
			<p>#hastag here</p>
			<div>
				<a href="">Insta</a>
				<a href="">Tiktok</a>
			</div>
		</div>
	</footer>
</template>

<style scoped>
	footer::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 200%;
		height: 50px;
		display: block;
		background-color: black;
		mask-image: url('../../src/assets/svg-wave-piece.svg');
		mask-repeat: repeat-x;
		mask-size: 30px;
		animation: maskX 80s infinite linear;
		animation-play-state: running;
	}

	@keyframes maskX {
		0% {
			mask-position: 0;
		}
		100% {
			mask-position: 100%;
		}
	}
</style>
