<template>
  <!-- The model is used to edit data -->
  <edit-modal v-if="EditModal.show" :title="EditModal.title" @closeEditModal="toggleEditModal" @confirm="confirm">
    <template v-slot:inputs>
      <!-- All input fields -->
      <input class="column-2" v-model="event.name" type="text" placeholder="Naam" required/>
      <input class="column-2" v-model="event.location" type="Location" placeholder="Locatie" required/>
      <input class="column-2" v-model="event.date" type="date" placeholder="Datum" required/>
      <input class="column-2" v-model="event.time" type="time" placeholder="Tijd" required/>
      <input class="column-2" v-model="event.price" type="text" placeholder="Prijs" required/>
      <select class="column-2" v-model="event.type">
        <option disabled selected value="undefined">Type</option>
        <option v-for="activity in EventEnum" :value="activity">{{ activity.name }}</option>
      </select>
      <input class="column-2" v-model="event.link" type="text" placeholder="Facebook" required/>
      <input class="column-2" v-model="event.formsLink" type="text" placeholder="Google Forms" required/>
      <textarea v-model="event.text" placeholder="Tekst" required></textarea>
    </template>
    <template v-slot:image>
      <!-- Image field -->
      <div class="image-div">
        <img :src="event.picture" v-if="event.picture" alt="">
        <label for="picture" class="button-label">Banner</label>
        <input @change="onFileChange" id="picture" type="file" accept="image/*" required/>
      </div>
    </template>
  </edit-modal>
  
  <div id="main">
    <!--add plus button-->
    <!--turn into modal:
      gives a bool for add
      gives a bool for edit
      gives a bool for delete
      returns a click event for change data
    -->
    <div v-if="events.length">
      <java-calender @eventClick="onClickEvent" :calender-events="events"></java-calender>
      <corner-button title="Add" @confirm="changeData($event)"></corner-button>
    </div>
    <div v-else><h3 class="loading">Loading events ...</h3></div>
  </div>
  <!--<router-link :to="{ name: 'EventDetails', params: { id: event.name } }">
    <h3>{{ event.name }} - {{ event.partner }}</h3>
  </router-link>-->
</template>

<script>
  import { getData, postData, putData, delData, getPhoto, postPhoto, delPhoto } from '@/firebase';
  import { TechnicaEvent, FireTechnicaEvent } from '@/classes'
  import { EventEnum } from '@/enums';
  import JavaCalender from '@/components/JavaCalender.vue';
  import EditModal from '@/components/modals/EditModal.vue';
  import ViewModal from '@/components/modals/ViewModal.vue';
  import CornerButton from '@/components/CornerButton.vue';

  export default {
    data() {
      return {
        EventEnum: EventEnum,
        events: [],
        event: null,
        picture: null,

        EditModal: { show: false, title: '' },
        ViewModal: { show: false, title: '' },

        path: 'events'
      };
    },
    created() { this.getTechnicaEvent() },
    methods: {
      // Firebase storage methods
      async getPhoto(fileName = '') { return await getPhoto(this.path, fileName) },
      async postPhoto(fileName = '', file = null) { return await postPhoto(this.path, fileName, file, 1920) },
      async delPhoto(fileName = '') { await delPhoto(this.path, fileName) },

      // Firebase database methods
      async getTechnicaEvent() {
        const data = await getData(this.path, '', '', '')
        data.forEach((doc) => { this.events.push(new FireTechnicaEvent(doc.id, doc.data())); })
        // console.log(this.events);
      },
      async postTechnicaEvent() { await postData(this.path, this.event.json) },
      async putTechnicaEvent() { await putData(this.path, this.event.id, this.event.json) },
      async delTechnicaEvent(event, id, name) { 
        await delData(this.path, id)
        await delPhoto(this.path, `${name}.jpg`)
        await delPhoto(this.path, `${name}_alt.jpg`)
        // TODO: Change reload
        this.$router.go(this.$router.currentRoute)
      },

      toggleViewModal() { this.ViewModal.show = !this.ViewModal.show; },
      onClickEvent(event) {
        var activity = this.events.find(calenderEvent => calenderEvent.id.includes(event.id))
        this.EditModal.title = 'Evenement aanpassen';
        this.changeData(event, activity);
      },

      toggleEditModal() { this.EditModal.show = !this.EditModal.show; },
      changeData(event, activity) {
        this.event = activity ? activity : new TechnicaEvent()
        // console.log(lid)
        this.EditModal.title = this.event.id ? "event aanpassen" : "event toevoegen"
        this.picture = null
        this.toggleEditModal()
      },

      async confirm() {
        console.log(`Confirm: pre change data`, this.event.json)
        // Change picture
        if (this.event.name && this.picture) {
            // console.log(`Confirm: pre picture ${this.event.picture}`)
            var fileName = `${this.event.name}.jpg`
            fileName = await this.postPhoto(fileName, this.picture)
            this.event.picture = await this.getPhoto(fileName)
            // console.log(`Confirm: post picture ${this.event.picture}`)
        }
        await this.event.id ? this.putTechnicaEvent() : this.postTechnicaEvent()
        this.toggleEditModal()
      },
      onFileChange(event) {
        var files = event.target.files;
        if (!files.length) return;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => (this.event.picture = reader.result);
        this.picture = files[0]
      }
    },
    components: { EditModal, ViewModal, CornerButton, JavaCalender }
}
</script>

<style scoped>
</style>