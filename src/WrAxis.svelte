<script>
    import {
		INNER_RADIUS,
		y,
	} from './utils'

    export let angle;

</script>

<g class="axis" transform="rotate({angle - 90})">
    <line
        x1={INNER_RADIUS}
        x2={y(y.ticks(5).reverse()[0])}
        fill="none"
        style="stroke:gray;stroke-dasharray:1,4"
    />
</g>

<style>

</style>