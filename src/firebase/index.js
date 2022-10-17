import { initializeApp } from 'firebase/app'
import { getFirestore, query, orderBy, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import imageCompression from 'browser-image-compression';

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
const db = getFirestore(app)
export const storage = getStorage(app)

export async function getPhoto(storageName = '', fileName = '') {
  const storageRef = ref(storage, `${storageName}/${fileName}`)
  const url =  await getDownloadURL(storageRef)
  return url
}
export async function postPhoto(storageName = '', fileName = '', file = null, maxPxSize = 1280) {
  // https://stackoverflow.com/a/46327909
  var blob = file.slice(0, file.size, 'image/*'); 
  file = new File([blob], fileName, {type: 'image/*'});
  // https://github.com/Donaldcwl/browser-image-compression
  file = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: maxPxSize, useWebWorker: true });
  const storageRef = ref(storage, `${storageName}/${fileName}`)
  const uBytes = await uploadBytes(storageRef, file)
  return uBytes.metadata.name
}
export async function delPhoto(storageName = '', fileName = '') {
  const storageRef = ref(storage, `${storageName}/${fileName}`)
  deleteObject(storageRef)
}
export async function getData(collectionName = '') {
  var data = []
  const querySnapshot = await getDocs(query(collection(db, collectionName), orderBy('role')));
  querySnapshot.forEach((doc) => { data.push(doc); });
  return data
}
export async function postData(collectionName = '', jsonData = null) {
  //console.log(jsonData)
  const docRef = await addDoc(collection(db, collectionName), jsonData);
  //console.log("Document was created with ID:", docRef.id);
}
export async function putData(collectionName = '', id = '', jsonData = null) {
  //console.log(jsonData)
  await updateDoc(doc(db, collectionName, id), jsonData);
  //console.log("Document was created with ID:", docRef.id);
}
export async function delData(collectionName = '', id = '') {
  await deleteDoc(doc(db, collectionName, id))
}

//https://www.koderhq.com/tutorial/vue/firebase-firestore/