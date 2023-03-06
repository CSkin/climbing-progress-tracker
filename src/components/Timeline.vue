<script setup>
import DayOff from './DayOff.vue'
import DayWithClimbs from './DayWithClimbs.vue'
</script>

<template>
    <div class="day"><DayOff /></div>
    <div class="day"><DayWithClimbs /></div>
    <div class="day"><DayOff /></div>
    <div class="day"><DayOff /></div>
    <div class="day"><DayOff /></div>
    <div class="day"><DayWithClimbs /></div>
    <div class="day"><DayOff /></div>
</template>

<style scoped>
.day {
    line-height: normal;
    padding-left: 10vw;
}

img {
    display: block;
}
</style>
