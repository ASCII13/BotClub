<template>
    <div :class="{ 'dark-mode': mode === 'dark' }">
        <top-bar></top-bar>
        <div class="middle-container" :class="{ 'fixed-padding': fixedHeader }">
            <nav-bar v-if="show"></nav-bar>
            <app-main></app-main>
        </div>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
import TopBar from './components/TopBar';
import AppMain from './components/AppMain';
import NavBar from './components/NavigationBar';
import FooterBar from './components/Footer';

import { mapGetters } from "vuex";

export default {
    components: {
        TopBar,
        AppMain,
        NavBar,
        FooterBar,
    },
    computed: {
        show() {
            if (this.$route.path === '/login/index' || this.$route.path === '/register/index' || this.$route.path === '/auth/index') {
                return false;
            } else {
                return true;
            }
        },
        ...mapGetters([
            'mode',
            'fixedHeader',
        ])
    }
}
</script>

<style lang="scss" scoped>
.dark-mode {
    background-color: $bodyBgDark;
}

.middle-container {
    width: 100%;
    min-height: calc(100vh - 56px - 200px);
    padding: 16px;
    display: flex;
    justify-content: center;

    &.fixed-padding {
        padding-top: 72px;
        min-height: calc(100vh - 200px);
    }
}
</style>