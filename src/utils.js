import * as d3 from "d3";


export const ANGLE_OFFSET = -22.5;
export const HEIGHT = 1000;
export const WIDTH = 1000;
export const MARGIN = { top: 40, right: 80, bottom: 40, left: 40 };
export const CHART_WIDTH = 834;
export const CHART_HEIGHT = 520;
export const INNER_RADIUS = 30;
export const OUTER_RADIUS = 260;

const dayThree = `angle,0 to 2,2 to 4,4 to 6,6 to 8,8 to 10,10 to 12,12 to 14,14 to 16,16 to 18
N,10,0,0,0,0,0,0,0,0
NNE,5,0,0,0,0,0,0,0,0
NE,73,4,0,0,0,0,0,0,0
ENE,10,3,4,0,0,0,0,0,0
E,21,5,0,0,0,0,0,0,0
ESE,15,5,1,0,0,0,0,0,0
SE,17,7,1,0,0,0,0,0,0
SSE,14,4,1,0,0,0,0,0,0
S,36,1,1,0,0,0,0,0,0
SSW,1,0,0,0,0,0,0,0,0
SW,4,0,0,0,0,0,0,0,0
WSW,1,0,0,0,0,0,0,0,0
W,8,0,0,0,0,0,0,0,0
WNW,6,0,0,0,0,0,0,0,0
NW,5,0,0,0,0,0,0,0,0
NNW,4,0,0,0,0,0,0,0,0`;

const dayTwo = `angle,0 to 2,2 to 4,4 to 6,6 to 8,8 to 10,10 to 12,12 to 14,14 to 16,16 to 18
N,4,1,0,0,0,0,0,0,0
NNE,2,0,0,0,0,0,0,0,0
NE,33,1,0,0,0,0,0,0,0
ENE,6,1,0,0,0,0,0,0,0
E,4,1,1,0,0,0,0,0,0
ESE,5,2,0,0,0,0,0,0,0
SE,6,2,0,0,0,0,0,0,0
SSE,11,6,0,0,0,0,0,0,0
S,13,2,1,0,0,0,0,0,0
SSW,3,1,0,0,0,0,0,0,0
SW,14,0,0,0,0,0,0,0,0
WSW,2,2,2,0,0,0,0,0,0
W,9,5,9,1,0,0,0,0,0
WNW,6,19,31,9,0,0,0,0,0
NW,8,12,11,8,1,0,0,0,0
NNW,5,1,0,1,0,0,0,0,0`;

const dayOne = `angle,0 to 2,2 to 4,4 to 6,6 to 8,8 to 10,10 to 12,12 to 14,14 to 16,16 to 18
N,1,1,1,0,0,0,0,0,0
NNE,2,0,0,0,0,0,0,0,0
NE,11,0,0,0,0,0,0,0,0
ENE,6,2,0,0,0,0,0,0,0
E,13,0,0,0,0,0,0,0,0
ESE,0,0,0,0,0,0,0,0,0
SE,2,2,0,0,0,0,0,0,0
SSE,9,3,0,0,0,0,0,0,0
S,12,18,0,0,0,0,0,0,0
SSW,3,2,2,0,0,0,0,0,0
SW,1,5,1,0,0,0,0,0,0
WSW,2,4,1,0,0,0,0,0,0
W,7,7,1,3,1,0,0,0,0
WNW,2,7,19,8,4,0,0,0,0
NW,0,8,6,7,5,0,0,0,0
NNW,1,1,0,0,0,0,0,0,0`;


const fixedData = `angle,0 to 2,2 to 4,4 to 6,6 to 8,8 to 10,10 to 12,12 to 14,14 to 16,16 to 18
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

let selection = [dayOne, dayTwo, dayThree, fixedData];

let selectedData = selection[1];




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
		.range(d3.schemeOranges[data.columns.length-1]); // nr of wind velocity 'bins'

export const AXES_ANGLES = d3.range(0, 360, 360 / data.length);

export const stackedData = d3.stack().keys(data.columns.slice(1))(data);