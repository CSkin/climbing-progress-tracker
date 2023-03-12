<script setup>

</script>

<template>
    <div class="climb-row">
        <div class="dropdown container">
            <select class="grade-selector" name="Climb grade">
                <option value="pink">Pink</option>
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="black">Black</option>
                <option value="white">White</option>
            </select>
        </div>
        <div class="icon container">
            <img alt="This climb's rating is uncertain." src="../assets/guess.svg">
        </div>
        <div class="icon container">
            <img alt="You flashed this climb." src="../assets/flash.svg">
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
    color: var(--color-text);
    font-weight: bold;
    text-indent: 4px;
}

option[value="pink"] {
    color: calc(pink + red);
    background-color: calc(pink + white);
}

img {
    height: 1.8em;
    filter: invert(0);
}
</style>
