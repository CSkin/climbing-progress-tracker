<script setup>
import Back from './Back.vue'
import Edit from './Edit.vue'
</script>

<template>
    <section>
        <header>
            <h1>Weekday, Month ##</h1>
            <Edit />
        </header>
        <div id="date-picker-container">
            <input type="date" id="date" name="date">
            <div id="screen">
                <img alt="Select date using calendar widget" src="../assets/calendar.svg">
            </div>
        </div>
    </section>
    <Back />
</template>

<style scoped>
section {
    height: calc(4vh + 75px);
    background-color: var(--color-background-mute);
    display: flex;
    justify-content: center;
    align-items: center;
}

header {
    max-width: calc(100% - 8vw - 150px);
}

header > * {
    display: inline-block;
}

h1 {
    font-size: 1.5em;
}

#date-picker-container {
    position: absolute;
    top: auto;
    bottom: auto;
    right: 2vw;
    width: 10vw;
    height: 10vw;
    max-width: 65px;
    max-height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
}

input {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
}

::-webkit-datetime-edit {
    display: none;
}

::-webkit-calendar-picker-indicator {
    width: 100%;
    height: 100%;
}

#screen {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--color-background-mute);
    pointer-events: none;
}

img {
    height: 100%;
    filter: invert(0);
}
</style>
