<script setup>
import { reactive, ref } from 'vue'
import Dashboard from './components/Dashboard.vue'
import Timeline from './components/Timeline.vue'
import Logger from './components/Logger.vue'
import { scrollIntoView } from './main'

const dashboard = ref(null)
const timeline = ref(null)
const logger = ref(null)

const data = reactive([])

const methods = {
  addDay: function() {
    data.push("day")
  }
}

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
    <Logger v-bind="props"/>
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
