//Base de datos relacional: Tablas donde los datos pueden estar relacionados entre si
//Base de datos no relacional: usa colecciones y documentos que se asimilan mucho a arrays y objetos, 
//es lo que se usa en el Firestore

//Firebase es una Aplicacion Serverless, no significa que no tenga servidor, sino que no lo tenemos que crear nos

//los documentos son similares a los objetos JS, llevan valores con keys, pero ademas necesitan un id propio
//(por estar en una base de datos), tienen un máximo valor de 1MB
// al ser noSQL, no son estructurados y cada documento puede tener distintos keys
// al no haber backend, no tenemos una manera tampoco de verificar que los keys sean correctos

//un documento de firebase puede tener una coleccion adentro, pero actua como pointer a dicha coleccion por
//lo que borrar dicho documento no elimina las subcolecciones

//la base de datos de firebase no admite undefined (sí admite null)
//la base de datos de firebase no admite array de arrays

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
---puedo obtener una collection, que en su parametro docs tiene un array con todos los documentos

import { db } from "../firebase/config.js"
import { collection, getDocs } from "firebase/firestore"

const productsRef = collection(db, "nombre de la collection");

getDocs(productsRef) //esto genera y devuelve una promise asi que puedo agregarle los metodos then, etc

---o puedo obtener un documento en particular

import { db } from "../firebase/config.js"
import { doc, getDoc } from "firebase/firestore"

const productsRef = doc(db, "nombre de la collection", "id del documento");

getDoc(productsRef) //esto genera y devuelve una promise asi que puedo agregarle los metodos then, etc

para hacer filtrados es mucho mas eficiente usar metodos de firebase (tipo query) que devuelva solo
los productos necesarios, en vez de filtrarlos manualmente despues de importarlos a todos

las imagenes se pueden cargar en el firebase storage y luego referenciarlas desde el token de acceso
*/

/*
SOLICITUD DE CREACION O MODIFICACION DE DATOS EN FIREBASE

import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase/config"

..

orderRef = collection(db, "orders")
addDoc(orderRef, orden).then( (doc) => console.log(doc.id)) 
//recordemos que en general los post en las apis devuelven una replica del objeto agregado si es exitoso

asi el id se define automaticamente, tambien se puede definir
*/