<!-- https://www.youtube.com/watch?v=KM1U6DqZf8M -->
<template>
  <div class="backdrop" @click.self="closeEditModal">
    <div class="modal">
      <div class="scrollable">
        <h3>{{ title }}</h3>
        <div id="inputs"><slot name="inputs"></slot></div>
        <div id="image"><slot name="image"></slot></div>
        <div id="buttons"><slot name="buttons"></slot></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title', 'onCloseEditModal', 'onConfirm'],
    emits: ["closeEditModal, confirm"],
    methods: {
      closeEditModal() { this.$emit('closeEditModal') },
      confirm() { this.$emit('confirm') }
    }
  }
</script>

<!--scrollbar in modal: https://stackoverflow.com/a/34897879-->
<style scoped>
  .backdrop {
    top: 0;
    position: fixed;
    z-index: 12;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
  }

  .modal {
    width: 512px;
    padding: 32px;
    margin: 96px auto;
    background: white;
    border-radius: 16px;
  }

  .modal :slotted(div) { display: inline-block; }
  .modal button { margin-top: 8px; }

  .scrollable {
    max-height: calc(100vh - 210px);
    overflow-y: auto;
  }
  .scrollable :slotted(div > .column-1) { width: 100%; }
  .scrollable :slotted(div > .column-2) { width: 50%; }

  /* Inputs */
  #inputs :slotted( > textarea) { height: 128px; }
  .button-column { display: flex; }
  .button-column :slotted( > button) { width: 36px; }
  .button-column :slotted( > *:not(button)) { width: 220px; }

  /* Image */
  #image :slotted(> *) { border-radius: 4px; }
  #image :slotted(label) {
    display: block;
    border: 1px solid #555;
    background-color: #e7e7e7;
    width: 100%;
  }
  #image :slotted(label:hover) { background-color: #e0e0e0; }

  /* Buttons */
  /* #buttons { display: flex; } */
  #buttons :slotted(div button) { width: 100%; }

  #buttons :slotted(.column-2) { width: 50%; }
  #buttons :slotted(.column-3) { width: 33%; }
  #buttons :slotted(.column-4) { width: 25%; }
  #buttons :slotted(.column-5) { width: 20%; }
</style>