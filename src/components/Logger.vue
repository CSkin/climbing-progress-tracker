<script setup>
import Back from './Back.vue'
import Edit from './Edit.vue'
import Climb from './ClimbRow.vue'
import Add from './Add.vue'
import scrollIntoView from '../main'

function viewTimeline() {
    scrollIntoView(document.getElementById("timeline"));
}
</script>

<template>
    <section id="header-container">
        <header id="date-header">
            <h1>Weekday, Month ##</h1>
            <Edit />
        </header>
        <div id="date-picker-container">
            <input type="date" id="date" name="date">
            <div id="screen">
                <img alt="Open date picker" src="../assets/calendar.svg">
            </div>
        </div>
    </section>
    <section id="log-container">
        <header id="log-header">
            <h3><span></span>GRADE</h3>
            <h3>GUESS?</h3>
            <h3>FLASH?</h3>
            <h3>DELETE</h3>
        </header>
        <Climb />
        <Climb />
        <Climb />
        <Climb />
        <Climb />
        <button id="add-button" type="button"><Add /></button>
    </section>
    <Back @click="viewTimeline"/>
</template>

<style scoped>
section {
    --header-height: calc(4vh + 75px);
}

#header-container {
    height: var(--header-height);
    background-color: var(--color-background-mute);
    display: flex;
    justify-content: center;
    align-items: center;
}

#date-header {
    max-width: calc(100% - 8vw - 150px);
}

#date-header > * {
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

#date {
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

#screen > img {
    height: 100%;
    filter: invert(0);
}

#log-container {
    width: 100%;
    min-height: calc(100% - var(--header-height));
    padding: 2vh 4vw;
}

#log-container > * {
    width: 100%;
}

#log-header {
    height: 3vh;
    display: flex;
    align-items: center;
}

h3 {
    flex: 1;
    text-align: center;
    color: #808080;
    line-height: 1;
}

h3 > span {
    display: inline-block;
    width: 1.5em;
}

h3:nth-of-type(1) {
    flex: 1.75;
    text-align: left;
}

h3:nth-of-type(1) {
    flex: 1.75;
    text-align: left;
} 

button {
    height: 8vh;
    margin: 1vh 0 2vh 0;
    background-color: green;
    border: solid white 5px;
    border-radius: 2.5vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

button > svg {
    height: 100%;
}
</style>
