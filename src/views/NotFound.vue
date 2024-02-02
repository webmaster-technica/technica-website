<template>
  <!--Text is in AppHeader.vue-->
  <div id="lost-buttons">
    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1"><button id="red-button"></button></a>
    <router-link :to="{ name: 'Home' }"><button id="blue-button"></button></router-link>
  </div>
</template>

<style scoped>
  button {
    width: 37%;
    height: 37%;
    min-width: 128px;
    min-height: 48px;

    margin: 24px;

    border: none;
    border-radius: 8px;
  }

  #red-button { background-color: crimson; }
  #blue-button { background-color: navy; }
  #red-button:hover { background-color: rgb(160, 4, 40); }
  #blue-button:hover { background-color: rgb(0, 0, 80); }
</style>