<template>
  <!-- The model is used to edit data -->
  <!-- <edit-modal v-if="EditModal.show" :title="getTitle()" @closeEditModal="toggleEditModal">
    <!- Input fields ->
    <template v-slot:inputs>
      <!- Name ->
      <input class="column-2" v-model="partner.name" type="text" placeholder="Naam" required/>
      <!- website ->
      <input class="column-2" v-model="partner.website" type="text" placeholder="Website-Link" required/>
      <!- index ->
      <input class="column-2" v-model="partner.index" type="number" placeholder="Index" v-if="EditModal.existingItem" required/>
    </template>
    <!- Image field ->
    <template v-slot:image>
      <div class="column-2">
        <img :src="partner.logo" v-if="partner.logo">
        <label for="picture" class="button-label">Foto</label>
        <input @change="onFileChange($event)" id="picture" type="file" accept="image/*" required/>
      </div>
    </template>
    <!- Buttons ->
    <template v-slot:buttons>
      <div class="column-2"><button @click="confirm()">{{ getTitle() }}</button></div>
      <div class="column-2" v-if="EditModal.existingItem">
        <button @click="delPartner($event, partner.id, partner.name)">Delete</button>
      </div>
    </template>
  </edit-modal> -->

  <!-- The main view -->
  <div id="main">
    <div v-if="partners.length">
      <div v-for="partnerItem in partners" :key="partnerItem.id" class="partner">
        <div class="partner-wrap" @click="changeData($event, partnerItem)">
          <a :href="partnerItem.website" target="_blank">
            <img :src="partnerItem.logo">
          </a>
          <!-- <img :src="partnerItem.logo"> -->
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
  import { Partner, FirePartner } from '@/classes';
  
  import CornerButton from '@/components/button/CornerButton.vue';
  import EditModal from '@/components/modals/EditModal.vue';
  import LoadingBar from '@/components/utility/LoadingBar.vue';

  export default {
    components: { EditModal, CornerButton, LoadingBar },
    data() {
      return {
        partners: [],
        partner: null,
        logo: null,

        path: 'partners',
        EditModal: { show: false, existingItem: false, title: '' }
      };
    },
    async created() { await this.getPartner() },
    methods: {
      // Firebase storage methods
      async getPhoto(fileName = '') { return await getPhoto(this.path, fileName) },
      async postPhoto(fileName = '', file = null) { return await postPhoto(this.path, fileName, file, 1280) },
      async delPhoto(fileName = '') { await delPhoto(this.path, fileName) },

      // Firebase database methods
      async getPartner() {
        const data = await getData(this.path, [])
        data.forEach((doc) => { this.partners.push(new FirePartner(doc.id, doc.data())); })
        this.partners.sort(function(a, b) { return a.index - b.index })
      },
      async postPartner() {
        // Add data remotely
        const id = await postData(this.path, this.partner.json)

        // Add data locally
        this.partners.push(this.partner)
        this.partners.sort(function(a, b) { return a.index - b.index })
      },
      async putPartner() {
        // Change data remotely
        await putData(this.path, this.partner.id, this.partner.json)

        // Change data locally
        const index = this.partners.findIndex(partner => partner.id == this.partner.id)
        this.partners[index] = this.partner
      },
      async delPartner(event, id, name) {
        // Delete member locally
        const index = this.partners.findIndex(partner => partner.id = id)
        if (index != -1) this.partners.splice(index, 1)

        // Delete member remotely
        await delData(this.path, id)
        await delPhoto(this.path, `${name}.jpg`)

        this.toggleEditModal()
      },

      // Edit values
      getTitle() { return this.EditModal.existingItem ? 'Partner aanpassen' : 'Partner toevoegen' },
      
      // Change data modal
      toggleEditModal() { this.EditModal.show = !this.EditModal.show; },
      changeData(event, partner) {
        this.partner = partner ? partner : new Partner()
        // !!this.partner.id returns true of id exist
        this.EditModal.existingItem = !!this.partner.id
        this.logo = null
        this.toggleEditModal()
      },

      async confirm() {
        // console.log(`Confirm: pre change data`, this.partner.json)
        if (this.partner.name) {
          // Change logo
          if (this.logo) {
            // console.log(`Confirm: pre logo ${this.partner.logo}`)
            var fileName = `${this.partner.name}.jpg`
            fileName = await this.postPhoto(fileName, this.logo)
            this.partner.logo = await this.getPhoto(fileName)
            // console.log(`Confirm: post logo ${this.partner.logo}`)
          }

          // Change data
          if (this.partner.id) {
            // Find if any value already contains the chosen index
            const itemAtIndex = this.partners.find(partner => (partner.index == this.partner.index) && (partner.name != this.partner.name))
            if (itemAtIndex) {
              // Update current item
              this.putPartner()
              // Update the previous owner item
              this.partner = itemAtIndex
              let highestIndex = 0
              this.partners.forEach(partner => {if (partner.index > highestIndex) highestIndex = partner.index})
              this.partner.index = highestIndex + 1
              this.putPartner()
            } else { this.putPartner() }
          } else { 
            // Add data
            let highestIndex = 0
            this.partners.forEach(partner => {if (partner.index > highestIndex) highestIndex = partner.index})
            this.partner.index = highestIndex + 1
            this.postPartner()
          }
          // console.log(`Confirm: post change data`, this.partner.json)
        }
        this.toggleEditModal()
      },
      onFileChange(event) {
        var files = event.target.files;
        if (!files.length) return;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => (this.partner.logo = reader.result);
        this.logo = files[0]
      }
    }
  }
</script>

<style scoped>
  .partner { display: inline-flex; }
  .partner-wrap {
    width: 296px;
    max-height: 170px;
    margin: 12px;
    transition: all 0.25s ease-in-out;
    cursor: pointer;
  }
  .partner-wrap:hover {
    width: 300px;
    max-height: 172px;
    margin: 8px;
  }
</style>