<script>
    import * as d3 from "d3";
    import WrArc from "./WrArc.svelte";
    import {colorScale} from './utils'

    export let data;
</script>



<g fill="{colorScale(data.key)}">
    {#each data as d, key}
        <WrArc arcData={d} index={key}/>
    {/each}
</g>