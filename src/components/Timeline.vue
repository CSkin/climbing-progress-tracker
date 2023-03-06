<script setup>
import DayOff from './DayOff.vue'
import DayClimbsLogged from './DayClimbsLogged.vue'
</script>

<template>
    <div class="day"><DayOff /></div>
    <div class="day"><DayClimbsLogged /></div>
    <div class="day"><DayOff /></div>
    <div class="day"><DayOff /></div>
    <div class="day"><DayOff /></div>
    <div class="day"><DayClimbsLogged /></div>
    <div class="day"><DayOff /></div>
</template>

<style scoped>
.day {
    line-height: normal;
    padding-left: 10vw;
}
</style>
