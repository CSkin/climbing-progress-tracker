<script setup>
import { computed, defineProps } from 'vue';
import Guess from './Guess.vue'
import Flash from './Flash.vue'
import Note from './Note.vue'
import { switchGradeColorStyle } from '../main';

const props = defineProps({
    climb: Object, // grade, guess, flash, note, noteText
    index: Number,
    gradeOptions: Object
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
                    <!-- TODO: Use v-for -->
                    <option value="pink" v-if="gradeOptions.colors || props.climb.grade == 'pink'" :selected="props.climb.grade == 'pink'">Pink</option>
                    <option value="red" v-if="gradeOptions.colors || props.climb.grade == 'red'" :selected="props.climb.grade == 'red'">Red</option>
                    <option value="orange" v-if="gradeOptions.colors || props.climb.grade == 'orange'" :selected="props.climb.grade == 'orange'">Orange</option>
                    <option value="yellow" v-if="gradeOptions.colors || props.climb.grade == 'yellow'" :selected="props.climb.grade == 'yellow'">Yellow</option>
                    <option value="green" v-if="gradeOptions.colors || props.climb.grade == 'green'" :selected="props.climb.grade == 'green'">Green</option>
                    <option value="blue" v-if="gradeOptions.colors || props.climb.grade == 'blue'" :selected="props.climb.grade == 'blue'">Blue</option>
                    <option value="black" v-if="gradeOptions.colors || props.climb.grade == 'black'" :selected="props.climb.grade == 'black'">Black</option>
                    <option value="white" v-if="gradeOptions.colors || props.climb.grade == 'white'" :selected="props.climb.grade == 'white'">White</option>
                    <option value="v0" v-if="gradeOptions.numbers || props.climb.grade == 'v0'" :selected="props.climb.grade == 'v0'">V0</option>
                    <option value="v1" v-if="gradeOptions.numbers || props.climb.grade == 'v1'" :selected="props.climb.grade == 'v1'">V1</option>
                    <option value="v2" v-if="gradeOptions.numbers || props.climb.grade == 'v2'" :selected="props.climb.grade == 'v2'">V2</option>
                    <option value="v3" v-if="gradeOptions.numbers || props.climb.grade == 'v3'" :selected="props.climb.grade == 'v3'">V3</option>
                    <option value="v4" v-if="gradeOptions.numbers || props.climb.grade == 'v4'" :selected="props.climb.grade == 'v4'">V4</option>
                    <option value="v5" v-if="gradeOptions.numbers || props.climb.grade == 'v5'" :selected="props.climb.grade == 'v5'">V5</option>
                    <option value="v6" v-if="gradeOptions.numbers || props.climb.grade == 'v6'" :selected="props.climb.grade == 'v6'">V6</option>
                    <option value="v7" v-if="gradeOptions.numbers || props.climb.grade == 'v7'" :selected="props.climb.grade == 'v7'">V7</option>
                    <option value="v8" v-if="gradeOptions.numbers || props.climb.grade == 'v8'" :selected="props.climb.grade == 'v8'">V8</option>
                    <option value="v9" v-if="gradeOptions.numbers || props.climb.grade == 'v9'" :selected="props.climb.grade == 'v9'">V9</option>
                    <option value="v10" v-if="gradeOptions.numbers || props.climb.grade == 'v10'" :selected="props.climb.grade == 'v10'">V10</option>
                    <option value="v11" v-if="gradeOptions.numbers || props.climb.grade == 'v11'" :selected="props.climb.grade == 'v11'">V11</option>
                    <option value="v12" v-if="gradeOptions.numbers || props.climb.grade == 'v12'" :selected="props.climb.grade == 'v12'">V12</option>
                    <option value="v13" v-if="gradeOptions.numbers || props.climb.grade == 'v13'" :selected="props.climb.grade == 'v13'">V13</option>
                    <option value="v14" v-if="gradeOptions.numbers || props.climb.grade == 'v14'" :selected="props.climb.grade == 'v14'">V14</option>
                    <option value="v15" v-if="gradeOptions.numbers || props.climb.grade == 'v15'" :selected="props.climb.grade == 'v15'">V15</option>
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
