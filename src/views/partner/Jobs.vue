<template>
  <!-- The model is used to edit data -->
  <edit-modal v-if="state.DEBUG && EditModal.show" :title="getTitle()" @closeEditModal="toggleEditModal">
    <!-- Input fields -->
    <template v-slot:inputs>
      <!-- Name -->
      <input class="column-2" v-model="job.name" type="text" placeholder="Voornaam" required/>
      <!-- Course -->
      <input class="column-2" v-model="job.course" type="text" placeholder="Richting" required/>
      <!-- Location -->
      <input class="column-2" v-model="job.location" type="text" placeholder="Locatie" required/>
      <!-- Partner -->
      <select class="column-2" v-model="job.partner">
        <option disabled selected value="">Partner</option>
        <template v-for="partner in partners">
          <option :value="partner.name">{{ partner.name }}</option>
        </template>
      </select>
    </template>
    <!-- PDF field -->
    <template v-slot:image>
      <div class="column-2">
        <label for="pdf" class="button-label">
          <template v-if="job.pdf">
            <template v-if="pdf"> {{ pdf.name }} </template>
            <template v-else> {{ job.name }}.pdf </template>
          </template>
          <template v-else>Load PDF</template>
        </label>
        <input @change="onFileChange($event)" id="pdf" type="file" accept="application/pdf" required/>
      </div>
    </template>
    <!-- Buttons -->
    <template v-slot:buttons>
      <div class="column-2"><button @click="confirm()">{{ getTitle() }}</button></div>
      <div class="column-2" v-if="EditModal.existingItem">
        <button @click="delJob($event, job.id, job.name)">Delete</button>
      </div>
    </template>
  </edit-modal>

  <!-- The main view -->
  <div id="main">
    <div v-if="jobs.length" id="jobs">
      <div id="job-filter">
        <div>
          <h5>Zoeken</h5>
          <input-button-field type="text" placeholder="zoeken" icon="magnifying-glass" @buttonClick="filterJobs($event, 'name')"/>
        </div>
        <div>
          <h5>Richting</h5>
          <ul><li v-for="course in checklists.courses" :key="checklists.courses">
              <input @click="filterJobs($event, 'course', course)" type="checkbox" style="transform: translateY(-3px);" required/> {{ course }}
          </li></ul>
        </div>
        <div>
          <h5>Plaats</h5>
          <ul><li v-for="location in checklists.locations" :key="checklists.locations">
              <input @click="filterJobs($event, 'location', location)" type="checkbox" style="transform: translateY(-3px);" required/> {{ location }}
          </li></ul>
        </div>
        <div>
          <h5>Bedrijf</h5>
          <ul><li v-for="partner in checklists.partners" :key="checklists.partners">
              <input @click="filterJobs($event, 'partner', partner)" type="checkbox" style="transform: translateY(-3px);" required/> {{ partner }}
          </li></ul>
        </div>
      </div>
      <div id="job-list">
        <h5>Vacatures</h5>
        <div v-for="jobItem in filteredJobs" :key="jobItem.id" class="job">
          <div class="job-wrap" @click="changeData($event, jobItem)">
            <h6><a :href="jobItem.pdf" target="_blank">{{ jobItem.name }}</a></h6>
          </div>
        </div>
      </div>
    </div>
    <div v-else><loading-bar :path="path"></loading-bar></div>

    <!-- Add button -->
    <corner-button v-if="state.DEBUG" title="Add" icon="plus" @confirm="changeData($event)"></corner-button>
  </div>
</template>

<script>
  import { getData, postData, putData, delData, getPDF, postPDF, delPDF } from '@/firebase';
  import { FirePartner, Job, FireJob } from '@/classes';
  
  import CornerButton from '@/components/button/CornerButton.vue';
  import InputButtonField from '@/components/button/InputButtonField.vue';
  import EditModal from '@/components/modals/EditModal.vue';
  import LoadingBar from '@/components/utility/LoadingBar.vue';

  export default {
    components: { CornerButton, InputButtonField, EditModal, LoadingBar },
    data() {
      return {
        partners: [],
        jobs: [],
        job: null,
        pdf : null,

        path: 'jobs',
        EditModal: { show: false, existingItem: false, title: '' },

        checklists: { courses: [], locations: [], partners: [] },
        filters: { courses: [], locations: [], partners: [], name: '' },
        filteredJobs: []
      }
    },
    async created() {
      await this.getPartner()
      await this.getJob()
    },
    methods: {
      // Firebase storage methods
      async getPDF(fileName = '') { return await getPDF(fileName) },
      async postPDF(fileName = '', file = null) { return await postPDF(fileName, file) },
      async delPDF(fileName = '') { await delPDF(fileName) },

      // Firebase database methods
      async getPartner() {
        const data = await getData('partners', [])
        data.forEach((doc) => { this.partners.push(new FirePartner(doc.id, doc.data())); })
      },
      async getJob() {
        const data = await getData(this.path, [])
        data.forEach((doc) => { this.jobs.push(new FireJob(doc.id, doc.data())); })
        this.makeChecklists()
        this.filterJobs()
      },
      async postJob() {
        // Add data remotely
        const id = await postData(this.path, this.job.json)

        // Add data locally
        this.jobs.push(this.job)
        //this.jobs.sort(function(a, b) { return a.role.value - b.role.value })
      },
      async putJob() {
        // Change data remotely
        await putData(this.path, this.job.id, this.job.json)

        // Change data locally
        const index = this.jobs.findIndex(job => job.id == this.job.id)
        this.jobs[index] = this.job
      },
      async delJob(event, id, name) {
        // Delete member locally
        const index = this.jobs.findIndex(job => job.id = id)
        if (index != -1) this.jobs.splice(index, 1)

        // Delete member remotely
        await delData(this.path, id)
        await delPDF(this.path, `${name}.pdf`)

        this.toggleEditModal()
      },

      // Edit values
      getTitle() { return this.EditModal.existingItem ? 'Job aanpassen' : 'Job toevoegen' },

      makeChecklists() {
        this.jobs.forEach(job => {
          if (!this.checklists.courses.includes(job.course)) { this.checklists.courses.push(job.course) }
          if (!this.checklists.locations.includes(job.location)) { this.checklists.locations.push(job.location) }
          if (!this.checklists.partners.includes(job.partner)) { this.checklists.partners.push(job.partner) }
        })
      },

      filterJobs(event, type, value) {
        // Adding works, removing not
        switch (type) {
          case 'name':
            this.filters.name = event
            break;
          case 'course':
            const cIndex = this.filters.courses.indexOf(value)
            if (cIndex != -1) this.filters.courses.splice(cIndex, 1)
            else this.filters.courses.push(value)
            break;
          case 'location':
            const lIndex = this.filters.locations.indexOf(value)
            if (lIndex != -1) this.filters.locations.splice(lIndex, 1)
            else this.filters.locations.push(value)
            break;
          case 'partner':
            const pIndex = this.filters.partners.indexOf(value)
            if (pIndex != -1) this.filters.partners.splice(pIndex, 1)
            else this.filters.partners.push(value)
            break;
          default: break;
        }
        // Copy jobs to new list
        this.filteredJobs = this.jobs.slice()
        // Filter jobs with certain names
        if (this.filters.name) this.filteredJobs = this.filteredJobs.filter(job => job.name.toLowerCase().includes(this.filters.name.toLowerCase()));
        // Filter jobs for a certain course
        if (this.filters.courses.length) this.filteredJobs = this.filteredJobs.filter(job => this.filters.courses.includes(job.course));
        // Filter jobs at a certain location
        if (this.filters.locations.length) this.filteredJobs = this.filteredJobs.filter(job => this.filters.locations.includes(job.location));
        // Filter jobs from a certain partner
        if (this.filters.partners.length) this.filteredJobs = this.filteredJobs.filter(job => this.filters.partners.includes(job.partner));

        // console.log(this.filteredJobs)
      },
      
      // Change data modal
      toggleEditModal() { this.EditModal.show = !this.EditModal.show; },
      changeData(event, job) {
        this.job = job ? job : new Job()
        // !!this.job.id returns true of id exist
        this.EditModal.existingItem = !!this.job.id
        this.pdf = null
        this.toggleEditModal()
      },

      async confirm() {
        // console.log(`Confirm: pre change data`, this.job.json)
        if (this.job.name) {
          // Change pdf
          if (this.pdf) {
            // console.log(`Confirm: pre pdf ${this.job.pdf}`)
            var fileName = `${this.pdf.name}.jpg`
            fileName = await this.postPDF(fileName, this.pdf)
            this.job.pdf = await this.getPDF(fileName)
            // console.log(`Confirm: post pdf ${this.job.pdf}`)
          }

          // Change data
          // console.log(`Confirm: post change data`, this.job.json)
          await this.job.id ? this.putJob() : this.postJob()
        }
        this.toggleEditModal()
      },
      async onFileChange(event) {
        var files = event.target.files;
        if (!files.length) return;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => (this.job.pdf = reader.result);
        this.pdf = files[0]
      }
    }
  }
</script>

<style scoped>
  #jobs { 
    display: inline-flex;
    width: 80%; 
    text-align: left;
  }
  #jobs > * { padding: 0 16px; color: #115F9A; }
  #jobs h5 { color: #353535; }

  #job-filter { width: 256px; }
  #job-filter > div { margin-bottom: 16px; }
  #job-filter ul { padding-left: 0; margin: 0 4px; }

  #job-list {
    flex-grow: 1;
    flex-shrink: 1;
  }
  #job-list .job { padding: 8px 0; }
  #job-list .job:not(:last-child) { border-bottom: 1px solid #353535; }
  #job-list a {
    text-decoration: none;
    color: #115F9A;
  }

  @media screen and (max-width: 720px) {
    #jobs { display: inline-block; }
    #job-filter { width: 100%; }
    #job-filter:first-child { width: 256px; }
  }

</style>