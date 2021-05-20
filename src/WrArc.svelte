<script>
    import * as d3 from "d3";
    import { onMount } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    
    
    import {
        ANGLE_OFFSET,
        INNER_RADIUS,
        OUTER_RADIUS,
        data,
        x,
    } from './utils'
    
    export let arcData;

    let progress = tweened(0, {
        duration: 2000,
        easing: cubicOut
    });

    console.log(arcData[1]);

    $: makeArc = d3
    .arc()
    .innerRadius((d) => y(d[0]))
    .outerRadius((d) => y(d[1]))
    .startAngle((d) => x(d.data.angle))
    .endAngle((d) => x(d.data.angle) + x.bandwidth())
    .padAngle(0.02)
    .padRadius(INNER_RADIUS);
    
    
    $: y = d3
    .scaleLinear()
    .range([INNER_RADIUS, $progress])  // display size (ex. pixels)
    .domain([0, d3.max(data, (d) => d.total)]); // Domain of data (min and max)

    onMount(() => {
        $progress = OUTER_RADIUS;
    });

    </script>

    <path d="{makeArc(arcData)}" transform="rotate({ANGLE_OFFSET/2})"></path>