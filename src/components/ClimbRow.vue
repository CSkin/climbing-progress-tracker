<script setup>
import { computed, defineProps } from 'vue';
import Guess from './Guess.vue'
import Flash from './Flash.vue'
import Note from './Note.vue'
import { switchGradeColorStyle } from '../main';

const props = defineProps({
    climb: Object, // grade, guess, flash, note, noteText
    index: Number
})

defineEmits([
    'gradeSelected',
    'guessIconClicked',
    'flashIconClicked',
    'noteIconClicked',
    'deleteButtonClicked'
])

const gradeColorStyle = computed(() => {
    return switchGradeColorStyle(props.climb.grade)
})

const guessStatusClass = computed(() => ({
    disabled: !props.climb.guess,
    enabled: props.climb.guess
}))

const flashStatusClass = computed(() => ({
    disabled: !props.climb.flash,
    enabled: props.climb.flash
}))

const noteStatusClass = computed(() => ({
    disabled: !props.climb.note,
    enabled: props.climb.note
}))
</script>

<template>
    <div class="climb-row">
        <div class="primary container">
            <div class="dropdown container">
                <select 
                    class="grade-selector" 
                    name="Climb grade" 
                    :style="gradeColorStyle"
                    @change="$emit('gradeSelected', props.index, $event.target.value)"
                >
                    <option value="pink" :selected="props.climb.grade == 'pink'">Pink</option>
                    <option value="red" :selected="props.climb.grade == 'red'">Red</option>
                    <option value="orange" :selected="props.climb.grade == 'orange'">Orange</option>
                    <option value="yellow" :selected="props.climb.grade == 'yellow'">Yellow</option>
                    <option value="green" :selected="props.climb.grade == 'green'">Green</option>
                    <option value="blue" :selected="props.climb.grade == 'blue'">Blue</option>
                    <option value="black" :selected="props.climb.grade == 'black'">Black</option>
                    <option value="white" :selected="props.climb.grade == 'white'">White</option>
                </select>
            </div>
            <div class="icon container" @click="$emit('guessIconClicked')">
                <!-- <img alt="This climb's rating is uncertain." src="../assets/guess.svg"> -->
                <Guess :class="guessStatusClass"/>
            </div>
            <div class="icon container" @click="$emit('flashIconClicked')">
                <!-- <img alt="You flashed this climb." src="../assets/flash.svg"> -->
                <Flash :class="flashStatusClass"/>
            </div>
            <div class="icon container" @click="$emit('noteIconClicked')">
                <!-- <img alt="A note has been entered about this climb." src="../assets/note.svg"> -->
                <Note :class="noteStatusClass"/>
            </div>
            <div class="icon container" @click="$emit('deleteButtonClicked')">
                <img alt="Remove this climb from the log." src="../assets/delete.svg">
            </div>
        </div>
        <div class="secondary container" v-if="props.climb.note">
            <input type="text" v-model="props.climb.noteText" placeholder="Enter a note." :class="{ 'has-note': props.climb.noteText }"/>
        </div>
    </div>
</template>

<style scoped>
.climb-row {
    margin: 1vh 0 2vh 0;
    padding: 2vh;
    background-color: var(--color-background-mute);
    border-radius: 2vh;
    display: flex;
    flex-direction: column;
}

.secondary {
    margin: 2vh 0 0 0;
}

.container {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;   
}

.dropdown {
    flex: 2.5;
    height: 100%;
}

.icon {
    flex: 1;
    justify-content: center;
}

select {
    width: 90%;
    height: 2em;
    border: solid var(--color-text) 2px;
    border-radius: 0.7vh;
    font-size: 1.3em;
    font-weight: bold;
}

input {
    width: 100%;
    height: 1.5em;
    border: solid var(--color-text) 2px;
    border-radius: 0.7vh;
    font-size: 1.2em;
}

@media (min-width: 400px) {
    select {
        height: 2.2em;
        font-size: 1.5em;
        text-indent: 4px;
    }

    input {
        height: 1.7em;
        font-size: 1.3em;
        text-indent: 4px;
    }
}

.has-note {
    color: var(--color-text);
    background-color: var(--color-background-mute);
    border-color: var(--color-background-mute);
}

img, svg {
    height: 1.8em;
}

.disabled {
    color: var(--color-background-softmute)
}

.enabled {
    color: var(--color-background-inv)
}
</style>
