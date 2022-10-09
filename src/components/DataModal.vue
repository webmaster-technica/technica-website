<!-- https://www.youtube.com/watch?v=KM1U6DqZf8M -->
<template>
  <div class="backdrop" @click.self="closeDataModal">
    <div class="modal">
      <h3>{{ title }}</h3>
      <div><slot name="inputs"></slot></div>
      <div><slot name="image"></slot></div>
      <button @click="confirm">{{ title }}</button>
    </div>
  </div>
</template>
  
<script>
  export default {
    props: ['title'],
    data() {
      return {
        showPassword: false
      }
    },
    methods: {
      closeDataModal() { this.$emit('closeDataModal') },
      confirm() { this.$emit('confirm') }
    }
  }
</script>

<style>
  .modal {
    width: 512px;
    padding: 32px;
    margin: 128px auto;
    background: white;
    border-radius: 16px;
  }

  .backdrop {
    top: 0;
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
  }

  .modal h3 { margin-top: 0%; }

  .modal div > * { width: 100%; }
  .modal div > .column-2 { width: 50%; }
  .modal div textarea { height: 128px; }

  .modal .image-div { display: inline-block; }
  .modal .image-div > * { border-radius: 3px; }
  .modal .image-div input { display: none; }
  .modal .image-div label {
    display: block;
    padding: 10px 6px;
    box-sizing: border-box;
    color: #555;
    border: 1px solid #555;
    background-color: #e7e7e7;
    width: 100%;
  }
  .modal .image-div label:hover { background-color: #e0e0e0; }
</style>