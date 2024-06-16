<script setup>
import { computed, defineProps } from 'vue'
import Circle from './Circle.vue'
import Edit from './Edit.vue'
import Climb from './ClimbSquare.vue'

const props = defineProps({
    date: String,
    header: String,
    climbs: Array
})

const gridColumnsStyle = computed(() => {
    const numCols = Math.min(props.climbs.length, 7)
    return {
        gridTemplateColumns: `repeat(${numCols}, var(--climb-square-size))`
    }
})
</script>

<template>
    <div class="container">
        <div class="bead">
            <Circle />
        </div>

        <div class="day-content">
            <div class="date">
                <h1> {{ header }} </h1>
                <Edit />
            </div>
            <div class="climbs-logged" :style="gridColumnsStyle">
                <Climb 
                    v-for="climb in climbs"
                    :grade="climb.grade"
                    :guess="climb.guess"
                    :flash="climb.flash"
                    :note="climb.note"
                />
            </div>
        </div>
    </div> 
</template>

<style scoped>
.container {
    margin: 0 5vw 0 10vw;
    display: flex;
    --day-header-height: 2.4em;
}

.bead {
    width: 3vh;
    display: flex;
    justify-content: center;
    align-items: start;
}

.bead > svg {
    margin-top: calc((var(--day-header-height) - 2.5vh) / 2);
    height: 2.5vh;
    fill: var(--color-day-climbs-logged);
}

.day-content {
    margin-top: 0.3em;
    margin-left: 1em;
    --day-content-max-width: 75vw;
    max-width: var(--day-content-max-width);
}

.date {
    display: flex;
    align-items: center;
}

h1 {
    line-height: 1.2;
}

.climbs-logged {
    margin-top: 0.3em;
    border-top: solid var(--color-text);
    padding-top: 0.6em;
    display: grid;
    --climb-square-size: calc(var(--day-content-max-width) / 7);
}
</style>
