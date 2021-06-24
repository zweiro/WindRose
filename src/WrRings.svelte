<script>
    import * as d3 from "d3";
    import WrArc from "./WrArc.svelte";
    import {colorScale} from './utils'

    export let data;
    export let dateIndex;
    export let modif;
</script>



<g fill="{colorScale(dateIndex)(data.key)}">
    {#each data as d, key}
        <WrArc arcData={d} modif={modif} dateIndex={dateIndex} index={key}/>
    {/each}
</g>