<template>
  <div><button @click="confirm">{{ title }}</button></div>
</template>

<script>
  export default {
    props: ['title'],
    methods: {
      confirm() { this.$emit('confirm') }
    }
  }
</script>

<style scoped>
  button {
    /* Position */
    position: absolute;
    right: 0;
    transform: translate(-32px, -40px);
    z-index: 8;

    /* Shape */
    background-color: #3272b0;
    color: #ffffff;
    font-size: larger;
    border-radius: 4px;
  }
</style>