import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDTnxgF9Zvrf0wJ3FwnDtrhqc4sl1Drd-E',
    authDomain: 'address-book-6f730.firebaseapp.com',
    databaseURL: 'https://address-book-6f730.firebaseio.com',
    projectId: 'address-book-6f730',
    storageBucket: 'address-book-6f730.appspot.com',
    messagingSenderId: '1055484033053',
    appId: '1:1055484033053:web:b4149da1e10b16a7702ef4',
    measurementId: 'G-65P8CHRKLB',
};

firebase.initializeApp(firebaseConfig);
const firestore = new firebase.firestore();

export { firestore };
