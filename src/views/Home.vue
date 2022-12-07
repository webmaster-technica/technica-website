<template>
  <div class="top-header-homepage">
    <div class="left-align">
      <h1>TECHNICA,<br />De faculteitsvereniging in Antwerpen</h1>
      <p>Elektromechanica, Integrale veiligheid, Energiemanagement en Elektronica-ICT</p>
      <p>Elektromechanische systemen, HVAC-Systemen-Klimatiesatiesystemen, Werforganisatie en Internet of Things</p>
      <br><br><br><br>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'component'
  }
</script>

<!--polygon clip art: https://bennettfeely.com/clippy/-->
<style scoped>
  .left-align {
    padding: 3% 7%;
    width: 69%;
    text-align: left;
  }

  .top-header-homepage {
    width: 100%;
    background-image: url('~@/assets/background/olv_kathedraal.jpg');
    background-size: cover;
    background-position: center;
    clip-path: polygon(0 0, 0 83%, 50% 100%, 100% 83%, 100% 0);
  }

  .top-header-homepage h1 {
    font-size: 48px;
    text-transform: none;
    color: #fff;
    user-select: none;
    font-family: 'Cabin Condensed', sans-serif;
    padding: 0.67em 0;
    font-weight: bold;
  }

  .top-header-homepage p {
    color: #fff;
    margin: 1em 0;
    line-height: 1.2;
    font-size: 21px;
  }
</style>