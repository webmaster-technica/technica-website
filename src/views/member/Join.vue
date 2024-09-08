<template>
  <div id="main">
    <!-- Intro -->
    <div class="full-block">
      Indien u lid wilt worden, kunt u onderstaand formulier invullen. <br>
      Zodra wij dit ontvangen hebben, zullen wij contact met u opnemen om alles te regelen; lidkaart, lidgeld, ...
    </div>

    <!-- Input -->
    <form ref="form" @submit.prevent="submitForm">
      <div class="row">
        <div class="medium-block">
          <div class="data padded-block">
            <h6 ref="name">Voornaam*</h6>
            <input v-model="member.name" name="name" type="text" required/>
          </div>
        </div>
        <div class="medium-block">
          <div class="data padded-block">
            <h6 ref="surname">Achternaam*</h6>
            <input v-model="member.surname" name="surname" type="text" required/>
          </div>
        </div>
      </div>

      <div class="row"></div>
      <div class="full-block">
        <div class="data padded-block">
          <h6 ref="birthday">Geboortedatum*</h6>
          <input v-model="member.birthday" name="birthday" type="date" required/>
        </div>
      </div>

      <div class="row">
        <div class="large-block">
          <div class="data padded-block">
            <h6 ref="study">Studierichting*</h6>
            <input v-model="member.study" name="study" type="text" required/>
          </div>
        </div>
        <div class="small-block">
          <div class="data padded-block">
            <h6 ref="yearOfStudy">Studiejaar*</h6>
            <input v-model="member.yearOfStudy" name="yearOfStudy" type="number" required/>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="large-block">
          <div class="data padded-block">
            <h6 ref="email">Email*</h6>
            <input v-model="member.email" name="email" type="email" required/>
          </div>
        </div>
        <div class="small-block">
          <div class="data padded-block">
            <h6 ref="gsm">GSM nr*</h6>
            <input v-model="member.gsm" name="gsm" type="tel" required/>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="large-block">
          <div class="data padded-block">
            <h6 ref="street">Straat*</h6>
            <input v-model="member.street" name="street" type="text" required/>
          </div>
        </div>
        <div class="small-block">
          <div class="data padded-block">
            <h6 ref="houseNr">Huis nr*</h6>
            <input v-model="member.houseNr" name="houseNr" type="number" required/>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="large-block">
          <div class="data padded-block">
            <h6 ref="city">Stad*</h6>
            <input v-model="member.city" name="city" type="text" required/>
          </div>
        </div>
        <div class="small-block">
          <div class="data padded-block">
            <h6 ref="postcode">Postcode*</h6>
            <input v-model="member.postcode" name="postcode" type="number" required/>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="smaller-block" ref="dopen"><label for="">Dopen*</label></div> <!-- Dopen -->
        <div class="larger-block">
          <div id="dopen" class="padded-block">
            <label><input type="radio" value="Ja" name="dopen(ja)" v-model="member.dopen" required/>Ja</label>
            <label><input type="radio" value="Nee" name="dopen(nee)" v-model="member.dopen" required/>Nee</label>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Privacy -->
        <div class="smallest-block">
          <input v-model="member.privacy" type="checkbox" required/>
        </div>
        <div class="largest-block">
          <div class="data padded-block" ref="privacy">
            Ik ga akkoord met de algemene voorwaarden en het 
            <b><a href="/assets/pdfs/privacy_policy.pdf" target="_blank">Privacybeleid</a></b> 
            van Technica*
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Confirm -->
        <div class="full-block">
          <button @click="submitForm" type="submit" class="call-to-action">Verstuur</button>
        </div>
      </div>
    </form>
    
    <!-- Download button -->
    <!-- <corner-button title="Download Ledenlijst" icon="download" @confirm="downloadData"></corner-button> -->
  </div>
</template>

<script>
  import { getExcel, getExcelLink, postExcel, delExcel } from '@/firebase';

  import CornerButton from '@/components/button/CornerButton.vue';

  export default {
    components: { CornerButton },
    data() {
      return {
        /* CSV Methods */
        member: { name: '', surname: '', birthday: null, study: '', yearOfStudy: 0, email: '', gsm: '', 
                  street: '', houseNr: 0, city: '', postcode: 0, /*image: null,*/ dopen: 'Nee', privacy: false },
        filledForm: false,

        form: {
          name: ""
        }
      }
    },
    methods: {
      onload() { handleClientLoad() },
      submitForm(event) {
        this.sendEmail()
        if (this.member) {
          this.filledForm = true
          for (let [key, value] of Object.entries(this.member)) {
            if (value) {
              this.$refs[key].classList.remove('not-filled')
            } else {
              this.$refs[key].classList.add('not-filled')
              this.filledForm = false
            }
          }
          if (this.filledForm) {
            // console.log(this.member);
            this.addData();
            this.sendEmail()
          }
        }
      },

      /* CSV Methods */
      async addData() {
        // Get File
        let fileName = this.getFileName();
        var csv = await getExcel(fileName)
        if (!csv) {
          await this.createCSV(fileName)
          csv = await getExcel(fileName)
        }

        // Add Data
        csv = `${csv}\n${this.member.name},${this.member.surname},${this.member.birthday},${this.member.dopen},`
            + `${this.member.study},${this.member.yearOfStudy},${this.member.email},${this.member.gsm},`
            + `${this.member.street},${this.member.houseNr},${this.member.city},${this.member.postcode}`

        // Change File
        await postExcel(fileName, csv)
      },
      async downloadData() {
        let fileName = this.getFileName();
        var url = await getExcelLink(fileName)
        if (!url) {
          await this.createCSV(fileName)
          url = await getExcelLink(fileName)
        }

        // https://stackoverflow.com/a/15832662
        var link = document.createElement("a");
        link.download = name;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      async createCSV(fileName) {
        let firstLine = "Voornaam,Achternaam,Geboortedatum,Dopen,Studierichting,Jaar,Email,GSM,Straat,Huis nr.,Stad,Postcode"
        await postExcel(fileName, firstLine)
      },
      getFileName() {
        const today = new Date();
        if (today.getMonth() < 8) return `ledenlijst${today.getFullYear() - 1}-${today.getFullYear()}.csv`;
        else                      return `ledenlijst${today.getFullYear()}-${today.getFullYear() + 1}.csv`;
      },

      /* Email */
      // sendEmail() {
        
      // }
    }
  }
</script>

<style scoped>
  #main { max-width: 512px; }

  form {
    display: flex;
    flex-wrap: wrap;
    margin: 0%;
  }

  .row > * { display: inline-block; }

  .smallest-block > * { transform: translateY(-12px); }
  .padded-block { padding: 8px; }

  .data { text-align: left; }
  .data > h6 {
    margin-left: 1px;
    margin-bottom: 2px;
  }
  .data > input { width: 100%; }

  #dopen label { display: inline-block; width: 50%; }

  .not-filled { color: crimson !important; }

  @media screen and (min-width: 512px) {
    .full-block     { width: 512px; }
    .largest-block  { width: 448px; }
    .larger-block   { width: 384px; }
    .large-block    { width: 320px; }
    .medium-block   { width: 256px; }
    .small-block    { width: 192px; }
    .smaller-block  { width: 128px; }
    .smallest-block { width: 64px; }
  }

  @media screen and (max-width: 512px) {
    .row { width: 100%; }
    .full-block     { width: 100%; }
    .largest-block  { width: 87.5%; }
    .larger-block   { width: 75%; }
    .large-block    { width: 62.5%; }
    .medium-block   { width: 50%; }
    .small-block    { width: 37.5%; }
    .smaller-block  { width: 25%; }
    .smallest-block { width: 12.5%; }
  }

  @media screen and (max-width: 256px) {
    .full-block     { width: 256px; }
    .largest-block  { width: 224px; }
    .larger-block   { width: 192px; }
    .large-block    { width: 160px; }
    .medium-block   { width: 128px; }
    .small-block    { width: 96px; }
    .smaller-block  { width: 64px; }
    .smallest-block { width: 32px; }
  }
  
</style>