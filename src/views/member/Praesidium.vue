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
      <input class="column-2" v-model="praesidium.course" type="text" placeholder="Studierichting/Job" required/>
      <input class="column-2" v-model="praesidium.division" type="text" placeholder="Deelrichting" required/>
      <input class="column-2" v-model="praesidium.school" type="text" placeholder="School/Bedrijf" required/>
      <!-- LinkedIn -->
      <input class="column-2" v-model="praesidium.linkedin" type="text" placeholder="LinkedIn" required/>
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
    <div v-if="grid.length">
      <div v-for="lid in grid" :key="lid.id" class="person">

        <!-- Praesidium Item -->
        <div v-if="lid.name != ''">
          <div class="person-wrap" @dblclick="changeData($event, lid)" @click="showData($event, lid)">
            <hover-image :image="lid.picture" :image-alt="lid.picture_alt"></hover-image>
            <h4 class="title top-shift">{{ lid.name }} {{ lid.surname }}</h4>
            <h4 class="sub-title bottom-shift">
              {{ lid.role.name }}
              <template v-if="lid.secondRole.value != -1"> & {{ lid.secondRole.name }}</template>
            </h4>
          </div>
        </div>

        <!-- Data Row -->
        <div v-else>
          <div class="data-row">
            <div v-if="gridItem">
              <hover-image :image="gridItem.picture" :image-alt="gridItem.picture_alt" class="data-image"></hover-image>
              <div class="data-field">
                <h4 v-if="columnSize > 1">
                  <span class="title">
                    {{ gridItem.name }} {{ gridItem.surname }}
                    <a v-if="gridItem.nickname"> ({{ gridItem.nickname }})</a>
                  </span>
                  <a v-if="gridItem.linkedin" :href="gridItem.linkedin">
                    <font-awesome-icon class="icon" :icon="{ prefix: 'fab', iconName: 'linkedin' }"/>
                  </a>
                </h4>
                <h6 class="sub-title">
                  <b v-if="columnSize > 1">{{ gridItem.role.name }}</b>
                  <a v-if="gridItem.role.mail">
                    <span v-if="columnSize > 1"> - </span>
                    <font-awesome-icon class="icon" :icon="{ prefix: 'fas', iconName: 'envelope' }"/>
                    <a :href="'mailto:' + gridItem.role.mail">{{ gridItem.role.mail }}</a>
                  </a>
                </h6>
                <h6 class="sub-title" v-if="gridItem.secondRole.value != -1">
                  <b v-if="columnSize > 1">{{ gridItem.secondRole.name }}</b>
                  <a v-if="gridItem.secondRole.mail">
                    <span v-if="columnSize > 1"> - </span>
                    <font-awesome-icon class="icon" :icon="{ prefix: 'fas', iconName: 'envelope' }"/>
                    <a :href="'mailto:' + gridItem.mail">{{ gridItem.secondRole.mail }}</a>
                  </a>
                </h6>
                <div>
                  <span>{{ gridItem.course }}</span>
                  <a v-if="gridItem.division">: {{ gridItem.division }}</a>
                  <a v-if="gridItem.school">, {{ gridItem.school }}</a>
                </div>
                <p><font-awesome-icon class="icon" :icon="{ prefix: 'fas', iconName: 'beer' }"/>{{ gridItem.drink }}</p>
                <p>{{ gridItem.text }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div v-else><loading-bar :path="path"></loading-bar></div>

    <!-- Add button -->
    <corner-button title="Add" icon="plus" @confirm="changeData($event)"></corner-button>
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
    components: { CornerButton, HoverImage, EditModal, LoadingBar },
    data() {
      return {
        RoleEnum: RoleEnum,
        praesidia: [],
        praesidium: null,
        picture: { normal: null, alt: null },

        path: 'praesidium',
        EditModal: { show: false, existingItem: false, title: '' },

        grid: [],
        gridItem: null,
        columnSize: 0,
      };
    },
    async created() {
      await this.getPraesidium()
      this.applyRouteID(this.id)
    },
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
        this.setGrid()
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

      // Grid layout
      setGrid() {
        // Get an array
        this.grid = []
        this.grid = this.praesidia.slice()
        const gridSize = this.grid.length

        // Find indexes at which data blocks should be inserted
        let inserts = []
        for (let index = 0; index < gridSize; index += this.columnSize) { inserts.push(index + this.columnSize) }

        // Apply insertions in reverse order so they don't intervene with each other
        inserts.reverse()
        inserts.forEach(insertion => {this.grid.splice(Math.min(insertion, gridSize), 0, new Praesidium())})
      },
      changeGrid() {
        // Change the amount of columns
        this.changeColumnSize()

        // Change the grid layout
        this.setGrid()

        if (this.gridItem && this.gridItem.name != 0) {
          // There was a data row shown before the grid change
          this.showData(null, this.gridItem)
        } else {
          // No data was shown
        }
      },
      delay(time, callback) { setTimeout(function(){ callback() }.bind(this), time); },
      showData(event, lid) {
        // Get index of selected item
        const itemIndex = this.praesidia.findIndex(gridItem => gridItem.id == lid.id)
        const rowIndex = Math.floor(itemIndex / this.columnSize)

        if (this.gridItem == null) {
          // Show data (reveal row)
          this.gridItem = lid
          const rows = document.querySelectorAll('.data-row');
          this.delay(100, () => {rows[rowIndex].classList.add('visible');})

        } else if (this.gridItem.id != lid.id) {
          // Show new data
          const rows = document.querySelectorAll('.data-row');
          // Close old window
          rows.forEach(row => { if (row.classList.contains('visible')) row.classList.remove('visible'); });
          // Open new window
          const newData = lid

          // Execute code after 1.1 second (1100 ms)
          this.delay(1100, () => {
            // We first need to make the object null so the image can rerender
            this.gridItem = null
            
            this.delay(100, () => {
              this.gridItem = newData
              rows[rowIndex].classList.add('visible');
            })
          })
        } else {
          // Hide old data
          const rows = document.querySelectorAll('.visible');
          rows.forEach(row => { if (row.classList.contains('visible')) row.classList.remove('visible'); });
          this.delay(1100, () => {this.gridItem = null})
        }
      },

      // Apply route ID
      applyRouteID(id) {
        if (id) {
          console.log(id)
          // Find the value
          const index = this.praesidia.findIndex(gridItem => {
            const lowerID = String(id).toLowerCase()
            // Try first name
            if (gridItem.name.toLowerCase() == lowerID) return true
            // Try last name
            if (gridItem.surname.toLowerCase() == lowerID) return true
            // Try first and last name (without space)
            if ((gridItem.name + gridItem.surname).toLowerCase() == lowerID) return true
            // Try first and last name (with space)
            if ((gridItem.name + ' ' + gridItem.surname).toLowerCase() == lowerID) return true
            // Try role
            if (gridItem.role.name.toLowerCase() == lowerID) return true
          })

          // If the ID is valid (index != -1) then continue with value
          if (index != -1) { this.showData(null, this.praesidia[index]) }
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
  }
  .person-wrap:hover {
    width: 324px;
    padding: 4px;
  }

  .data-row {
    height: 0px;
    width: 992px;
    background-color: #115F9A;
    transition: height 1s ease-in-out;
    overflow: hidden;
  }
  .data-row > * { visibility: visible; }
  .data-row > div { display: flex; padding: 8px; }
  .data-row.visible { height: 336px; }

  .data-image {
    width: 320px;
    height: 320px;
    padding-right: 20px;
    justify-content: center;
    transition: width 1s ease-in-out;
  }
  .data-field {
    text-align: left;
    font-size: 20px;
    color: #ffffff;;
    /* color: #353535; */
  }
  .data-field svg { margin-right: 4px; }


  @media screen and (max-width: 960px) {
    .data-row { width: 656px; }
    .data-row.visible { height: 160px; }
    .data-image { display: none; }
  }
  @media screen and (max-width: 640px) {
    .data-row { width: 320px; margin-top: -8px; }
    .data-row.visible { height: 160px; }
    .data-image { display: none; }
  }
</style>