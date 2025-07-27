<script setup>
import { computed, defineProps } from 'vue'
import Guess from './Guess.vue'
import Flash from './Flash.vue'
import Note from './Note.vue'
import { switchGradeColorStyle } from '../main';

const props = defineProps({
    grade: String,
    guess: Boolean,
    flash: Boolean,
    note: Boolean
})

const squareColorStyle = computed(() => {
    return switchGradeColorStyle(props.grade)
})

const textContainerStyle = computed(() => {
    let mg = switchGradeColorStyle(props.grade).borderColor
    return {
        color: mg,
        borderColor: mg
    }
})
</script>

<template>
    <div class="climb-square" :style="squareColorStyle">
        <div 
            v-if="props.grade[0] == 'v'" 
            class="text-container" 
            :style="textContainerStyle">
            {{ props.grade.toUpperCase() }}
        </div>
        <div class="icon-container">
            <!-- <img alt="A note has been entered about this climb." src="../assets/note.svg"> -->
            <Note v-if="props.note"/>
            <!-- <img alt="You flashed this climb." src="../assets/flash.svg"> -->
            <Flash v-if="props.flash"/>
            <!-- <img alt="This climb's rating is uncertain." src="../assets/guess.svg"> -->
            <Guess v-if="props.guess"/>
        </div>
    </div>
</template>

<style scoped>
.climb-square {
    display: inline-block;
    width: var(--climb-square-size);
    height: var(--climb-square-size);
}

.text-container {
    width: 100%;
    height: 100%;
    border: solid thick;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5vh;
    font-weight: 900;
}

.icon-container {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    padding: 2px;
    display: flex;
    flex-direction: row-reverse;
    align-items: end;
}

svg {
    height: 1em;
    margin: 1px;
}

@media (min-width: 400px) {
    .text-container {
        font-size: 5vh;
    }
    
    .icon-container {
        padding: 4px;
    }

    svg {
        height: 2em;
        margin: 2px;
    }
}
</style>
