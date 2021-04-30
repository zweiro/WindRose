<script>
	import * as d3 from "d3";
	import { onMount } from "svelte";
	const ANGLE_OFFSET = -22.5;
	const HEIGHT = 1000;
	const WIDTH = 1000;
	const MARGIN = { top: 40, right: 80, bottom: 40, left: 40 };
	const CHART_WIDTH = 834;
	const CHART_HEIGHT = 520;
	const INNER_RADIUS = 30;
	const OUTER_RADIUS = 260;
	let selectedData = `angle,0 to 2 km/h,2 to 4 km/h,4 to 6 km/h,6 to 8 km/h,8 to 10 km/h,10 to 12 km/h,12 to 14 km/h,14 to 16 km/h,16 to 18 km/h
		N,0.0,0.0,3.0,9.0,2.0,0.0,0.0,0.0,0.0
		NNE,0.0,0.0,0.0,3.0,0.0,0.0,0.0,0.0,0.0
		NE,0.0,0.0,4.0,2.0,1.0,0.0,0.0,0.0,0.0
		ENE,0.0,1.0,2.0,0.0,0.0,0.0,0.0,0.0,0.0
		E,0.0,3.0,2.0,4.0,0.0,0.0,0.0,0.0,0.0
		ESE,1.0,0.0,1.0,1.0,2.0,3.0,0.0,0.0,0.0
		SE,0.0,1.0,2.0,1.0,0.0,1.0,1.0,0.0,0.0
		SSE,0.0,1.0,0.0,1.0,1.0,2.0,1.0,3.0,0.0
		S,0.0,0.0,7.0,5.0,1.0,1.0,2.0,2.0,1.0
		SSW,0.0,0.0,7.0,3.0,0.0,0.0,1.0,0.0,0.0
		SW,1.0,0.0,2.0,5.0,6.0,0.0,2.0,2.0,0.0
		WSW,1.0,3.0,4.0,4.0,2.0,0.0,1.0,0.0,3.0
		W,1.0,1.0,6.0,9.0,0.0,1.0,1.0,1.0,1.0
		WNW,0.0,0.0,0.0,4.0,1.0,0.0,0.0,0.0,0.0
		NW,0.0,0.0,1.0,5.0,3.0,0.0,0.0,0.0,0.0
		NNW,0.0,0.0,2.0,5.0,1.0,0.0,0.0,0.0,0.0`;
	let data = Object.assign(
		d3.csvParse(selectedData, (d, i, columns) => {
			let t = 0;
			for (let i = 1; i < columns.length; ++i) {
				const columnName = columns[i];
				t += +d[columnName];
			}
			d.total = t;
			return d;
		}),
		{ unit: "km/h" }
	);
	// yScale is for the height of the bars
	let y = d3
		.scaleLinear()
		.range([INNER_RADIUS, OUTER_RADIUS])
		.domain([0, d3.max(data, (d) => d.total)]);

	let x = d3
		.scaleBand()
		.range([0, 2 * Math.PI])
		.domain(data.map((d) => d.angle))
		.align(0);

	let makeArc = d3
		.arc()
		.innerRadius((d) => y(d[0]))
		.outerRadius((d) => y(d[1]))
		.startAngle((d) => x(d.data.angle))
		.endAngle((d) => x(d.data.angle) + x.bandwidth())
		.padAngle(0.02)
		.padRadius(INNER_RADIUS);

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

	let colorScale = d3.scaleOrdinal()
		.domain(data.columns.slice(1))
		.range(d3.schemeBlues[data.columns.length-1]); // nr of wind velocity 'bins' 

	let	yAxis = g => g.append("g")
      .attr("class", "yAxis")
      .selectAll("g")
      .data(y.ticks(5)) // .slice(1) to skip 0
      .join("g")
      .call(g => g.append("circle")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-dasharray", "4,4")
        .attr("r", y)
      )

	onMount(() => {
		const svg = d3
			.select("svg")
			.attr("viewBox", [0, 0, WIDTH, HEIGHT])
			.attr("font-family", "sans-serif");

		const g = svg
			.append("g")
			.attr("transform", `translate(${WIDTH / 2},${HEIGHT / 2})`);

		const stackedData = d3.stack().keys(data.columns.slice(1))(data);

		g.append("g")
			.attr("class", "axes")
			.selectAll(".axis")
			.data(d3.range(0, 360, 360 / data.length))
			.join("g")
			.attr("class", "axis")
			.attr("transform", (d) => `rotate(${d - 90})`)
			.append("line")
			.attr("x1", INNER_RADIUS)
			.attr("x2", y(y.ticks(5).reverse()[0])) // to the last tick circle
			.attr("fill", "none")
			.attr("stroke", "gray")
			.attr("stroke-dasharray", "1,4");

		g.append("g")
			.attr("class", "rings")
			.selectAll(".ring")
			.data(stackedData)
			.join((enter) =>
				enter
					.append("g")
					.attr("fill", (d) => colorScale(d.key))
					.selectAll("path")
					.data((d) => d)
					.join("path")
					.attr("d", makeArc)
					.attr("transform", `rotate(${ANGLE_OFFSET/2})`)
			);

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

<svg class="windrose" />

<style>
	
</style>
