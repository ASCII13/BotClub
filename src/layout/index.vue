<template>
    <div :class="{ 'dark-mode': mode === 'dark' }">
        <top-bar/>
        <div class="middle-container">
            <nav-bar v-if="show"/>
            <app-main/>
        </div>
        <footer-bar/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import TopBar from './components/TopBar';
import AppMain from './components/AppMain';
import NavBar from './components/NavigationBar';
import FooterBar from './components/Footer';

export default {
    components: {
        TopBar,
        AppMain,
        NavBar,
        FooterBar,
    },
    computed: {
        show() {
            if (this.$route.path === '/auth/index') return false;
            return true;
        },
        ...mapGetters([
            'mode',
        ])
    },
}
</script>

<style lang="scss" scoped>
.dark-mode {
    background-color: $bodyBgDark;
}
.middle-container {
    width: 100%;
    min-height: calc(100vh - 56px - 200px);
    margin-top: 56px;
    padding: 16px;
    display: flex;
    justify-content: center;
}
</style>