import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

//Update web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDSO79YXJ0H3ebw4igN5gbe91PThOg-yJY",
//     authDomain: "wildfirehtml.firebaseapp.com",
//     databaseURL: "https://wildfirehtml-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "wildfirehtml",
//     storageBucket: "wildfirehtml.appspot.com",
//     messagingSenderId: "707123823334",
//     appId: "1:707123823334:web:80ae65898fa7419fc57127",
//     measurementId: "G-ZDDZ7VGPY0"
// };

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZetVdcwVH9mBIVl0yKk99O62budgrjTY",
    authDomain: "treekeeper-fe946.firebaseapp.com",
    databaseURL: "https://treekeeper-fe946-default-rtdb.firebaseio.com",
    projectId: "treekeeper-fe946",
    storageBucket: "treekeeper-fe946.appspot.com",
    messagingSenderId: "607122876533",
    appId: "1:607122876533:web:bdfd30fc8825304399303c",
    measurementId: "G-T4B59JM0TH"
};

//Initializing Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };

