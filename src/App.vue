<template>
  <app-header @openLoginModel="toggleLoginModal"/>
  <div id="root">
    <login-modal v-if="showLoginModal" @closeLoginModal="toggleLoginModal"/>
    <router-view/>
  </div>
  <app-footer/>
</template>

<script>
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
  import LoginModal from '@/components/modals/LoginModal.vue';
  
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
  }

  #main {
    /* Center main */
    max-width: 1280px;
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

  h3.loading {
    padding: auto;
  }

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

  a { text-decoration: none; }
  img { width: 100%; }

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