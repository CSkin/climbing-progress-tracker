<script setup>

</script>

<template>
    <div class="climb-square">
        <div class="icon-container">
            <img alt="You flashed this climb." src="../assets/flash.svg">
            <img alt="This climb's rating is uncertain." src="../assets/guess.svg">
        </div>
    </div>
</template>

<style scoped>
@import '../assets/base.css';

.climb-square {
    display: inline-block;
    --climb-square-size: calc(var(--day-content-max-width) / 7);
    width: var(--climb-square-size);
    height: var(--climb-square-size);
    background-color: pink;
    color: var(--color-background);
}

.icon-container {
    width: 100%;
    height: 100%;
    padding: 3px;
    display: flex;
    flex-direction: row-reverse;
    align-items: end;
}

img {
    height: 1.3em;
    margin: 2px;
    filter: invert(0);
}
</style>
