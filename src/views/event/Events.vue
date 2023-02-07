<template>
  <!-- The model is used to edit data -->
  <data-modal v-if="modal.show" :title="modal.title" @closeDataModal="toggleDataModal" @confirm="confirm">
    <template v-slot:inputs>
      <!-- All input fields -->
      <input class="column-2" v-model="event.name" type="text" placeholder="Naam" required/>
      <input class="column-2" v-model="event.link" type="text" placeholder="Facebook" required/>
      <input class="column-2" v-model="event.formsLink" type="text" placeholder="Google Forms" required/>
      <input class="column-2" v-model="event.date" type="date" placeholder="Datum" required/>
      <input class="column-2" v-model="event.time" type="time" placeholder="Tijd" required/>
      <input class="column-2" v-model="event.location" type="Location" placeholder="Locatie" required/>
      <input class="column-2" v-model="event.price" type="text" placeholder="Prijs" required/>
      <textarea v-model="event.text" placeholder="Tekst" required></textarea>
      <!-- Image field -->
      <div class="image-div">
        <img :src="event.picture" v-if="event.picture" alt="">
        <label for="picture" class="button-label">Banner</label>
        <input @change="onFileChange" id="picture" type="file" accept="image/*" required/>
      </div>
    </template>
  </data-modal>
  
  <div id="main">
    <!--add plus button-->
    <!--turn into modal:
      gives a bool for add
      gives a bool for edit
      gives a bool for delete
      returns a click event for change data
    -->
    <java-calender @eventClick="onClickEvent"></java-calender>
    <div><button @click="changeData($event)" class="fixedButton">Add</button></div>
  </div>
  <!--<router-link :to="{ name: 'EventDetails', params: { id: event.name } }">
    <h3>{{ event.name }} - {{ event.partner }}</h3>
  </router-link>-->
</template>

<script>
  import { TechnicaEvent, FireTechnicaEvent } from '@/classes'
  import JavaCalender from '@/components/JavaCalender.vue';
  import DataModal from '@/components/modals/EditModal.vue';
  export default {
    props: ["id"],
    data() {
      return {
        events: [],
        event: new TechnicaEvent(),
        modal: { show: false, title: '' },
        picture: null,
        path: 'Events'
      };
    },
    methods: {
      onClickEvent (event) {
        this.modal.title = 'Evenement aanpassen';
        this.toggleDataModal();
      },
      onFileChange(event) {
        var files = event.target.files;
        if (!files.length) return;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => (this.event.picture = reader.result);
        this.picture.normal = files[0]
      },
      async confirm() {
        // console.log(`Confirm: pre change data`, this.praesidia.json)
        if (this.event.name) {
          // alert('date click! ' + event.start)
          console.log(event.start);
        }
        this.toggleDataModal()
        this.$forceUpdate();
      },
      toggleDataModal() { this.modal.show = !this.modal.show; },
    },
    components: { JavaCalender, DataModal }
}
</script>

<style scoped>
</style>