<script>

</script>

<template>
    <main>
        <img alt="Vue logo" class="logo" src="src/assets/logo.svg" width="125" height="125" />

        <div id="climber-rating">
            <h1>Color Rating</h1>
            <h1>Number Rating</h1>
        </div>

        <div id="swipe-prompt">
            <p>Swipe up to view timeline</p>
            <p>&#x2193</p>
        </div>
    </main>
</template>

<style scoped>
main {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

h1, p {
    text-align: center;
}
</style>
