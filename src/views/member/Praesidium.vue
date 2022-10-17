<template>
  <!-- The model is used to edit data -->
  <data-modal v-if="modal.show" :title="modal.title" @closeDataModal="toggleDataModal" @confirm="confirm">
    <!-- All input fields -->
    <template v-slot:inputs>
      <input class="column-2" v-model="praesidia.name" type="text" placeholder="Naam" required/>
      <input class="column-2" v-model="praesidia.surname" type="text" placeholder="Achternaam" required/>
      <select class="column-2" v-model="praesidia.role">
        <option disabled selected value="undefined">Functie</option>
        <option v-for="role in RoleEnum" :value="role">{{ role.name }}</option>
      </select>
      <input class="column-2" v-model="praesidia.course" type="text" placeholder="Studierichting" required/>
      <input class="column-2" v-model="praesidia.drink" type="text" placeholder="Drankje" required/>
      <input class="column-2" v-model="praesidia.linkedin" type="text" placeholder="LinkedIn" required/>
      <textarea v-model="praesidia.text" placeholder="Tekst" required></textarea>
    </template>
    <!-- Image field -->
    <template v-slot:image>
      <div class="image-div column-2">
        <img :src="praesidia.picture" v-if="praesidia.picture" alt="">
        <label for="picture" class="button-label">Foto</label>
        <input @change="onFileChange($event, false)" id="picture" type="file" accept="image/*" required/>
      </div>
      <div class="image-div column-2">
        <img :src="praesidia.picture_alt" v-if="praesidia.picture_alt" alt="">
        <label for="picture_alt" class="button-label">Zotte foto</label>
        <input @change="onFileChange($event, true)" id="picture_alt" type="file" accept="image/*" required/>
      </div>
    </template>
  </data-modal>
  <div class="main">
    <button @click="changeData($event)">Add</button>
    <div v-if="praesidium.length">
      <div v-for="lid in praesidium" :key="lid.id" class="persons">
        <div class="person-wrap">
          <div class="person-image">
            <img class="image-normal" :src="lid.picture"/>
            <img class="image-alt" :src="lid.picture_alt"/>
            <a v-if="lid.linkedin" :href="lid.linkedin"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'linkedin' }"/></a>
          </div>
          <div class="person-details">
            <h3>{{ lid.name }} {{ lid.surname }}</h3>
            <h4><b>{{ lid.role.name }}</b> - {{ lid.course }}</h4><br>
            <p><font-awesome-icon :icon="{ prefix: 'fas', iconName: 'beer' }"/> {{ lid.drink }}</p>
            <p>{{ lid.text }}</p>
            <div>
              <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'envelope' }" size="1x"/>
              <a :href="'mailto:' + lid.mail">{{ lid.role.mail }}</a>
            </div>
          </div>
          <button @click="changeData($event, lid)">Edit</button>
          <button @click="delPraesidium($event, lid.id, `${lid.name}_${lid.surname}`)">Delete</button>
        </div>
      </div>
    </div>
    <div v-else><p>Loading preasidium ...</p></div>
  </div>
</template>

<script>
  import { getData, postData, putData, delData, getPhoto, postPhoto, delPhoto } from '@/firebase';
  import { Praesidium, FirePraesidium } from '@/classes';
  import { RoleEnum } from '@/enums';
  import DataModal from '@/components/DataModal.vue';

  // Picture problem
  // Delete picture

  export default {
    data() {
      return {
        RoleEnum: RoleEnum,
        praesidium: [],
        modal: { show: false, title: '' },
        picture: { normal: null, alt: null },
        path: 'praesidium'
      };
    },
    created() { this.getPraesidium() },
    methods: {
      // Firebase storage methods
      async getPhoto(fileName = '') { return await getPhoto(this.path, fileName) },
      async postPhoto(fileName = '', file = null) { return await postPhoto(this.path, fileName, file, 1280) },
      async delPhoto(fileName = '') { await delPhoto(this.path, fileName) },

      // Firebase database methods
      async getPraesidium() {
        const data = await getData(this.path)
        data.forEach((doc) => { this.praesidium.push(new FirePraesidium(doc.id, doc.data())); })
        // console.log(this.praesidium);
      },
      async postPraesidium() { await postData(this.path, this.praesidia.json) },
      async putPraesidium() { await putData(this.path, this.praesidia.id, this.praesidia.json) },
      async delPraesidium(event, id, name) { 
        await delData(this.path, id)
        await delPhoto(this.path, `${name}.jpg`)
        await delPhoto(this.path, `${name}_alt.jpg`)
      },

      // Local methods
      changeData(event, lid) {
        this.praesidia = lid ? lid : new Praesidium()
        this.modal.title = this.praesidia.id ? "Praesidium aanpassen" : "Praesidium toevoegen"
        this.picture.normal = null
        this.picture.alt = null
        this.toggleDataModal()
      },
      toggleDataModal() { this.modal.show = !this.modal.show; },
      async confirm() {
        // console.log(`Confirm: pre change data`, this.praesidia.json)
        if (this.praesidia.name && this.praesidia.surname) {
          // Change normal picture
          if (this.picture.normal) {
            // console.log(`Confirm: pre picture ${this.praesidia.picture}`)
            var fileName = `${this.praesidia.name}_${this.praesidia.surname}.jpg`
            fileName = await this.postPhoto(fileName, this.picture.normal)
            this.praesidia.picture = await this.getPhoto(fileName)
            // console.log(`Confirm: post picture ${this.praesidia.picture}`)
          }
          // Change alternative picture
          if (this.picture.alt) {
            // console.log(`Confirm: pre picture_alt ${this.praesidia.picture_alt}`)
            var altFileName = `${this.praesidia.name}_${this.praesidia.surname}_alt.jpg`
            fileName = await this.postPhoto(altFileName, this.picture.alt)
            this.praesidia.picture_alt = await this.getPhoto(altFileName)
            // console.log(`Confirm: post picture_alt ${this.praesidia.picture_alt}`)
          }
          // Change data
          console.log(`Confirm: post change data`, this.praesidia.json)
          this.praesidia.id ? this.putPraesidium() : this.postPraesidium()
        }
        this.toggleDataModal()
        this.$forceUpdate();
      },
      onFileChange(event, alt) {
        var files = event.target.files;
        if (!files.length) return;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        if (alt)  {
          reader.onload = () => (this.praesidia.picture_alt = reader.result);
          this.picture.alt = files[0]
        } else {
          reader.onload = () => (this.praesidia.picture = reader.result);
          this.picture.normal = files[0]
        }
      }
    },
    components: { DataModal }
}
</script>

<style scoped>
  .persons { display: inline-flex; }
  .person-wrap { width: 256px; }
  /* .person-wrap {
    background: url('../images/grunge.png'); 
    width: 100%;
  } */
  .person-wrap .person-image {
    position: relative;
    z-index: -1;
    padding: 9px;
  }
  .person-image .image-alt {
    display: none;
  }
  .person-image:hover .image-alt {
    display: inline;
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