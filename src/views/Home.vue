<template>
  <!-- Text -->
  <div id="praeses" v-if="praeses">
    <div>
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

  <!-- Events -->
  <!-- Achtergrond een foto -->
  <!-- Toon hetvolgende feetsje, soc event & cantus -->
  <!-- Voer abboneer knop toe -->

  <!-- Praesidium -->
  <!-- Leer het preasidium kennen -->

  <!-- Partner Real -->

</template>

<script>
  import { getData, postData, putData, delData, test } from '@/firebase';
  import { FirePraesidium } from '@/classes';
  import { QueryEnum } from '@/enums';

  export default {
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
  #praeses { 
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px;
  }
  #praeses div { 
    max-width: 1280px;
    display: flex;
  }
  #praeses img { width: 320px; height: 320px; }
  #praeses p {
    text-align: left;
    font-size: 20px;
    padding-left: 20px;
    color: #353535;
  }
</style>