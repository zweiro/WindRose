<script>
  import WindRose from './WindRose.svelte';
  import RangeSlider from "svelte-range-slider-pips";

  const dates = ['04.05.2021','05.05.2021','06.05.2021'];

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
		<WindRose dateIndex=3/>
		</div>
	</div>
	<div class="settings">
		<h2>Settings</h2>
		<p>Select the date:</p>
    <RangeSlider min="0" max="2" step="1" float="true" pushy="true" formatter={v => numToDate(v)}/>
	</div>
</main>

<style>
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