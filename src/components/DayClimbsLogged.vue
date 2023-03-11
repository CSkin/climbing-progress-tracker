<script setup>
import Circle from './Circle.vue'
import Edit from './Edit.vue'
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
                <div class="climb"></div>
            </div>
        </div>
    </div> 
</template>

<style scoped>
@import '../assets/base.css';

:root {
  --day-header-height: 3.333vh;
}

.container {
    margin: 0 5vw 0 10vw;
    display: flex;
}

.bead {
    width: 3vh;
    height: var(--day-header-height);
    display: flex;
    justify-content: center;
    align-items: center;
}

.bead > svg {
    height: 2.5vh;
    fill: var(--color-day-climbs-logged);
}

.day-content {
    margin-left: 1em;
}

.date {
    height: var(--day-header-height);
}

.date > * {
    display: inline-block;
}

.date > svg {
    height: 1.2em;
    margin-left: 1em;
    fill: var(--color-text);
}
</style>
