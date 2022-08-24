import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';



import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCgGwd8vDxBGsVzrdvdzMjKHqDu0VQSipE",
    authDomain: "crwn-clothing-db-e8984.firebaseapp.com",
    projectId: "crwn-clothing-db-e8984",
    storageBucket: "crwn-clothing-db-e8984.appspot.com",
    messagingSenderId: "311528012217",
    appId: "1:311528012217:web:e8cd7db896fdcfcc391e68"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider); 


export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd)=>{
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
      const docRef = doc(collectionRef,object.title.toLowerCase());
      batch.set(docRef,object);
    });

    await batch.commit();
    console.log('done')


}


export const getCategoriesAndDocuments = async ()=>{
  const collectionRef = collection(db,'categories');
  const q = query(collectionRef);


  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
  const {title,items} = docSnapshot.data();
  acc[title.toLowerCase()] = items;
  return acc

  },{})

  return categoryMap;

}

export const createUserDocumentFromAuth = async (userAuth,additonalInformation = {})=>{
  const userDocRef = doc(db, 'users', userAuth.uid);
  if(!userAuth) return;


  const userSnapshot = await getDoc(userDocRef);


  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additonalInformation
      });
    } catch(error){
      console.log('error creating the user',error.message)
    }
  }

  return userDocRef;

  //if user data exists
  //create/set the document with the data from userAuth in my collection

  //return userDocRef

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async ()=> await signOut(auth);

export const onAuthStateChangedListener = (callback)=> onAuthStateChanged(auth, callback);