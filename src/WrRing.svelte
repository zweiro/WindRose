<script>
    import{
        ANGLE_OFFSET,
        INNER_RADIUS,
        x,
        y,
        getData,

    } from './utils';

    import * as d3 from "d3";

	let index = 1;

    const stackedData = d3.stack().keys(getData(index).columns.slice(1))(getData(index));

    let makeArc = d3
		.arc()
		.innerRadius((d) => y(index)(d[0]))
		.outerRadius((d) => y(index)(d[1]))
		.startAngle((d) => x(index)(d.getData(index).angle))
		.endAngle((d) => x(index)(d.getData(index).angle) + x(index).bandwidth())
		.padAngle(0.02)
		.padRadius(INNER_RADIUS);

        g.append("g")
			.attr("class", "rings")
			.selectAll(".ring")
			.getData(index)(stackedData)
			.join((enter) =>
				enter
					.append("g")
					.attr("fill", (d) => colorScale(d.key))
					.selectAll("path")
					.getData(index)((d) => d)
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