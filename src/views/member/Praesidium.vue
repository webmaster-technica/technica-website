<template>
  <!-- The model is used to edit data -->
  <edit-modal v-if="EditModal.show" :title="getTitle()" @closeEditModal="toggleEditModal">
    <!-- Input fields -->
    <template v-slot:inputs>
      <!-- Name -->
      <input class="column-2" v-model="praesidium.name" type="text" placeholder="Voornaam" required/>
      <input class="column-2" v-model="praesidium.surname" type="text" placeholder="Achternaam" required/>
      <input class="column-2" v-model="praesidium.nickname" type="text" placeholder="Bijnaam" required/>
      <!-- Drink -->
      <input class="column-2" v-model="praesidium.drink" type="text" placeholder="Drankje" required/>
      <!-- Roles -->
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
      <!-- Study -->
      <input class="column-2" v-model="praesidium.course" type="text" placeholder="Studierichting" required/>
      <input class="column-2" v-model="praesidium.division" type="text" placeholder="Deelrichting" required/>
      <input class="column-2" v-model="praesidium.school" type="text" placeholder="School" required/>
      <!-- LinkedIn -->
      <input class="column-2" v-model="praesidium.link" type="text" placeholder="LinkedIn" required/>
      <!-- Text -->
      <textarea class="column-1" v-model="praesidium.text" placeholder="Tekst" required></textarea>
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
    <!-- Buttons -->
    <template v-slot:buttons>
      <div class="column-2"><button @click="confirm()">{{ getTitle() }}</button></div>
      <div class="column-2" v-if="EditModal.existingItem">
        <button @click="delPraesidium($event, praesidium.id, `${praesidium.name}_${praesidium.surname}`)">Delete</button>
      </div>
    </template>
  </edit-modal>

  <!-- The main view -->
  <div id="main">
    <div v-if="praesidia.length">
      <div v-for="lid in praesidia" :key="lid.id" class="persons">
        <div v-if="lid.name != ''">
          <!-- Praesidium image -->
          <div class="person-wrap" @dblclick="changeData($event, lid)" @click="toggleData($event, lid)" >
            <hover-image :image="lid.picture" :image-alt="lid.picture_alt"></hover-image>
            <h3 class="title top-shift">{{ lid.name }} {{ lid.surname }}</h3>
            <h3 class="sub-title bottom-shift">
              {{ lid.role.name }}
              <template v-if="lid.secondRole.value != -1"> & {{ lid.secondRole.name }}</template>
            </h3>
          </div>
        </div>
        <div v-else>
          <!-- Data field -->
          <div id="data-box">
            <div>
              <hover-image :image="praesidium.picture" :image-alt="praesidium.picture_alt" id="data-image"></hover-image>
              <div id="data-field">
                <h4>
                  <span class="title">
                    {{ praesidium.name }} {{ praesidium.surname }}
                    <a v-if="praesidium.nickname"> ({{ praesidium.nickname }})</a>
                  </span>
                  <a v-if="praesidium.link" :href="praesidium.link">
                    <font-awesome-icon class="icon" :icon="{ prefix: 'fab', iconName: 'linkedin' }"/>
                  </a>
                </h4>
                <h5 class="sub-title">
                  <b>{{ praesidium.role.name }}</b>
                  <a v-if="praesidium.role.mail"> - 
                    <font-awesome-icon class="icon" :icon="{ prefix: 'fas', iconName: 'envelope' }"/>
                    <a :href="'mailto:' + praesidium.mail">{{ praesidium.role.mail }}</a>
                  </a>
                </h5>
                <div>
                  <span>{{ praesidium.course }}</span>
                  <a v-if="praesidium.division">: {{ praesidium.division }}</a>
                  <a v-if="praesidium.school">, {{ praesidium.school }}</a>
                </div>
                <p><font-awesome-icon class="icon" :icon="{ prefix: 'fas', iconName: 'beer' }"/>{{ praesidium.drink }}</p>
                <p>{{ praesidium.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else><h3 class="loading">Loading preasidium ...</h3></div>
    <!-- Add button -->
    <corner-button title="Add" icon="plus" @confirm="changeData($event)"></corner-button>
  </div>
</template>

<script>
  import { getData, postData, putData, delData, getPhoto, postPhoto, delPhoto } from '@/firebase';
  import { Praesidium, FirePraesidium } from '@/classes';
  import { RoleEnum } from '@/enums';
  import HoverImage from '@/components/HoverImage.vue';
  import CornerButton from '@/components/CornerButton.vue';
  import EditModal from '@/components/modals/EditModal.vue';

  // Picture problem
  // Delete picture

  export default {
    props: ['id'],
    data() {
      return {
        RoleEnum: RoleEnum,
        praesidia: [],
        praesidium: null,
        picture: { normal: null, alt: null },

        EditModal: { show: false, existingItem: false, title: '' },

        path: 'praesidium',

        viewData: { show: false, item: null },
        showFiller: [],
      };
    },
    async created() { 
      await this.getPraesidium()
      this.applyRouteID(this.id)
    },
    mounted() { this.$nextTick(() => { window.addEventListener('resize', this.toggleData); }) },
    beforeDestroy() { window.removeEventListener('resize', this.toggleData); },
    methods: {
      // Firebase storage methods
      async getPhoto(fileName = '') { return await getPhoto(this.path, fileName) },
      async postPhoto(fileName = '', file = null) { return await postPhoto(this.path, fileName, file, 1280) },
      async delPhoto(fileName = '') { await delPhoto(this.path, fileName) },

      // Firebase database methods
      async getPraesidium() {
        const data = await getData(this.path, [], 'role')
        data.forEach((doc) => { this.praesidia.push(new FirePraesidium(doc.id, doc.data())); })
        this.praesidia.forEach(() => this.showFiller.push(false))
      },
      async postPraesidium() {
        // Add data remotely
        const id = await postData(this.path, this.praesidium.json)

        // Add data locally
        // const index = this.praesidia.findIndex(praesidium => praesidium.id == id)
        this.praesidia.push(this.praesidium)
        this.praesidia.sort(function(a, b) { return a.role.value - b.role.value })

        this.showFiller.push(false)
      },
      async putPraesidium() {
        // Change data remotely
        await putData(this.path, this.praesidium.id, this.praesidium.json)

        // Change data locally
        const index = this.praesidia.findIndex(praesidium => praesidium.id == this.praesidium.id)
        this.praesidia[index] = this.praesidium

        this.showFiller.push(false)
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

      // Grid layout
      toggleData(event, lid) {
        // If statement for onClick
        if (lid) {
          this.praesidium = lid

          var tempPraesidia = []
          this.praesidia.findIndex(praesidium => { if (praesidium.name != '') tempPraesidia.push(praesidium) })
          const index = tempPraesidia.findIndex(praesidium => praesidium.id == this.praesidium.id)

          // Add filler space
          if (this.showFiller[index]) this.showFiller[index] = false // Toggle if needed
          else
            for (let i = 0; i < this.showFiller.length; i++) this.showFiller[i] = (i == index)
        }

        // If statement for eventListener (that will active on screen width change)
        if (this.praesidium) { this.toggleDataBoxSpace() }
      },
      toggleDataBoxSpace() {
        // Remove previous filler node (if it exists)
        const pIndex = this.praesidia.findIndex(praesidium => praesidium.name == '')
        if (pIndex != -1) this.praesidia.splice(pIndex, 1)

        // Add new filled node (if needed)
        const index = this.showFiller.findIndex(filler => filler == true)
        if (index != -1) {
          const windowWidth = window.innerWidth
          var columns = Math.floor(windowWidth / 336) // a column is 336 pixels wide
          columns = columns > 3 ? 3 : columns         // the maximum amount of columns is 3
          const atRow = (Math.floor(index / columns) + 1)
          this.praesidia.splice(atRow * columns, 0, new Praesidium())
        }

        //this.waitForElementToExist('.data-box', (element) => element.classList.add(visible))

        //   // Transition
        //   dataField.style.visibility = 'visible'
        //   dataField.style.transition = 'height 5s ease-in-out'
        //   dataField.style.height = '336px'
      },
      waitForElementToExist(selector, callback) {
        const element = document.querySelector(selector);

        if (element !== null) {
          // Element found, execute callback
          callback(element);
        } else {
          // Element not found yet, wait and try again
          setTimeout(() => {this.waitForElementToExist(selector, callback);}, 100);
        }
      },

      // Apply route ID
      applyRouteID(id) {
        if (id) {
          console.log(id)
          // Find the value
          const index = this.praesidia.findIndex(praesidium => {
            const lowerID = String(id).toLowerCase()
            // Try first name
            if (praesidium.name.toLowerCase() == lowerID) return true
            // Try last name
            if (praesidium.surname.toLowerCase() == lowerID) return true
            // Try first and last name (without space)
            if ((praesidium.name + praesidium.surname).toLowerCase() == lowerID) return true
            // Try first and last name (with space)
            if ((praesidium.name + ' ' + praesidium.surname).toLowerCase() == lowerID) return true
            // Try role
            if (praesidium.role.name.toLowerCase() == lowerID) return true
          })

          // If the ID is valid (index != -1) then continue with value
          if (index != -1) { this.toggleData(null, this.praesidia[index]) }
        }
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
          // console.log(`Confirm: post change data`, this.praesidium.json)
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
    },
    components: { EditModal, CornerButton, HoverImage }
  }
</script>

<style scoped>
  h3 { color: #ffffff; }
  .title { font-size: x-large; }
  .sub-title { font-size: large; }
  .top-shift { margin-top: -96px; }
  .bottom-shift { margin-bottom: 48px; }

  .persons { display: inline-flex; }
  .person-wrap { 
    width: 320px;
    padding: 8px;
  }

  #test { height: 500px; }
  #data-box {
    height: 320px;
    width: 992px;
    padding: 8px;
    background-color: navy;
    transition: height 5s ease-in-out;
  }
  #data-box.visible { height: 320px;
    background-color: maroon; }
  #data-box > div { display: flex; }
  #data-image { 
    width: 320px;
    height: 320px;
    visibility: visible;
    padding-right: 20px;
  }
  #data-field {
    text-align: left;
    font-size: 20px;
    color: #ffffff;;
    /* color: #353535; */
  }
  #data-field svg { margin-right: 4px; }


  @media screen and (max-width: 1008px) {
    #data-box { width: 656px; }
    #data-image { visibility: collapse; }
  }
  @media screen and (max-width: 672px) {
    #data-box { width: 320px; }
    #data-image { visibility: collapse; }
  }
</style>
<!--https://stackoverflow.com/a/8331169-->