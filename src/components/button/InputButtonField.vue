<template>
  <div class="input-button-field">
    <slot name="altInput" v-if="altField"></slot>
    <input v-else v-model="value" :type="type" :placeholder="placeholder" required/>
    
    <button @click="buttonClick"><font-awesome-icon :icon="{ prefix: 'fas', iconName: icon }"/></button>
  </div>
</template>

<script>
  // History, Jobs, Login

  export default {
    props: ['altField', 'value', 'type', 'placeholder', 'icon'],
    emits: ["buttonClick"],
    methods: {
      buttonClick() { this.$emit('buttonClick', this.value) }
    }
  }
</script>

<style scoped>
  .input-button-field {
    display: flex;
    width: 100%;
  }
  .input-button-field > * { border-radius: 2px; }
  .input-button-field > button { width: 36px; }

  .input-button-field > *:not(button), .input-button-field > :slotted(*) {
    flex-grow: 1;
    flex-shrink: 1;
  }
</style>