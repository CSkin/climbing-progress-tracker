import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

createApp(App).mount('#app')

export function scrollIntoView(el) {
    el.scrollIntoView({ behavior: "smooth" });
}

export function returnTodayString() {
    const today = new Date()
    const yyyy = String(today.getFullYear())
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')

    return yyyy + '-' + mm + '-' + dd
}