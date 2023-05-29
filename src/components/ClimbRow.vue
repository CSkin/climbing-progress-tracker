<script setup>
import { computed, defineProps } from 'vue';
import Guess from './Guess.vue'
import Flash from './Flash.vue'

const props = defineProps({
    climb: Object, // grade, guess, flash, note
    index: Number
})

defineEmits([
    'gradeSelected',
    'guessIconClicked',
    'flashIconClicked'
])

const gradeColorStyle = computed(() => {
    let text, bg
    switch (props.climb.grade) {
        case 'pink':   text = '#f66';           bg = '#fbc';       break
        case 'red':    text = '#a00';           bg = '#f77';       break
        case 'orange': text = 'orangered';      bg = 'orange';     break
        case 'yellow': text = 'goldenrod';      bg = 'yellow';     break
        case 'green':  text = '#060';           bg = '#3c3';       break
        case 'blue':   text = 'darkblue';       bg = 'dodgerblue'; break
        case 'black':  text = 'black';          bg = '#777';       break
        case 'white':  text = 'lightsteelblue'; bg = 'white';      break
    }
    return {
        color: text,
        backgroundColor: bg
    }
})

const guessStatusClass = computed(() => ({
    disabled: !props.climb.guess,
    enabled: props.climb.guess
}))

const flashStatusClass = computed(() => ({
    disabled: !props.climb.flash,
    enabled: props.climb.flash
}))
</script>

<template>
    <div class="climb-row">
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
        <div class="icon container">
            <img alt="Remove this climb from the log." src="../assets/delete.svg">
        </div>
    </div>
</template>

<style scoped>
.climb-row {
    height: 8vh;
    margin: 1vh 0 2vh 0;
    background-color: var(--color-background-mute);
    border-radius: 2.5vh;
    display: flex;
}

.container {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;   
}

.dropdown {
    flex: 1.75;
    height: 100%;
}

.icon {
    flex: 1;
    justify-content: center;
}

select {
    margin-left: 1em;
    width: 25vw;
    height: 4vh;
    border: solid var(--color-text) 2px;
    border-radius: 0.7vh;
    font-size: 1.5em;
    font-weight: bold;
    text-indent: 4px;
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
