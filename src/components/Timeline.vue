<script setup>
import DayOff from './DayOff.vue'
import DayClimbsLogged from './DayClimbsLogged.vue'
import Back from './Back.vue'
import Add from './Add.vue'
import scrollIntoView from '../main'

function viewDashboard() {
    scrollIntoView(document.getElementById("dashboard"));
}

function viewLogger() {
    scrollIntoView(document.getElementById("logger"));
}
</script>

<template>
    <DayOff />
    <DayOff />
    <DayOff />
    <DayOff />
    <DayOff />
    <DayOff />
    <DayOff />
    <DayOff />
    <DayOff />
    <DayClimbsLogged />
    <DayOff />
    <DayOff />
    <DayOff />
    <DayClimbsLogged />
    <DayOff />
    <Back @click="viewDashboard"/>
    <Add id="add" @click="viewLogger"/>
</template>

<style scoped>
#add {
    position: absolute;
    bottom: 2vh;
    right: 2vw;
    height: 75px;   
}
</style>
