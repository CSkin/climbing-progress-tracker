<script setup>
import { computed, defineProps } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, LineElement, PointElement, TimeScale, LinearScale, Tooltip } from 'chart.js'
import 'chartjs-adapter-date-fns'
import { add, sub, isAfter, isBefore } from 'date-fns'
import { returnTodayString } from '../main'

ChartJS.register(LineElement, PointElement, TimeScale, LinearScale, Tooltip)

const props = defineProps({
    data: Array,
    calculateRating: Function
})

const chartDuration = { months: 1 }

const chartDataObject = computed(() => {
    let beginningOfTime, beginningOfTimeMinusOneDay, dataSinceTimeBegan,
        currentDay, currentDayPlusOneDay, dataThruCurrentDay, climberRatingOnCurrentDay,
        chartDataObject = {},
        today = returnTodayString()
    
    beginningOfTime = sub(returnTodayString(), chartDuration)
    beginningOfTimeMinusOneDay = sub(beginningOfTime, { days: 1 }) // subtract a day so we can use isAfter below
    dataSinceTimeBegan = props.data.filter( day => isAfter(day.date, beginningOfTimeMinusOneDay) )
    
    dataSinceTimeBegan.forEach( day => {
        currentDay = day.date
        currentDayPlusOneDay = add(currentDay, { days: 1 }) // add a day so we can use isBefore below
        dataThruCurrentDay = props.data.filter( day => isBefore(day.date, currentDayPlusOneDay) )
        climberRatingOnCurrentDay = props.calculateRating(dataThruCurrentDay, currentDay)
        chartDataObject[currentDay] = climberRatingOnCurrentDay
    })

    // Make sure the last data point in the graph is always today
    if ( Object.keys(chartDataObject).includes(today) ) {
        // do nothing
    } else {
        chartDataObject[today] = props.calculateRating(props.data, today)
    }

    return chartDataObject
})

const chartData = computed(() => {
    let datasetsArray = []

    datasetsArray.push({ data: chartDataObject.value })

    return { datasets: datasetsArray }
})

const chartOptions = {
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day'
            }
        }
    }
}
</script>

<template>
    <Line 
        id="climber-rating-graph"
        :options="chartOptions"
        :data="chartData"
    />
</template>

<style scoped>
canvas {
    max-height: 50vh
}
</style>
