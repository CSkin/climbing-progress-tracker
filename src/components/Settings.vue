<script setup>
import { computed, defineProps } from 'vue'
import Continue from './Continue.vue'

const props = defineProps({
    data: Array,
    nav: Object
})
</script>

<template>
    <section id="app-logo">
        <img alt="Vue logo" src="/src/assets/logo.svg" width="125" height="125" />            
    </section>

    <section id="settings">
        <h1>Climb Grade Options</h1>
        <fieldset>
            <legend>
                <b>Select one or both:</b>
            </legend>
            <div>
                <input type="checkbox" id="colors" name="colors" checked />
                <label for="colors">Boulders Climbing Gym Circuit Grading</label>
            </div>
            <div>
                <input type="checkbox" id="numbers" name="numbers" />
                <label for="numbers">American V-Grades</label>
            </div>
        </fieldset>
    </section>

    <section id="continue-prompt">
        <p>Tap or swipe to view dashboard</p>
        <Continue />
    </section>
</template>

<style scoped>
section {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

img {
    -moz-transform: scaleY(-1);
    -o-transform: scaleY(-1);
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
}

h1, p {
    text-align: center;
}

h1 {
    font-size: 2em;
}

p {
    margin-bottom: 1em;
}
</style>
