<template>
  <!-- The model is used to edit data -->
  <data-modal v-if="modal.show" :title="modal.title" @closeDataModal="toggleDataModal" @confirm="confirm">
    <!-- All input fields -->
    <template v-slot:inputs>
      <input class="column-2" v-model="event.name" type="text" placeholder="Naam" required/>
      <input class="column-2" v-model="event.link" type="text" placeholder="Facebook" required/>
      <input class="column-2" v-model="event.formsLink" type="text" placeholder="Google Forms" required/>
      <input class="column-2" v-model="event.date" type="date" placeholder="Date" required/>
      <input class="column-2" v-model="event.time" type="time" placeholder="Time" required/>
      <input class="column-2" v-model="event.location" type="Location" placeholder="Location" required/>
      <input class="column-2" v-model="event.price" type="text" placeholder="Price" required/>
      <textarea v-model="event.text" placeholder="Tekst" required></textarea>
    </template>
    <!-- Image field -->
    <div class="image-div">
      <img :src="event.picture" v-if="event.picture" alt="">
      <label for="picture" class="button-label">Banner</label>
      <input @change="onFileChange" id="picture" type="file" accept="image/*" required/>
    </div>
  </data-modal>
  <div class="main">
    <div class="box">
      <java-calender @eventClick="onClickEvent"></java-calender>
    </div>
  </div>
</template>

<script>
  import JavaCalender from '@/components/JavaCalender';
  import { TechnicaEvent, FireTechnicaEvent } from '@/classes'
  export default {
    props: ["id"],
    data() {
      return {
        events: [],
        modal: { show: false, title: '' },
        picture: null,
        path: 'Events'
      };
    },
    methods: {
      onClickEvent (event) {
        alert('date click! ' + event.start)
        console.log(event.start);
      },
      onFileChange(event) {
        var files = event.target.files;
        if (!files.length) return;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => (this.event.picture = reader.result);
        this.picture.normal = files[0]
      }
    },
    components: { JavaCalender }
}
</script>

<style scoped>
  .box {
    margin: 5%;
  }
</style>