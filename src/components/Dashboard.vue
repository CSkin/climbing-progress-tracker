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
        'white':  7.5
    }
    return conversionTable[grade]
}

const gradeNumericToColor = function(grade) {
    switch (Math.floor(grade)) {
        case 0: return 'Pink'
        case 1: return 'Red'
        case 2: return 'Orange'
        case 3: return 'Yellow'
        case 4: return 'Green'
        case 5: return 'Blue'
        case 6: return 'Black'
        case 7: return 'White'
    }
}

const calculateRatingGivenDataAndDate = function(data, date) {
    let climberRatingValues = [],
        targetDate = date,
        numericGrade, recency, recencyAdj, guessAdj, flashAdj, adjustedGrade, // Adj = Adjustment
        currentValue, currentWeight, weightedValue,
        sumOfWeightedValues = 0,
        sumOfWeights = 0

    data.forEach( day => {
        day.climbs.forEach( climb => {
            numericGrade = gradeColorToNumeric(climb.grade)
            recency = daysBetween(day.date, targetDate)
            recencyAdj = recency * (1/14) * -1
            guessAdj = climb.guess ? -1 : 0
            flashAdj = climb.flash ? 1 : 0
            adjustedGrade = numericGrade + recencyAdj + guessAdj + flashAdj
            adjustedGrade = Math.max(adjustedGrade, 0) // Prevent negative values
            climberRatingValues.push(adjustedGrade)
        })
    })

    climberRatingValues.sort((a, b) => (a < b)) // Descending order

    for (let index = 0; index < climberRatingValues.length; index++) {
        currentValue = climberRatingValues[index]
        currentWeight = 1 / Math.pow(index+1, 2)
        weightedValue = currentValue * currentWeight
        sumOfWeightedValues += weightedValue
        sumOfWeights += currentWeight
    }

    return ( sumOfWeightedValues / sumOfWeights )
}

const climberRating = computed(() => {
    let propsDataLength = props.data.length,
        rating
        
    if ( propsDataLength == 0 ) { rating = propsDataLength }
    else { rating = calculateRatingGivenDataAndDate(props.data, returnTodayString()) }

    return rating.toPrecision(2)
})

const climberColor = computed(() => {
    return gradeNumericToColor(climberRating.value)
})

const sectionColorStyle = computed(() => {
    return switchGradeColorStyle(climberColor.value.toLowerCase())
})

const graphProps = {
    data: props.data,
    calculateRating: calculateRatingGivenDataAndDate
}
</script>

<template>
    <section id="app-logo">
        <img alt="Vue logo" src="/src/assets/logo.svg" width="125" height="125" />            
    </section>

    <section id="climber-rating" :style="sectionColorStyle">
        <h1> {{ climberColor }} </h1>
        <h1> {{ climberRating }} </h1>
        <Graph v-bind="graphProps"/>
    </section>

    <section id="continue-prompt">
        <p>Tap or swipe to view timeline</p>
        <Continue />
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

img {
    -moz-transform: scaleY(-1);
    -o-transform: scaleY(-1);
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
}

h1, p {
    text-align: center;
}

h1 {
    font-size: 2em;
}

p {
    margin-bottom: 1em;
}
</style>
