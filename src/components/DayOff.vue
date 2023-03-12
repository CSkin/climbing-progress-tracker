<script setup>
import Circle from './Circle.vue'
</script>

<template>
    <div>
        <Circle />
    </div>
</template>

<style scoped>
div {
    width: 3vh;
    height: 1.333vh;
    margin-left: 10vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

svg {
    height: 1vh;
    fill: var(--color-day-off);
}
</style>
