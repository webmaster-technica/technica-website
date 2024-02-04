<template>
  <!-- Text -->
  <div class="tab">
    <div id="praeses" class="text-block" v-if="praeses">
      <h2 class="h1 center">Wie <span>zijn wij</span></h2>
      <div id="intro">
        <img :src="praeses.picture" alt="">
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
      </div>
    </div>
  </div>

  <!-- Events -->
  <div class="tab">
    <div id="activities">
      <h2 id="left-align">Activiteiten</h2>
    </div>
  </div>
  <!-- Achtergrond een foto -->
  <!-- Toon hetvolgende feetsje, soc event & cantus -->
  <!-- Voer abboneer knop toe -->

  <!-- Praesidium -->
  <!-- Leer het preasidium kennen -->

  <!-- Partner Swiper -->
  <div class="tab"><partner-swiper/></div>
  

</template>

<script>
  import { getData, postData, putData, delData, test } from '@/firebase';
  import { FirePraesidium } from '@/classes';
  import { QueryEnum } from '@/enums';
  import PartnerSwiper from '@/components/PartnerSwiper.vue';

  export default {
    components: { PartnerSwiper },
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
        //this.praeses = this.praesidia.filter((praesidium) => praesidium.role.value == 0)[0]
      }
    }
  }
</script>

<!--polygon clip art: https://bennettfeely.com/clippy/-->
<style scoped>
  .tab { 
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

  h2 {
    font-size: 50px;
    font-weight: 512;
    text-transform: uppercase;
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

  #praeses #intro {
    display: flex;
    margin-top: 32px;
  }
  #praeses img { width: 320px; height: 320px; }
  #praeses p {
    text-align: left;
    font-size: 20px;
    padding-left: 20px;
    color: #353535;
  }

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



  @media screen and (max-width: 1024px) {
    #praeses img { visibility: collapse; }
    #praeses p { text-align: center; }
  }
</style>