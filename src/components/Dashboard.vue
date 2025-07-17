<script setup>
import { computed, defineProps } from 'vue'
import Continue from './Continue.vue'
import Graph from './Graph.vue'
import { returnTodayString, daysBetween, switchGradeColorStyle } from '../main'

const props = defineProps({
    data: Array,
    nav: Object
})

const gradeColorToNumeric = function(grade) {
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
    return conversionTable[grade]
}

const gradeNumericToColor = function(grade) {
    let adjustedGrade = Math.floor(parseFloat(grade) + 0.5)
    const gradeColorNameArray = [ 'Pink', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Black', 'White' ]
    return gradeColorNameArray[Math.min(adjustedGrade, 7)]
}

const calculateRatingGivenDataAndDate = function(data, date) {
    let adjustedGrades = [],
        targetDate = date,
        numericGrade, recency, recencyAdj, guessAdj, flashAdj, adjustedGrade, // Adj = Adjustment
        currentSurplus = 0, // stores the current surplus value as the calculation progresses
        remainingDistance, // one minus the current surplus
        fractionalProduct // determines what fraction of remainingDistance gets added to currentSurplus

    data.forEach( day => {
        day.climbs.forEach( climb => {
            numericGrade = gradeColorToNumeric(climb.grade)
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

const climberRating = computed(() => {
    let propsDataLength = props.data.length,
        rating
        
    if ( propsDataLength == 0 ) { rating = propsDataLength }
    else { rating = calculateRatingGivenDataAndDate(props.data, returnTodayString()) }

    return rating.toPrecision(3)
})

const climberColor = computed(() => {
    return gradeNumericToColor(climberRating.value)
})

const sectionColorStyle = computed(() => {
    let rating = climberRating.value,
        prevGrade = Math.floor(rating),
        nextGrade = Math.ceil(rating),
        decimal = rating - prevGrade,
        gradeColorHexArray = [ '#ff80bf', '#dd0000', '#ff7500', '#dddd00', '#006600', '#0000dd', '#000000', '#ffffff' ],
        color1 = gradeColorHexArray[Math.min(prevGrade, 7)],
        color2 = gradeColorHexArray[Math.min(nextGrade, 7)],
        color3 = {}

    function hexToRgbObject(hex) {
        return {
            r: parseInt(hex.substring(1, 3), 16),
            g: parseInt(hex.substring(3, 5), 16),
            b: parseInt(hex.substring(5, 7), 16)
        }
    }

    function interpolateColors(c1, c2, decimal) {
        return Math.round(c1 + (c2 - c1) * decimal)
    }

    color1 = hexToRgbObject(color1)
    color2 = hexToRgbObject(color2)
    color3['r'] = interpolateColors(color1.r, color2.r, decimal)
    color3['g'] = interpolateColors(color1.g, color2.g, decimal)
    color3['b'] = interpolateColors(color1.b, color2.b, decimal)

    return {
        color: switchGradeColorStyle(climberColor.value.toLowerCase()).color,
        backgroundColor: `rgb(${color3.r}, ${color3.g}, ${color3.b})`
    }
})

const graphProps = computed(() => {
    return {
        data: props.data,
        calculateRating: calculateRatingGivenDataAndDate,
        fgColor: sectionColorStyle.value.color
    }
})
</script>

<template>
    <section id="app-logo">
        <img class="flip-Y" alt="Vue logo" src="/src/assets/logo.svg" width="125" height="125" />            
    </section>

    <section id="climber-rating" :style="sectionColorStyle">
        <h1> {{ climberColor }} </h1>
        <h1> {{ climberRating }} </h1>
        <Graph v-bind="graphProps"/>
    </section>

    <section id="nav-prompts">
        <div id="nav-left" class="container" @click="props.nav.viewSettings">
            <p class="long">Swipe left to view settings</p>
            <p class="short">Settings</p>
            <Continue class="flip-X"/>
        </div>
        <div id="nav-right" class="container" @click="props.nav.viewTimeline">
            <p class="long">Swipe right to view timeline</p>
            <p class="short">Timeline</p>
            <Continue />
        </div>
    </section>
</template>

<style scoped>
section {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1, p {
    text-align: center;
}

h1 {
    font-size: 2em;
}

p {
    margin-bottom: 0.75em;
}

#nav-prompts {
    flex-direction: row;
    justify-content: space-evenly;
}

.flip-X {
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
}

.flip-Y {
    -moz-transform: scaleY(-1);
    -o-transform: scaleY(-1);
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
}

@media (max-width: 600px) {
    p.long { display: none; }
}

@media (min-width: 601px) {
    p.short { display: none; }
}
</style>
