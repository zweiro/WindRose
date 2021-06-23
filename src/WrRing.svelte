<script>
    import{
        ANGLE_OFFSET,
        INNER_RADIUS,
        x,
        y,
        data,

    } from './utils';

    import * as d3 from "d3";

    const stackedData = d3.stack().keys(data.columns.slice(1))(data);

    let makeArc = d3
		.arc()
		.innerRadius((d) => y(d[0]))
		.outerRadius((d) => y(d[1]))
		.startAngle((d) => x(d.data.angle))
		.endAngle((d) => x(d.data.angle) + x.bandwidth())
		.padAngle(0.02)
		.padRadius(INNER_RADIUS);

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

</script>

<g class="ring" >
    <g class="surface" transform="rotate({ANGLE_OFFSET/2})">
       <path 
       />     
    </g>
</g>


<style>

</style>