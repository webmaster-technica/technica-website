<template>
  <!-- Text -->
  <div class="row">
    <div id="praeses" class="text-block" v-if="praeses">
      <h1 class="center"><b>Wie <span>zijn wij</span></b></h1>
      <image-text-block imageAlign="left">
        <template v-slot:image>
          <img :src="praeses.picture" alt="">
        </template>
        <template v-slot:text>
          <p>
            Ruim twee jaar geleden begon mijn academische reis als student Integrale Veiligheid aan de AP Hogeschool. Al snel maakte ik kennis met twee verenigingen op de binnenplaats van Campus Ellerman. Tussen deze verenigingen sprong Technica er voor mij met kop en schouders bovenuit. Het warme welkom en de hartelijke sfeer binnen Technica maakten al snel mijn keuze duidelijk.
            <br><br>
            Ik heb nooit spijt gehad van mijn beslissing om me aan te sluiten bij deze levendige vereniging. Elke clubavond, SOC-activiteit en TD-feest was een onvergetelijke ervaring die ik voor geen geld had willen missen.
            <br><br>
            Dit jaar ben ik dan ook bijzonder trots dat ik de kans heb gekregen om Technica te leiden in zijn 62ste jaar. Ik kijk uit naar het organiseren van nog meer fantastische clubavonden en het creëren van onvergetelijke herinneringen.
            <br><br>
            Twijfel je of Technica een vereniging is voor jou? Kom dan gerust een babbeltje slagen met iemand van het praesidium. Wij staan altijd open om iedereen met een goed hart te verwelkomen in onze vereniging en uit te leggen waar Technica daadwerkelijk voor staat.
            <br><br>
            Siebe Keppers - Praeses 23-24
          </p>
        </template>
      </image-text-block>
    </div>
  </div>

  <!-- Events -->
  <div class="row">
    <div id="activities">
      <h2 id="left-align"><b>Activiteiten</b></h2>
    </div>
  </div>
  <!-- Toon hetvolgende feetsje, soc event & cantus -->
  <!-- Voer abboneer knop toe -->

  <!-- Praesidium -->
  <!-- Leer het preasidium kennen -->

  <!-- Partner Swiper -->
  <div class="row"><partner-swiper/></div>
  

</template>

<script>
  import { getData } from '@/firebase';
  import { FirePraesidium } from '@/classes';
  import { QueryEnum } from '@/enums';
  
  import ImageTextBlock from '@/components/image/ImageTextBlock.vue';
  import PartnerSwiper from '@/components/utility/PartnerSwiper.vue';

  export default {
    components: { ImageTextBlock, PartnerSwiper },
    data() {
      return {
        praeses: null,
      };
    },
    created() { this.getPraesidium() },
    methods: {
      // Firebase database methods
      async getPraesidium() {
        const data = await getData('praesidium', [{field: 'role', operator: QueryEnum.EQUAL, value: 0}])
        data.forEach((doc) => { this.praeses = new FirePraesidium(doc.id, doc.data()); })
      }
    }
  }
</script>

<!--polygon clip art: https://bennettfeely.com/clippy/-->
<style scoped>
  .row { 
    width: 100%;
    padding-bottom: 16px;
    padding-top: 16px;
  }

  .text-block {
    display: inline-block;
    align-items: center;
    justify-content: center;
    max-width: 1280px;
  }

  #praeses {
    margin: 24px;
    
    background-image: url("../assets/images/yellow_lion.png");
    background-repeat: no-repeat;
    background-position: 80% 20%;
    background-size: contain;
    color: #252525;
  }
  #praeses span { color: #35597E; }

  #activities {
    height: 800px;
    color: #fad900;
    padding: 64px 96px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: linear-gradient(rgba(0, 0, 0, 0.69), rgba(0, 0, 0, 0.69)), url('../assets/images/background/ballenbad.jpg');
  }

  #left-align { text-align: left; }

</style>