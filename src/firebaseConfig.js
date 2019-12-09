import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAnVDU9EzE97SdgtZLm3v7L7AT26CuC1xI",
    authDomain: "yol-arkadasi.firebaseapp.com",
    databaseURL: "https://yol-arkadasi.firebaseio.com",
    projectId: "yol-arkadasi",
    storageBucket: "yol-arkadasi.appspot.com",
    messagingSenderId: "237017742917",
    appId: "1:237017742917:web:5a290b0b6adde7b53b6d2c",
    measurementId: "G-G5EVWHPTP9"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const fbauth = firebase.auth()

const settings = { /* timestampsInSnapshots: true */ }
db.settings(settings)

export { db, fbauth }

