import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Firbase deploy

/* import fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebook, faGoogleDrive, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faAngleDown, faBeer, faDownload, faEnvelope, faEye, faEyeSlash, 
         faLocationDot, faMagnifyingGlass, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

// https://fontawesome.com/icons/dropbox?s=solid&f=brands
// https://fontawesome.com/search?o=r&s=solid
library.add(
  faAngleDown,
  faBeer,
  faDownload,
  faEnvelope,
  faEye,
  faEyeSlash,
  faFacebook,
  faGoogleDrive,
  faInstagram,
  faLinkedin,
  faLocationDot,
  faMagnifyingGlass,
  faPlus,
  faTrashCan
)

createApp(App).use(store).use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
