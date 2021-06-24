<script>
  import WindRose from './WindRose.svelte';
  import RangeSlider from "svelte-range-slider-pips";

  const dates = ['04.05.2021','05.05.2021','06.05.2021', 'Demo Data'];

  let index = 3;
  let modifying = false;

  const updateWindValues = (value) => {
    setTimeout(function(){
      index = value;
      modifying = false;
    },1200);
  };

  const numToDate = num => {
	  return dates[num];
  };

</script>

<header>
	<img src="cloud.svg" alt="weather icon">
  	<h2 class="main-title">My Weather Station</h2>
</header>
<main>
	<div>
		<h2 id="wind-title">Wind</h2>
		<div class="wr-chart">
		<WindRose dateIndex={index} modif={modifying}/>
		</div>
	</div>
	<div class="settings">
		<h2 id="settings-title">Settings</h2>
		<p>Select the date:</p>
    <div id="slider">
      <RangeSlider vertical="true" pips="true" first='label' last='label'on:start={(e) => { modifying = true }} on:stop={(e) => { updateWindValues(e.detail.value); }} min="0" max="3" step="1" float="true" formatter={v => numToDate(v)}/>
    </div>
	</div>
</main>

<style>
  #settings-title {
    margin-left: -20px;
  }
  #slider {
    --range-handle-focus: #006ca6;
    --range-range: #006BA6;
  }
	.settings{
		margin-left: 40px;
	}
	#wind-title {
		text-align: left;
		margin-left: 40px;
	}
  .main-title {
    margin:0;
    padding-top: 30px;
    padding-left: 20px;
    color: white;
  }
  img {
	margin-top: 10px;
	margin-left: 30px;
	height: 60px;
  }
  header {
	display: flex;
    height: 80px;
    top:0px;
    background-color: #006BA6;
  }
  main {
	display: flex;
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  .wr-chart {
    width:600px;
	margin-left: -40px;
	margin-top: -60px;
  }
</style>