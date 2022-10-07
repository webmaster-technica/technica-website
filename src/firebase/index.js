import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Initialize Firebase
const app = initializeApp({
    apiKey: 'AIzaSyCSxy1OAmiwSOHzV3ZKVhLdRLzc1wqzV-g',
    authDomain: 'technica-website-defc6.firebaseapp.com',
    projectId: 'technica-website-defc6',
    storageBucket: 'technica-website-defc6.appspot.com',
    messagingSenderId: '719325057031',
    appId: '1:719325057031:web:b92324e83b16ca90735aa2',
    measurementId: 'G-MDZ94Q2H70'
})


export const db = getFirestore(app)

//https://www.koderhq.com/tutorial/vue/firebase-firestore/