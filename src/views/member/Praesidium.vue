<template>
  <h1>This is a {{ currentRoute }} page</h1>
</template>

<script>
  export default {
    created(){
        this.currentRoute;
        //this.nombreRuta = this.$route.name;
    },
    computed:{
        currentRoute(){ return this.$route.name }
    }
  }
</script>

<style>
  
</style>