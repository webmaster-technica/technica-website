<template>
  <h1>This is a partner page</h1>
  <div v-for="event in events" :key="event.name">
    <router-link :to="{ name: 'PartnerDetail', params: { id: event.name } }">
      <h3>{{ event.name }}</h3>
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        events: [
          { name: "Star Power People", details: 'lorem'},
          { name: "Vinci Energies", details: 'lorem'},
          { name: "Chipsoft", details: 'lorem'},
          { name: "PSA Antwerpen", details: 'lorem'}
        ]
      }
    }
  }
</script>

<style>
  
</style>