<script setup>
import { computed, defineProps } from 'vue'
import DayOff from './DayOff.vue'
import DayClimbsLogged from './DayClimbsLogged.vue'
import Back from './Back.vue'
import Add from './Add.vue'

const props = defineProps({
    data: Array,
    methods: Object,
    nav: Object
})

const timelineDataMap = computed(() => {
    const daysOn = props.data
    const timelineDataMap = []
    let currDayOn, nextDayOn, numDaysOff
    
    // basically we are creating a new array where on-days are represented by their indices 
    // in the main data array, and off days are represented by -1
    daysOn.forEach((day, index, array) => {
        timelineDataMap.push(index)
        if ( index < array.length - 1 ) { // if this isn't the last element in the array
            currDayOn = new Date(array[index].date + "T12:00:00")
            nextDayOn = new Date(array[index+1].date + "T12:00:00")
            numDaysOff = (nextDayOn.getTime() - currDayOn.getTime()) / 86400000 - 1 // number of ms in a day
            for (let n = 0; n < numDaysOff; n++) {
                timelineDataMap.push(-1)
            }
        }
    })

    return timelineDataMap
})

const handleDaySelection = function(dayIndex) {
    const selectedDate = props.data[dayIndex].date
    const dateObject = new Date(selectedDate + "T12:00:00")
    const dateInputElement = document.getElementById('date')
    dateInputElement.valueAsDate = dateObject
    dateInputElement.dispatchEvent(new Event('input'))

    props.nav.viewLogger()
}
</script>

<template>
    <template v-for="day in timelineDataMap">
        <DayOff v-if="Math.sign(day) == -1" />
        <DayClimbsLogged v-else v-bind="props.data[day]" @click="handleDaySelection(day)"/>
    </template>
    <Back @click="props.nav.viewDashboard"/>
    <Add id="add" @click="props.nav.viewLogger"/>
</template>

<style scoped>
#add {
    position: absolute;
    bottom: 2vh;
    right: 2vw;
    height: 75px;   
}
</style>
