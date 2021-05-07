<script>
	import WindRose from './WindRose.svelte';
</script>

<main>
	<div class="wr-chart">
		<h1>Wind Rose</h1>
		<WindRose/>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}
	.wr-chart {
		max-width:70%;
		margin: auto;
	}
</style>