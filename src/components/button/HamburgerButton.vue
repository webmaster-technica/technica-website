<template>
  <div id="hamburger-icon" @click="toggleHamburger()">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
  export default {
    emits: ["toggleHamburger"],
    data() { return { toggled: false } },
    methods: {
      toggleHamburger() {
        const icon = document.getElementById('hamburger-icon')
        if (this.toggled) {
          icon.classList.remove('open');
        } else {
          icon.classList.add('open');
        }
        this.toggled = !this.toggled
        this.$emit('toggleHamburger', this.toggled);
      }
    },
  }
</script>

<style>
  /* https://codepen.io/designcouch/pen/ExvwPY */

  #hamburger-icon {
    width: 48px;
    height: 24px;
    position: relative;
    transform: rotate(0deg);
    transition: .5s ease-in-out;
    cursor: pointer;
  }

  #hamburger-icon span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: #ffffff;
    border-radius: 8px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
  }

  #hamburger-icon span:nth-child(1) { top: 0px; }
  #hamburger-icon span:nth-child(2), #hamburger-icon span:nth-child(3) { top: 12px; }
  #hamburger-icon span:nth-child(4) { top: 24px; }

  #hamburger-icon.open span:nth-child(1), #hamburger-icon.open span:nth-child(4) {
    top: 12px;
    width: 0%;
    left: 50%;
  }
  #hamburger-icon.open span:nth-child(2) { transform: rotate(45deg); }
  #hamburger-icon.open span:nth-child(3) { transform: rotate(-45deg); }

</style>