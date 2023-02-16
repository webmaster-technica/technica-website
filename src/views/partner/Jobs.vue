<template>
  <h1>This is an job page</h1>
  <div v-for="event in events" :key="event.name">
    <router-link :to="{ name: 'EventDetail', params: { id: event.name } }">
      <h3>{{ event.name }} - {{ event.partner }}</h3>
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        events: [
          { name: "Open Source Traineeship", partner: "Axxes", details: 'lorem'},
          { name: "QA Programming", partner: "Axxes", details: 'lorem'},
          { name: "Software Development Traineeship", partner: "Axxes", details: 'lorem'},
          { name: "Automation Technician", partner: "DP World", details: 'lorem'}
        ]
      }
    }
  }
</script>

<style>
  
</style>