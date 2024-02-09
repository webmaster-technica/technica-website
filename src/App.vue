<template>
  <app-header/>
  <div id="root">
    <login-modal v-if="showLoginModal" @toggleLoginModal="toggleLoginModal"/>
    <router-view/>
  </div>
  <app-footer @toggleLoginModal="toggleLoginModal"/>
</template>

<script>
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
  import LoginModal from '@/components/modals/LoginModal.vue';
  
  export default {
    components: { AppHeader, AppFooter, LoginModal },
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
  
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  #main {
    /* Center main */
    max-width: 1280px;
    min-width: 256px;
    min-height: 100%;
    margin-top: 32px;
    margin-bottom: 32px;
    margin-left: auto;
    margin-right: auto;
  }

  #main > * {
    /* Center main's children */
    margin: auto;
  }

  h1, h3, h5 { text-transform: uppercase; }
  h1 { font-size: 48px; }
  h2 { font-size: 42px; }
  h3 { font-size: 36px; }
  h4 { font-size: 30px; }
  h5 { font-size: 24px; }
  h6 { font-size: 18px; }

  b { font-weight: 512; }

  button[disabled] {
    /* Disable button */
    opacity: 0.25;
    cursor: not-allowed;
  }

  input, button, select, textarea, label {
    padding: 8px 4px;
    box-sizing: border-box;
    color: #555;
  }

  input[type="checkbox"] {
    width: 16px;
    position: relative;
    top: 2px;
  }

  input[type="file"] {
    display: none;
  }

  button, select, input[type="checkbox"], input[type="radio"] { cursor: pointer; }

  a { text-decoration: none; }
  img { width: 100%; }
  ul { list-style: none; }

  @media screen and (max-width: 960px) {
    .topnav a {
      float: none;
      width: 100%;
    }
  }

  @media screen and (max-width: 640px) {
    .topnav a {
      float: none;
      width: 100%;
    }
  }

  @media screen and (max-width: 320px) {
    .topnav a {
      float: none;
      width: 100%;
    }
  }
</style>