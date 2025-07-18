<script setup>
import { computed, defineProps } from 'vue'
import DayOff from './DayOff.vue'
import DayClimbsLogged from './DayClimbsLogged.vue'
import Back from './Back.vue'
import Add from './Add.vue'
import { daysBetween } from '../main'

const props = defineProps({
    data: Array,
    nav: Object,
    settings: Object
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
        currDayOn = array[index]
        nextDayOn = array[index+1]
        numDaysOff = daysBetween(currDayOn.date, nextDayOn.date) - 1
            for (let n = 0; n < numDaysOff; n++) {
                timelineDataMap.push(-1)
            }
        }
    })

    return timelineDataMap.reverse() // we reverse it so we can render the timeline from the bottom up so it defaults to the most recent entry
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
    <section id="timeline-container">
        <template v-for="day in timelineDataMap">
            <DayOff v-if="Math.sign(day) == -1"/>
            <DayClimbsLogged v-else v-bind="props.data[day]" @click="handleDaySelection(day)"/>
        </template>
    </section>
    <Back id="back" @click="props.nav.viewDashboard"/>
    <Add id="add" @click="props.nav.viewLogger"/>
</template>

<style scoped>
#timeline-container {
    padding: 2em 0;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
}

#back {
    position: absolute;
    top: 2vh;
    left: 2vw;
    height: 75px;
}

#add {
    position: absolute;
    bottom: 2vh;
    right: 2vw;
    height: 75px;   
}
</style>
