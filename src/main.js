import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Firbase deploy

/* import FontAwesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebook, faGoogleDrive, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faAngleDown, faBeer, faDownload, faEnvelope, faEye, faEyeSlash, faGraduationCap,
         faLocationDot, faMagnifyingGlass, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

/* Google Maps */
import VueGoogleMaps from '@fawmi/vue-google-maps'

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
  faGraduationCap,
  faInstagram,
  faLinkedin,
  faLocationDot,
  faMagnifyingGlass,
  faPlus,
  faTrashCan
)

createApp(App).use(store).use(router)
.use(VueGoogleMaps, { load: { key: 'AIzaSyCSxy1OAmiwSOHzV3ZKVhLdRLzc1wqzV-g' } })
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
