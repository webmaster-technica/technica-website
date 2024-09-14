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

const APP = createApp(App)

APP.use(store)
APP.use(router)
APP.use(VueGoogleMaps, { load: { key: 'AIzaSyCSxy1OAmiwSOHzV3ZKVhLdRLzc1wqzV-g' } })

APP.config.globalProperties.state = { DEBUG: false } 

APP.component('font-awesome-icon', FontAwesomeIcon)

APP.mount('#app')
