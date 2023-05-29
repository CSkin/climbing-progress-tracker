<script setup>
import { defineProps } from 'vue'
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

    <section id="climber-rating">
        <h1>Color Rating</h1>
        <h1>Number Rating</h1>
    </section>

    <section id="continue-prompt">
        <p>Tap or swipe to view timeline</p>
        <Continue />
    </section>
</template>

<style scoped>
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
