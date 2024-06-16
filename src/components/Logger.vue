<script>
export default { inheritAttrs: false }
</script>

<script setup>
import { computed, defineProps, ref } from 'vue'
import Back from './Back.vue'
import Edit from './Edit.vue'
import Climb from './ClimbRow.vue'
import Add from './Add.vue'
import { returnTodayString } from '../main'

const props = defineProps({
    data: Array,
    nav: Object
})

const emit = defineEmits([
    'addButtonClicked',
    'gradeSelected',
    'guessIconClicked',
    'flashIconClicked',
    'noteIconClicked',
    'deleteButtonClicked'
])

const inputDate = ref(returnTodayString())

const headerDate = computed(() => {
    const inputDateObj = new Date(inputDate.value + "T12:00:00")
    const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(inputDateObj)
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(inputDateObj)
    const date = inputDateObj.getDate()
    const fullyear = inputDateObj.getFullYear()
    // only show the year if it's not the current year
    const year = fullyear != new Date().getFullYear() ? ", " + fullyear : ""

    return weekday + ", " + month + " " + date + year
})

const dayIndex = computed(() => {
    return props.data.findIndex( (day) => day.date == inputDate.value )
})

const climbs = computed(() => {
    if ( dayIndex.value >= 0 ){
        return props.data[dayIndex.value].climbs
    } else {
        return []
    }
})

const handleHeaderSelection = function() {
    console.log("Header clicked")
    document.getElementById('date').showPicker()
}

const handleGradeSelection = function(climbIndex, newValue) {
    emit('gradeSelected', dayIndex.value, climbIndex, newValue)
}
</script>

<template>
    <section id="header-container" @click="handleHeaderSelection">
        <Back @click.stop="props.nav.viewTimeline"/>
        <header id="date-header">
            <h1> {{ headerDate }} </h1>
            <Edit />
        </header>
        <div id="date-picker-container">
            <input type="date" id="date" name="date" v-model="inputDate">
            <div id="screen">
                <img alt="Open date picker" src="../assets/calendar.svg">
            </div>
        </div>
    </section>
    <section id="log-container">
        <header id="log-header">
            <h3><span></span>Grade</h3>
            <h3>Guess?</h3>
            <h3>Flash?</h3>
            <h3>Note</h3>
            <h3>Delete</h3>
        </header>
        <Climb
            v-for="(climb, climbIndex) in climbs"
            :climb="climb"
            :index="climbIndex"
            @grade-selected="handleGradeSelection"
            @guess-icon-clicked="$emit('guessIconClicked', dayIndex, climbIndex)"
            @flash-icon-clicked="$emit('flashIconClicked', dayIndex, climbIndex)"
            @note-icon-clicked="$emit('noteIconClicked', dayIndex, climbIndex)"
            @delete-button-clicked="$emit('deleteButtonClicked', dayIndex, climbIndex)"
        />
        <button id="add-button" type="button" @click="$emit('addButtonClicked', inputDate, headerDate)">
            <Add />
        </button>
    </section>
</template>

<style scoped>
section {
    --header-height: 14vh;
}

#header-container {
    height: var(--header-height);
    background-color: var(--color-background-mute);
    display: flex;
    justify-content: center;
    align-items: center;
}

.back {
    top: auto;
    bottom: auto;
    left: 2vw;
    width: 10vw;
    height: 10vw;
    max-width: 65px;
    max-height: 65px;
}

#date-header {
    max-width: 72vw;
    display: flex;
    align-items: center;
}

h1 {
    font-size: 2em;
    line-height: 1.2;
}

#date-picker-container {
    position: absolute;
    top: auto;
    bottom: auto;
    right: 2vw;
    width: 10vw;
    height: 10vw;
    max-width: 65px;
    max-height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#date {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
}

::-webkit-datetime-edit {
    display: none;
}

::-webkit-calendar-picker-indicator {
    width: 100%;
    height: 100%;
}

#screen {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--color-background-mute);
    pointer-events: none;
}

#screen > img {
    height: 100%;
    filter: invert(0);
}

#log-container {
    width: 100%;
    min-height: calc(100% - var(--header-height));
    padding: 2vh 4vw;
}

#log-container > * {
    width: 100%;
}

#log-header {
    height: 3vh;
    display: flex;
    align-items: center;
}

h3 {
    flex: 1;
    text-align: center;
    font-size: 1em;
    color: #808080;
    line-height: 1;
}

h3 > span {
    display: inline-block;
    width: 0.6em;
}

@media (min-width: 400px) {
    h3 {
        font-size: default;
    }

    h3 > span {
        width: 1.5em;
    }
}


h3:nth-of-type(1) {
    flex: 2.5;
    text-align: left;
}

button {
    height: 8vh;
    margin: 1vh 0 2vh 0;
    background-color: green;
    border: solid white 5px;
    border-radius: 2.5vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

button > svg {
    height: 100%;
}
</style>
