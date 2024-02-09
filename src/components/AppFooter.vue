<template>
  <footer>
    <div class="footer-text">
      &copy; 2024 - {{ year }} Technica |
      <!--
        Open pdf
        https://medium.com/@d.steinberg79/adding-webpack-a-legacy-vue-js-application-ee48f0ca049
        https://stackoverflow.com/questions/70823149/webpack-cannot-load-pdf-file-module-parse-failed-you-may-need-an-appropriate-lo
        https://stackoverflow.com/questions/55500187/how-to-download-a-pdf-in-vue
      -->
      <h6 class="hover"><a href="#">APP</a></h6> |
      <h6 class="hover"><a href="/assets/pdfs/privacy_policy.pdf" target="_blank">Privacybeleid</a></h6> |
      <h6 class="hover"><a href="/assets/pdfs/statuten.pdf" target="_blank">Statuten</a></h6> |
      <h6 class="hover"><a @click="toggleLoginModal">Login</a></h6>
    </div>
    &emsp;
    <div class="footer-links">
      <div class="hover"><a href="https://www.facebook.com/StudentenverenigingTechnica/"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" size="2x"/></a></div>
      <div class="hover"><a href="https://www.linkedin.com/company/technica-antwerpen/"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'linkedin' }" size="2x"/></a></div>
      <div class="hover"><a href="https://www.instagram.com/technica_antwerpen/?hl=en"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }" size="2x"/></a></div>
      <div class="hover"><a href="https\:\/\/goo.gl/maps/3VBnaTRSVANoru719"><font-awesome-icon :icon="{ prefix: 'fas', iconName: 'location-dot' }" size="2x"/></a></div>
      <div class="hover"><a href="mailto:info@technica-antwerpen.be"><font-awesome-icon :icon="{ prefix: 'fas', iconName: 'envelope' }" size="2x"/></a></div>
      <div class="hover"><a href="https://drive.google.com/drive/folders/1hltcKz-RDNDvl2MAdCu7YHbSWM3ZtEol?usp=share_link"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google-drive' }" size="2x"/></a></div>
    </div>
    &emsp;
    <div class="footer-text">
      <h6>Website door <div class="hover"><a href="https://www.linkedin.com/in/thomas-kramp-0bb52220a/">Thomas Kramp</a></div></h6>
    </div>
  </footer>
</template>

<script>
  import { computed } from 'vue'

  export default {
    emits: ["toggleLoginModal"],
    setup() {
      const year = computed(() => new Date().getFullYear())
      return { year }
    },
    methods: {
      toggleLoginModal() { this.$emit('toggleLoginModal'); }
    }
  }
</script>

<style scoped>
  footer { 
    color: #929292;
    background-color: #292929;
    text-align: center;
    padding: 16px 0px 16px 0px;
    margin: auto 0 0 0;
  }

  .footer-text { transform: translateY(-7px); }

  footer a {
    color: #C6C6C6;
    margin: 4px;
    text-decoration: none;
    cursor: pointer;
  }

  footer div, footer div > * { display: inline-block; }

  div .hover :hover { color: #3272b0; }

  @media screen and (max-width: 1024px) {
    footer > div { display: block; }
    .footer-text { transform: translateY(0); }
  }
</style>