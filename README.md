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

## Debug/Edit mode
To edit the data pages (praesidium, partner, ...) go to the [main.js](./src/main.js) file and set the ```DEBUG``` variable to ```true```.
Make sure this variable is set to ```false``` when deploying.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## CORS configuration
See [Configuration Reference](https://firebase.google.com/docs/storage/web/download-files).
gsutil cors set ~\technica-antwerpen\cors.json gs://**your-cloud-storage-bucket**

## domain tests
get free [domain](https://www.noip.com/).
[website domain link](http://technica1961.ddns.net)

## Package Instalment
### FireBase
 - https://www.koderhq.com/tutorial/vue/firebase-firestore/
   - npm install firebase
   - npm install -g firebase-tools
   - firebase login

### FontAwesome
 - https://fontawesome.com/docs/web/use-with/vue/
   - npm i --save @fortawesome/fontawesome-svg-core
   - npm i --save @fortawesome/free-solid-svg-icons
   - npm i --save @fortawesome/free-regular-svg-icons
   - npm i --save @fortawesome/free-brands-svg-icons
   - npm i --save @fortawesome/vue-fontawesome@latest-3
 - https://fontawesome.com/search

### Calender
#### Google Calender
 - https://developers.google.com/calendar/api/guides
   - npm install --save googleapis@59
   - https://developers.google.com/calendar/api/guides/create-events#node.js
#### FB events
 - https://developers.facebook.com/docs/graph-api/get-started
 - https://developers.facebook.com/docs/graph-api/reference/event/
 - https://developers.facebook.com/docs/graph-api/reference/cover-photo/
#### FullCalender
 - https://fullcalendar.io/docs/vue
   - npm uninstall --save @fullcalendar/core@5 @fullcalendar/vue3@5 @fullcalendar/google-calendar@5
   - init fullcalander: https://fullcalendar.io/docs/vue
   - documentation: https://fullcalendar.io/docs/intro
   - event click: https://fullcalendar.io/docs/eventClick
   - event object: https://fullcalendar.io/docs/event-object
   - https://fullcalendar.io/docs/google-calendar

### Swiper
 - https://swiperjs.com/element#install--register-from-npm
 - https://swiperjs.com/swiper-api#param-initialSlide

### Google Maps
 - https://vue-map.netlify.app/docs/
 - https://console.cloud.google.com/projectselector2/google/maps-apis/credentials?utm_source=Docs_CreateAPIKey&utm_content=Docs_maps-backend&authuser=3&rapt=AEjHL4OgRNZdd9WRQPUAqbRZur9tLkeg62GV4no42I4Utv2m74B855pkMcmHZN-GyHoXiyy0WkZMFc2aAVBAbBiirfN6m1fWc91u2nn54JqbIml-q7FLQeA
 - https://developers.google.com/maps/documentation/javascript/