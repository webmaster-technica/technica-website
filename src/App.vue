<template>
  <app-header @openLoginModel="toggleLoginModal"/>
  <login-modal v-if="showLoginModal" @closeLoginModal="toggleLoginModal"/>
  <router-view/>
  <app-footer/>
</template>

<script>
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
  import LoginModal from '@/components/LoginModal.vue';
  
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

  div.main {
    max-width: 1280px;
    margin: auto;
  }

  div.main > * {
    margin: 10px auto;
  }

  button[disabled] {
    opacity: 0.25;
    cursor: not-allowed;
  }

  input, button, select, textarea {
    padding: 10px 6px;
    box-sizing: border-box;
    color: #555;
  }

  input[type="checkbox"] {
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
  }

  a { text-decoration: none; }
  image { width: 100%; }

  /* CSS RESET */
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, 
  cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, 
  fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  	margin: 0;
  	padding: 0;
  	border: 0;
  	font-size: 100%;
  	font: inherit;
  	vertical-align: baseline;
  }
</style>