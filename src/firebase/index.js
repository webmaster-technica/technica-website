import { initializeApp } from 'firebase/app'
import { getFirestore, query, where, limit, orderBy, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject, getBlob } from 'firebase/storage'
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

/* Excel */
export async function getExcel(fileName = '') {
  const storageRef = ref(storage, `leden/${fileName}`)
  const blob = await getBlob(storageRef)
    .then((blob) => { return blob.text() })
    .catch((error) => { return null });
  //const file = new File([blob], fileName, {type: 'text/csv'});
  return blob
}
export async function getExcelLink(fileName = '') {
  const storageRef = ref(storage, `leden/${fileName}`)
  const url = await getDownloadURL(storageRef)
    .then((url) => { return url })
    .catch((error) => { return null });
  return url
}
export async function postExcel(fileName = '', file = null) {
  // https://stackoverflow.com/a/46327909
  var blob = file.slice(0, file.size, 'text/csv'); 
  file = new File([blob], fileName, {type: 'text/csv'});

  const storageRef = ref(storage, `leden/${fileName}`)
  const uBytes = await uploadBytes(storageRef, file)
  return uBytes.metadata.name
}
export async function delExcel(fileName = '') {
  const storageRef = ref(storage, `leden/${fileName}`)
  deleteObject(storageRef)
}

/* PDF */
export async function getPDF(fileName = '') {
  const storageRef = ref(storage, `jobs/${fileName}`)
  const url = await getDownloadURL(storageRef)
  return url
}
export async function postPDF(fileName = '', file = null) {
  // https://stackoverflow.com/a/46327909
  var blob = file.slice(0, file.size, '.pdf'); 
  file = new File([blob], fileName, {type: 'application/pdf'});

  const storageRef = ref(storage, `jobs/${fileName}`)
  const uBytes = await uploadBytes(storageRef, file)
  return uBytes.metadata.name
}
export async function delPDF(fileName = '') {
  const storageRef = ref(storage, `jobs/${fileName}`)
  deleteObject(storageRef)
}

/* Photo */
export async function getPhoto(storageName = '', fileName = '') {
  const storageRef = ref(storage, `${storageName}/${fileName}`)
  const url = await getDownloadURL(storageRef)
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

/* Data */
// Filtering = [{ field: string, operator: operator, value: number }]
// Operators: - Logic: <, <=, == >, >=, !=
//            - Database (array) & value (value): array-contains, array-contains-any
//            - Database (value) & value (array): in, not-in
export async function getData(collectionName = '', filtering = [], ordering = '') {
  // Base query to the collection
  let baseQuery = query(collection(db, collectionName));

  // Filter the queried data if needed
  if (filtering) filtering.forEach(filter => {
    baseQuery = query(baseQuery, where(filter.field, filter.operator.value, filter.value))
  })

  // Order the queried data if needed
  if (ordering) baseQuery = query(baseQuery, orderBy(ordering))
  
  var data = []
  const querySnapshot = await getDocs(baseQuery)
  querySnapshot.forEach((doc) => { data.push(doc); });
  return data
}
export async function postData(collectionName = '', jsonData = null) {
  console.log('post', jsonData)
  const docRef = await addDoc(collection(db, collectionName), jsonData);
  console.log("Document was created with ID:", docRef.id);
  return docRef.id
}
export async function putData(collectionName = '', id = '', jsonData = null) {
  console.log('pu', jsonData)
  await updateDoc(doc(db, collectionName, id), jsonData);
}
export async function delData(collectionName = '', id = '') {
  await deleteDoc(doc(db, collectionName, id))
}

//https://www.koderhq.com/tutorial/vue/firebase-firestore/