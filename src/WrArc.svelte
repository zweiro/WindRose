<script>
    import * as d3 from "d3";
    import { onMount } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { elasticOut } from 'svelte/easing';
    
    
    import {
        ANGLE_OFFSET,
        INNER_RADIUS,
        OUTER_RADIUS,
        getData,
        x,
    } from './utils'
    
    export let arcData;
    export let index;
    export let dateIndex;

    let progress = tweened(INNER_RADIUS, {
        delay: index*100,
        duration: 1500,
        easing: elasticOut
    });

    $: makeArc = d3
    .arc()
    .innerRadius((d) => y(d[0]))
    .outerRadius((d) => y(d[1]))
    .startAngle((d) => x(dateIndex)(d.data.angle))
    .endAngle((d) => x(dateIndex)(d.data.angle) + x(dateIndex).bandwidth())
    .padAngle(0.02)
    .padRadius(INNER_RADIUS);
    
    
    $: y = d3
    .scaleLinear()
    .range([INNER_RADIUS, $progress])  // display size (ex. pixels)
    .domain([0, d3.max(getData(dateIndex), (d) => d.total)]); // Domain of data (min and max)

    onMount(() => {
        $progress = OUTER_RADIUS;
    });

    </script>

    <path d="{makeArc(arcData)}" transform="rotate({ANGLE_OFFSET/2})"></path>