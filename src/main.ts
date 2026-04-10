import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Landing from "./Pages/Landing.vue"

import { createWebHistory, createRouter } from 'vue-router'
import CharacterBuilder from './Pages/CharacterBuilder/Index.vue'
import CharacterSheet from './Pages/CharacterSheet/Index.vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'

const routes = [
    { path: "/", component: Landing },
    { path: "/create", component: CharacterBuilder },
    { path: "/character-sheet/:id", component: CharacterSheet }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,

})

const pinia = createPinia()

const head = createHead()

createApp(App)
    .use(router)
    .use(pinia)
    .use(head)
    .mount('#app')
