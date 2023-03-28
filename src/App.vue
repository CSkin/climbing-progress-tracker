<script setup>
import { ref } from 'vue'
import Dashboard from './components/Dashboard.vue'
import Timeline from './components/Timeline.vue'
import Logger from './components/Logger.vue'
import { scrollIntoView } from './main'

const dashboard = ref(null)
const timeline = ref(null)
const logger = ref(null)

const refs = {
  dashboard: dashboard,
  timeline: timeline,
  logger: logger
}

function viewTimeline() {
  scrollIntoView(timeline.value);
}
</script>

<template>
  <article id="dashboard" ref="dashboard" @click="viewTimeline"><Dashboard /></article>
  <article id="timeline" ref="timeline"><Timeline v-bind="refs"/></article>
  <article id="logger" ref="logger"><Logger v-bind="refs"/></article>
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
