import './assets/style.css'

import { initializeApp } from "firebase/app";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: "AIzaSyDSHjnn8Nu28g-3NusvKi9Lt78GXA57-eo",
  authDomain: "todolist-48579.firebaseapp.com",
  projectId: "todolist-48579",
  storageBucket: "todolist-48579.firebasestorage.app",
  messagingSenderId: "1043837109081",
  appId: "1:1043837109081:web:13981d0e044ea0d9a38248"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)
app.mount('#app')
