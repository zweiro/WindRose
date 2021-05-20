<script>
import * as d3 from "d3";
import { onMount } from 'svelte';

    import {
        ANGLE_OFFSET,
		INNER_RADIUS,
        colorScale,
        x,
		y,
	} from './utils'

    export let data;

    let makeArc = d3
		.arc()
		.innerRadius((d) => y(d[0]))
		.outerRadius((d) => y(d[1]))
		.startAngle((d) => x(d.data.angle))
		.endAngle((d) => x(d.data.angle) + x.bandwidth())
		.padAngle(0.02)
		.padRadius(INNER_RADIUS);


</script>

<g fill="{colorScale(data.key)}">
    {#each data as d}
        <path d="{makeArc(d)}" transform="rotate({ANGLE_OFFSET/2})"></path>
    {/each}
</g>

<style>

</style>