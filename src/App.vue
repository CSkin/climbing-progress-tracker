<script setup>
import { reactive, ref } from 'vue'
import Dashboard from './components/Dashboard.vue'
import Timeline from './components/Timeline.vue'
import Logger from './components/Logger.vue'
import { scrollIntoView } from './main'

const data = reactive([])

const methods = {
  findDayIndex: function(date) {
    return data.findIndex( (day) => day.date == date )
  },
  addDay: function(date, header) {
    data.push({
      date: date,
      header: header,
      climbs: []
    })
    // sort the Day objects by their Date property
    data.sort((day1, day2) => (day1.date > day2.date) ? 1 : -1)
  },
  addClimb: function(date, header) {
    let dayIndex = methods.findDayIndex(date)
    if ( dayIndex == -1 ){ methods.addDay(date, header) }
    dayIndex = methods.findDayIndex(date)
    data[dayIndex].climbs.push({
      grade: "pink",
      guess: false,
      flash: false,
      note: null
    })
  },
  setGrade: function(dayIndex, climbIndex, newValue) {
    data[dayIndex].climbs[climbIndex].grade = newValue
  },
  toggleGuess: function(dayIndex, climbIndex) {
    const bool = data[dayIndex].climbs[climbIndex].guess
    data[dayIndex].climbs[climbIndex].guess = !bool
  },
  toggleFlash: function(dayIndex, climbIndex) {
    const bool = data[dayIndex].climbs[climbIndex].flash
    data[dayIndex].climbs[climbIndex].flash = !bool
  },
  deleteClimb: function(dayIndex, climbIndex) {
    data[dayIndex].climbs.splice(climbIndex, 1)
  }
}

const dashboard = ref(null)
const timeline = ref(null)
const logger = ref(null)

const nav = {
  viewDashboard: function() {
    scrollIntoView(dashboard.value)
  },
  viewTimeline: function() {
    scrollIntoView(timeline.value)
  },
  viewLogger: function() {
    scrollIntoView(logger.value)
  }
}

const props = {
  data: data,
  methods: methods,
  nav: nav
}
</script>

<template>
  <article id="dashboard" ref="dashboard" @click="nav.viewTimeline">
    <Dashboard v-bind="props"/>
  </article>
  <article id="timeline" ref="timeline">
    <Timeline v-bind="props"/>
  </article>
  <article id="logger" ref="logger">
    <Logger 
      v-bind="props" 
      @add-button-clicked="methods.addClimb"
      @grade-selected="methods.setGrade"
      @guess-icon-clicked="methods.toggleGuess"
      @flash-icon-clicked="methods.toggleFlash"
      @delete-button-clicked="methods.deleteClimb"
    />
  </article>
</template>

<style scoped>
article {
  height: 100%;
  min-width: 100vw;
  scroll-snap-align: center;
}

#dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>
