<template>
  <!-- The model is used to edit data -->
  <!-- <edit-modal v-if="EditModal.show" :title="getTitle()" @closeEditModal="toggleEditModal">
    <!- Input fields ->
    <template v-slot:inputs>
      <!- Name ->
      <input class="column-2" v-model="praesidium.name" type="text" placeholder="Voornaam" required/>
      <input class="column-2" v-model="praesidium.surname" type="text" placeholder="Achternaam" required/>
      <input class="column-2" v-model="praesidium.nickname" type="text" placeholder="Bijnaam" required/>
      <!- Drink ->
      <input class="column-2" v-model="praesidium.drink" type="text" placeholder="Drankje" required/>
      <!- Roles ->
      <select class="column-2" v-model="praesidium.role">
        <option disabled selected value="">Functie</option>
        <template v-for="role in RoleEnum">
          <option v-if="role.value <= 20 && role.value != -1" :value="role">{{ role.name }}</option>
        </template>
      </select>
      <select class="column-2" v-model="praesidium.secondRole">
        <option disabled selected value="">Functie</option>
        <template v-for="role in RoleEnum">
          <option v-if="role.value <= 20 && role.value != -1" :value="role">{{ role.name }}</option>
        </template>
      </select>
      <!- Study ->
      <input class="column-2" v-model="praesidium.course" type="text" placeholder="Studierichting/Job" required/>
      <input class="column-2" v-model="praesidium.division" type="text" placeholder="Deelrichting" required/>
      <input class="column-2" v-model="praesidium.school" type="text" placeholder="School/Bedrijf" required/>
      <!- LinkedIn ->
      <input class="column-2" v-model="praesidium.linkedin" type="text" placeholder="LinkedIn" required/>
      <!- Text ->
      <textarea class="column-1" v-model="praesidium.text" placeholder="Tekst" required></textarea>
    </template>
    <!- Image field ->
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
    <!- Buttons ->
    <template v-slot:buttons>
      <div class="column-2"><button @click="confirm()">{{ getTitle() }}</button></div>
      <div class="column-2" v-if="EditModal.existingItem">
        <button @click="delPraesidium($event, praesidium.id, `${praesidium.name}_${praesidium.surname}`)">Delete</button>
      </div>
    </template>
  </edit-modal> -->

  <!-- The main view -->
  <div id="main">
    <div v-if="praesidia.length">
      <div v-for="lid in praesidia" :key="lid.id" class="person">

        <!-- Praesidium Item -->
         <!-- Onclick: gridItem.linkedin -->
        <div v-if="lid.name != ''">
          <div class="person-wrap" @dblclick="changeData($event, lid)">
            <!-- Set "lid.linkedin" to "true" to edit -->
            <a v-if="lid.linkedin" :href="lid.linkedin" target="_blank">
              <hover-image :image="lid.picture" :image-alt="lid.picture_alt"></hover-image>
            </a>
            <hover-image v-else :image="lid.picture" :image-alt="lid.picture_alt"></hover-image>
            <h4 class="title top-shift">{{ lid.name }} {{ lid.surname }}</h4>
            <h4 class="sub-title bottom-shift">
              {{ lid.role.name }}
              <template v-if="lid.secondRole.value != -1"> & {{ lid.secondRole.name }}</template>
            </h4>
            <div v-if="lid.role.mail" class="bottom-card info-card">
              <!-- Mail 1 -->
              <h6 class="sub-title">
                <span v-if="lid.role.mail">
                  <font-awesome-icon class="icon" :icon="{ prefix: 'fas', iconName: 'envelope' }"/>&nbsp;
                  <span :href="'mailto:' + lid.role.mail">{{ lid.role.mail }}</span>
                </span>
              </h6>
              <!-- Mail 2 -->
              <h6 class="sub-title" v-if="lid.secondRole.value != -1">
                <span v-if="lid.secondRole.mail">
                  <font-awesome-icon class="icon" :icon="{ prefix: 'fas', iconName: 'envelope' }"/>&nbsp;
                  <span :href="'mailto:' + lid.mail">{{ lid.secondRole.mail }}</span>
                </span>
              </h6>
              <!-- Course -->
              <div v-if="lid.course">
                <font-awesome-icon class="icon" :icon="{ prefix: 'fas', iconName: 'graduation-cap' }"/>&nbsp;
                <b>{{ lid.course }}</b>
                <span v-if="lid.division">:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ lid.division }}</span>
                <span v-if="lid.school">, {{ lid.school }}</span>
              </div>
              <!-- Drink -->
              <div v-if="lid.drink">
                <font-awesome-icon class="icon" :icon="{ prefix: 'fas', iconName: 'beer' }"/>&nbsp;
                <span>{{ lid.drink }}</span>
              </div>
              <!-- Text -->
              <div><span>{{ lid.text }}</span></div>
            </div>
            <div v-else class="bottom-card"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else><loading-bar :path="path"></loading-bar></div>

    <!-- Add button -->
    <!-- <corner-button title="Add" icon="plus" @confirm="changeData($event)"></corner-button> -->
  </div>
</template>

<script>
  import { getData, postData, putData, delData, getPhoto, postPhoto, delPhoto } from '@/firebase';
  import { Praesidium, FirePraesidium } from '@/classes';
  import { RoleEnum } from '@/enums';

  import CornerButton from '@/components/button/CornerButton.vue';
  import HoverImage from '@/components/image/HoverImage.vue';
  import ImageTextBlock from '@/components/image/ImageTextBlock.vue';
  import EditModal from '@/components/modals/EditModal.vue';
  import LoadingBar from '@/components/utility/LoadingBar.vue';

  export default {
    props: ['id'],
    components: { CornerButton, HoverImage, ImageTextBlock, EditModal, LoadingBar },
    data() {
      return {
        RoleEnum: RoleEnum,
        praesidia: [],
        praesidium: null,
        picture: { normal: null, alt: null },

        path: 'praesidium',
        EditModal: { show: false, existingItem: false, title: '' },
      };
    },
    async created() { await this.getPraesidium() },
    mounted() { this.$nextTick(() => { window.addEventListener('resize', this.changeGrid); }) },
    beforeDestroy() { window.removeEventListener('resize', this.changeGrid); },
    methods: {
      // Firebase storage methods
      async getPhoto(fileName = '') { return await getPhoto(this.path, fileName) },
      async postPhoto(fileName = '', file = null) { return await postPhoto(this.path, fileName, file, 1280) },
      async delPhoto(fileName = '') { await delPhoto(this.path, fileName) },

      // Firebase database methods
      async getPraesidium() {
        this.changeColumnSize()
        const data = await getData(this.path, [], 'role')
        data.forEach((doc) => { this.praesidia.push(new FirePraesidium(doc.id, doc.data())); })
      },
      async postPraesidium() {
        // Add data remotely
        const id = await postData(this.path, this.praesidium.json)

        // Add data locally
        this.praesidia.push(this.praesidium)
        this.praesidia.sort(function(a, b) { return a.role.value - b.role.value })
      },
      async putPraesidium() {
        // Change data remotely
        await putData(this.path, this.praesidium.id, this.praesidium.json)

        // Change data locally
        const index = this.praesidia.findIndex(praesidium => praesidium.id == this.praesidium.id)
        this.praesidia[index] = this.praesidium
      },
      async delPraesidium(event, id, name) {
        // Delete member locally
        const index = this.praesidia.findIndex(praesidium => praesidium.id = id)
        if (index != -1) this.praesidia.splice(index, 1)

        // Delete member remotely
        await delData(this.path, id)
        await delPhoto(this.path, `${name}.jpg`)
        await delPhoto(this.path, `${name}_alt.jpg`)

        this.toggleEditModal()
      },

      // Edit values
      getTitle() { return this.EditModal.existingItem ? 'Lid aanpassen' : 'Lid toevoegen' },
      changeColumnSize() {
        const windowWidth = window.innerWidth
        this.columnSize = windowWidth > 1008 ? 3 : windowWidth > 672 ? 2 : 1
      },
      
      // Change data modal
      toggleEditModal() { this.EditModal.show = !this.EditModal.show; },
      changeData(event, lid) {
        this.praesidium = lid ? lid : new Praesidium()
        // !!this.praesidium.id returns true of id exist
        this.EditModal.existingItem = !!this.praesidium.id
        this.picture.normal = null
        this.picture.alt = null
        this.toggleEditModal()
      },

      async confirm() {
        //console.log(`Confirm: pre change data`, this.praesidium.json)
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
          //console.log(`Confirm: post change data`, this.praesidium.json)
          await this.praesidium.id ? this.putPraesidium() : this.postPraesidium()
        }
        this.toggleEditModal()
      },
      onFileChange(event, alt) {
        var files = event.target.files;
        if (!files.length) return;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        if (alt) {
          reader.onload = () => (this.praesidium.picture_alt = reader.result);
          this.picture.alt = files[0]
        } else {
          reader.onload = () => (this.praesidium.picture = reader.result);
          this.picture.normal = files[0]
        }
      }
    }
  }
</script>

<style scoped>
  h4 { color: #ffffff; font-family: 'Cabin Condensed', sans-serif; }
  .title { font-size: x-large; font-weight: bold; }
  .sub-title { font-size: large; }
  .top-shift { margin-top: -96px; }
  .bottom-shift { margin-bottom: 48px; }
  
  a:link { color: #ffffff; }    /* unvisited link */
  a:visited { color: #ffffff; } /* visited link */
  a:hover { color: #ffffff; }   /* mouse over link */
  a:active { color: #ffffff; }  /* selected link */

  .person { display: inline-flex; }
  .person-wrap {
    width: 320px;
    padding: 8px;
    transition: all 0.25s ease-in-out;
    cursor: pointer;
  }
  .person-wrap:hover {
    width: 324px;
    padding: 4px;
  }
  .person-wrap > img {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  /* Overwrite modal */
  .person .image-column > * { padding-right: 8px; }
  .person .text-column * { 
    text-align: left;
    color: #ffffff;
  }
  .person .text-column h4, .person .text-column h6, .person .text-column div { padding-left: 8px; }

  .bottom-card {
    height: 18px;
    margin-top: -10px;
    padding-top: 10px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-image: url("../../assets/images/grunge.png");
  }

  .info-card {
    width: 100%;
    height: 180px;
  }

  .info-card > * {
    text-align: left;
    padding: 4px 8px;
    font-size: 16px;
  }

</style>