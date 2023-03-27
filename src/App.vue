<script setup>
import Dashboard from './components/Dashboard.vue'
import Timeline from './components/Timeline.vue'
import Logger from './components/Logger.vue'
import scrollIntoView from './main'

function viewTimeline() {
  scrollIntoView(document.getElementById("timeline"));
}
</script>

<template>
  <article id="dashboard" @click="viewTimeline"><Dashboard /></article>
  <article id="timeline"><Timeline /></article>
  <article id="logger"><Logger /></article>
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
