<template>
    <div>
        <top-bar></top-bar>
        <div class="middle-container">
            <nav-bar v-if="show"></nav-bar>
            <app-main></app-main>
        </div>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
import TopBar from './components/TopBar'
import AppMain from './components/AppMain'
import NavBar from './components/NavigationBar'
import FooterBar from './components/Footer'

export default {
    components: {
        TopBar,
        AppMain,
        NavBar,
        FooterBar,
    },
    computed: {
        show() {
            if (this.$route.path === '/login/index' || this.$route.path === '/register/index') {
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.middle-container {
    width: 100%;
    min-height: calc(100vh - 56px - 200px);
    padding: 16px;
    display: flex;
    justify-content: center;
}
</style>