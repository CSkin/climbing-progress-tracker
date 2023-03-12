<script setup>
import DayOff from './DayOff.vue'
import DayClimbsLogged from './DayClimbsLogged.vue'
import Back from './Back.vue'
import Add from './Add.vue'
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
    <Back />
    <Add id="add"/>
</template>

<style scoped>
#add {
    position: absolute;
    bottom: 2vh;
    right: 2vw;
    height: 75px;   
}
</style>
