import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Firbase deploy
// https://www.youtube.com/watch?v=a-0W40NM0dI

/* import fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebook, faInstagram, faLinkedin, faDropbox } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLocationDot, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

// https://fontawesome.com/icons/dropbox?s=solid&f=brands
// https://fontawesome.com/search?o=r&s=solid
library.add(
    faDropbox,
    faEnvelope,
    faEye,
    faEyeSlash,
    faFacebook,
    faInstagram,
    faLinkedin,
    faLocationDot
)

createApp(App).use(store).use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
