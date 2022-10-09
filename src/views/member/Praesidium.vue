<template>
  <div class="main">
    <div v-if="praesidium.length">
      <div v-for="praesidia in praesidium" :key="praesidia">
        <div class="person-wrap">
          <div class="person-image">
            <img class="image-normal" src="https://firebasestorage.googleapis.com/v0/b/technica-website-defc6.appspot.com/o/praesidium%2F%23anoniem.png?alt=media&token=11f7dcb1-1a18-48c1-86b0-71b9f4f0a345" alt="">
            <!-- <img class="image-normal" :src="praesidia.picture" />
            <img class="image-zot" :src="praesidia.picture_alt" /> -->
            <a :href="praesidia.linkedin"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'linkedin' }"/></a>
          </div>
          <div class="person-details">
            <h3>{{ praesidia.name }} {{ praesidia.surname }}</h3>
            <h4><b>{{ praesidia.role }}</b> - {{ praesidia.course }}</h4>
            <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'beer' }"/> {{ praesidia.drink }}
            <p>{{ praesidia.quote }}</p>
            <div>
              <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'envelope' }" size="1x"/>
              <a :href="'mailto:' + praesidia.mail">{{ praesidia.mail }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else><p>Loading preasidium ...</p></div>
    <div>
      <!-- <input v-model="praes.name" type="text" ref="name" placeholder="Naam" required/>
      <input v-model="praes.surname" type="date" ref="birthday" placeholder="Geboortedatum" required/>
      <input v-model="praes.role" type="number" ref="yearOfStudy" placeholder="Jaar" required/>
      <input v-model="praes.course" type="text" ref="study" placeholder="Studierichting" required/>
      <input v-model="preas.drink" type="tel" ref="gsm" placeholder="Gsm nummer" required/>
      <input v-model="preas.quote" type="tel" ref="gsm" placeholder="Gsm nummer" required/>
      <input v-model="preas.mail" type="email" ref="email" placeholder="E-mail adres" required/> -->
    </div>
  </div>
</template>

<script>
  import { db } from '@/firebase'
  import { query, collection, getDocs } from "firebase/firestore";
  import { Praesidium } from '@/classes'

  export default {
    data() {
      return {
        praesidiumCol: collection(db, 'praesidium'),
        praesidium: []
      }
    },
    created() {
      this.getPraesidium()
    },
    methods: {
      async getPraesidium() {
        const querySnapshot = await getDocs(query(this.praesidiumCol));
        querySnapshot.forEach((doc) => {
          this.praesidium.push(new Praesidium(doc.id, doc.data()))
        });
        console.log(this.praesidium)
      }
    }
  }
</script>

<style scoped>
  .person-wrap {
    width: 256px;
  }
  /* .person-wrap {
    background: url('../images/grunge.png');
    width: 100%;
  } */
  .person-wrap .person-image {
      position: relative;
      padding: 9px;
  }
  .person-image .image-zot {
      display: none;
  }
  .person-wrap img {
      vertical-align: bottom;
      width: 100%;
  }
  .person-wrap .person-image a{
      position: absolute;
      top: 90%;
      left: 11%;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      color:#353535;
      font-size: 2em;
      /* display:none; */
  }
  .person-wrap .person-details {
      padding: 10px;
  }
  .person-wrap .person-details p {
      font-size: 17px;
      font-style: italic;
      line-height: 1.2;
      color: #252525;
  }
  .person-wrap .person-details svg {
      color: #115F9A;
      margin-right: 5px;
      margin-left: 1px;
      font-size: 18px;
  }
  .person-wrap .person-details h3 {
      font-size: 26px;
      margin-top: 0;
      margin-bottom: 0;
      color: #115F9A;
  }
  .person-wrap .person-details h4 {
      text-transform: none;
      font-family: 'Hind', sans-serif;
      margin-top: 8px;
      margin-bottom: 0;
      font-size: 18px;
      font-weight: 300;
      height: 40px;
  }
</style>