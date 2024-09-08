<template>
  <div id="loading">
    <h3 v-if="path">Loading {{ path }} ...</h3>
    <div class="loading-container">
      <div class="progress progress-infinite">
        <div class="progress-bar">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default { props: ['path'] }
</script>

<style scoped>
  /* https://codepen.io/evawythien/pen/xxXyePG */

  .loading-container {
    margin: 0 auto;
    width: 520px;
    text-align: center;
  }

  .progress {
    padding: 6px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
      0 1px rgba(255, 255, 255, 0.08);
  }

  .progress-bar {
    height: 18px;
    border-radius: 4px;
    background-image: linear-gradient(
      45deg,            #115F9A 12.5%,
      #ffffff 12.5%,  #ffffff 25%,
      #35597E 25%,    #35597E 37.5%,
      #353535 37.5%,  #353535 50%,
      #115F9A 50%,    #115F9A 62.5%,
      #ffffff 62.5%,  #ffffff 75%,
      #35597E 75%,    #35597E 87.5%,
      #353535 87.5%,  #353535
    );
    transition: 0.4s linear;
    transition-property: width, background-color;
  }

  .progress-infinite .progress-bar {
    width: 100%;
    background-image: linear-gradient(
      45deg,            #115F9A 12.5%,
      #ffffff 12.5%,  #ffffff 25%,
      #35597E 25%,    #35597E 37.5%,
      #353535 37.5%,  #353535 50%,
      #115F9A 50%,    #115F9A 62.5%,
      #ffffff 62.5%,  #ffffff 75%,
      #35597E 75%,    #35597E 87.5%,
      #353535 87.5%,  #353535
    );
    animation: colorAnimation 0.37s infinite;
  }

  @keyframes colorAnimation {
    0% {
      background-image: linear-gradient(
        45deg,            #115F9A 12.5%,
        #ffffff 12.5%,  #ffffff 25%,
        #35597E 25%,    #35597E 37.5%,
        #353535 37.5%,  #353535 50%,
        #115F9A 50%,    #115F9A 62.5%,
        #ffffff 62.5%,  #ffffff 75%,
        #35597E 75%,    #35597E 87.5%,
        #353535 87.5%,  #353535
      );
    }
    12.5% {
      background-image: linear-gradient(
        45deg,            #115F9A 6.25%,
        #ffffff 6.25% , #ffffff 18.75%,
        #35597E 18.75%, #35597E 31.25%,
        #353535 31.25%, #353535 43.75%,
        #115F9A 43.75%, #115F9A 56.25%,
        #ffffff 56.25%, #ffffff 68.75%,
        #35597E 68.75%, #35597E 81.25%,
        #353535 81.25%, #353535 93.75%,
        #115F9A 93.75%, #115F9A
      );
    }
    25% {
      background-image: linear-gradient(
        45deg,          #ffffff 12.5%,
        #35597E 12.5%,#35597E 25%,
        #353535 25%,  #353535 37.5%,
        #115F9A 37.5%,#115F9A 50%,
        #ffffff 50%,  #ffffff 62.5%,
        #35597E 62.5%,#35597E 75%,
        #353535 75%,  #353535 87.5%,
        #115F9A 87.5%,#115F9A
      );
    }
    37.5% {
      background-image: linear-gradient(
        45deg,            #ffffff 6.25%,
        #35597E 6.25% , #35597E 18.75%,
        #353535 18.75%, #353535 31.25%,
        #115F9A 31.25%, #115F9A 43.75%,
        #ffffff 43.75%, #ffffff 56.25%,
        #35597E 56.25%, #35597E 68.75%,
        #353535 68.75%, #353535 81.25%,
        #115F9A 81.25%, #115F9A 93.75%,
        #ffffff 93.75%, #ffffff
      );
    }
    50% {
      background-image: linear-gradient(
        45deg,            #35597E 12.5%,
        #353535 12.5%,  #353535 25%,
        #115F9A 25%,    #115F9A 37.5%,
        #ffffff 37.5%,  #ffffff 50%,
        #35597E 50%,    #35597E 62.5%,
        #353535 62.5%,  #353535 75%,
        #115F9A 75%,    #115F9A 87.5%,
        #ffffff 87.5%,  #ffffff
      );
    }
    67.5% {
      background-image: linear-gradient(
        45deg,            #35597E 6.25%,
        #353535 6.25% , #353535 18.75%,
        #115F9A 18.75%, #115F9A 31.25%,
        #ffffff 31.25%, #ffffff 43.75%,
        #35597E 43.75%, #35597E 56.25%,
        #353535 56.25%, #353535 68.75%,
        #115F9A 68.75%, #115F9A 81.25%,
        #ffffff 81.25%, #ffffff 93.75%,
        #35597E 93.75%, #35597E
      );
    }
    75% {
      background-image: linear-gradient(
        45deg,            #353535 12.5%,
        #115F9A 12.5%,  #115F9A 25%,
        #ffffff 25%,    #ffffff 37.5%,
        #35597E 37.5%,  #35597E 50%,
        #353535 50%,    #353535 62.5%,
        #115F9A 62.5%,  #115F9A 75%,
        #ffffff 75%,    #ffffff 87.5%,
        #35597E 87.5%,  #35597E
      );
    }
    87.5% {
      background-image: linear-gradient(
        45deg,            #353535 6.25%,
        #115F9A 6.25%,  #115F9A 18.75%,
        #ffffff 18.75%, #ffffff 31.25%,
        #35597E 31.25%, #35597E 43.75%,
        #353535 43.75%, #353535 56.25%,
        #115F9A 56.25%, #115F9A 68.75%,
        #ffffff 68.75%, #ffffff 81.25%,
        #35597E 81.25%, #35597E 93.75%,
        #353535 93.75%, #353535
      );
    }
  }
</style>