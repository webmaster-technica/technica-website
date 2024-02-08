<!-- https://www.youtube.com/watch?v=KM1U6DqZf8M -->
<template>
  <div><img :src="usedImage" @mouseover="usedImage = imageAlt" @mouseleave="usedImage = image"/></div>
</template>

<script>
  export default {
    props: ['image', 'imageAlt'],
    data () { return { usedImage: this.image } }
  }
</script>

<style scoped>
  img {
    vertical-align: bottom;
    width: 100%;
  }
</style>