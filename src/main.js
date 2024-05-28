import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

createApp(App).mount('#app')

export function scrollIntoView(el) {
    el.scrollIntoView({ behavior: "smooth" });
}

export function returnTodayString() {
    let today = new Date()
    let yyyy = String(today.getFullYear())
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let dd = String(today.getDate()).padStart(2, '0')

    return yyyy + '-' + mm + '-' + dd
}

export function daysBetween (pastDay, futureDay) {
    let pastDate = new Date(pastDay + "T12:00:00")
    let futureDate = new Date(futureDay + "T12:00:00")
    return (futureDate.getTime() - pastDate.getTime()) / 86400000 // number of ms in a day
}

export function switchGradeColorStyle(grade) {
    let fg, bg
    switch (grade) {
        case 'pink':   fg = '#000'; bg = '#ff80bf'; break
        case 'red':    fg = '#fff'; bg = '#d00';    break
        case 'orange': fg = '#000'; bg = '#ff7500'; break
        case 'yellow': fg = '#000'; bg = '#dd0';    break
        case 'green':  fg = '#fff'; bg = '#006600'; break
        case 'blue':   fg = '#fff'; bg = '#00d';    break
        case 'black':  fg = '#fff'; bg = '#000';    break
        case 'white':  fg = '#000'; bg = '#fff';    break
    }
    return {
        color: fg,
        backgroundColor: bg
    }
}

export function getViewportWidth() {
    return window.visualViewport.width
}
