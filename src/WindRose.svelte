<script>
	import * as d3 from "d3";
	import { onMount } from "svelte";
    import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	import WrAxis from "./WrAxis.svelte";
	import WrRings from "./WrRings.svelte";

	import {
		ANGLE_OFFSET,
		HEIGHT,
		WIDTH,
		MARGIN,
		CHART_WIDTH,
		CHART_HEIGHT,
		INNER_RADIUS,
		OUTER_RADIUS,
		data,
		scaleAxis,
		x,
		colorScale,
		AXES_ANGLES,
		stackedData
	} from './utils'
	let addLegend = (g) =>
		g
			.append("g")
			.selectAll("g")
			.attr("class", "legend")
			.data(data.columns.slice(1).reverse())
			.join("g")
			.attr(
				"transform",
				(_, i) =>
					`translate(${OUTER_RADIUS + 30},${
						-OUTER_RADIUS +
						40 +
						(i - (data.columns.length - 1) / 3) * 20
					})`
			)
			.call((g) =>
				g
					.append("rect")
					.attr("width", 18)
					.attr("height", 18)
					.attr("fill", colorScale)
					.attr("stroke", "dimgray")
					.attr("stroke-width", 0.5)
			)
			.call((g) =>
				g
					.append("text")
					.attr("x", 24)
					.attr("y", 9)
					.attr("dy", "0.35em")
					.text((d) => `${d} ${data.unit}`)
					.style("font-size", 13)
			)
			.append("text");

	let	yAxis = g => g.append("g")
      .attr("class", "yAxis")
      .selectAll("g")
      .data(scaleAxis.ticks(5)) // .slice(1) to skip 0
      .join("g")
      .call(g => g.append("circle")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-dasharray", "4,4")
        .attr("r", scaleAxis)
      )

	onMount(() => {
		const svg = d3
			.select("svg")
			.attr("viewBox", [0, 0, WIDTH, HEIGHT])
			.attr("font-family", "sans-serif");

		const g = svg
			.select("g")
			.attr("class","graph")
			.attr("transform", `translate(${WIDTH / 2},${HEIGHT / 2})`);

		const label = g
			.append("g")
			.attr("class", "direction-labels")
			.selectAll("g")
			.data(data)
			.join("g")
			.attr("text-anchor", "middle")
			.attr(
				"transform",
				(d) =>
					`rotate(${
						((x(d.angle) + x.bandwidth() / 2) * 180) / Math.PI -
						(90 - ANGLE_OFFSET/2)
					}) translate(${OUTER_RADIUS + 20},0)`
			);
		
		const inLowerHalf = (d) => (x(d.angle) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI

		label
			.append("text")
			.attr("transform", (d) =>
				inLowerHalf(d)
					? "rotate(90)translate(0,6)"
					: "rotate(-90)translate(0,6)"
			) // flip bottom labels
			.text((d) => d.angle)
			.attr("font-weight", 500)
			.attr("font-size", 14);

		g.call(yAxis);

		const legend = g.call(addLegend);
	});
</script>

<svg class="windrose">
	<g class="graph">
		<g class="axes">
			{#each AXES_ANGLES as d}
			  <WrAxis angle={d}/>
			{/each}
		</g>
		<g class="rings">
			{#each stackedData as d}
			  <WrRings data={d}/>
			{/each}
		</g>
	</g>
</svg>

<style>
	
</style>
