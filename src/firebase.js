import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA7XKVxz3re0O62TxLdZHRsUqeyTUXGG0I",
    authDomain: "instagram-clone-52581.firebaseapp.com",
    databaseURL: "https://instagram-clone-52581.firebaseio.com",
    projectId: "instagram-clone-52581",
    storageBucket: "instagram-clone-52581.appspot.com",
    messagingSenderId: "923706049283",
    appId: "1:923706049283:web:0d7dcf2c6f02b4e68bdf36",
    measurementId: "G-0BH1TWLW14"
})

const db = firebaseApp.firestore();// just database lol
const auth = firebase.auth();// log in func
const storage = firebase.storage();// to upload image

export { db, auth, storage };