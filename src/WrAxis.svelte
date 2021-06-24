<script>
    import {
		INNER_RADIUS,
		scaleAxis,
	} from './utils'

    export let angle;
    export let dateIndex;

</script>

<g class="axis" transform="rotate({angle - 90})">
    <line
        x1={INNER_RADIUS}
        x2={scaleAxis(0)(scaleAxis(0).ticks(5).reverse()[0])}
        fill="none"
        style="stroke:gray;stroke-dasharray:1,4"
    />
</g>

<style>

</style>