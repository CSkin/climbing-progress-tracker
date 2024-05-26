<script setup>
import { defineProps } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip)

const props = defineProps({
    data: Array,
    calculateRating: Function
})

const chartData = {
    labels: [ 'Five Days Ago', 'Four Days Ago', 'Three Days Ago', 'Yesterday', 'Today' ],
    datasets: [ { data: [3.0, 3.5, 4.0, 4.5, 5.0] } ]
}

const chartOptions = {
    responsive: true
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

</style>
