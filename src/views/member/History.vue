<template>
  <!-- The model is used to edit data -->
  <edit-modal v-if="EditModal.show" :title="getTitle()" @closeEditModal="toggleEditModal()"> <!-- @confirm="confirm" -->
    <!-- Input fields -->
    <template v-slot:inputs>
      <!-- Name -->
      <input class="column-2" v-model="member.name" type="text" placeholder="Voornaam" required/>
      <input class="column-2" v-model="member.surname" type="text" placeholder="Achternaam" required/>
      <!-- New Role -->
      <select class="column-2" v-model="newRole.role">
        <option disabled selected value="">Functie</option>
        <template v-for="role in RoleEnum">
          <option v-if="role.value != -1" :value="role">{{ role.name }}</option>
        </template>
      </select>
      <div class="column-2 button-column">
        <input-button-field type="number" placeholder="Jaar (semester 1)" icon="plus" @buttonClick="addRole($event)"/>
      </div>
      <!-- Roles -->
      <template v-for="(mRole, index) in member.roles">
        <select class="column-2" v-model="member.roles[index].role">
          <option disabled selected value="">Functie</option>
          <template v-for="role in RoleEnum">
            <option v-if="role.value != -1" :value="role">{{ role.name }}</option>
          </template>
        </select>
        <div class="column-2 button-column">
          <input-button-field :altField="true" icon="trash-can" @buttonClick="delRole($event, index)">
            <template v-slot:altInput>
              <input v-model="member.roles[index].year" type="number" placeholder="Jaar (semester 1)" required/>
            </template>
          </input-button-field>
        </div>
      </template>
      <!-- Allowed -->
      <div class="column-1" style="">
        <div style="flex: 0 0 32px; transform: translateY(-3px);">
          <input v-model="member.approved" type="checkbox" required/>
        </div>
        <div style="flex: 0 0 480px;">
          <div style="text-align: left; padding: 8px;">Persoon geeft toesteming om publiek in de stamboom te staan</div>
        </div>
      </div>
    </template>
    <!-- Buttons -->
    <template v-slot:buttons>
      <div class="column-2"><button @click="confirm()">{{ getTitle() }}</button></div>
      <div class="column-2" v-if="EditModal.existingItem"><button @click="delMember($event, member.id)">Delete</button></div>
    </template>
  </edit-modal>

  <!-- The main view -->
  <div id="main">
    <!-- Search functions -->
    <div id="search">
      <input-button-field type="text" placeholder="Firstname" icon="magnifying-glass" @buttonClick="searchMembers($event, 'name')"/>
      <input-button-field :altField="true" icon="magnifying-glass" @buttonClick="searchMembers($event, 'role')">
        <template v-slot:altInput>
          <select v-model="filter.role">
            <option disabled selected value="">Functie</option>
            <template v-for="role in RoleEnum">
              <option v-if="role.value != -1" :value="role">{{ role.name }}</option>
            </template>
          </select>
        </template>
      </input-button-field>
      <input-button-field type="number" placeholder="Jaar (semester 1)" icon="magnifying-glass" @buttonClick="searchMembers($event, 'year')"/>
      <div id="checkbox">
        See all: <div style="transform: translateY(-5px);"><input v-model="filter.seeAll" type="checkbox" required/></div>
      </div>
    </div>

    <!-- Grid -->
    <div v-if="members.length">
      <div v-for="lid in members" :key="lid.id" class="persons">
        <!-- <div class="person-wrap" @dblclick="changeData($event, lid)"> -->
        <div class="person-wrap" @click="changeData($event, lid)">
          <h4 class="title">{{ lid.name }} {{ lid.surname }}</h4>
          <template v-for="role in lid.roles">
            <h4 class="sub-title" :value="role">
              <span>{{ role.role.name }}:</span> {{ role.year }} - {{ incrementYear(role.year) }}
            </h4>
          </template>
        </div>
      </div>
    </div>
    <div v-else><loading-bar :path="path"></loading-bar></div>
    <!-- Add button -->
    <corner-button title="Add" icon="plus" @confirm="changeData($event)"/>
  </div>
</template>

<script>
  import { getData, postData, putData, delData } from '@/firebase';
  import { Member, FireMember } from '@/classes';
  import { QueryEnum, RoleEnum, getRoleEnumFromValue } from '@/enums';
  
  import CornerButton from '@/components/button/CornerButton.vue';
  import InputButtonField from '@/components/button/InputButtonField.vue';
  import EditModal from '@/components/modals/EditModal.vue';
  import LoadingBar from '@/components/utility/LoadingBar.vue';

  export default {
    components: { CornerButton, InputButtonField, EditModal, LoadingBar },
    data() {
      return {
        RoleEnum: RoleEnum,
        members: [],
        member: null,

        EditModal: { show: false, existingItem: false },
        newRole: { role: null, year: null },
        filter: { role: null, seeAll: false },

        path: 'history',
      };
    },
    // {field: 'roles', operator: QueryEnum.DB_ARRAY_CONTAINS, value: { year: 2023 }}
    created() {
      // Get current date
      const date = new Date()
      // Get current year after June else take the previous one
      const year = date.getUTCMonth() > 6 ? date.getUTCFullYear() : (date.getUTCFullYear() - 1)
      // Create all values on which one can filter (All functions of that year)
      var values = []
      for (const role in RoleEnum) if (RoleEnum.hasOwnProperty(role) && RoleEnum[role] != RoleEnum.NULL) values.push({ role: RoleEnum[role].value, year: year })
      // Get the data
      this.getMember([
        {field: 'approved', operator: QueryEnum.EQUAL, value: true},
        {field: 'roles', operator: QueryEnum.DB_ARRAY_CONTAINS_ANY, value: values}
      ])
    },
    methods: {
      // Firebase database methods
      async getMember(filters) {
        // Prepare filters
        let requests = []
        let baseFilters = []
        filters.forEach(filter => {
          if (filter && filter.field != 'approved') {
            if (filter.value.length > 25) {
              // There is a limit of 30 comparisons per value, so we will make multiple request if the filter length is over 25
              const numberOfRequests = Math.ceil(filter.value.length / 25)
              // Limit the comparisons to 25 per request
              for (let requestNumber = 0; requestNumber < numberOfRequests; requestNumber++) {
                // Math.min(requestNumber * 25 + 24, filter.value.length) returns the upper bound of a request
                // In case we have an array size of 60:
                //  - The first 2 comparisons sizes will be 25
                //  - The last comparisons size will be 10
                const comparisons = filter.value.slice(requestNumber * 25, Math.min(requestNumber * 25 + 24, filter.value.length))
                const request = {field: filter.field, operator: QueryEnum.DB_ARRAY_CONTAINS_ANY, value: comparisons}
                requests.push(request)
              }
            } else { requests.push(filter) }
          } else { baseFilters.push(filter) }
        })

        // Get data
        this.members = []
        requests.forEach(async request => {
          let filter = baseFilters.slice()
          filter.push(request)
          const docs = await getData(this.path, filter)
          docs.forEach((doc) => { this.members.push(new FireMember(doc.id, doc.data()));})
          this.members.sort(function(a, b) { return 64 * (a.roles[0].year - b.roles[0].year) + (a.roles[0].role.value - b.roles[0].role.value) })
        })
      },
      async postMember() { this.member.id = await postData(this.path, this.member.json) },
      async putMember() { await putData(this.path, this.member.id, this.member.json) },
      async delMember(event, id) {
        // Delete member locally
        const index = this.members.findIndex(member => member.id == id)
        //console.log(id, this.members)
        if (index != -1) this.members.splice(index, 1)
        //console.log(index, this.members)
        // Delete member remotely
        await delData(this.path, id)

        this.toggleEditModal()
      },

      // Search values
      searchMembers(event, queryType) {
        let queryFilter = null
        switch (queryType) {
          case 'name':
            if (event) queryFilter = {field: 'name', operator: QueryEnum.EQUAL, value: event}
            break;
          case 'role':
            if (this.filter.role) {
              // Get current date
              const date = new Date()
              // Get current year after June else take the previous one
              const currentYear = date.getUTCMonth() > 6 ? date.getUTCFullYear() : (date.getUTCFullYear() - 1)

              // Find all members with this role since the starting year of the club (1961)
              var values = []
              for (let year = 1961; year <= currentYear; year++) { values.push({ role: this.filter.role.value, year: year }) }
              queryFilter = {field: 'roles', operator: QueryEnum.DB_ARRAY_CONTAINS_ANY, value: values}
            }
            break;
          case 'year':
            if (event) {
              // Create all values on which one can filter (All functions of that year)
              var values = []
              for (const role in RoleEnum) if (RoleEnum.hasOwnProperty(role) && RoleEnum[role] != RoleEnum.NULL) {
                values.push({ role: RoleEnum[role].value, year: event})
              }
              console.log(event)
              queryFilter = {field: 'roles', operator: QueryEnum.DB_ARRAY_CONTAINS_ANY, value: values}
            }
            break;
          default: break;
        }
        if (queryFilter) {
          // Get the data
          let filters = [queryFilter]
          if (!this.filter.seeAll) filters.push({field: 'approved', operator: QueryEnum.EQUAL, value: true})
          this.getMember(filters)
        }
      },

      // Edit values
      getTitle() { return this.EditModal.existingItem ? 'Lid aanpassen' : 'Lid toevoegen' },
      incrementYear(year) { return parseInt(year) + 1 },

      // Role management
      addRole(event) {
        this.newRole.year = event
        if (this.newRole.year && this.newRole.role) {
          this.member.roles.push({ year: this.newRole.year, role: getRoleEnumFromValue(this.newRole.role.value)})
          this.member.roles.sort(function(a, b) { return 64 * (a.year - b.year) + (a.role.value - b.role.value) })
          this.newRole = { role: null, year: null }
        }
      },
      delRole(event, index) { this.member.roles.splice(index, 1) },
      
      // Change data modal
      toggleEditModal() { this.EditModal.show = !this.EditModal.show; },
      changeData(event, lid) {
        this.member = lid ? lid : new Member()
        // !!this.member.id returns true of id exist
        this.EditModal.existingItem = !!lid
        this.toggleEditModal()
      },

      async confirm() {
        if (this.newRole.year || this.newRole.role) alert("Add the new role")
        else if (this.member.name && this.member.surname) {
          // Sort data
          this.member.roles.sort(function(a, b) { return 64 * (a.year - b.year) + (a.role.value - b.role.value) })
          // console.log(`Confirm: pre change data`, this.member.json)

          // Change data for database
          this.member.roles.forEach(role => role.role = role.role.value)
          
          // Change data remotely
          await this.member.id ? this.putMember() : this.postMember()
          //console.log(`Confirm: post change data`, this.member.json)

          // Reverse changes
          this.member.roles.forEach(role => role.role = getRoleEnumFromValue(role.role))

          // Change data locally
          if (!this.EditModal.existingItem) {
            this.members.push(this.member)
            //console.log('Add new item locally', this.members)
            this.members.sort(function(a, b) { return 64 * (a.roles[0].year - b.roles[0].year) + (a.roles[0].role.value - b.roles[0].role.value) })
          }
          this.toggleEditModal()
        }
      }
    }
  }
</script>

<style scoped>
  h4 { color: #353535; }
  .title { 
    font-size: x-large;
    color: #115F9A;
    font-weight: bold;
  }
  .sub-title { font-size: large; }
  .sub-title > span { font-weight: bold; }
  .top-shift { margin-top: -96px; }
  .bottom-shift { margin-bottom: 48px; }

  #search > * { display: inline-flex; }
  #search .input-button-field { width: 260px; padding: 8px; }
  #search #checkbox {
    width: 96x;
    padding: 8px;
  }

  .persons { display: inline-flex; }
  .person-wrap { 
    width: 296px;
    padding: 8px;
    margin: 8px;
    background-image: url("../../assets/images/grunge.png");
  }
</style>