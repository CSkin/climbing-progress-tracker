import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

createApp(App).mount('#app')

export function scrollIntoView(el, behavior) {
    if (behavior) { el.scrollIntoView({ behavior: behavior }) }
    else { el.scrollIntoView({ behavior: "smooth" }) }
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
    let fg, mg, bg
    switch (grade) {
        case 'pink':   fg = '#000000'; mg = '#ff80bf'; bg = '#ff80bf'; break
        case 'red':    fg = '#ffffff'; mg = '#dd0000'; bg = '#dd0000'; break
        case 'orange': fg = '#000000'; mg = '#ff7500'; bg = '#ff7500'; break
        case 'yellow': fg = '#000000'; mg = '#dddd00'; bg = '#dddd00'; break
        case 'green':  fg = '#ffffff'; mg = '#006600'; bg = '#006600'; break
        case 'blue':   fg = '#ffffff'; mg = '#0000dd'; bg = '#0000dd'; break
        case 'black':  fg = '#ffffff'; mg = '#000000'; bg = '#000000'; break
        case 'white':  fg = '#000000'; mg = '#ffffff'; bg = '#ffffff'; break
        case 'v0':     fg = '#000000'; mg = '#ff80bf'; bg = '#ffffff'; break
        case 'v1':     fg = '#000000'; mg = '#dd0000'; bg = '#ffffff'; break
        case 'v2':     fg = '#000000'; mg = '#ff7500'; bg = '#ffffff'; break
        case 'v3':     fg = '#000000'; mg = '#dddd00'; bg = '#ffffff'; break
        case 'v4':     fg = '#000000'; mg = '#006600'; bg = '#ffffff'; break
        case 'v5':     fg = '#000000'; mg = '#0000dd'; bg = '#ffffff'; break
        case 'v6':     fg = '#000000'; mg = '#000000'; bg = '#ffffff'; break
        default:       fg = '#000000'; mg = '#bbbbbb'; bg = '#ffffff';
    }
    return {
        color: fg,
        borderColor: mg,
        backgroundColor: bg
    }
}

export function getViewportWidth() {
    return window.visualViewport.width
}

export function gradeToNumeric(grade) {
    const conversionTable = {
        'pink':   0,
        'red':    1,
        'orange': 2,
        'yellow': 3,
        'green':  4,
        'blue':   5,
        'black':  6,
        'white':  7
    }
    if (grade[0] == 'v') {
        return parseInt(grade.slice(1))
    } else {
        return conversionTable[grade]
    }
}

export function gradeNumericToColor(grade) {
    let adjustedGrade = Math.floor(parseFloat(grade) + 0.5)
    const gradeColorNameArray = [ 'Pink', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Black', 'White' ]
    return gradeColorNameArray[Math.min(adjustedGrade, 7)]
}

export function calculateRatingGivenDataAndDate(data, date) {
    let adjustedGrades = [],
        targetDate = date,
        numericGrade, recency, recencyAdj, guessAdj, flashAdj, adjustedGrade, // Adj = Adjustment
        currentSurplus = 0, // stores the current surplus value as the calculation progresses
        remainingDistance, // one minus the current surplus
        fractionalProduct // determines what fraction of remainingDistance gets added to currentSurplus

    data.forEach( day => {
        day.climbs.forEach( climb => {
            numericGrade = gradeToNumeric(climb.grade)
            recency = daysBetween(day.date, targetDate)
            recencyAdj = recency * (1/14) * -1
            guessAdj = climb.guess ? -0.5 : 0
            flashAdj = climb.flash ? 0.5 : 0
            adjustedGrade = numericGrade + recencyAdj + guessAdj + flashAdj
            adjustedGrade = Math.max(adjustedGrade, 0) // Prevent negative values
            adjustedGrades.push(adjustedGrade)
        })
    })

    adjustedGrades.sort((a, b) => (b - a)) // Descending order
    const hardestGrade = adjustedGrades.length > 0 ? adjustedGrades.shift() : 0  // get the highest adjusted grade on record
    const speedFactor = 2 // how quickly the remaining distance is closed; lower = faster

    while (adjustedGrades.length > 0) {
        remainingDistance = 1 - currentSurplus
        fractionalProduct = 1 / Math.pow(speedFactor, hardestGrade - adjustedGrades.shift() + 1)
        currentSurplus += remainingDistance * fractionalProduct
    }

    return hardestGrade + currentSurplus
}