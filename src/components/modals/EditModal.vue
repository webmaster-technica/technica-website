<!-- https://www.youtube.com/watch?v=KM1U6DqZf8M -->
<template>
  <div class="backdrop" @click.self="closeEditModal">
    <div class="modal">
      <div class="scrollable">
        <h3>{{ title }}</h3>
        <div id="inputs"><slot name="inputs"></slot></div>
        <div id="image"><slot name="image"></slot></div>
        <button @click="confirm">{{ title }}</button>
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
  .scrollable :slotted(div > *) { width: 100%; }
  .scrollable :slotted(div > .column-2) { width: 50%; }

  #inputs :slotted( > textarea) { height: 128px; }

  #image :slotted(> *) { border-radius: 4px; }
  #image :slotted(label) {
    display: block;
    border: 1px solid #555;
    background-color: #e7e7e7;
    width: 100%;
  }
  #image :slotted(label:hover) { background-color: #e0e0e0; }
</style>