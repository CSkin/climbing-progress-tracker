<script setup>
import { computed, defineProps } from 'vue'
import Guess from './Guess.vue'
import Flash from './Flash.vue'
import { switchGradeColorStyle } from '../main';

const props = defineProps({
    grade: String,
    guess: Boolean,
    flash: Boolean
})

const squareColorStyle = computed(() => {
    return switchGradeColorStyle(props.grade)
})
</script>

<template>
    <div class="climb-square" :style="squareColorStyle">
        <div class="icon-container">
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

.icon-container {
    width: 100%;
    height: 100%;
    padding: 4px;
    display: flex;
    flex-direction: row-reverse;
    align-items: end;
}

svg {
    height: 1.5em;
    margin: 2px;
}
</style>
