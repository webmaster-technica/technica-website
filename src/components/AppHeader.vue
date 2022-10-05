<template>
  <header>
    <nav>
      <div v-for="route in routes" :key="route.name">
        <router-link :to="{ name: route.name }">{{ route.title }}</router-link> &emsp;
      </div>
      <div>
        <a @click="openLoginModal">Login</a>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    data() {
      return { routes: [
        { name: 'Home', title: 'Home' },
        { name: 'About', title: 'Over ons' },
        { name: 'Contact', title: 'Contact' },
        { name: 'Praesidium', title: 'Praesidium' },
        { name: 'Join', title: 'Lid worden' },
        { name: 'Events', title: 'Evenementen' },
        { name: 'Partners', title: 'Partners' },
        { name: 'Jobs', title: 'Vacature' },
      ] }
    },
    methods: {
      openLoginModal() { this.$emit('openLoginModel') }
    }
  }
</script>

<style scoped>
  nav {
    padding: 16px;
    background-color: #3272b0;
  }

  nav div {
    display: inline-block;
  }

  nav a {
    font-weight: bold;
    color: #ffffff;
    text-decoration: none;

  }

  nav a.router-link-exact-active {
    color: #D3D3D3;
  }
</style>