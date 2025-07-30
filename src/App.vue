<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import Settings from './components/Settings.vue'
import Dashboard from './components/Dashboard.vue'
import Timeline from './components/Timeline.vue'
import Logger from './components/Logger.vue'
import { 
  scrollIntoView, 
  gradeNumericToColor, 
  calculateRatingGivenDataAndDate, 
  returnTodayString 
} from './main'
import { compareAsc } from 'date-fns'

const data = reactive([])

// Saving
const storeData = function() {
  const jsonData = JSON.stringify(data)
  localStorage.setItem('data', jsonData)
}

// Loading
if ( localStorage.length > 0 ) {
  const storedData = localStorage.getItem('data')
  const parsedData = JSON.parse(storedData)
  parsedData.forEach( day => { data.push(day) })
}

const settingsPage = ref(null)
const dashboard = ref(null)
const timeline = ref(null)
const logger = ref(null)

const nav = {
  viewSettings: function() {
    scrollIntoView(settingsPage.value)
  },
  viewDashboard: function() {
    scrollIntoView(dashboard.value)
  },
  viewTimeline: function() {
    scrollIntoView(timeline.value)
    storeData()
  },
  viewLogger: function() {
    scrollIntoView(logger.value)
  }
}

const settings = reactive({
  gradeOptions: {
    colors: true,
    numbers: false
  }
})

const findDayIndex = function(date) {
  return data.findIndex( (day) => day.date == date )
}

const addDay = function(date, header) {
  data.push({
    date: date,
    header: header,
    climbs: []
  })
  // sort the Day objects by their Date property
  data.sort((day1, day2) => (compareAsc(day1.date, day2.date)))
}

const climberRating = computed(() => {
  let dataLength = data.length,
      rating
  if ( dataLength == 0 ) { rating = dataLength }
  else { rating = calculateRatingGivenDataAndDate(data, returnTodayString()) }
  return rating.toPrecision(3)
})

const defaultGrade = computed(() => {
  let ratingMinusOne = Math.max(Math.floor(climberRating.value) - 1, 0) // climber's rating rounded down minus one, clamped to positive
  if (!settings.gradeOptions.colors) {
    return "v" + ratingMinusOne
  } else {
    return gradeNumericToColor(ratingMinusOne).toLowerCase()
  }
})

const addClimb = function(date, header) {
  let dayIndex = findDayIndex(date)
  if ( dayIndex == -1 ){ addDay(date, header) }
  dayIndex = findDayIndex(date)
  data[dayIndex].climbs.push({
    grade: defaultGrade.value,
    guess: false,
    flash: false,
    note: false,
    noteText: null
  })
}

const setGrade = function(dayIndex, climbIndex, newValue) {
  data[dayIndex].climbs[climbIndex].grade = newValue
}

const toggleGuess = function(dayIndex, climbIndex) {
  const bool = data[dayIndex].climbs[climbIndex].guess
  data[dayIndex].climbs[climbIndex].guess = !bool
}

const toggleFlash = function(dayIndex, climbIndex) {
  const bool = data[dayIndex].climbs[climbIndex].flash
  data[dayIndex].climbs[climbIndex].flash = !bool
}

const toggleNote = function(dayIndex, climbIndex) {
  const bool = data[dayIndex].climbs[climbIndex].note
  data[dayIndex].climbs[climbIndex].note = !bool
}

const deleteClimb = function(dayIndex, climbIndex) {
  data[dayIndex].climbs.splice(climbIndex, 1)
  if ( data[dayIndex].climbs.length == 0 ) {
    data.splice(dayIndex, 1)
  }
}

const handleGradeOptionSelection = function(option) {
  const colors = settings.gradeOptions.colors,
        numbers = settings.gradeOptions.numbers
  switch (option) {
    case "colors":
      console.log('Colors checkbox clicked.')
      // If colors is unchecked, check it and be done.
      if (!colors) { settings.gradeOptions.colors = true }
      // If colors is checked, uncheck it. Furthermore, if numbers is unchecked, check it.
      else if (colors) { settings.gradeOptions.colors = false
        if (!numbers) { settings.gradeOptions.numbers = true }
      }
      break
    case "numbers":
      console.log('Numbers checkbox clicked.')
      if (!numbers) { settings.gradeOptions.numbers = true } 
      else { settings.gradeOptions.numbers = false
        if (!colors) { settings.gradeOptions.colors = true }
      }
      break
    default:
      console.log('Unexpected option selected.')
  }
}

const props = {
  data: data,
  nav: nav,
  settings: settings
}

onMounted(() => {
  scrollIntoView(dashboard.value, "instant")
})
</script>

<template>
  <article id="settings" ref="settingsPage">
    <Settings 
      v-bind="props"
      @checkbox-clicked="handleGradeOptionSelection"
    />
  </article>
  <article id="dashboard" ref="dashboard">
    <Dashboard v-bind="props"/>
  </article>
  <article id="timeline" ref="timeline">
    <Timeline v-bind="props"/>
  </article>
  <article id="logger" ref="logger">
    <Logger 
      v-bind="props"
      @add-button-clicked="addClimb"
      @grade-selected="setGrade"
      @guess-icon-clicked="toggleGuess"
      @flash-icon-clicked="toggleFlash"
      @note-icon-clicked="toggleNote"
      @delete-button-clicked="deleteClimb"
    />
  </article>
</template>

<style scoped>
article {
  height: 100%;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  scroll-snap-align: center;
}

#settings, #dashboard {
  align-items: center;
  justify-content: space-around;
}

#timeline {
  justify-content: center;
}
</style>
