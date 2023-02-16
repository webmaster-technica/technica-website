<template>
  <footer>
    <div>
      &copy; {{ year }} Technica |
      <div class="hover"><a class="hover" href="http://www.technica-antwerpen.be/assets/privacy_policy.pdf">APP</a></div> |
      <div class="hover"><a class="hover" href="https://www.dropbox.com/s/jhpuezp8jiuddqm/Technica-App.apk?dl=1">Privacybeleid</a></div> |
      <div class="hover"><a class="hover" href="http://www.technica-antwerpen.be/assets/privacy_policy.pdf">Statuten</a></div>
    </div>
    &emsp;&emsp;
    <div>
      <div class="hover"><a href="https://www.facebook.com/StudentenverenigingTechnica/"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" size="2x"/></a></div>
      <div class="hover"><a href="https://www.linkedin.com/company/technica-antwerpen/"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'linkedin' }" size="2x"/></a></div>
      <div class="hover"><a href="https://www.instagram.com/technica_antwerpen/?hl=en"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }" size="2x"/></a></div>
      <div class="hover"><a href="https\:\/\/goo.gl/maps/3VBnaTRSVANoru719"><font-awesome-icon :icon="{ prefix: 'fas', iconName: 'location-dot' }" size="2x"/></a></div>
      <div class="hover"><a href="mailto:info@technica-antwerpen.be"><font-awesome-icon :icon="{ prefix: 'fas', iconName: 'envelope' }" size="2x"/></a></div>
      <div class="hover"><a href="https://drive.google.com/drive/folders/1hltcKz-RDNDvl2MAdCu7YHbSWM3ZtEol?usp=share_link"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google-drive' }" size="2x"/></a></div>
    </div>
    &emsp;&emsp;
    <div>
      Website door <div class="hover"><a class="hover" href="https://www.linkedin.com/in/thomas-kramp-0bb52220a/">Thomas Kramp</a></div>
    </div>
  </footer>
</template>

<script>
  import { computed } from 'vue'
  
  export default {
    setup() {
      const year = computed(() => new Date().getFullYear())
      return { year }
    }
  }
</script>

<style scoped>
  a {
    color: #C6C6C6;
    margin: 4px;
    text-decoration: none;
  }

  div {
    display:inline;
    vertical-align: middle;
  }

  div .hover :hover {
    color: #3272b0;
  }

  footer {
    color: #929292;
    background-color: #292929;
    padding: 16px 0px 16px 0px;
    margin: auto 0 0 0;
  }
</style>