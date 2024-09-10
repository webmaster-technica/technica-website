<template>
  <div :class="'image-text align-' + imageAlign">
    <div class="image-column"><slot name="image"></slot></div>
    <div class="text-column"><h6><slot name="text"></slot></h6></div>
  </div>
</template>

<script>
  export default {
    props: ['imageAlign']
  }
</script>

<style>
  .image-text { display: flex; }

  .align-left > :nth-child(1) { order: 1; }
  .align-left > :nth-child(2) { order: 2; }

  .align-right > :nth-child(1) { order: 2; }
  .align-right > :nth-child(2) { order: 1; }

  .image-column > :nth-child(1) { 
    width: 320px;
    border-radius: 8px;
  }

  .vue-map-container { height: 320px; }

  .image-text {
    text-align: left;
    color: #35597E;
  }

  @media screen and (max-width: 1008px) {
    .image-text .image-column { display: none; }
    .image-text .text-column { text-align: center; }
  }

</style>