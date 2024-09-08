<template>
  <div v-if="partners.length != 0" id="swiper">
    <h1><b>Ontmoet Onze <span>Partners</span></b></h1>
    <swiper-container :slides-per-view="slidesPerView" :autoplay="true" :speed="500" :loop="true">
      <swiper-slide v-for="partnerItem in partners" :key="partnerItem.id" class="align-center">
        <div class="partner-wrap">
          <a :href="partnerItem.website" target="_blank"><img :src="partnerItem.logo"></a>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script>
  import { getData } from '@/firebase';
  import { FirePartner } from '@/classes';
  import { register } from 'swiper/element/bundle';
  import 'swiper/swiper-bundle.css'; register();
  
  export default {
    data() {
      return {
        partners: [],
        slidesPerView: 0
      }
    },
    async created() {
      this.configSlides()
      await this.getPartner()
    },
    mounted() { this.$nextTick(() => { window.addEventListener('resize', this.configSlides); }) },
    beforeDestroy() { window.removeEventListener('resize', this.configSlides); },
    methods: {
      // Firebase database methods
      async getPartner() {
        const data = await getData('partners', [])
        data.forEach((doc) => { this.partners.push(new FirePartner(doc.id, doc.data())); })
        this.partners.sort(function(a, b) { return a.index - b.index })
      },
      configSlides() {
        // Get window size
        const windowWidth = window.innerWidth

        // Get amount of slides that fit in the window
        this.slidesPerView  = Math.floor(windowWidth/320);
        if (this.slidesPerView % 2 == 0) { this.slidesPerView -= 1 }
        if (this.slidesPerView < 1) { this.slidesPerView = 1 }
      }
    }
  }
</script>

<style scoped>
  #swiper h2 {
    margin: 24px;
    color: #252525;
  }
  #swiper span { color: #35597E; }

  #swiper .align-center {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
  }

  #swiper .partner-wrap {
    max-width: 296px;
    max-height: 170px;
    padding: 12px;
    transition: all 0.25s ease-in-out;
  }
  #swiper .partner-wrap:hover {
    max-width: 300px;
    max-height: 172px;
    padding: 8px;
  }
</style>