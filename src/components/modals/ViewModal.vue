<!-- https://www.youtube.com/watch?v=KM1U6DqZf8M -->
<template>
  <div class="backdrop" @click.self="closeViewModal">
    <div class="modal">
      <div class="scrollable">
        <div id="container">
          <div id="image"><slot name="image"></slot></div>
          <div id="data"><slot name="data"></slot></div>
        </div>
        <div id="text"><slot name="text"></slot></div>
        <div id="buttons"><slot name="buttons"></slot></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['picture', 'onCloseViewModal', 'onConfirm'],
    emits: ["closeViewModal", "confirm"],
    methods: {
      closeViewModal() { this.$emit('closeViewModal') },
      confirm() { this.$emit('confirm') }
    }
  }
</script>

<!--scrollbar in modal: https://stackoverflow.com/a/34897879-->
<style scoped>
  .backdrop {
    top: 0;
    position: fixed;
    z-index: 10;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
  }

  .modal {
    width: 768px;
    padding: 32px;
    margin: 96px auto;
    background: white;
    border-radius: 16px;
  }

  .scrollable {
    max-height: calc(100vh - 210px);
    overflow-y: auto;
  }

  #container { display: flex; }

  #image {
    flex: 0 0 256;
    align-self: center;
  }

  #data {
    flex: 0 0 504px; /* 768 - 256 - 8 */
    align-self: center;
    margin-left: 8px;
    text-align: initial;
  }
  #data :slotted(* > *) { vertical-align: middle; }
  #data :slotted(.icon) {
    font-size: 1.6em;
    margin: 4px;
    color: #3272b0;
  }

  #buttons { display: flex; }
  #buttons :slotted(div button) { width: 100%; }

  #buttons :slotted(.column-2) { width: 50%; }
  #buttons :slotted(.column-3) { width: 33%; }
  #buttons :slotted(.column-4) { width: 25%; }
  #buttons :slotted(.column-5) { width: 20%; }

</style>