<template>
  <div class="main">
    <h1>Lid worden</h1>
    <p>
      Indien u lid wilt worden, kunt u onderstaand formulier invullen. <br>
      Zodra wij dit ontvangen hebben, zullen wij contact met u opnemen om alles te regelen; lidkaart, lidgeld, ...
    </p>
    <div>
      <span>Voornaam</span>
      <input v-model="member.name" type="text" ref="name" required/>
    </div>
    <div>
      <span>Achternaam</span>
      <input v-model="member.name" type="text" ref="surname" required/>
    </div>
    <div>
      <span>Geboortedatum</span>
      <input v-model="member.birthday" type="date" ref="birthday" required/>
    </div>
    <div>
      <span>Studierichting</span>
      <input v-model="member.study" type="text" ref="study" placeholder="" required/>
    </div>
    <div>
      <span>Jaar in studierichting</span>
      <input v-model="member.yearOfStudy" type="number" ref="yearOfStudy" required/>
    </div>
    <div>
      <span>Email</span>
      <input v-model="member.email" type="email" ref="email" required/>
    </div>
    <div>
      <span>GSM Nr.</span>
      <input v-model="member.gsm" type="tel" ref="gsm" required/>
    </div>
    <div>
      <span>Straat</span>
      <input v-model="member.street" type="text" ref="street" required/>
    </div>
    <div>
      <span>Huisnummer</span>
      <input v-model="member.houseNr" type="number" ref="houseNr" required/>
    </div>
    <div>
      <span>Stad</span>
      <input v-model="member.city" type="text" ref="city" required/>
    </div>
    <div>
      <span>Postcode</span>
      <input v-model="member.postcode" type="number" ref="postcode" required/>
    </div>
    <div>
      <span></span>
    </div>
    <div ref="image">
      Foto <input @change="onFileChange" type="file" accept=".png, .jpg, .jpeg" required/>
      <img :src="member.image" v-if="member.image" alt="">
    </div>
    <div ref="dopen">
      Dopen
      <label><input type="radio" value="Ja" v-model="member.dopen" required/>Ja</label>
      <label><input type="radio" value="Nee" v-model="member.dopen" required/>Nee</label>
    </div>
    <div ref="privacy">
      <input v-model="member.privacy" type="checkbox" required/>
      Ik ga akkoord met de algemene voorwaarden en het 
      <a href="http://www.technica-antwerpen.be/assets/privacy_policy.pdf">Privacybeleid</a> 
      van Technica
    </div>
    <button @click="sendMail" type="submit" class="call-to-action">Verstuur</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        member: { name: '', surname: '', birthday: null, study: '', yearOfStudy: 0, email: '', gsm: '', 
                  street: '', houseNr: 0, city: '', postcode: 0, image: null, dopen: 'Nee', privacy: false, }
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
          for (let [key, value] of Object.entries(this.member)) {
            console.log(`${key}: ${value}`);
            if (value) this.$refs[key].classList.remove('not-filled')
            else this.$refs[key].classList.add('not-filled')
          }
        }
      }
    }
  }
</script>

<style scoped>
  .not-filled {
    border-color: crimson;
    color: crimson
    
  }
</style>