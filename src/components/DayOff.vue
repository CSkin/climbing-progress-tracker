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
    width: 3em;
    margin: 0.15em auto 0.15em 10vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

svg {
    height: 0.7em;
    fill: var(--color-day-off);
}
</style>
