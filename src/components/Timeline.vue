<script>
export default { inheritAttrs: false }
</script>

<script setup>
import { useAttrs } from 'vue'
import DayOff from './DayOff.vue'
import DayClimbsLogged from './DayClimbsLogged.vue'
import Back from './Back.vue'
import Add from './Add.vue'

const props = useAttrs()
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
    <Back @click="props.viewDashboard"/>
    <Add id="add" @click="props.viewLogger"/>
</template>

<style scoped>
#add {
    position: absolute;
    bottom: 2vh;
    right: 2vw;
    height: 75px;   
}
</style>
