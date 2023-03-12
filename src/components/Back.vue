<script>

</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 10 10">

        <circle cx="5" cy="5" r="5"/>

        <path d="M 2.5 5 H 7.5 
                 M 2.5 5 L 4.666 2.833 
                 M 2.5 5 L 4.666 7.166"/>

    </svg>
</template>

<style scoped>
svg {
    position: absolute;
    top: 2vh;
    left: 2vw;
    height: 75px;   
    fill: var(--color-background-inv);
    stroke: var(--color-background);
    stroke-width: 1.333;
    stroke-linecap: round;
}

circle {
    stroke: transparent;
}
</style>
