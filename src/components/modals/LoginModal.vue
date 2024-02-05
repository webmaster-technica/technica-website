<!-- https://www.youtube.com/watch?v=KM1U6DqZf8M -->
<template>
  <div class="backdrop" @click.self="toggleLoginModal">
    <div class="modal">
      <div class="main">
        <h1>Login</h1>
        <div class="input-field">
          <select v-model="user.role">
            <option disabled selected value="">Functie</option>
            <template v-for="role in RoleEnum">
              <option v-if="role.value <= 13 && role.value != -1" :value="role.value">{{ role.name }}</option>
            </template>
          </select>
        </div>
        <div class="input-field">
          <input-button-field v-if="showPassword" :altField="true" icon="eye-slash" @buttonClick="toggleShow()">
            <template v-slot:altInput><input v-model="user.password" type="text" class="input" placeholder="Wachtwoord"/></template>
          </input-button-field>
          <input-button-field v-else :altField="true" icon="eye" @buttonClick="toggleShow()">
            <template v-slot:altInput><input v-model="user.password" type="password" class="input" placeholder="Wachtwoord"/></template>
          </input-button-field>
        </div>
        <button @click="login" type="submit" class="call-to-action">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { RoleEnum } from '@/enums';
  import InputButtonField from '@/components/button/InputButtonField.vue';

  export default {
    emits: ["toggleLoginModal"],
    components: { InputButtonField },
    data() {
      return {
        RoleEnum: RoleEnum,
        showPassword: false,
        user: { role: 13, password: '' },
        roles: [
          { name: 'webmaster', label: 'Webmaster' },
          { name: 'praeses', label: 'Praeses' },
          { name: 'vice_praeses', label: 'Vice-Praeses' },
          { name: 'quaestor', label: 'Quaestor' },
          { name: 'cantor', label: 'Cantor' },
          { name: 'ab_actis', label: 'Ab-Actis' },
          { name: 'schachtenmeester', label: 'Schachtenmeester' },
          { name: 'schachtentemmer', label: 'Schachtentemmer' },
          { name: 'zedenmeester', label: 'Zedenmeester' },
          { name: 'Feest', label: 'feest' },
          { name: '', label: '' },
          { name: '', label: '' },
          { name: '', label: '' },
          { name: '', label: '' },
        ]
      }
    },
    methods: {
      toggleLoginModal() { this.$emit('toggleLoginModal') },
      toggleShow() { this.showPassword = !this.showPassword; },
      login(event) {
        alert(`Username: ${this.user.role}\nPassword: ${this.user.password}`)
      }
    }
  }
</script>

<style scoped>
  .backdrop {
    top: 0;
    position: fixed;
    z-index: 12;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
  }

  .modal {
    width: 400px;
    padding: 20px;
    margin: 100px auto;
    background: white;
    border-radius: 10px;
  }

  .input-field { display: flex; }
  .input-field > button { width: 36px; }

  .input-field > *:not(button) {
    flex-grow: 1;
    flex-shrink: 1;
  }
</style>