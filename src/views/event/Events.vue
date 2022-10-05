<template>
  <h1>This is an event page</h1>
  <div v-for="event in events" :key="event.name">
    <router-link :to="{ name: 'EventDetails', params: { id: event.name } }">
      <h3>{{ event.name }} - {{ event.dag }}</h3>
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        events: [
          { name: "Cantus", dag: "Maandag", details: 'lorem'},
          { name: "TD", dag: "Dinsdag", details: 'lorem'},
          { name: "Club Avond", dag: "Woensdag", details: 'lorem'},
          { name: "Kroegendtocht", dag: "Donderdag", details: 'lorem'}
        ]
      }
    }
  }
</script>

<style>
  
</style>