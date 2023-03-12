<script setup>
import Back from './Back.vue'
</script>

<template>
    <header>
        <label for="date"><h1>Weekday, Month ##</h1></label>
        <input type="date" id="date" name="date">
    </header>
    <Back />
</template>

<style scoped>
header {
    height: calc(4vh + 75px);
    background-color: var(--color-background-mute);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

input {
    position: absolute;
    top: auto;
    bottom: auto;
    right: 2vw;
    width: 10vw;
    height: 10vw;
    max-width: 75px;
    max-height: 75px;
}
</style>
