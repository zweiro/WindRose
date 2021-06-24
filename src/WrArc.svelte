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
    export let modif;

    let progress = tweened(INNER_RADIUS, {
        delay: modif ? 0 : index*100,
        duration: modif ? 0: 1500,
        easing: elasticOut
    });

    let firstAppearance = true;

    const updateTweened = (modification) => {
        if(modification) {
            $progress = INNER_RADIUS;
        } else {
            if(!firstAppearance) {
                $progress = OUTER_RADIUS;
            }
        }
    };

    $: {
        updateTweened(modif);
    }

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
        firstAppearance = false;
    });

    </script>

    <path d="{makeArc(arcData)}" transform="rotate({ANGLE_OFFSET/2})"></path>