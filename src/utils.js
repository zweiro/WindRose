import * as d3 from "d3";

export const ANGLE_OFFSET = -22.5;
export const HEIGHT = 1000;
export const WIDTH = 1000;
export const MARGIN = { top: 40, right: 80, bottom: 40, left: 40 };
export const CHART_WIDTH = 834;
export const CHART_HEIGHT = 520;
export const INNER_RADIUS = 30;
export const OUTER_RADIUS = 260;

const selectedData = `angle,0 to 2,2 to 4,4 to 6,6 to 8,8 to 10,10 to 12,12 to 14,14 to 16,16 to 18
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

export const data = Object.assign(
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

export const scaleAxis = d3
    .scaleLinear()
    .range([INNER_RADIUS, OUTER_RADIUS])  // display size (ex. pixels)
    .domain([0, d3.max(data, (d) => d.total)]); // Domain of data (min and max)

export const x = d3
		.scaleBand() // Split x size by range size
		.range([0, 2 * Math.PI]) // display size (ex. pixels)
		.domain(data.map((d) => d.angle)) // Domain of data (min and max)
		.align(0);

export const colorScale = d3.scaleOrdinal()
		.domain(data.columns.slice(1))
		.range(d3.schemeBlues[data.columns.length-1]); // nr of wind velocity 'bins'

export const AXES_ANGLES = d3.range(0, 360, 360 / data.length);

export const stackedData = d3.stack().keys(data.columns.slice(1))(data);