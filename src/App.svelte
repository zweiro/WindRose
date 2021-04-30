<script>
	import WindRose from './WindRose.svelte';
</script>

<main>
	<div class="wr-chart">
		<WindRose/>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	.wr-chart {
		max-width:70%;
		margin: auto;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>