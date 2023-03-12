<script setup>
import Circle from './Circle.vue'
import Edit from './Edit.vue'
import Climb from './Climb.vue'
</script>

<template>
    <div class="container">
        <div class="bead">
            <Circle />
        </div>

        <div class="day-content">
            <div class="date">
                <h1>Weekday, Month ##</h1>
                <Edit />
            </div>
            <div class="climbs-logged">
                <Climb />
                <Climb />
                <Climb />
                <Climb />
                <Climb />
                <Climb />
                <Climb />
                <Climb />
                <Climb />
                <Climb />
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
    margin-left: 1em;
    --day-content-max-width: 75vw;
    max-width: var(--day-content-max-width);
}

.date {
    height: var(--day-header-height);
}

.date > * {
    display: inline-block;
}

.climbs-logged {
    border-top: solid var(--color-text);
    padding-top: 0.6em;
}
</style>
