// Firebase yapılandırması
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase yapılandırma bilgileri
const firebaseConfig = {
    apiKey: "AIzaSyCYakmE6XSRc_Kq1MCjw3svugRZT55h2DU",
    authDomain: "site-8969e.firebaseapp.com",
    projectId: "site-8969e",
    storageBucket: "site-8969e.firebasestorage.app",
    messagingSenderId: "49684651933",
    appId: "1:49684651933:web:f76b4d86f9f81eaef49974",
    measurementId: "G-XX0E1XGTBV"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Firebase servislerini ve fonksiyonlarını dışa aktar
export { 
    app, 
    auth, 
    db,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    getDoc,
    setDoc,
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
};



