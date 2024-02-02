<template>
  <header class="top-header" v-bind:style="{ backgroundImage: 'url(' + headerBackgroundImage() + ')', }">
    <nav> <!-- Navigation -->

      <div id="logo"> <!-- Logo -->
        <router-link :to="{ name: routes.home.name }">
          <img src="@/assets/images/logo/schild_wit.png">
        </router-link>
      </div>

      <div id="tabs"> <!-- Tabs -->
        <div class="vert-center">
          <div class="dropdown tab">
            <router-link class="dropdown-button" :to="{ name: routes.about.name }">{{ routes.about.title }}</router-link>
            <font-awesome-icon class="dropdown-icon" :icon="{ prefix: 'fas', iconName: 'angle-down' }"/>
            <div class="dropdown-content">
              <router-link :to="{ name: routes.praesidium.name }">{{ routes.praesidium.title }}</router-link>
              <router-link :to="{ name: routes.history.name }">{{ routes.history.title }}</router-link>
            </div>
          </div>

          <div class="tab"><router-link :to="{ name: routes.events.name }">{{ routes.events.title }}</router-link></div>
          <div class="tab"><router-link :to="{ name: routes.join.name }">{{ routes.join.title }}</router-link></div>

          <div class="dropdown tab">
            <router-link class="dropdown-button" :to="{ name: routes.partners.name }">{{ routes.partners.title }}</router-link>
            <font-awesome-icon class="dropdown-icon" :icon="{ prefix: 'fas', iconName: 'angle-down' }"/>
            <div class="dropdown-content">
              <router-link :to="{ name: routes.jobs.name }">{{ routes.jobs.title }}</router-link>
            </div>
          </div>

          <div class="tab"><router-link :to="{ name: routes.shop.name }">{{ routes.shop.title }}</router-link></div>
          <div class="tab"><a @click="toggleLoginModal">Login</a></div>
        </div>
      </div>
    </nav>

    <div id="text"> <!-- Text -->
      <div v-if="currentRouteName() == 'Home'" class="left-align">
        <h1>TECHNICA,<br/>De faculteitsvereniging in Antwerpen</h1>
        <p>Elektromechanica, Integrale veiligheid, Energiemanagement en Elektronica-ICT</p>
        <p>Elektromechanische systemen, HVAC-Systemen-Klimatiesatiesystemen, Werforganisatie en Internet of Things</p>
        <br><br><br><br>
      </div>
      <div v-else-if="currentRouteName() == 'NotFound'" class="left-align">
        <h1>Error 404 - Page not found</h1>
        <p>Het ziet ernaar uit dat je verdwaaldt bent. Er staan nu 2 keuzes voor je:</p>
        <p>&nbsp;&nbsp;&nbsp; Klik op de blauwe knop en je zal teruggebracht worden naar de veiligheid van de hoofdpagina.</p>
        <p>&nbsp;&nbsp;&nbsp; Klik op de rode knop en verken wat het internet te offeren heeft, niet wetende waar je zult belanden.</p>
        <br><br><br><br>
      </div>
    </div>
  </header>
</template>
<!--https://www.youtube.com/watch?v=jWf4xpdCXsM-->
<script>
  export default {
    data() {
      return { 
        routes: {
          home:       {name: 'Home',        title: 'Technica'},
          about:      {name: 'About',       title: 'Over ons'},
          praesidium: {name: 'Praesidium',  title: 'Praesidium'},
          history:    {name: 'History',     title: 'Geschiedenis'},
          events:     {name: 'Events',      title: 'Evenementen'},
          join:       {name: 'Join',        title: 'Lid worden'},
          partners:   {name: 'Partners',    title: 'Partners'},
          jobs:       {name: 'Jobs',        title: 'Vacature'},
          shop:       {name: 'Shop',        title: 'Shop'}
        },
        routeImages: [
          {name: 'Home',        image: 'olv_kathedraal.jpg',  textColor: "#ffffff"},
          {name: 'About',       image: 'praesidium.jpg',      textColor: "#ffffff"},
          {name: 'Praesidium',  image: 'praesidium.jpg',      textColor: "#ffffff"},
          {name: 'History',     image: 'praesidium.jpg',      textColor: "#ffffff"},
          {name: 'Events',      image: 'bierfiets.jpg',       textColor: "#ffffff"},
          {name: 'Join',        image: 'olv_kathedraal.jpg',  textColor: "#ffffff"},
          {name: 'Partners',    image: 'shaking_hands.jpg',   textColor: "#3272b0"},
          {name: 'Jobs',        image: 'shaking_hands.jpg',   textColor: "#3272b0"},
          {name: 'Shop',        image: 'olv_kathedraal.jpg',  textColor: "#ffffff"},
          {name: 'NotFound',    image: 'not_found.png',       textColor: "#ffffff"}
        ]
        // https://stackoverflow.com/a/56569951
        // https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
      }
    },
    emits: ["toggleLoginModal"],
    methods: {
      toggleLoginModal() { this.$emit('toggleLoginModal'); },
      currentRouteName() { return this.$route.name; },
      headerBackgroundImage() {
        var imagePath = require('@/assets/images/background/olv_kathedraal.jpg')
        /* Try with json wildcard and putting routes and routeImages in 1 variable */
        console.log(this.currentRouteName())
        this.routeImages.forEach(routeImage => {
          // console.log(this.currentRouteName(), routeImage.name, this.currentRouteName() == routeImage.name)
          if (this.currentRouteName() == routeImage.name) imagePath = require('@/assets/images/background/' + routeImage.image)
        });
        return imagePath
      }
    }
  }
</script>

<style scoped>
  header { margin: 0 0 auto 0; }

  header.top-header {
    width: 100%;
    background-size: cover;
    background-position: center;
    clip-path: polygon(0 0, 0 83%, 50% 100%, 100% 83%, 100% 0);
  }

  nav {
    padding: 16px 7%;
    display: flex;
    justify-content: space-between;
  }

  nav div#logo a img { max-width: 64px; }

  .vert-center { 
    top: 40%;
    position: relative;
    display: inline-block;
  }

  nav div { display: inline-block; }

  nav a {
    font-weight: bold;
    color: #ffffff;
    text-decoration: none;
  }

  nav a.router-link-exact-active { color: #D3D3D3; }

  nav div.tab { padding: 0 12px 0 12px; }

  /* The container <div> - needed to position the dropdown content */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  /* Dropdown Button */
  .dropdown-button {
    font-weight: bold;
    font-size: 16px;
    border: none;
    padding-right: 4px;
  }

  .dropdown-icon { color: #ffffff; }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    text-align: left;
    display: none;
    position: absolute;
    min-width: 160px;
    z-index: 1;
  }

  /* Links inside the dropdown */
  .dropdown-content * {
    padding-top: 12px;
    text-decoration: none;
    display: block;
  }

  /* Change color of dropdown links on hover */
  .dropdown-content *:hover {color: #D3D3D3;}

  /* Change the background color of the dropdown button when the dropdown content is shown */
  .dropdown:hover .dropdown-button {}

  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {display: block;}

  #text { min-height: 500px; }

  .left-align {
    padding: 0 7%;
    width: 69%;
    text-align: left;
  }

  .top-header h1 {
    font-size: 48px;
    text-transform: none;
    color: #fff;
    user-select: none;
    font-family: 'Cabin Condensed', sans-serif;
    padding: 0.67em 0;
    font-weight: bold;
  }

  .top-header p {
    color: #fff;
    margin: 1em 0;
    line-height: 1.2;
    font-size: 21px;
  }
</style>