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
    props: ['picture'],
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
    z-index: 12;
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
    flex: 0 0 256; /* 8 + 256 + 8 */
    align-self: center;
  }

  #data {
    flex: 0 0 504px;
    align-self: center;
    margin-left: 8px;
    text-align: initial;
  }
  #data::v-deep * > * { vertical-align: middle; }
  #data::v-deep .icon {
    font-size: 1.6em;
    margin: 4px;
    color: #3272b0;
  }

  #text {
    
  }

  #buttons { display: flex; }
  #buttons::v-deep div button { width: 100%; }

  #buttons::v-deep .column-2 { width: 50%; }
  #buttons::v-deep .column-3 { width: 33%; }
  #buttons::v-deep .column-4 { width: 25%; }
  #buttons::v-deep .column-5 { width: 20%; }

</style>