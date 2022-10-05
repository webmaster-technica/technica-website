<template>
  <h1>Lid worden</h1>
  <p>
    Indien u lid wilt worden, kunt u onderstaand formulier invullen. 
    Zodra wij dit ontvangen hebben, zullen wij contact met u opnemen om alles te regelen; lidkaart, lidgeld, ...
  </p>
  <div class="main">
    <input v-model="member.name" type="text" ref="name" placeholder="Naam" class="input"/>
    <input v-model="member.birthday" type="date" ref="birthday" placeholder="Geboortedatum" class="input"/>
    <input v-model="member.study" type="text" ref="study" placeholder="Studierichting" class="input"/>
    <input v-model="member.yearOfStudy" type="number" ref="yearOfStudy" placeholder="Jaar" class="input"/>
    <input v-model="member.email" type="email" ref="email" placeholder="E-mail adres" class="input"/>
    <input v-model="member.gsm" type="tel" ref="gsm" placeholder="Gsm nummer" class="input"/>
    <input v-model="member.street" type="text" ref="street" placeholder="Straat" class="input"/>
    <input v-model="member.houseNr" type="number" ref="houseNr" placeholder="Huis nr" class="input"/>
    <input v-model="member.city" type="text" ref="city" placeholder="Stad" class="input"/>
    <input v-model="member.postcode" type="number" ref="postcode" placeholder="Postcode" class="input"/>
    <div ref="image">
      Foto <input @change="onFileChange" type="file" accept="image/*"/>
      <img :src="member.image" v-if="member.image" alt="">
    </div>
    <div ref="dopen">
      Dopen
      <label><input type="radio" id="one" value="Ja" v-model="member.dopen"/>Ja</label>
      <label><input type="radio" id="one" value="Nee" v-model="member.dopen"/>Nee</label>
    </div>
    <div ref="privacy">
      <input v-model="member.privacy" type="checkbox" class="input"/>
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
        member: { name: '', birthday: null, study: '', yearOfStudy: 0, email: '', gsm: '', 
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

<style>
  .not-filled {
    border-color: crimson;
    color: crimson
  }
</style>