//Base de datos relacional: Tablas donde los datos pueden estar relacionados entre si
//Base de datos no relacional: usa colecciones y documentos que se asimilan mucho a arrays y objetos, 
//es lo que se usa en el Firestore

//los documentos son similares a los objetos JS, llevan valores con keys, pero ademas ecesitan un id 
//(por estar en una base de datos)

//la diapo dice que se puede pegar la sdk en index.js de react, pero no es obligatorio, otra opcion 
//es crearle un archivo aparte

//para poder usar cada uno de los servicios de Firebase, se importan distintas funciones que luego se llaman
//en la app UNA OPCION ES CREAR FUNCIONES QUE USEN CADA UNO DE LOS SERVICIOS EN EL MISMO ARCHIVO QUE TIENE
//EL SDK DE FIREBASE Y QUEDA TODO LO RESPECTIVO ENCAPSULADO AHI, Y EXPORTAR LUEGO LOS METODOS QUE SIRVAN PARA
//CADA COSA

/* 
-- en un archivo firebase/config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbF937fmKTjUQf3deU35Df2lUx3pkkx7M",
  authDomain: "react-coderhouse-25568.firebaseapp.com",
  projectId: "react-coderhouse-25568",
  storageBucket: "react-coderhouse-25568.appspot.com",
  messagingSenderId: "905684116661",
  appId: "1:905684116661:web:877fa3c0e8aa02b4d78afc",
  measurementId: "G-EYBFCQYFHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

--en el lugar de uso

import { db } from "../firebase/config.js"
import { collection, getDocs } from "firebase/firestore"

const productsRef = collection(db, "nombre de la collection");

getDocs(productsRef) //esto genera y devuelve una promise asi que puedo agregarle los metodos then, etc
*/