import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

//Update web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSO79YXJ0H3ebw4igN5gbe91PThOg-yJY",
    authDomain: "wildfirehtml.firebaseapp.com",
    databaseURL: "https://wildfirehtml-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wildfirehtml",
    storageBucket: "wildfirehtml.appspot.com",
    messagingSenderId: "707123823334",
    appId: "1:707123823334:web:80ae65898fa7419fc57127",
    measurementId: "G-ZDDZ7VGPY0"
};

//Initializing Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
