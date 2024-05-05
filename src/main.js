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
        case 'pink':   fg = 'black'; bg = '#ff80bf'; break
        case 'red':    fg = 'white'; bg = '#d00';    break
        case 'orange': fg = 'black'; bg = '#ff7500'; break
        case 'yellow': fg = 'black'; bg = '#dd0';    break
        case 'green':  fg = 'white'; bg = '#006600'; break
        case 'blue':   fg = 'white'; bg = '#00d';    break
        case 'black':  fg = 'white'; bg = 'black';   break
        case 'white':  fg = 'black'; bg = 'white';   break
    }
    return {
        color: fg,
        backgroundColor: bg
    }
}
