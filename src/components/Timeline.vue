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
    <DayClimbsLogged v-for="(day, index) in props.data" :header="props.data[index]"/>
    <Back @click="props.nav.viewDashboard"/>
    <Add id="add" @click="props.nav.viewLogger"/>
</template>

<style scoped>
#add {
    position: absolute;
    bottom: 2vh;
    right: 2vw;
    height: 75px;   
}
</style>
