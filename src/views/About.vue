<template>
  <!-- Clublied  -->
  <div class="row">
    <div id="clublied">
      <img src="@/assets/images/background/paraaf.png" class="paraaf left-of-text" alt="">
      <img src="@/assets/images/background/paraaf.png" class="paraaf right-of-text" alt="">
      <div>
        <h2>Clublied</h2>
        <p>
          <span>De beste studenten van Boom die zijn hier,</span><br>
          <span>met hun magen reusachtig en droog.</span>
        </p>
        <p>
          <span>De leraars die sidderen en vluchten van angst,</span><br>
          <span>als wij stormen zo wild naar den toog.</span>
        </p>
        <p>
          <span>En komt hier gij vriend, drink met ons een pint,</span><br>
          <span>want pas dan zijn wij allen tevreden.</span>
        </p>
        <p>
          <span>Ja, wij zijn de heersers van Boom,</span><br>
          <span>De mannen van Technica.</span>
        </p>
        <p>
          <span>En Technica (en Technica),</span><br>
          <span>En Technica (en Technica),</span><br>
          <span>En Technica (en Technica),</span><br>
          <span>En Technica, HOI, HOI</span>
        </p>
        <p>
          <span>Ja, wij zijn de heersers van Boom,</span><br>
          <span>De mannen van Technica.</span>
        </p>
      </div>
    </div>
  </div>

  <!-- Stamcafé  -->
  <div class="row">
          
    
    <div id="cafe">
      <image-text-block imageAlign="right">
        <template v-slot:image>
          <GMapMap style="pointer-events: none" :center="cafeMarker" :zoom="17" map-type-id="hybrid" :options='options'>
            <GMapMarker :key="1" :position="cafeMarker"/>
          </GMapMap>
        </template>
        <template v-slot:text>
          <h2 class="block-title">t'Vervolg</h2>
          <p class="block-text">
            Op zoek naar een wekelijkse ontsnapping uit de drukte van het academische leven? Heb je goesting in een goed pintje bier? Misschien ben je nieuw in Antwerpen en zoek je naar een plek waar je je dinsdagavond kunt doorbrengen.
            <br><br>
            Zoek niet verder! Bij café 't Vervolg maken we er elke dinsdag doorheen het academiejaar een onvergetelijke ervaring van. Of je nu op zoek bent naar een plek om te ontspannen na een lange dag studeren, of simpelweg een gezellige omgeving wilt om nieuwe mensen te ontmoeten, bij ons ben je aan het juiste adres.
          </p>
        </template>
      </image-text-block>
    </div>
  </div>

  <!-- Campus  -->
  <div class="row">
    <div id="campus">
      <image-text-block imageAlign="left">
        <template v-slot:image>
          <GMapMap style="pointer-events: none" :center="schoolMarker" :zoom="17" map-type-id="hybrid" :options='options'>
            <GMapMarker :key="1" :position="schoolMarker"/>
          </GMapMap>
        </template>
        <template v-slot:text>
          <h2 class="block-title">Campus Ellerman</h2>
          <p class="block-text">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </p>
        </template>
      </image-text-block>
    </div>
  </div>
</template>

<script>
  import ImageTextBlock from '@/components/image/ImageTextBlock.vue';

  export default { components: { ImageTextBlock },
  data() {
      return {
        cafeMarker: {lat: 51.2208291, lng: 4.4028461},
        schoolMarker: {lat: 51.2298798, lng: 4.4177409},
        options: { 
          disableDefaultUI: true, keyboardShortcuts: false, clickableLabels: false, clickableIcons: false,
          zoomControl: false, mapTypeControl: false, scaleControl: false, streetViewControl: false, rotateControl: false, fullscreenControl: false
        }
      }
    }
  }

</script>

<style scoped>
  .row > div {
    padding: 64px 96px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  #clublied .paraaf {
    width: auto;
    position: absolute;
    opacity: 0.7;
    z-index: -1;
    height: 700px;
    margin-top: 64px;
  }
  .paraaf.left-of-text { right: auto; left: 10%; }
  .paraaf.right-of-text { right: 10%; left: auto; }
  #clublied h2 { color: #35597E; margin-bottom: 32px; }
  #clublied p {
    color: #353535;
    font-style: italic;
    text-align: center;
    font-size: 24px;
    font-weight:lighter;
    font-family: 'Hind', sans-serif;
    line-height: 1.6;
    margin: 24px 0;
  }

  /* Overwrite modal */
  .vue-map-hidden { display: none;}

  #cafe h2, #cafe p, #campus h2, #campus p { padding: 0 32px 0 32px; }
  #cafe { background-image: linear-gradient(rgba(0, 0, 0, 0.69), rgba(0, 0, 0, 0.69)), url('../assets/images/background/t_vervolg.jpg'); }
  #cafe h2 { color: #ffffff; }
  #cafe p { color: #ffffff; }

  #campus { background-image: linear-gradient(rgba(255, 255, 255, 0.37), rgba(255, 255, 255, 0.37)), url('../assets/images/background/campus_ellerman.jpg'); }

  @media screen and (max-width: 800px) {
    .paraaf.left-of-text { visibility: collapse; }
    #clublied { padding: 64px 24px; }
  }
  
</style>