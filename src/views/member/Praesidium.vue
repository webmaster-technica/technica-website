<template>
  <!-- The model is used to edit data -->
  <data-modal v-if="showDataModal" :title="modalTitle" @closeDataModal="toggleDataModal($event)" @confirm="confirm">
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
        <input @change="onFileChange($event, false)" id="picture" type="file" accept=".png, .jpg, .jpeg" required/>
      </div>
      <div class="image-div column-2">
        <img :src="praesidia.picture_alt" v-if="praesidia.picture_alt" alt="">
        <label for="picture_alt" class="button-label">Zotte foto</label>
        <input @change="onFileChange($event, true)" id="picture_alt" type="file" accept=".png, .jpg, .jpeg" required/>
      </div>
    </template>
  </data-modal>
  <div class="main">
    <button @click="changeData($event)">Add</button>
    <div v-if="praesidium.length">
      <div v-for="lid in praesidium" :key="lid.id" class="persons">
        <div class="person-wrap">
          <div class="person-image">
            <img class="image-normal" src="https://firebasestorage.googleapis.com/v0/b/technica-website-defc6.appspot.com/o/praesidium%2F%23anoniem.png?alt=media&token=11f7dcb1-1a18-48c1-86b0-71b9f4f0a345" alt="">
            <!-- <img class="image-normal" :src="lid.picture" />
            <img class="image-zot" :src="lid.picture_alt" /> -->
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
          <button @click="delPraesidium($event, lid.id)">Delete</button>
        </div>
      </div>
    </div>
    <div v-else><p>Loading preasidium ...</p></div>
  </div>
</template>

<script>
  import { db } from '@/firebase';
  import { query, orderBy, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
  import { Praesidium, FirePraesidium } from '@/classes';
  import { RoleEnum } from '@/enums';
  import DataModal from '@/components/DataModal.vue';

  export default {
    data() {
      return {
        RoleEnum: RoleEnum,
        praesidium: [],
        showDataModal: false,
        modalTitle: '',
        entityId: ''
      };
    },
    created() {
      this.getPraesidium();
    },
    methods: {
      async getPraesidium() {
        const querySnapshot = await getDocs(query(collection(db, "praesidium"), orderBy('role')));
        querySnapshot.forEach((doc) => {
          this.praesidium.push(new FirePraesidium(doc.id, doc.data()));
        });
        // console.log(this.praesidium);
      },
      async postPraesidium() {
        const docRef = await addDoc(collection(db, "praesidium"), this.praesidia.json);
        // console.log("Document was created with ID:", docRef.id);
        this.$forceUpdate();
      },
      async putPraesidium() {
        await updateDoc(doc(db, "praesidium", this.praesidia.id), this.praesidia.json);
        this.$forceUpdate();
      },
      async delPraesidium(event, id) {
        await deleteDoc(doc(db, "praesidium", id))
        this.$forceUpdate();
      },
      changeData(event, lid) {
        this.praesidia = lid ? lid : new Praesidium()
        this.modalTitle = this.praesidia.id ? "Praesidium aanpassen" : "Praesidium toevoegen"
        this.toggleDataModal()
          this.$forceUpdate()
      },
      toggleDataModal() { this.showDataModal = !this.showDataModal; },
      confirm() {
        this.praesidia.id ? this.putPraesidium() : this.postPraesidium()
        this.toggleDataModal()
      },
      onFileChange(event, alt) {
        var files = event.target.files;
        if (!files.length)
            return;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        if (alt)  reader.onload = () => (this.praesidia.picture_alt = reader.result);
        else      reader.onload = () => (this.praesidia.picture = reader.result);
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
  .person-image .image-zot {
    display: none;
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