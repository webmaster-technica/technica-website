<!-- https://www.youtube.com/watch?v=KM1U6DqZf8M -->
<template>
  <div class="backdrop" @click.self="closeLoginModal">
    <div class="modal">
      <h1>Login</h1>
      <div class="main">
        <div class="input-field">
          <input v-model="user.username" type="text" class="input" placeholder="Gebruiker"/>
        </div>
        <div class="input-field">
          <input v-if="showPassword" v-model="user.password" type="text" class="input" placeholder="Wachtwoord"/>
          <input v-else v-model="user.password" type="password" class="input" placeholder="Wachtwoord"/>
          <button @click="toggleShow">
            <font-awesome-icon v-if="showPassword" :icon="{ prefix: 'fas', iconName: 'eye-slash' }"/>
            <font-awesome-icon v-else :icon="{ prefix: 'fas', iconName: 'eye' }"/>
          </button>
        </div>
        <button @click="login" type="submit" class="call-to-action">Login</button>
      </div>
    </div>
  </div>
</template>

<script>  
  export default {
    data() {
      return {
        showPassword: false,
        user: { username: '', password: '' }
      }
    },
    methods: {
      closeLoginModal() { this.$emit('closeLoginModal') },
      toggleShow() { this.showPassword = !this.showPassword; },
      login(event) {
        alert(`Username: ${this.user.username}\nPassword: ${this.user.password}`)
      }
    }
  }
</script>

<style scoped>
  .modal {
    width: 400px;
    padding: 20px;
    margin: 100px auto;
    background: white;
    border-radius: 10px;
  }

  .backdrop {
    top: 0;
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
  }

  .input-field {
    width: 80%;
    display: flex;
  }

  .input-field > input {
    flex-grow: 1;
    flex-shrink: 1;
  }
</style>