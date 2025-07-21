<script setup>
import { defineProps, defineEmits } from 'vue'
import Continue from './Continue.vue'

const props = defineProps({
    data: Array,
    nav: Object,
    settings: Object
})

const emit = defineEmits([
    'checkboxClicked'
])
</script>

<template>
    <section id="app-logo">
        <h1>
            <img class="flip-Y" alt="Vue logo" src="/src/assets/logo.svg"/>
            <span>&nbsp;Settings</span>
        </h1>
    </section>

    <section id="settings">
        <h2>Climb Grade Options</h2>
        <fieldset>
            <legend>
                <b>Select one or both:</b>
            </legend>
            <div>
                <input type="checkbox" id="colors" name="colors" 
                    :checked="props.settings.gradeOptions.colors" 
                    @click="$emit('checkboxClicked', $event.target.name)"
                />
                <label for="colors">Boulders Climbing Gym Circuit Grading</label>
            </div>
            <div>
                <input type="checkbox" id="numbers" name="numbers" 
                    :checked="props.settings.gradeOptions.numbers" 
                    @click="$emit('checkboxClicked', $event.target.name)"
                />
                <label for="numbers">American V-Grades</label>
            </div>
        </fieldset>
    </section>

    <section id="continue-prompt"  @click="props.nav.viewDashboard">
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

h1 {
    display: block;
    font-size: 2em;
}

p {
    margin-bottom: 0.75em;
}

img {
    height: 1em;
    vertical-align: -0.125em;
}

label {
    padding-left: 0.5em;
}

.flip-Y {
    -moz-transform: scaleY(-1);
    -o-transform: scaleY(-1);
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
}
</style>
