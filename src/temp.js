{/* <script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	onMount(() => {
		//Write code about de chart here.
		
		data = Object.assign(d3.csvParse(selectedData, (d, i, columns) => {
		let t = 0;
		for (let i = 1; i < columns.length; ++i) {
			const columnName = columns[i]
			t += +d[columnName]
		}

		d.total = t;

		return d;
		}), { unit: "km/h"})
	});

	



</script>

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
NNW,0.0,0.0,2.0,5.0,1.0,0.0,0.0,0.0,0.0`; */}