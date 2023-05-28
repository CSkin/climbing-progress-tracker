<script setup>
import { reactive, ref } from 'vue'
import Dashboard from './components/Dashboard.vue'
import Timeline from './components/Timeline.vue'
import Logger from './components/Logger.vue'
import { scrollIntoView } from './main'

const data = reactive([])

const methods = {
  addDay: function(date, header) {
    data.push({
      date: date,
      header: header,
      climbs: []
    })
    // sort the Day objects by their Date property
    data.sort((day1, day2) => (day1.date > day2.date) ? 1 : -1)
  },
  findDayIndex: function(date) {
    return data.findIndex( (day) => day.date == date )
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
    <Logger v-bind="props" @add-button-clicked="methods.addClimb"/>
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
