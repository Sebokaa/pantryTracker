// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPIVvNFUEf-NSo1apS4cBWO9PXjaDMKXo",
  authDomain: "solo-pantry-projec.firebaseapp.com",
  projectId: "solo-pantry-projec",
  storageBucket: "solo-pantry-projec.appspot.com",
  messagingSenderId: "847138674080",
  appId: "1:847138674080:web:21749156065ce176c9c0c5",
  measurementId: "G-47Y7KC26HB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)
const imageDB = getStorage(app)


export {firestore, imageDB}
