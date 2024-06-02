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
        case 'pink':   fg = '#000000'; bg = '#ff80bf'; break
        case 'red':    fg = '#ffffff'; bg = '#dd0000';    break
        case 'orange': fg = '#000000'; bg = '#ff7500'; break
        case 'yellow': fg = '#000000'; bg = '#dddd00';    break
        case 'green':  fg = '#ffffff'; bg = '#006600'; break
        case 'blue':   fg = '#ffffff'; bg = '#0000dd';    break
        case 'black':  fg = '#ffffff'; bg = '#000000';    break
        case 'white':  fg = '#000000'; bg = '#ffffff';    break
    }
    return {
        color: fg,
        backgroundColor: bg
    }
}

export function getViewportWidth() {
    return window.visualViewport.width
}
