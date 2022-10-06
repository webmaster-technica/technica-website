<template>
  <app-header @openLoginModel="toggleLoginModal"/>
  <login-modal v-if="showLoginModal" @closeLoginModal="toggleLoginModal"/>
  <router-view/>
  <app-footer/>
</template>

<style>
  body {
    margin: 0;
  }
  
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #header {
    position: fixed;
    top: 0;
  }

  #footer {
    position: fixed;
    bottom: 0;
  }

  div .main {
    max-width: 1280px;
    margin: auto;
  }

  div .main > * {
    display: block;
    margin: 10px auto;
  }

  button[disabled] {
    opacity: 0.25;
    cursor: not-allowed;
  }

  input, button, select {
    padding: 10px 6px;
    box-sizing: border-box;
    color: #555;
  }
</style>

<script>
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
  import LoginModal from '@/components/LoginModal.vue'
  
  export default {
    components: {
      AppHeader,
      AppFooter,
      LoginModal
    },
    data() {
      return {
        showLoginModal: false
      }
    },
    methods: {
      toggleLoginModal() { this.showLoginModal = ! this.showLoginModal }
    }
  }
</script>