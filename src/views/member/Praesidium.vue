<template>
  <!-- The model is used to edit data -->
  <edit-modal v-if="EditModal.show" :title="EditModal.title" @closeEditModal="toggleEditModal" @confirm="confirm">
    <!-- Input fields -->
    <template v-slot:inputs>
      <input class="column-2" v-model="praesidium.name" type="text" placeholder="Naam" required/>
      <input class="column-2" v-model="praesidium.surname" type="text" placeholder="Achternaam" required/>
      <select class="column-2" v-model="praesidium.role">
        <option disabled selected value="undefined">Functie</option>
        <option v-for="role in RoleEnum" :value="role">{{ role.name }}</option>
      </select>
      <input class="column-2" v-model="praesidium.course" type="text" placeholder="Studierichting" required/>
      <input class="column-2" v-model="praesidium.drink" type="text" placeholder="Drankje" required/>
      <input class="column-2" v-model="praesidium.link" type="text" placeholder="LinkedIn" required/>
      <textarea v-model="praesidium.text" placeholder="Tekst" required></textarea>
    </template>
    <!-- Image field -->
    <template v-slot:image>
      <div class="column-2">
        <img :src="praesidium.picture" v-if="praesidium.picture" alt="">
        <label for="picture" class="button-label">Foto</label>
        <input @change="onFileChange($event, false)" id="picture" type="file" accept="image/*" required/>
      </div>
      <div class="column-2">
        <img :src="praesidium.picture_alt" v-if="praesidium.picture_alt" alt="">
        <label for="picture_alt" class="button-label">Zotte foto</label>
        <input @change="onFileChange($event, true)" id="picture_alt" type="file" accept="image/*" required/>
      </div>
    </template>
  </edit-modal>

  <!-- The model is used to view data -->
  <view-modal v-if="ViewModal.show" :title="ViewModal.title" @closeViewModal="toggleViewModal">
    <template v-slot:image>
      <hover-image :image="praesidium.picture" :image-alt="praesidium.picture_alt"></hover-image>
    </template>
    <template v-slot:data>
      <h4>
        <span class="title">{{ praesidium.name }} {{ praesidium.surname }}</span>
        <a v-if="praesidium.link" :href="praesidium.link">
          <font-awesome-icon class="icon" :icon="{ prefix: 'fab', iconName: 'linkedin' }"/>
        </a>
      </h4>
      <h5 class="sub-title"><b>{{ praesidium.role.name }}</b> - {{ praesidium.course }}</h5>
      <p><font-awesome-icon class="icon" :icon="{ prefix: 'fas', iconName: 'beer' }"/>{{ praesidium.drink }}</p>
      <p>{{ praesidium.text }}</p>
      <div>
        <font-awesome-icon class="icon" :icon="{ prefix: 'fas', iconName: 'envelope' }"/>
        <a :href="'mailto:' + praesidium.mail">{{ praesidium.role.mail }}</a>
      </div>
    </template>
    <template v-slot:buttons>
      <div class="column-2"><button @click="changeData($event, praesidium)">Edit</button></div>
      <div class="column-2"><button @click="delPraesidium($event, praesidium.id, `${praesidium.name}_${praesidium.surname}`)">Delete</button></div>
    </template>
  </view-modal>

  <!-- The main view -->
  <div id="main">
    <div v-if="praesidia.length">
      <div v-for="lid in praesidia" :key="lid.id" class="persons">
        <div class="person-wrap" @click="selectData($event, lid)">
          <hover-image :image="lid.picture" :image-alt="lid.picture_alt"></hover-image>
          <h3 class="title">{{ lid.name }} {{ lid.surname }}</h3>
          <h3 class="sub-title">{{ lid.role.name }}</h3>
        </div>
      </div>
      <corner-button title="Add" @confirm="changeData($event)"></corner-button>
    </div>
    <div v-else><h3 class="loading">Loading preasidium ...</h3></div>
  </div>
</template>

<script>
  import { getData, postData, putData, delData, getPhoto, postPhoto, delPhoto } from '@/firebase';
  import { Praesidium, FirePraesidium } from '@/classes';
  import { RoleEnum } from '@/enums';
  import HoverImage from '@/components/HoverImage.vue';
  import CornerButton from '@/components/CornerButton.vue';
  import EditModal from '@/components/modals/EditModal.vue';
  import ViewModal from '@/components/modals/ViewModal.vue';

  // Picture problem
  // Delete picture

  export default {
    data() {
      return {
        RoleEnum: RoleEnum,
        praesidia: [],
        praesidium: null,
        picture: { normal: null, alt: null },

        EditModal: { show: false, title: '' },
        ViewModal: { show: false, title: '' },

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
        data.forEach((doc) => { this.praesidia.push(new FirePraesidium(doc.id, doc.data())); })
        // console.log(this.praesidia);
      },
      async postPraesidium() { await postData(this.path, this.praesidium.json) },
      async putPraesidium() { await putData(this.path, this.praesidium.id, this.praesidium.json) },
      async delPraesidium(event, id, name) { 
        await delData(this.path, id)
        await delPhoto(this.path, `${name}.jpg`)
        await delPhoto(this.path, `${name}_alt.jpg`)
        // TODO: Change reload
        this.$router.go(this.$router.currentRoute)
      },

      // Local methods
      toggleViewModal() { this.ViewModal.show = !this.ViewModal.show; },
      selectData(event, lid) {
        this.praesidium = lid
        // console.log(lid)
        this.toggleViewModal()
      },

      toggleEditModal() { this.EditModal.show = !this.EditModal.show; },
      changeData(event, lid) {
        this.praesidium = lid ? lid : new Praesidium()
        // console.log(lid)
        this.EditModal.title = this.praesidium.id ? "Praesidium aanpassen" : "Praesidium toevoegen"
        this.picture.normal = null
        this.picture.alt = null
        this.toggleEditModal()
      },

      async confirm() {
        // console.log(`Confirm: pre change data`, this.praesidium.json)
        if (this.praesidium.name && this.praesidium.surname) {
          // Change normal picture
          if (this.picture.normal) {
            // console.log(`Confirm: pre picture ${this.praesidium.picture}`)
            var fileName = `${this.praesidium.name}_${this.praesidium.surname}.jpg`
            fileName = await this.postPhoto(fileName, this.picture.normal)
            this.praesidium.picture = await this.getPhoto(fileName)
            // console.log(`Confirm: post picture ${this.praesidium.picture}`)
          }
          // Change alternative picture
          if (this.picture.alt) {
            // console.log(`Confirm: pre picture_alt ${this.praesidium.picture_alt}`)
            var altFileName = `${this.praesidium.name}_${this.praesidium.surname}_alt.jpg`
            fileName = await this.postPhoto(altFileName, this.picture.alt)
            this.praesidium.picture_alt = await this.getPhoto(altFileName)
            // console.log(`Confirm: post picture_alt ${this.praesidium.picture_alt}`)
          }
          // Change data
          console.log(`Confirm: post change data`, this.praesidium.json)
          await this.praesidium.id ? this.putPraesidium() : this.postPraesidium()
        }
        this.toggleEditModal()
      },
      onFileChange(event, alt) {
        var files = event.target.files;
        if (!files.length) return;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        if (alt)  {
          reader.onload = () => (this.praesidium.picture_alt = reader.result);
          this.picture.alt = files[0]
        } else {
          reader.onload = () => (this.praesidium.picture = reader.result);
          this.picture.normal = files[0]
        }
      }
    },
    components: { EditModal, ViewModal, CornerButton, HoverImage }
  }
</script>

<style scoped>
  h3 { 
    color: #ffffff;
    transform: translateY(-96px);
  }
  .title { font-size: x-large; }
  .sub-title { font-size: large; }

  .persons { display: inline-flex; }
  .person-wrap { 
    width: 320px;
    padding: 8px;
  }
</style>