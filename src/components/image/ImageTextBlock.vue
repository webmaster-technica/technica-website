<template>
  <div :class="'image-text align-' + imageAlign">
    <div class="image-column"><slot name="image"></slot></div>
    <div class="text-column"><slot name="text"></slot></div>
  </div>
</template>

<script>
  export default {
    props: ['imageAlign']
  }
</script>

<style>
  .image-text {
    display: flex;
    margin-top: 32px;
  }

  .align-left > :nth-child(1) { order: 1; }
  .align-left > :nth-child(2) { order: 2; }

  .align-right > :nth-child(1) { order: 2; }
  .align-right > :nth-child(2) { order: 1; }

  .image-text .image-column > * { 
    width: 320px;
    height: 320px;
  }

  .image-text .text-column {
    text-align: left;
    font-size: 20px;
    padding: 0 32px 0 32px;
    color: #35597E;
  }

  @media screen and (max-width: 1024px) {
    .image-text .image-column { display: none; }
    .image-text .text-column { text-align: center; }
  }

</style>