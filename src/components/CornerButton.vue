<template>
  <div>
    <button @click="confirm">
      {{ title }}
      <font-awesome-icon :icon="{ prefix: 'fas', iconName: icon }"/>
    </button>
  </div>
</template>

<script>
  export default {
    props: ['title', 'icon'],
    emits: ["confirm"],
    methods: {
      confirm() { this.$emit('confirm') }
    }
  }
</script>

<style scoped>
  button {
    /* Position */
    position: fixed;
    right: 32px;
    bottom: 32px;
    z-index: 10;

    /* Shape */
    background-color: #3272b0;
    color: #ffffff;
    font-size: larger;
    border-radius: 16px;
    padding: 8px;
  }
</style>