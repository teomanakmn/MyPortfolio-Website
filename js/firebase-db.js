import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { app } from './firebase-config.js';

const db = getFirestore(app);
const storage = getStorage(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc, setDoc };

// Proje işlemleri
export async function addProject(projectData) {
    try {
        const docRef = await addDoc(collection(db, "projects"), {
            ...projectData,
            createdAt: new Date().toISOString()
        });
        return docRef.id;
    } catch (error) {
        console.error("Proje eklenirken hata:", error);
        throw error;
    }
}

export async function getProjects() {
    try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Projeler getirilirken hata:", error);
        throw error;
    }
}

export async function deleteProject(projectId) {
    try {
        await deleteDoc(doc(db, "projects", projectId));
    } catch (error) {
        console.error("Proje silinirken hata:", error);
        throw error;
    }
}

export async function updateProject(projectId, projectData) {
    try {
        const projectRef = doc(db, "projects", projectId);
        await updateDoc(projectRef, projectData);
    } catch (error) {
        console.error("Proje güncellenirken hata:", error);
        throw error;
    }
}

// Dosya yükleme işlemleri
export async function uploadFile(file) {
    try {
        const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Dosya yüklenirken hata:", error);
        throw error;
    }
}




