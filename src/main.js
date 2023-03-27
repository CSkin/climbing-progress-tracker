import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

createApp(App).mount('#app')

export default function scrollIntoView(el) {
    el.scrollIntoView({ behavior: "smooth" });
}
