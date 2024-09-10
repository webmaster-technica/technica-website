<template>
  <!-- The model is used to edit data -->
  <!-- <edit-modal v-if="EditModal.show" :title="EditModal.title" @closeEditModal="toggleEditModal" @confirm="confirm">
    <template v-slot:inputs>
      <!- All input fields ->
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
      <!- Image field ->
      <div class="image-div">
        <img :src="event.picture" v-if="event.picture" alt="">
        <label for="picture" class="button-label">Banner</label>
        <input @change="onFileChange" id="picture" type="file" accept="image/*" required/>
      </div>
    </template>
  </edit-modal> -->
  
  <!-- The main view -->
  <div id="main">

    <div v-if="events"> <!-- .length -->
      <iframe v-if="callanderSize.large"        src="https://calendar.google.com/calendar/embed?height=666&wkst=2&ctz=Europe%2FBrussels&bgcolor=%23ffffff&showTitle=0&showPrint=0&showCalendars=0&showTz=0&hl=nl&src=Y181ZDJmMzJmN2Y1NmZiZWRhNjYzZTQwMjAxYzJmZWQxNWRmZjdhMDM4YWYxNjdmYzJkZDNjMzRiNmMxMDE4MTIwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%234285F4" style="border-width:0" width="1200" height="800" frameborder="0" scrolling="no"></iframe>
      <iframe v-else-if="callanderSize.medium"  src="https://calendar.google.com/calendar/embed?height=480&wkst=2&ctz=Europe%2FBrussels&bgcolor=%23ffffff&showTitle=0&showPrint=0&showCalendars=0&showTz=0&hl=nl&mode=MONTH&src=Y181ZDJmMzJmN2Y1NmZiZWRhNjYzZTQwMjAxYzJmZWQxNWRmZjdhMDM4YWYxNjdmYzJkZDNjMzRiNmMxMDE4MTIwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%234285F4" style="border-width:0" width="800" height="540" frameborder="0" scrolling="no"></iframe>
      <iframe v-else                            src="https://calendar.google.com/calendar/embed?height=320&wkst=2&ctz=Europe%2FBrussels&bgcolor=%23ffffff&showTitle=0&showPrint=0&showCalendars=0&showTz=0&hl=nl&mode=WEEK&showTabs=0&src=Y181ZDJmMzJmN2Y1NmZiZWRhNjYzZTQwMjAxYzJmZWQxNWRmZjdhMDM4YWYxNjdmYzJkZDNjMzRiNmMxMDE4MTIwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%234285F4" style="border-width:0" width="540" height="320" frameborder="0" scrolling="no"></iframe>
      <!-- On small screen -->
      <!-- <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FBrussels&bgcolor=%23ffffff&showTitle=0&showPrint=0&showTz=0&showCalendars=0&mode=AGENDA&showTabs=0&showDate=0&showNav=0&src=Y19iYzgyMjU0OWI5OTVhZmVkN2MzMzBkZjc0YTRlYzJmNmQ3ZTFjMGRjMGE2ZDA5NjViNTAxOTNhNzg5OTIwOTRlQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%234285F4" class="calendar" frameborder="0" scrolling="no"></iframe> -->
    </div>
    <div v-else><loading-bar :path="path"></loading-bar></div>

    <!-- Add button -->
    <!-- <corner-button title="Add" icon="plus" @confirm="changeData($event)"></corner-button> -->
  </div>
  <!--<router-link :to="{ name: 'EventDetails', params: { id: event.name } }">
    <h3>{{ event.name }} - {{ event.partner }}</h3>
  </router-link>-->
</template>

<script>
  import { getData, postData, putData, delData, getPhoto, postPhoto, delPhoto } from '@/firebase';
  import { TechnicaEvent, FireTechnicaEvent } from '@/classes'
  import { EventEnum } from '@/enums';

  import CornerButton from '@/components/button/CornerButton.vue';
  import EditModal from '@/components/modals/EditModal.vue';
  import LoadingBar from '@/components/utility/LoadingBar.vue';

  export default {
    components: { CornerButton, EditModal, LoadingBar },
    data() {
      return {
        EventEnum: EventEnum,
        events: [],
        event: null,
        picture: null,

        EditModal: { show: false, title: '' },

        callanderSize: { large: true, medium: false },

        path: 'events',
      };
    },
    created() { this.getTechnicaEvent() },
    mounted() { this.$nextTick(() => { window.addEventListener('resize', this.changeCalanderSize); }) },
    beforeDestroy() { window.removeEventListener('resize', this.changeCalanderSize); },
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
        //this.addEventsToCalender()
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

      changeCalanderSize() {
        const windowWidth = window.innerWidth
        this.callanderSize.large = windowWidth > 1240
        this.callanderSize.medium = 1240 >= windowWidth && windowWidth > 830
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
      },

      handleDateClick: function(arg) { /* alert('date click! ' + arg.dateStr) */ },
      handleEventClick: function(arg) {
        arg.jsEvent.preventDefault(); // don't let the browser navigate
        this.onClickEvent(arg.event);
      },
      addEventsToCalender(){
        this.calendarOptions.events = []
        this.events.forEach(event => {
        });
      }
    }
  }
</script>

<style scoped>
  .calendar {
    padding: 0% 5%;
    width: 90%;
    height: 45vw;
  }
  .fc-event-title { font-weight: bold; }
</style>