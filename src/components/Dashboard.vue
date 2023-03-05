<script>

</script>

<template>
    <article id="dashboard">
        <section id="app-logo">
            <img alt="Vue logo" src="src/assets/logo.svg" width="125" height="125" />            
        </section>

        <section id="climber-rating">
            <h1>Color Rating</h1>
            <h1>Number Rating</h1>
        </section>

        <section id="continue-prompt">
            <p>Tap or swipe to view timeline</p>
            <p id="arrow">&#x2192</p>
        </section>
    </article>
</template>

<style scoped>
article {
    height: 100%;
    min-width: 100vw;
    scroll-snap-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

h1, p {
    text-align: center;
}

#arrow {
    font-size: 2em;
}
</style>
