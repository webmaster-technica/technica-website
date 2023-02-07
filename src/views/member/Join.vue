<template>
  <div id="main">
    <div class="flex-full">  <!-- Intro -->
      Indien u lid wilt worden, kunt u onderstaand formulier invullen. <br>
      Zodra wij dit ontvangen hebben, zullen wij contact met u opnemen om alles te regelen; lidkaart, lidgeld, ...
    </div>

    <div class="flex-medium">  <!-- Input -->
      <div class="data padded-block">
        <h3 ref="name">Voornaam*</h3>
        <input v-model="member.name" type="text" required/>
      </div>
    </div>
    <div class="flex-medium">
      <div class="data padded-block">
        <h3 ref="surname">Achternaam*</h3>
        <input v-model="member.surname" type="text" required/>
      </div>
    </div>
    <div class="flex-full">
      <div class="data padded-block">
        <h3 ref="birthday">Geboortedatum*</h3>
        <input v-model="member.birthday" type="date" required/>
      </div>
    </div>
    <div class="flex-large">
      <div class="data padded-block">
        <h3 ref="study">Studierichting*</h3>
        <input v-model="member.study" type="text" placeholder="" required/>
      </div>
    </div>
    <div class="flex-small">
      <div class="data padded-block">
        <h3 ref="yearOfStudy">Jaar in studierichting*</h3>
        <input v-model="member.yearOfStudy" type="number" required/>
      </div>
    </div>
    <div class="flex-large">
      <div class="data padded-block">
        <h3 ref="email">Email*</h3>
        <input v-model="member.email" type="email" required/>
      </div>
    </div>
    <div class="flex-small">
      <div class="data padded-block">
        <h3 ref="gsm">GSM nr*</h3>
        <input v-model="member.gsm" type="tel" required/>
      </div>
    </div>
    <div class="flex-large">
      <div class="data padded-block">
        <h3 ref="street">Straat*</h3>
        <input v-model="member.street" type="text" required/>
      </div>
    </div>
    <div class="flex-small">
      <div class="data padded-block">
        <h3 ref="houseNr">Huis nr*</h3>
        <input v-model="member.houseNr" type="number" required/>
      </div>
    </div>
    <div class="flex-large">
      <div class="data padded-block">
        <h3 ref="city">Stad*</h3>
        <input v-model="member.city" type="text" required/>
      </div>
    </div>
    <div class="flex-small">
      <div class="data padded-block">
        <h3 ref="postcode">Postcode*</h3>
        <input v-model="member.postcode" type="number" required/>
      </div>
    </div>

    <div class="flex-smaller"> <!-- Image -->
      <div id="image" class="padded-block" ref="image">
        <label for="picture">Foto*</label>
        <input @change="onFileChange" id="picture" type="file" accept=".png, .jpg, .jpeg" required/>
      </div>
    </div>
    <div class="flex-larger">
      <div class="padded-block">
        <img :src="member.image" v-if="member.image" alt="">
      </div>
    </div>

    <div class="flex-smaller" ref="dopen"><label for="">Dopen*</label></div> <!-- Dopen -->
    <div class="flex-larger">
      <div id="dopen" class="padded-block">
        <label><input type="radio" value="Ja" v-model="member.dopen" required/>Ja</label>
        <label><input type="radio" value="Nee" v-model="member.dopen" required/>Nee</label>
      </div>
    </div>

    <div class="flex-smallest"> <!-- Privacy -->
      <input v-model="member.privacy" type="checkbox" required/>
    </div>
    <div class="flex-largest">
      <div class="data padded-block" ref="privacy">
        Ik ga akkoord met de algemene voorwaarden en het 
        <a href="http://www.technica-antwerpen.be/assets/privacy_policy.pdf">Privacybeleid</a> 
        van Technica*
      </div>
    </div>

    <div class="flex-full"> <!-- Confirm -->
      <button @click="sendMail" type="submit" class="call-to-action">Verstuur</button>
    </div>
    <corner-button title="Download Ledenlijst" @confirm="downloadData"></corner-button>
  </div>
</template>

<script>
  import { getExcel, getExcelLink, postExcel, delExcel } from '@/firebase';
  import CornerButton from '@/components/CornerButton.vue';

  export default {
    data() {
      return {
        member: { name: '', surname: '', birthday: null, study: '', yearOfStudy: 0, email: '', gsm: '', 
                  street: '', houseNr: 0, city: '', postcode: 0, image: null, dopen: 'Nee', privacy: false },
        filledForm: false
      }
    },
    methods: {
      onFileChange(event) {
        var files = event.target.files
        if (!files.length) return
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = () => (this.member.image = reader.result)
      },
      sendMail(event) {
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
      }
    },
    components: { CornerButton }
  }
</script>

<style scoped>
  #main {
    display: flex;
    flex-wrap: wrap;
    max-width: 512px;
  }

  .flex-full { flex: 0 0 512px; }
  .flex-largest { flex: 0 0 480px; }
  .flex-larger { flex: 0 0 384px; }
  .flex-large { flex: 0 0 320px; }
  .flex-medium { flex: 0 0 256px; }
  .flex-small { flex: 0 0 192px; }
  .flex-smaller { flex: 0 0 128px; }
  .flex-smallest { flex: 0 0 32px; }

  .padded-block { padding: 8px; }

  .data { text-align: left; }
  .data > h3 {
    margin-left: 2px;
    margin-bottom: 2px;
  }
  .data > input { width: 100%; }

  #image > label {
    display: block;
    border: 1px solid #555;
    background-color: #e7e7e7;
    width: 100%;
  }

  #dopen { display: flex; }

  #dopen > label { width: 50%; }

  .not-filled { color: crimson !important; }
</style>