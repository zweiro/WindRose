<script>
  import WindRose from './WindRose.svelte';
</script>

<header>
	<img src="cloud.svg" alt="weather icon">
  	<h2 class="main-title">My Weather Station</h2>
</header>
<main>
<h2>Wind</h2>
  <div class="wr-chart">
    <WindRose/>
  </div>
</main>

<style>
	h2 {
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
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  .wr-chart {
    max-width:50%;
	margin-top: -60px;
	margin-left: -60px;
  }
</style>