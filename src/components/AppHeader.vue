<template>
  <header :style="{ backgroundImage: 'url(' + headerBackgroundImage() + ')' }">

    <!-- Navigation -->
    <nav>

      <!-- Logo -->
      <div id="logo">
        <router-link :to="{ name: routes.home.name }">
          <img :src="modeLogo()">
        </router-link>
      </div>

      <div id="routes">
        <!-- Hamburger -->
        <div id="hamburger">
          <hamburger-button @toggleHamburger="toggleHamburger($event)"></hamburger-button>
        </div>
        <!-- Routes -->
        <div id="tabs"> <!-- v-if="!showHamburger || hamburgerClicked" -->
          <div class="dropdown tab">
            <h6 class="dropdown-button">
              <router-link :to="{ name: routes.about.name }"><b>{{ routes.about.title }}</b></router-link>
              <font-awesome-icon class="dropdown-icon" :icon="{ prefix: 'fas', iconName: 'angle-down' }"/>
            </h6>
            <h6 class="dropdown-content">
              <router-link :to="{ name: routes.praesidium.name }"><b>{{ routes.praesidium.title }}</b></router-link>
              <router-link :to="{ name: routes.history.name }"><b>{{ routes.history.title }}</b></router-link>
            </h6>
          </div>
          <h6 class="tab"><router-link :to="{ name: routes.events.name }"><b>{{ routes.events.title }}</b></router-link></h6>
          <h6 class="tab"><router-link :to="{ name: routes.join.name }"><b>{{ routes.join.title }}</b></router-link></h6>
          <div class="dropdown tab">
            <h6 class="dropdown-button">
              <router-link :to="{ name: routes.partners.name }"><b>{{ routes.partners.title }}</b></router-link>
              <font-awesome-icon class="dropdown-icon" :icon="{ prefix: 'fas', iconName: 'angle-down' }"/>
            </h6>
            <h6 class="dropdown-content">
              <router-link :to="{ name: routes.jobs.name }"><b>{{ routes.jobs.title }}</b></router-link>
            </h6>
          </div>
          <!-- <h6 class="tab"><router-link :to="{ name: routes.shop.name }"><b>{{ routes.shop.title }}</b></router-link></h6> -->
        </div>
      </div>
    </nav>

    <div id="header-text"> <!-- Header text -->
      <div v-if="currentRouteName() == 'Home'" class="left-align">
        <h2>TECHNICA,<br/>De faculteitsvereniging in Antwerpen</h2>
        <h5>
          <span>Elektromechanica,</span>&nbsp;
          <span>Integrale veiligheid,</span>&nbsp;
          <span>Energiemanagement</span>&nbsp;
          <span>en</span>&nbsp;
          <span>Elektronica-ICT</span>
        </h5>
        <h5>
          <span>Elektromechanische systemen,</span>&nbsp;
          <span>HVAC-Systemen-Klimatiesatiesystemen,</span>&nbsp;
          <span>Werforganisatie</span>&nbsp;
          <span>en</span>&nbsp;
          <span>Internet of Things</span>
        </h5>
        <br><br><br><br>
      </div>
      <div v-else-if="currentRouteName() == 'NotFound'" class="left-align">
        <h2>Error 404 - Page not found</h2>
        <h5>Het ziet ernaar uit dat je verdwaaldt bent. Er staan nu 2 keuzes voor je:</h5>
        <ul>
          <li><h6>Klik op de blauwe knop en je zal teruggebracht worden naar de veiligheid van de hoofdpagina.</h6></li>
          <li><h6>Klik op de rode knop en verken wat het internet te offeren heeft, niet wetende waar je zult belanden.</h6></li>
        </ul>
        <br><br><br><br>
      </div>
    </div>
  </header>
</template>
<!--https://www.youtube.com/watch?v=jWf4xpdCXsM-->
<script>
  import HamburgerButton from '@/components/button/HamburgerButton.vue';

  export default {
    components: { HamburgerButton },
    data() {
      return {
        hamburgerClicked: false,
        showHamburger: false,
        routes: {
          home:       {name: 'Home',        title: 'Technica'    },
          about:      {name: 'About',       title: 'Over ons'    },
          praesidium: {name: 'Praesidium',  title: 'Praesidium'  },
          history:    {name: 'History',     title: 'Stamboom'    },
          events:     {name: 'Events',      title: 'Evenementen' },
          join:       {name: 'Join',        title: 'Lid worden'  },
          partners:   {name: 'Partners',    title: 'Partners'    },
          jobs:       {name: 'Jobs',        title: 'Vacature'    },
          // shop:       {name: 'Shop',        title: 'Shop'        }
        },
        routeImages: [
          {name: 'Home',        image: 'olv_kathedraal.jpg'},
          {name: 'About',       image: 'praesidium.jpg'    },
          {name: 'Praesidium',  image: 'praesidium.jpg'    },
          {name: 'History',     image: 'praesidium.jpg'    },
          {name: 'Events',      image: 'bierfiets.jpg'     },
          {name: 'Join',        image: 'doop.jpg'          },
          {name: 'Partners',    image: 'partner.jpg' },
          {name: 'Jobs',        image: 'partner.jpg' },
          // {name: 'Shop',        image: 'shop.png'          },
          {name: 'NotFound',    image: 'not_found.png'     }
        ]
        // https://stackoverflow.com/a/56569951
        // https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
      }
    },
    created() { this.onResize() },
    mounted() { this.$nextTick(() => { window.addEventListener('resize', this.onResize); }) },
    beforeDestroy() { window.removeEventListener('resize', this.onResize); },
    methods: {
      toggleHamburger(event) { 
        const hamburgerClicked = event
        const routes = document.getElementById('routes')
        if (hamburgerClicked) {
          if (!routes.classList.contains('show-bar')) routes.classList.add('show-bar')
        } else {
          if (routes.classList.contains('show-bar')) routes.classList.remove('show-bar')
        }
      },
      onResize() { this.showHamburger = window.innerWidth < 1280 },
      currentRouteName() { return this.$route.name; },
      headerBackgroundImage() {
        var imagePath = require('@/assets/images/background/olv_kathedraal.jpg')
        /* Try with json wildcard and putting routes and routeImages in 1 variable */
        //console.log(this.currentRouteName())
        this.routeImages.forEach(routeImage => {
          // console.log(this.currentRouteName(), routeImage.name, this.currentRouteName() == routeImage.name)
          if (this.currentRouteName() == routeImage.name) imagePath = require('@/assets/images/background/' + routeImage.image)
        });
        return imagePath
      },
      modeLogo() {
        var imagePath = require('@/assets/images/logo/schild_wit.png')
        return imagePath
      },
    }
  }
</script>

<style scoped>
  header {
    width: 100%;
    height: 700px;
    margin: 0 0 auto 0;
    background-size: cover;
    background-position: center;
    clip-path: polygon(0 0, 0 83%, 50% 100%, 100% 83%, 100% 0);
  }

  nav {
    padding: 16px 7% 48px 7%;
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(rgba(37,37,37,0.69), rgba(37,37,37,0.37), rgba(37,37,37,0));
    z-index: 7;
  }

  #logo img { width: 64px; transition: width 0.5s ease-in-out; }
  #logo img:hover { width: 80px; }

  #hamburger { display: none; }

  #tabs { position: relative; top: 20%; }

  #tabs .tab { 
    display: inline-block; 
    padding: 12px;
  }
  #tabs a {
    color: #ffffff;
    text-decoration: none;
  }

  #tabs a:hover { color: #D3D3D3; }
  #tabs a.router-link-exact-active { color: #D3D3D3; }

  /* Dropdown Button */
  #tabs .dropdown-button:hover a, .dropdown-button:hover .dropdown-icon { color: #D3D3D3; }
  #tabs .dropdown-icon { color: #ffffff; padding-left: 4px; }

  /* Dropdown Content (Hidden by Default) */
  #tabs .dropdown-content {
    text-align: left;
    display: none;
    position: absolute;
  }

  /* Links inside the dropdown */
  #tabs .dropdown-content * {
    display: block;
    margin-top: 12px;
  }

  /* Change color of dropdown links on hover */
  #tabs .dropdown-content *:hover { color: #D3D3D3; }

  /* Show the dropdown menu on hover */
  #tabs .dropdown:hover .dropdown-content { display: block; }

  #header-text { min-height: 500px; }

  #header-text span { display: inline-block; }

  .left-align {
    padding: 0 7%;
    width: 75%;
    text-align: left;
  }

  header h2, header h5, header h6, header li { color: #fff; }

  header h2 {
    font-family: 'Cabin Condensed', sans-serif;
    padding-bottom: 32px;
    font-weight: bold;
  }

  header h5 { text-transform: none; }

  header h5, header li { margin: 1em 0; }

  @media screen and (max-width: 960px) {
    .left-align { width: 83%; }
  }
  @media screen and (max-width: 800px) {
    /* Center logo */
    #logo { margin: auto; }
    #logo a img { width: 128px; transition: width 0.5s ease-in-out; }
    #logo a img:hover { width: 160px; }

    /* Make routes fixed */
    #routes {
      position: absolute;
      top: 0; right: 0;
      width: 0; height: 100%;
      transition: width 0.5s ease-in-out;
      background-image: url('../assets/images/background/tandwiel_verticaal.png');
      /* background-color: #1471B7; */
    }
    #routes *:not(#hamburger, #hamburger > *) {width: 0;}
    #routes.show-bar { width: 144px; }

    /* Make hamburger appear */
    #hamburger {
      padding: 16px;
      display: block;
      float: right;
    }

    /* Put tabs beneath each other */
    #tabs { top: 64px; }
    #tabs .tab {
      display: block; 
      padding: 18px;
      text-align: left;
      white-space: nowrap;
      display: none;
    }
    .show-bar #tabs .tab { display: block; }
    #tabs .dropdown-icon { display: none; }
    #tabs .dropdown-content {
      text-align: left;
      display: block;
      position: relative;
    }
    #tabs .dropdown-content * { margin-top: 36px; }

    /* Remove header text */
    #header-text { display: none; }
  }
</style>