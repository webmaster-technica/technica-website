# technica-antwerpen

## Project setup
```npm install```

### Compiles and hot-reloads for development
```npm run serve```

### Run Locally
```vue serve```

### Compiles and minifies for production
```npm run build```

### Deploy to Firebase
```firebase deploy```
[hosting](https://technica-website-defc6.firebaseapp.com/)

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## CORS configuration
See [Configuration Reference](https://firebase.google.com/docs/storage/web/download-files).
gsutil cors set ~\technica-antwerpen\cors.json gs://**your-cloud-storage-bucket**

## domain tests
get free [domain](https://www.noip.com/).
[website domain link](http://technica1961.ddns.net)


## TODO
- Change join form into woth form tags (Join.vue)
- Find beter way to refresh (Preasidium.vue)

## Package Instalment
### FireBase
 - https://www.koderhq.com/tutorial/vue/firebase-firestore/
   - npm install firebase

### FontAwesome
 - https://fontawesome.com/docs/web/use-with/vue/
   - npm i --save @fortawesome/fontawesome-svg-core
   - npm i --save @fortawesome/free-solid-svg-icons
   - npm i --save @fortawesome/free-regular-svg-icons
   - npm i --save @fortawesome/free-brands-svg-icons
   - npm i --save @fortawesome/vue-fontawesome@latest-3
 - https://fontawesome.com/search

### FullCalender
 - https://fullcalendar.io/docs/vue
   - npm install --save @fullcalendar/core @fullcalendar/vue3
   - init fullcalander: https://fullcalendar.io/docs/vue
   - documentation: https://fullcalendar.io/docs/intro
   - event click: https://fullcalendar.io/docs/eventClick
   - event object: https://fullcalendar.io/docs/event-object

### EmailJS
 - https://www.freecodecamp.org/news/send-emails-from-your-vue-application/
   - npm install emailjs-com --save
 - https://dashboard.emailjs.com/admin
 - https://www.youtube.com/watch?v=NgWGllOjkbs
