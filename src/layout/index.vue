<template>
    <div :class="{ 'dark-mode': mode === 'dark' }">
        <top-bar/>
        <app-main/>
        <footer-bar/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import TopBar from './components/TopBar';
import AppMain from './components/AppMain';
import FooterBar from './components/Footer';

export default {
    components: {
        TopBar,
        AppMain,
        FooterBar,
    },
    computed: {
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
</style>